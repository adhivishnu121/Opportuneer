

import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	    const [empEmail, setEmpEmail] = useState(null); 
    const [userEmail, setUserEmail] = useState(null); 
    const [lastName, setLastName] = useState(''); 
	const[firstName,setFirstName] = useState('');
	const[companyName,setCompanyName] = useState('');
     const[resumePath,setResumePath]= useState(''); 

    const logout = () => {
        setUserEmail(null); 
        setEmpEmail(null);
        localStorage.removeItem('empEmail'); 
            localStorage.removeItem('userEmail'); 

    };

    return (
        <UserContext.Provider value={{ companyName,setCompanyName,resumePath,setResumePath, empEmail,setEmpEmail, userEmail, setUserEmail, firstName,setFirstName,logout ,lastName, setLastName}}>
            {children}
        </UserContext.Provider>
    );
};
