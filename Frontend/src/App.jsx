import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Reservas from "./pages/Reservas";
import Eventos from "./pages/Eventos";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contacto from "./pages/Contacto";
import SocioDashboard from "./pages/socios/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import GestionSocios from "./pages/admin/GestionSocios";
import GestionReservas from "./pages/admin/GestionReservas";
import GestionEventos from "./pages/admin/GestionEventos";
import Configuracion from "./pages/admin/Configuracion";
import MisReservas from "./pages/socios/MisReservas";
import Perfil from "./pages/socios/Perfil";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Rutas de Socio */}
        <Route path="/socios/dashboard" element={<SocioDashboard />} />
        <Route path="/socios/mis-reservas" element={<MisReservas />} />
        <Route path="/socios/perfil" element={<Perfil />} />
        
        {/* Rutas de Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/gestion-socios" element={<GestionSocios />} />
        <Route path="/admin/gestion-reservas" element={<GestionReservas />} />
        <Route path="/admin/gestion-eventos" element={<GestionEventos />} />
        <Route path="/admin/configuracion" element={<Configuracion />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
