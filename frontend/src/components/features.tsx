// src/components/Features.tsx
import { motion } from "framer-motion";

const features = [
  {
    title: "Escucha activa",
    description: "Nuestro sistema está diseñado para brindarte una atención empática y personalizada.",
  },
  {
    title: "Disponible 24/7",
    description: "No importa la hora, siempre habrá un canal para apoyarte en el momento que lo necesites.",
  },
  {
    title: "100% confidencial",
    description: "Tu privacidad es nuestra prioridad. Toda la comunicación está protegida y encriptada.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white" id="features">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          ¿Por qué usar Try-Catch-Mijo?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="bg-blue-200 text-blue-800 w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <button className="text-blue-600 font-medium hover:underline">Ver más</button>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
