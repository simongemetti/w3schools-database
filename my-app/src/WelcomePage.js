import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Willkommen zu meinem React-Projekt!</h1>
      <p style={styles.paragraph}>
        Hier können Sie Kunden verwalten, Kategorien anzeigen und Produkte durchsuchen.
      </p>
      <p style={styles.paragraph}>
        Klicken Sie auf die Links oben, um verschiedene Funktionen auszuprobieren.
      </p>
      <Link to="/customers" style={styles.button}>Jetzt loslegen</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '700px',
    margin: '50px auto',
    color: '#333',
  },
  heading: {
    fontSize: '42px',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '15px',
  },
  button: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '12px 24px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#3498db',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
};

export default WelcomePage;
