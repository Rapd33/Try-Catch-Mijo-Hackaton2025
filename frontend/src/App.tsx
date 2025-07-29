import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
import Llamada from './pages/llamada';
import Register from './pages/register';
import Login from './pages/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/llamada" element={<Llamada />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

