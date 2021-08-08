import React from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = () => (
            <nav className="navbar navbar-light bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand mr-auto text-light" to="/" exact>Голосование на блокчейне</NavLink>
                    <NavLink to="/creation"><button className="btn btn-secondary" type="button">Создать</button></NavLink>
                </div>
            </nav>
)