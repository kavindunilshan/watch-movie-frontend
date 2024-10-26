import React from 'react';
import { NavLink } from "react-router-dom";
import '/src/Styles/admin/admin-menu.css'

function AdminMenu({}) {
    return (
        <div className="admin-sidebar-container">
            <div className="sidebar-menu">
                <ul className="admin-sidebar">
                    <li className="admin-sidebar-item">
                        <NavLink to="/admin/movie"
                                 style={({ isActive }) => (isActive ? { color: "#faf7f7", backgroundColor: '#320440'} : {})}
                                >Movie
                        </NavLink>
                    </li>
                    <li className="admin-sidebar-item">
                        <NavLink to="/admin/theater"
                                 style={({ isActive }) => (isActive ? { color: "#faf7f7", backgroundColor: '#320440'}  : {})}
                                >Theater
                        </NavLink>
                    </li>
                    <li className="admin-sidebar-item">
                        <NavLink to="/admin/show"
                            style={({ isActive }) => (isActive ? { color: "#faf7f7", backgroundColor: '#320440'}  : {})}
                            >Show
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminMenu;
