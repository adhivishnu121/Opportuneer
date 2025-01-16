
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; 

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useUser(); 

    useEffect(() => {
        logout(); 
        navigate('/login'); 
    }, [logout, navigate]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;
