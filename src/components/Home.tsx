import React, { useState, useEffect } from "react";

import { getCategoryList } from "../services/todo.service";

const Home: React.FC = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        getCategoryList().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h1>Ana Sayfa</h1>
            </header>
        </div>
    );
};

export default Home;
