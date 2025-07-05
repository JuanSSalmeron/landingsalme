import React from 'react';
import ContactForm from './components/ContactForm';
import './components/LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Adidas México</h1>
        <nav>
          <a href="#products">Productos</a>
          <a href="#benefits">Beneficios</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <section className="landing-hero">
        <h2>Entrena con estilo</h2>
        <p>Diseño y rendimiento al nivel de los mejores atletas.</p>
        <button>Explora la colección</button>
      </section>

      <section id="products" className="landing-section">
        <h3>Productos más vendidos</h3>
        <div className="landing-cards">
          {[
            {
              title: 'Zapatillas Adidas ProRun',
              desc: 'Comodidad y velocidad en cada paso.',
              img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQtGfrgvi-RvDW8MhZngWlY-vM2Flyyz3RR7yJD3frewS20eVTD-heYetlJOTBPikcRsYl2xRiHVYK-z68KIZbXOidlmhucm9GSB4btbz6dclbkDU711E1L4qs',
            },
            {
              title: 'Sneakers Adidas ActiveCool',
              desc: 'Frescura y libertad de movimiento.',
              img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSWzkH83_xqIOXyO0zIeRATj2TJ1MnvNrmsxgHVCbcKM8r_z-ZtKTip1HUzolcR5-90H5JmlPwXD1dQfcKznhzfiynP-kQxeY92pVEcxfDGRr4jWwHiOG2Ifrs',
            },
            {
              title: 'Sudadera Performance Adidad',
              desc: 'Calidez sin perder estilo.',
              img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRRrBbp6IGibx0oH04is8Tfjc9cODj-hbtAOyLcRxB5Lim5x_2Ms5r4NNR8osPjpHzt5p6JmgbHG6RGElEDBfzJtoDbEsilUWdyrLQ6yY4n-2CbgN6rY1XcvA',
            },
          ].map((product, i) => (
            <div className="landing-card" key={i}>
              <img src={product.img} alt={product.title} />
              <h4>{product.title}</h4>
              <p>{product.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="benefits" className="landing-section">
  <h3 className="benefits-title">¿Por qué elegirnos?</h3>
  <div className="benefits-grid">
    <div className="benefit-card">
      <h4>Estilo urbano</h4>
      <p>Diseño moderno que se adapta dentro y fuera del deporte.</p>
    </div>
    <div className="benefit-card">
      <h4>Avalado por atletas</h4>
      <p>Probado y usado por profesionales del deporte.</p>
    </div>
    <div className="benefit-card">
      <h4>Envío express</h4>
      <p>Entrega rápida y segura en todo el país.</p>
    </div>
  </div>
</section>


      <section id="contact" className="landing-section">
        <h3>Contáctanos</h3>
        <ContactForm />
      </section>

      <footer className="landing-footer">
        &copy; 2025 Adisport. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default LandingPage;
