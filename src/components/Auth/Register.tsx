import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import IUser from "../../types/user.type";
import { register } from "../../services/auth.service";

const Register: React.FC = (): JSX.Element => {

    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: IUser = {
        username: "",
        password: "",
        passwordConfirm: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .test(
                "len",
                "The username must be between 3 and 20 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 4 and 40 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 4 &&
                    val.toString().length <= 40
            )
            .required("This field is required!"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const handleRegister = (formValue: IUser) => {
        const { username, password, passwordConfirm } = formValue;
        register(username, password, passwordConfirm).then(
            (response: any) => {
                setSuccessful(true);
                setMessage(`You have successfully registered! ${response.data.message}`);
            },
            (error: any) => {
                const responseMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || "Something went wrong!";
                setSuccessful(false);
                setMessage(responseMessage);
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div className="row g-2">
                                    <label htmlFor="username">Username</label>
                                    <Field
                                        name="username"
                                        type="text"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="row g-2">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="row g-2">
                                    <label htmlFor="passwordConfirm">Confirm Password</label>
                                    <Field
                                        name="passwordConfirm"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="passwordConfirm"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="row g-2 my-2">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Register
                                    </button>
                                </div>
                            </div>
                        )}
                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Register;