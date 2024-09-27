import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const Update: React.FC = () => {
    const {id} = useParams();
    const Navigate = useNavigate();
    const token = localStorage.getItem('token');


    const ValidationSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        DOB: Yup.date().nullable(),
        gender: Yup.string().oneOf(['male', 'female']).required('Gender is required'),
        phone: Yup.string().required('Phone Number is required'),
    });

    const handleUpdate = async (values: any) => {
        try {
            
            await axios.put(`http://localhost:3000/update_profile/${id}`,values,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            
            Navigate(`/profile/${id}`);
        } catch (error) {
            alert('Email already exists....');
        }
    };

    return (
<Formik
    initialValues={{ firstname: '', lastname: '', email: '', DOB: '', gender: '', phone: '' }}
    validationSchema={ValidationSchema}
    onSubmit={handleUpdate}
>
    {({ isSubmitting }) => (
        <Form>
            <Field name="firstname" placeholder="First Name" />
            <ErrorMessage name="firstname" component="div" />
            <br/>

            <Field name="lastname" placeholder="Last Name" />
            <ErrorMessage name="lastname" component="div" />
            <br/>

            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <br/>
            <Field name="DOB" type="date" />
            <ErrorMessage name="DOB" component="div" />
            <br/>
            <Field as="select" name="gender">
                <option value="" label="Select gender" defaultChecked disabled/>
                <option value="male" label="Male" />
                <option value="female" label="Female" />
                <option value="other" label="Mixed" />
            </Field>
            <ErrorMessage name="gender" component="div" />
            <br/>
            <Field name="phone" placeholder="Phone Number" />
            <ErrorMessage name="phone" component="div" />
            <br/>
            <br/>
            <button type="submit" disabled={isSubmitting}>
                Update Profile
            </button>
        </Form>
    )}
</Formik>
)}

export default Update;