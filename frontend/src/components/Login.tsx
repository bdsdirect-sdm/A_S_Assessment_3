import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login: React.FC = () => {
    const Navigate = useNavigate();

    const ValidationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleLogin = async (values: any) => {
        console.log(values)
        try{
            var response = await axios.post("http://localhost:3000/login", values)
            localStorage.setItem('token', response.data.token);
            console.log("Login Data",response.data)
            Navigate(`/profile/${response.data.user.id}`)
        }
        catch(error){
            console.error("Error creating post:", error);
            alert("Bhai dekh kr data bhr....")
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={ValidationSchema}
            onSubmit={handleLogin}
        >
            {() => (
                <Form>
                    <label>Email:</label>
                    <Field name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" className='text-danger' />
                    <br/>
                    <label>Password:</label>
                    <Field type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" className='text-danger' />
                    <br/>
                    <button type="submit">Login</button>
                    <div>
                        Don't have an account? <a href="/">Sign Up</a>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
