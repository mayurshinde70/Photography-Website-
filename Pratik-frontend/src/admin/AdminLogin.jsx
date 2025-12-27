import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminAuth", "true");

      navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
        className="card p-4 shadow-sm"
        style={{ width: 360 }}
        onSubmit={handleLogin}
      >
        <h4 className="text-center mb-3 fw-bold">Admin Login</h4>

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
}
