import React from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = () => (
            <nav className="navbar navbar-light bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand mr-auto text-light" to="/" exact>Blockchain Polls</NavLink>
                    <NavLink to="/creation"><button className="btn btn-secondary" type="button">Create Poll</button></NavLink>
                </div>
            </nav>
)