import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../containers/Layout";
import RegistroRepartidor from "../pages/RegistroRepartidor";
import RegistroEmpresa    from "../pages/RegistroEmpresa";
import RegistroUsers      from "../pages/RegistroUsers";
import LoginEmpresa       from "../pages/LoginEmpresa";
import LoginRepartidores  from "../pages/LoginRepartidores";
import LoginUsers         from "../pages/LoginUser";
import HomeAdmin          from "../pages/HomeAdmin";
import LoginAdmin         from "../pages/LoginAdmion";
import PerfilRepartidor   from "../pages/MiPerfilR";
import InformeUsers       from "../pages/InformeUsers";
import PanelEmpresa       from "../pages/panel";
import CombosEmpresa      from "../pages/combos";
import CombosPage from "../pages/CombosPage";
import ReportesAdmin from "../pages/ReportesAdmin";
import DesactivarAdmin from "../pages/DesactivarAdmin";
import MostrarProductos from "../pages/MostrarProductos";
import ElegirEmpresa from "../pages/ElegirEmpresa";
import FormCreditCard from "../pages/FormCreditCard";
import ShowCarrito from "../pages/ShowCarrito";

export const App = () => {
  return (
    <BrowserRouter>
            <Layout>
                <Routes>
                <Route index element={<Home />} />
                <Route path="/desacusuarios" element={<DesactivarAdmin/>} />
                <Route path="/combosempresa" element={<CombosPage/>} />
                <Route path="/panelempresa" element={<PanelEmpresa/>} />
                <Route path="/perfilrepartidor" element={<PerfilRepartidor/>} />
                <Route path="/loginadmin" element={<LoginAdmin/>} />
                <Route path="/regisrepartidor" element={<RegistroRepartidor />} />
                <Route path="/regisempresa" element={<RegistroEmpresa />} />
                <Route path="/regisusers" element={<RegistroUsers />} />
                <Route path="/loginempresa" element={<LoginEmpresa />} />
                <Route path="/loginrepartidor" element={<LoginRepartidores />} />
                <Route path="/loginusers" element={<LoginUsers />} />
                <Route path="/homeadmin" element={<HomeAdmin />} />
                <Route path="/informeusers" element={<InformeUsers />} />
                <Route path="/reportesadmin" element={<ReportesAdmin />} />
                <Route path="/elegirproductos" element={<MostrarProductos />} />
                <Route path="/elegirempresa" element={<ElegirEmpresa />} />
                <Route path="/formcreditcard" element={<FormCreditCard />} />
                <Route path="/carrito" element={<ShowCarrito />} />
                      {/* <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/vuelos" element={<PagesVuelos />} />
                <Route path="/admin" element={<PagesAdmin/>}></Route> */}
                </Routes> 
            </Layout>
    </BrowserRouter>
  );
};