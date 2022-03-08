import React, { useEffect, useState } from 'react'
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EventBus from "../common/EventBus";
import * as AuthService from "../services/auth.service";
import IUser from '../types/user.type';


const Navbar = () => {
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }

        EventBus.on("logout", logOut);

        return () => {
            EventBus.remove("logout", logOut);
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
                <Link to={"/"} className="navbar-brand">
                    ToDo List
                </Link>
                <div className="navbar-nav me-auto">


                    {currentUser ? (
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>
                    ) : null}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username.toUpperCase()}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                Log Out
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
                <div></div>
            </nav>
        </div>
    )
}

export default Navbar