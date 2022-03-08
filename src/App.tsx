import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile/Profile";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-3">
        <Switch>
          <Route exact path={"/"}
            render={() => {
              return currentUser ? <Redirect to="/home" /> : <Redirect to="/login" />;
            }} />
          <Route path={"/home"} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
