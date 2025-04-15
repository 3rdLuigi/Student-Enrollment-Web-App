import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Student from './Student';
import Teacher from './Teacher';
import Navigation from './Navigation';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Navigation />
                <div className="container">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/student" element={<Student />} />
                        <Route path="/teacher" element={<Teacher />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
