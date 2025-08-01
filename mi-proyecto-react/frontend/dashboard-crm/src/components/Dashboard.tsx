import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

interface Lead {
  _id: string;
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
  estado: string;
  fecha: string;
}

const Dashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const navigate = useNavigate();

  // Obtener leads desde la API
  const fetchLeads = async () => {
    try {
      const res = await axios.get("/leads");
      setLeads(res.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("Sesión expirada. Por favor, inicia sesión de nuevo.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Error al obtener los leads");
        console.error(error);
      }
    }
  };

  // Cambiar estado de un lead
  const cambiarEstado = async (id: string, nuevoEstado: string) => {
    try {
      await axios.patch(`/leads/${id}`, { estado: nuevoEstado });
      fetchLeads();
    } catch (error) {
      alert("No se pudo cambiar el estado del lead.");
      console.error(error);
    }
  };

  // Verificar si hay token y cargar leads

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const up = async () => {
        await fetchLeads();
      };

      up();
    }

  // Cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2 style={{ color: "#1e40af" }}>Dashboard de Leads</h2>
      <button
        onClick={cerrarSesion}
        style={{
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        Cerrar sesión
      </button>
      <table
        border={1}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#f9fafb",
        }}
      >
        <thead style={{ backgroundColor: "#2563eb", color: "white" }}>
          <tr>
            <th style={{ padding: "0.5rem" }}>Nombre</th>
            <th style={{ padding: "0.5rem" }}>Correo</th>
            <th style={{ padding: "0.5rem" }}>Teléfono</th>
            <th style={{ padding: "0.5rem" }}>Mensaje</th>
            <th style={{ padding: "0.5rem" }}>Estado</th>
            <th style={{ padding: "0.5rem" }}>Cambiar estado</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td style={{ padding: "0.5rem" }}>{lead.nombre}</td>
              <td style={{ padding: "0.5rem" }}>{lead.correo}</td>
              <td style={{ padding: "0.5rem" }}>{lead.telefono}</td>
              <td style={{ padding: "0.5rem" }}>{lead.mensaje}</td>
              <td style={{ padding: "0.5rem" }}>{lead.estado}</td>
              <td style={{ padding: "0.5rem" }}>
                <select
                  value={lead.estado}
                  onChange={(e) => cambiarEstado(lead._id, e.target.value)}
                >
                  <option value="nuevo">Nuevo</option>
                  <option value="contactado">Contactado</option>
                  <option value="descartado">Descartado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
