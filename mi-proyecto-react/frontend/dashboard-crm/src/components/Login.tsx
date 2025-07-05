import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Credenciales inválidas");
    }
  };

  return (
    <>
      <style>{`
        .login-container {
          max-width: 400px;
          margin: 100px auto;
          padding: 2rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .login-title {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #1e40af;
        }

        .login-input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          box-sizing: border-box;
        }

        .login-button {
          width: 100%;
          padding: 0.75rem;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
        }

        .login-button:hover {
          background-color: #1e40af;
        }
      `}</style>

      <div className="login-container">
        <h2 className="login-title">Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
