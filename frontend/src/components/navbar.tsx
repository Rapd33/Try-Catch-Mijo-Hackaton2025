// src/components/Navbar.tsx
import { Link } from "react-router-dom";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Try-Catch-Mijo</div>

        <div className="space-x-4 hidden md:flex">
          <button onClick={() => scrollToSection("hero")} className="text-gray-700 hover:text-blue-600 transition">
            Inicio
          </button>
          <button onClick={() => scrollToSection("tutorial")} className="text-gray-700 hover:text-blue-600 transition">
            Tutorial
          </button>
          <button onClick={() => scrollToSection("features")} className="text-gray-700 hover:text-blue-600 transition">
            Sobre nosotros
          </button>
        </div>

        <div className="space-x-2">
          <Link to="/chat">
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">Registrarse</button>
          </Link>
          <Link to="/llamada">
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">Iniciar sesion</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
