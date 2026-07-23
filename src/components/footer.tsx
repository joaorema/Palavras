import "../css/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-bar font-mono">
      <span>© {currentYear} João Rema</span>
      <span className="footer-dot" aria-hidden="true" />
      <span>Palavras & Conexões</span>
    </footer>
  );
}

export default Footer;
