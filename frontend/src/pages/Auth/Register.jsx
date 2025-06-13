// src/pages/Auth/Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", form);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Create Account</h2>
                <p style={styles.subtitle}>Please fill in your details to register</p>
                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && <p style={styles.error}>{error}</p>}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter your full name" 
                            onChange={handleChange} 
                            required 
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            onChange={handleChange} 
                            required 
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Create a password" 
                            onChange={handleChange} 
                            required 
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px"
    },
    formContainer: {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px"
    },
    title: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: "8px",
        textAlign: "center"
    },
    subtitle: {
        fontSize: "14px",
        color: "#666",
        marginBottom: "24px",
        textAlign: "center"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },
    label: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#333"
    },
    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "14px",
        transition: "border-color 0.2s",
        outline: "none",
        "&:focus": {
            borderColor: "#007bff"
        }
    },
    button: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background-color 0.2s",
        marginTop: "8px",
        "&:hover": {
            backgroundColor: "#0056b3"
        }
    },
    error: {
        color: "#dc3545",
        fontSize: "14px",
        textAlign: "center",
        marginBottom: "16px"
    }
};

export default Register;