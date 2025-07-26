// src/components/Hero.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white pt-20">
      <motion.div
        className="text-center max-w-2xl px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Try-Catch-Mijo
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          Una plataforma que te acompaña para identificar, atender y resolver situaciones complejas, con ayuda emocional.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/chat">
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
              Mensajes
            </button>
          </Link>
          <Link to="/llamada">
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
              Llamadas
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
