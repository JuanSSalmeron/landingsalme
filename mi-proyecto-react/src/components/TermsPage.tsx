import React from 'react';
import './TermsPage.css';

const TermsPage: React.FC = () => {
  return (
    <div className="terms-container">
      <h1>Términos y Condiciones</h1>

      <section>
        <h2>1. Uso del Sitio</h2>
        <p>
          Este sitio web es operado por <strong>Adisport</strong>. Al navegar o usar nuestros servicios,
          aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo con ellos,
          te recomendamos no utilizar este sitio.
        </p>
      </section>

      <section>
        <h2>2. Propiedad Intelectual</h2>
        <p>
          Todos los contenidos del sitio, incluyendo imágenes, textos, logos y diseños, son propiedad
          de Adisport o de sus respectivos dueños, y están protegidos por leyes de propiedad intelectual.
        </p>
      </section>

      <section>
        <h2>3. Responsabilidad</h2>
        <p>
          Adisport no se hace responsable por daños derivados del uso indebido del sitio o interrupciones
          en el servicio por causas técnicas.
        </p>
      </section>

      <section>
        <h2>4. Tratamiento de Datos del Formulario</h2>
        <p>
          Al completar el formulario de contacto, aceptas que los datos personales que ingreses (nombre,
          correo, mensaje) serán almacenados y utilizados exclusivamente con fines de comunicación entre
          tú y Adisport. <strong>No compartimos tu información con terceros</strong>, salvo obligación legal.
        </p>
        <p>
          Puedes solicitar la modificación o eliminación de tus datos en cualquier momento escribiéndonos
          al correo de contacto oficial.
        </p>
      </section>

      <section>
        <h2>5. Cambios en los Términos</h2>
        <p>
          Adisport se reserva el derecho de modificar estos términos en cualquier momento. Las actualizaciones
          se publicarán en esta misma página.
        </p>
      </section>

      <footer className="terms-footer">
        Última actualización: julio 2025
      </footer>
    </div>
  );
};

export default TermsPage;
