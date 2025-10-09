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
      console.log("🔐 Tentative de connexion...");
      
      const data = await login(form);
      
      console.log("✅ Connexion réussie");
      console.log("🔑 Nouveau token:", data.token);
      
      // Supprime l'ancien token avant de sauvegarder le nouveau
      localStorage.removeItem("token");
      
      // Sauvegarde le nouveau token
      localStorage.setItem("token", data.token);
      
      // Vérifie que le token est bien sauvegardé
      const savedToken = localStorage.getItem("token");
      console.log("✅ Token sauvegardé:", savedToken);
      
      // Décode le token pour voir le userId
      if (savedToken) {
        const payload = JSON.parse(atob(savedToken.split('.')[1]));
        console.log("🔓 UserId dans le token:", payload.userId);
        console.log("🔓 Expire à:", new Date(payload.exp * 1000));
      }
      
      navigate("/contactform"); 
    } catch (err) {
      console.error("❌ Erreur de connexion:", err);
      setError(err.response?.data?.details || "Erreur login");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          className="form-control my-2" 
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          className="form-control my-2" 
          required
        />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;