import { useState } from "react";
import { register } from "../services/authServices";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/contactform");
    } catch (err) {
      setError(err.response?.data?.details || "Erreur inscription");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="form-control my-2" />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="form-control my-2" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control my-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control my-2" />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
