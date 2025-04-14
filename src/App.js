import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Changed Switch to Routes
import Home from './Home';
import Admin from './Admin';
import Student from './Student';
import Navigation from './Navigation';
import './App.css'; // Create an App.css for global styles or overrides

function App() {
    return (
        <Router>
            <div className="app">
                <Navigation />
                <div className="container">
                    <Routes> {/* Changed Switch to Routes */}
                        <Route exact path="/" element={<Home />} /> {/* Changed component to element */}
                        <Route path="/admin" element={<Admin />} /> {/* Changed component to element */}
                        <Route path="/student" element={<Student />} /> {/* Changed component to element */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;