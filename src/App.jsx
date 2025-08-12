import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Param from './pages/Assistance/parametre';
import Boutique from './pages/Catalogue/boutique';
import Eval from './pages/Catalogue/evaluation';
import Formation from './pages/Catalogue/formation';
import Service from './pages/Catalogue/service';
import Commande from './pages/Transaction/commande';
import Revenu from './pages/Transaction/revenu';
import Animateur from './pages/Utilisateur/animateur';
import Animateurinfo from './pages/Utilisateur/infoanim';
import Voixinfo from './pages/Utilisateur/infovoix';
import Client from './pages/Utilisateur/client';
import Voix from './pages/Utilisateur/voix';
import AjoutezAnim from './pages/Ajouter/animateur';
import Ajoutezvoix from './pages/Ajouter/voix';
import Ajoutezclient from './pages/Ajouter/client';
import GestionEvenements from './pages/Catalogue/services/event';
import GestionConseille from './pages/Catalogue/services/conseille';
import GestionPromotions from './pages/Catalogue/services/promo';
import Fonctionnaires from './pages/Catalogue/services/team';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/param" element={<Param />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/eval" element={<Eval />} />
        <Route path="/formation" element={<Formation />} />
        <Route path="/service" element={<Service />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="/revenu" element={<Revenu />} />
        <Route path="/animateur" element={<Animateur />} />
        <Route path="/animateurinfo" element={<Animateurinfo />} />
        <Route path="/client" element={<Client />} />
        <Route path="/voix" element={<Voix />} />
        <Route path="/ajouter-animateur" element={<AjoutezAnim />} />
        <Route path="/voi" element={<Voixinfo />} />
        <Route path="/ajouter-voix" element={<Ajoutezvoix />} />
        <Route path="/ajouter-client" element={<Ajoutezclient />} />
        <Route path="/services/evenements" element={<GestionEvenements />} />
        <Route path="/services/conseille" element={<GestionConseille />} />
        <Route path="/services/promotions" element={<GestionPromotions />} />
        <Route path="/services/mediapro" element={<Fonctionnaires />} />
        
      </Routes>
    </div>
  );
};

export default App;
