// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-4 md:mb-0">
          © {new Date().getFullYear()} Try-Catch-Mijo. Todos los derechos reservados.
        </p>
        <p className="text-gray-400">
          Nos reservamos el derecho al uso y tratamiento de datos proporcionados por el usuario.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
