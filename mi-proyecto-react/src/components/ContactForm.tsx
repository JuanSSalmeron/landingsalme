import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import styles from "./ContactForm.module.css";

interface FormData {
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
}

const RECAPTCHA_SITE_KEY = "6LdwZ2srAAAAAGdBDgheRfm2j5WldYcO1gq_RP5Z"; // Reemplaza con tu clave pública

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<{
    message: string;
    error?: boolean;
  } | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setStatus({ message: "Por favor confirma el reCAPTCHA", error: true });
      return;
    }

    setStatus({ message: "Enviando..." });

    try {
      const res = await fetch("http://137.184.58.132:9999/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });

      if (res.ok) {
        setStatus({ message: "Mensaje enviado con éxito" });
        setForm({ nombre: "", correo: "", telefono: "", mensaje: "" });
        setRecaptchaToken(null);
      } else {
        setStatus({ message: "Error al enviar mensaje", error: true });
      }
    } catch (error) {
      setStatus({ message: "Error de conexión", error: true });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Formulario de Contacto</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          required
          placeholder="Juan Pérez"
        />

        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={form.correo}
          onChange={handleChange}
          required
          placeholder="correo@ejemplo.com"
        />

        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={form.telefono}
          onChange={handleChange}
          required
          placeholder="+52 55 1234 5678"
        />

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          required
          placeholder="Escribe tu mensaje aquí..."
          rows={5}
        />

        <label className={styles.checkboxContainer}>
          <input type="checkbox" required name="terminos" />
          <span>
            Acepto el{" "}
            <a
              href="/aviso-de-privacidad"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aviso de privacidad
            </a>{" "}
            y los{" "}
            <a
              href="/terminos-y-condiciones"
              target="_blank"
              rel="noopener noreferrer"
            >
              Términos y condiciones.
            </a>
          </span>
        </label>

        {/* reCAPTCHA */}
        <div className={styles.recaptcha}>
          <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleRecaptcha} />
        </div>

        <button type="submit">Enviar</button>
      </form>

      {status && (
        <p className={`${styles.status} ${status.error ? styles.error : ""}`}>
          {status.message}
        </p>
      )}
    </div>
  );
};

export default ContactForm;
