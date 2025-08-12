import "./sidebar.css";
import {
  FaChalkboardTeacher,
  FaUser,
  FaUsers,
  FaTools,
  FaStore,
  FaClipboardList,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/logo.jpg" alt="Logo" className="logo-img" />
        <h1 style={{color:"white"}} >Media Pro</h1>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
          <FaChartBar className="icon" /> Tableau de bord
        </NavLink>

        <p>Utilisateurs</p>
        <NavLink to="/animateur" className={({ isActive }) => isActive ? "active" : ""}>
          <FaUser className="icon" /> Animateurs
        </NavLink>
        <NavLink to="/voix" className={({ isActive }) => isActive ? "active" : ""}>
          <FaUser className="icon" /> Voix-off
        </NavLink>
        <NavLink to="/client" className={({ isActive }) => isActive ? "active" : ""}>
          <FaUsers className="icon" /> Clients
        </NavLink>

        <p>Catalogue</p>
        <NavLink to="/service" className={({ isActive }) => isActive ? "active" : ""}>
          <FaTools className="icon" /> Services
        </NavLink>
        <NavLink to="/boutique" className={({ isActive }) => isActive ? "active" : ""}>
          <FaStore className="icon" /> Produits & Boutique
        </NavLink>
        <NavLink to="/formation" className={({ isActive }) => isActive ? "active" : ""}>
          <FaChalkboardTeacher className="icon" /> Formations & Éducation
        </NavLink>
        <NavLink to="/eval" className={({ isActive }) => isActive ? "active" : ""}>
          <FaClipboardList className="icon" /> Évaluations
        </NavLink>

        <p>Transactions</p>
        <NavLink to="/commande" className={({ isActive }) => isActive ? "active" : ""}>
          <FaClipboardList className="icon" /> Commandes
        </NavLink>
        <NavLink to="/revenu" className={({ isActive }) => isActive ? "active" : ""}>
          <FaMoneyBillWave className="icon" /> Revenus
        </NavLink>

        <p>Assistance</p>
        <NavLink to="/param" className={({ isActive }) => isActive ? "active" : ""}>
          <FaCog className="icon" /> Paramètres
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
          <FaSignOutAlt className="icon" /> Déconnexion
        </NavLink>
      </nav>
    </div>
  );
}
