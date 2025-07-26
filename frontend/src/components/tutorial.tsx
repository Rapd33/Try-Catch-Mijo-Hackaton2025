// src/components/Tutorial.tsx
import { motion } from "framer-motion";

const Tutorial = () => {
  return (
    <section className="py-20 bg-blue-50" id="tutorial">
      <motion.div
        className="max-w-5xl mx-auto text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Tutorial de uso</h2>

        {/* Placeholder del video */}
        <div className="bg-gray-300 h-64 md:h-96 w-full rounded-xl shadow-inner mb-8 flex items-center justify-center">
          <p className="text-gray-600">[Aquí irá el video o imagen del tutorial]</p>
        </div>

        {/* Pasos */}
        <div className="grid gap-4 md:grid-cols-3 text-left">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-blue-600 mb-2">Paso 1</h3>
            <p>Identifica la situación que estás viviendo.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-blue-600 mb-2">Paso 2</h3>
            <p>Selecciona el modo de ayuda que prefieras (chat o llamada).</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-blue-600 mb-2">Paso 3</h3>
            <p>Interactúa y recibe el acompañamiento que necesitas.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Tutorial;
