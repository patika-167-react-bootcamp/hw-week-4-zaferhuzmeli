import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { getCurrentUser } from "../services/auth.service";
import AddTodo from "./Todos/AddTodo";

const Home = () => {

    const [categoryList, setCategoryList] = useState<Array<any>>([]);
    const [todoList, setTodoList] = useState<Array<any>>([]);


    const handleTodoAdd = (data: any) => {
        setTodoList((prev) => [...prev, data])
    }

    const [currentUser, setCurrentUser] = useState<any>(undefined);

    useEffect(() => {
        const user = getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);


    return (
        <div className="container-fluid">
            <header className="jumbotron">
                <h1 className="text-center">Todo App</h1>
            </header>
            <div className="my-5 text-center">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <h2>Todo List</h2>
                            <div className="">
                                <AddTodo
                                    onSave={handleTodoAdd}
                                    categoryList={categoryList} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <h2>Categories</h2>
                            <Button> Add New Category </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
