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
         <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Register</button>
         </form>
        </div>
    );
};

const styles = {
    container: { maxWidth: 400, margin: "auto", paddingTop: "100px", textAlign: "center" },
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    error: { color: "red" },
}

export default Register;