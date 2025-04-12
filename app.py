from flask import Flask, render_template, request, jsonify
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
import requests
import logging

app = Flask(__name__)

app.logger.setLevel(logging.DEBUG)

engine = create_engine('sqlite:///database.db')
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()

class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True)
    username = Column(String(50))
    password = Column(String(50))
    
    admin_id = Column(Integer, ForeignKey('admins.id'))
    admin = relationship('Admin', backref='student')

    grades = relationship('Grade', backref='student')

class Teacher(Base):
    __tablename__ = 'teachers'
    id = Column(Integer, primary_key=True)
    username = Column(String(50))
    password = Column(String(50))

    admin_id = Column(Integer, ForeignKey('admins.id'))
    admin = relationship('Admin', backref='teacher')

    courses = relationship('Course', backref='teacher')
    
    grades = relationship('Grade', backref='teacher')

class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Integer, primary_key=True)
    username = Column(String(50))
    password = Column(String(50))

    courses = relationship('Course', backref='admin')
    students = relationship('Student', backref='admin')
    teachers = relationship('Teacher', backref='admin')

class Grade(Base):
    __tablename__ = 'grades'
    id = Column(Integer, primary_key=True)
    course_id = Column(Integer)
    course = relationship('Course', backref='grades')

    student_id = Column(Integer, ForeignKey('students.id'))
    student = relationship('Student', backref='grades')
    
    teacher = relationship('Teacher', backref='grades')
    teacher_id = Column(Integer, ForeignKey('teachers.id'))
    
    admin_id = Column(Integer, ForeignKey('admins.id'))
    admin = relationship('Admin', backref='grades')

    grade = Column(Float)

class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    teacher_name = Column(String(50))
    time_offered = Column(String(50))
    students_enrolled = Column(Integer)

    teacher_id = Column(Integer, ForeignKey('teachers.id'))
    teacher = relationship('Teacher', backref='courses')

    admin_id = Column(Integer, ForeignKey('admins.id'))
    admin = relationship('Admin', backref='courses')

    grades = relationship('Grade', backref='course')

@app.route('/')
def home():
    return redner_template('index.html')

Base.metadata.create_all(engine)

if __name__ == '__main__':
    app.run(debug=True)