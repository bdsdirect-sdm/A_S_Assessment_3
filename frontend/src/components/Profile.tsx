import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Profile: React.FC = () => {
    const {id} = useParams();
    const [profile, setProfile] = useState<any>(null);
    const Navigate = useNavigate();
    const token = localStorage.getItem('token');

    const goonUpdate = () => {
        Navigate(`/update-profile/${id}`)
    }

    useEffect(() => {

        const fetchProfile = async () => {
            if (token) {
                try {
                    console.log("token: ",token)
                    console.log("Id ", id);
                    const response = await axios.get(`http://localhost:3000/profile/${id}`,{
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProfile(response.data);
                    console.log("profile data: ",response.data)
                    console.log("Profile",profile);
                } catch (error) {
                    alert('Error fetching profile');
                }
            } else {
                alert("Aise kaise bhai.....")
                Navigate('/');
            }
        };

        fetchProfile();
    }, [token, Navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        Navigate('/');
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h1>Profile</h1>
            <p>First Name: {profile?.firstname}</p>
            <p>Last Name: {profile?.lastname}</p>
            <p>Email: {profile?.email}</p>
            <p>Gender: {profile?.gender}</p>
            <p>Date of Birth: {profile?.DOB}</p>
            <br/>
            <button onClick={handleLogout}>Logout</button>
            <br/>
            <br/>
            <button onClick={goonUpdate}>Update Profile</button>
        </div>
    );
};

export default Profile;