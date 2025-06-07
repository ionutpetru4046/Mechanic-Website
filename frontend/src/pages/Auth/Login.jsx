// src/pages/Auth/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        console.log("sending login data:", form);
        e.preventDefault();
        try {
           const res = await axios.post("http://localhost:5000/api/auth/login", form);
           localStorage.setItem("token", res.data.token);
           navigate("/dashboard"); // change this to your protected page
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div style={styles.container}>
         <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
         </form>
        </div>
    );
};

const styles = {
    container: { maxWidth: 400, margin: "auto", paddingTop: "100px", textAlign: "center" },
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    error: { color: "red" },
  };

export default Login;