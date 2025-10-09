import { useState } from "react";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      
      localStorage.setItem("token", data.token); 
      navigate("/contactform"); 
    } catch (err) {
      setError(err.response?.data?.details || "Erreur login");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control my-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control my-2" />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
