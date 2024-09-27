import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Signup:React.FC = () => {
    const Navigate = useNavigate();

    const handleSignup = async(values:any) => {
        delete values.confirmPassword;
        try{

            var response = await axios.post("http://localhost:3000/signup", values)
            console.log(response.data)
            Navigate(`/login`);
            
        }
        catch(error){
            console.error("Error creating post:", error);
            alert("Emial already exists....")
        }

    }

    const ValidationSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password is too short').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    return (
        <Formik
            initialValues={{ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={ValidationSchema}
            onSubmit={handleSignup}
        >
            {() => (
                <Form>
                    <label>First Name:</label>
                    <Field name="firstname" placeholder="First Name" />
                    <ErrorMessage name="firstname" component="div" className='text-danger' />
                    <br/>
                    <br/>
                    <label>Last Name:</label>
                    <Field name="lastname" placeholder="Last Name" />
                    <ErrorMessage name="lastname" component="div" className='text-danger' />
                    <br/>
                    <br/>
                    <label>Email:</label>
                    <Field name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" className='text-danger' />
                    <br/>
                    <br/>
                    <label>Password:</label>
                    <Field type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" className='text-danger' />
                    <br/>
                    <br/>
                    <label>Confirm pass:</label>
                    <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                    <ErrorMessage name="confirmPassword" component="div" className='text-danger' />
                    <br/>
                    <br/>
                    <button type="submit">Sign Up</button>
                    <div>
                        Already have an account? <a href="/login">Login</a>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default Signup;