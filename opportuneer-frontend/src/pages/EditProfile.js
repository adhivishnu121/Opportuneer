import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext"; 
import { FaEdit, FaSave, FaFileUpload } from "react-icons/fa"; 
import "./EditProfile.css"; 

const EditProfile = () => {
    const { userEmail } = useUser(); 
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        postcode: "",
        password: "",
        resume: "",
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 

    const [editMode, setEditMode] = useState({}); 

    useEffect(() => {
        if (userEmail) {
            axios
                .get(`http://localhost:8080/api/user/details?email=${userEmail}`)
                .then((response) => setUserDetails(response.data))
                .catch(() => {
                    setMessageType("error");
                    setMessage("Error fetching user details.");
                });
        }
    }, [userEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEdit = (field) => {
        setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:8080/api/user/update", userDetails)
            .then((response) => {
                setMessageType("success");
                setMessage(response.data || "Profile updated successfully!");
                setEditMode({});
            })
            .catch(() => {
                setMessageType("error");
                setMessage("Failed to update profile.");
            });
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Your Profile</h2>
            {message && <div className={`alert ${messageType}`}>{message}</div>}
            <form onSubmit={handleSubmit}>
                {["firstName", "lastName", "phoneNumber", "postcode"].map((field) => (
                    <div key={field} className="input-group">
                        <label>{field.replace(/([A-Z])/g, " $1")}</label>
                        {editMode[field] ? (
                            <input
                                type="text"
                                name={field}
                                value={userDetails[field]}
                                onChange={handleChange}
                                placeholder={`Enter your ${field}`}
                            />
                        ) : (
                            <span>{userDetails[field] || "Not provided"}</span>
                        )}
                        <button
                            type="button"
                            onClick={() => toggleEdit(field)}
                            className="edit-btn"
                            title={editMode[field] ? "Save" : "Edit"}
                        >
                            {editMode[field] ? <FaSave /> : <FaEdit />}
                        </button>
                    </div>
                ))}
                <div className="input-group">
                    <label>Email</label>
                    <span>{userDetails.email}</span>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    {editMode.password ? (
                        <input
                            type="password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                        />
                    ) : (
                        <span>********</span>
                    )}
                    <button
                        type="button"
                        onClick={() => toggleEdit("password")}
                        className="edit-btn"
                        title={editMode.password ? "Save" : "Edit"}
                    >
                        {editMode.password ? <FaSave /> : <FaEdit />}
                    </button>
                </div>
                <div className="input-group">
                    <label>Resume</label>
                    <span>
                        {userDetails.resume ? "Uploaded" : "No Resume Uploaded"}
                    </span>
                    <input
                        type="file"
                        name="resume"
                        onChange={(e) =>
                            setUserDetails((prev) => ({
                                ...prev,
                                resume: e.target.files[0],
                            }))
                        }
                        style={{ display: editMode.resume ? "block" : "none" }}
                    />
                    <button
                        type="button"
                        onClick={() => toggleEdit("resume")}
                        className="edit-btn"
                        title={editMode.resume ? "Save" : "Upload"}
                    >
                        {editMode.resume ? <FaSave /> : <FaFileUpload />}
                    </button>
                </div>
                <button type="submit" className="update-btn">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
