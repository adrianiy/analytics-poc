import React from "react";
import Header from "../Header/Header";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <div className="container">{children}</div>
      </main>
      <footer className="app-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-copyright">
              © {new Date().getFullYear()} Zara Analytics. Todos los derechos
              reservados.
            </div>
            <div className="footer-links">
              <a href="#" className="footer-link">
                Privacidad
              </a>
              <a href="#" className="footer-link">
                Términos
              </a>
              <a href="#" className="footer-link">
                Ayuda
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
