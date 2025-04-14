import React from 'react';
import { Link } from 'react-router-dom'; // If using routing
import './Navigation.css'; // Create a Navigation.css file

function Navigation() {
    return (
        <div className="nav-container">
            <Link to="/" className="nav-button">View Classes (Home)</Link>
            <Link to="/admin" className="nav-button">Admin Page</Link>
            <Link to="/student" className="nav-button">Student Portal</Link>
        </div>
    );
}

export default Navigation;