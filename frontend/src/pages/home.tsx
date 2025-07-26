import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Tutorial from "../components/tutorial";
import Features from "../components/features";
import Footer from "../components/footer";

function Home() {
  return (
    <div className="bg-white text-gray-900 scroll-smooth">
      <Navbar />
      <section id="hero"><Hero /></section>
      <section id="tutorial"><Tutorial /></section>
      <section id="features"><Features /></section>
      <Footer />
    </div>
  );
}

export default Home;
