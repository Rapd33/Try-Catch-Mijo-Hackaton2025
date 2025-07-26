import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
import Llamada from './pages/llamada';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/llamada" element={<Llamada />} />
    </Routes>
  );
}

export default App;

