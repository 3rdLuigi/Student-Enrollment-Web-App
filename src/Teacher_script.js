function loadClassesFromStorage() {
    return JSON.parse(localStorage.getItem('classes')) || [];
}

function saveClassesToStorage(classes) {
    localStorage.setItem('classes', JSON.stringify(classes));
}

function filterClassesByTeacher(teacherId, classes) {
    return classes.filter(cls => cls.teacherId === teacherId);
}

function renderTeacherClasses(classes) {
    const container = document.getElementById('teacher-classes');
    container.innerHTML = '';

    if (classes.length === 0) {
        container.innerHTML = '<p>No classes found for this teacher.</p>';
        return;
    }

    classes.forEach(cls => {
        const classDiv = document.createElement('div');
        classDiv.className = 'class-box';

        const title = document.createElement('h3');
        title.textContent = `${cls.name} (ID: ${cls.id})`;

        const table = document.createElement('table');
        table.className = 'grade-table';
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Student ID</th>
                <th>Grade</th>
                <th>Edit</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        if (cls.enrolledStudents && cls.enrolledStudents.length > 0) {
            cls.enrolledStudents.forEach(student => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = student.id;

                const gradeCell = document.createElement('td');
                gradeCell.textContent = student.grade ?? 'N/A';

                const editCell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = student.grade || '';
                input.placeholder = 'Enter grade';
                input.addEventListener('blur', () => {
                    handleGradeChange(cls.id, student.id, input.value);
                });

                editCell.appendChild(input);

                row.appendChild(idCell);
                row.appendChild(gradeCell);
                row.appendChild(editCell);
                tbody.appendChild(row);
            });
        } else {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `<td colspan="3">No students enrolled.</td>`;
            tbody.appendChild(emptyRow);
        }

        table.appendChild(tbody);
        classDiv.appendChild(title);
        classDiv.appendChild(table);
        container.appendChild(classDiv);
    });
}

function handleGradeChange(classId, studentId, newGrade) {
    const allClasses = loadClassesFromStorage();
    const updatedClasses = allClasses.map(cls => {
        if (cls.id === classId) {
            const updatedStudents = cls.enrolledStudents.map(student =>
                student.id === studentId ? { ...student, grade: newGrade } : student
            );
            return { ...cls, enrolledStudents: updatedStudents };
        }
        return cls;
    });

    saveClassesToStorage(updatedClasses);
    alert(`Updated grade for student ${studentId} in class ${classId}.`);

    const teacherClasses = filterClassesByTeacher(currentTeacherId, updatedClasses);
    renderTeacherClasses(teacherClasses);
}

// Simulate a login
let currentTeacherId = null;

document.getElementById('login-button').addEventListener('click', () => {
    currentTeacherId = 'teacher1'; // static teacher ID for demo
    const allClasses = loadClassesFromStorage();
    const teacherClasses = filterClassesByTeacher(currentTeacherId, allClasses);
    document.getElementById('auth-area').style.display = 'none';
    document.getElementById('dashboard-area').style.display = 'block';
    renderTeacherClasses(teacherClasses);
});

document.getElementById('logout-button').addEventListener('click', () => {
    currentTeacherId = null;
    document.getElementById('auth-area').style.display = 'block';
    document.getElementById('dashboard-area').style.display = 'none';
});