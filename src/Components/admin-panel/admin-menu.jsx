import React from 'react';
import { NavLink } from "react-router-dom";
import '../../Styles/admin/admin-menu.css'
import SlideshowIcon from '@mui/icons-material/Slideshow';

function AdminMenu({}) {
    return (
        <div className="admin-sidebar-container">
            <div className="sidebar-menu">
                <ul className="admin-sidebar">
                    <li className="admin-sidebar-item">
                        <NavLink to="/admin/movie"
                                 style={({ isActive }) => (isActive ? { color: "#333", backgroundColor: '#ffd700' } : {})}
                        >Movie
                        </NavLink>
                    </li>
                    <li className="admin-sidebar-item">
                        <NavLink to="/admin/theater"
                                 style={({ isActive }) => (isActive ? { color: "#333", backgroundColor: '#ffd700' }  : {})}
                                >Theater
                        </NavLink>
                    </li>
                    <li className="admin-sidebar-item">
                        <NavLink to="/admin/show"
                            style={({ isActive }) => (isActive ? { color: "#333", backgroundColor: '#ffd700' }  : {})}
                            >Show
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminMenu;
