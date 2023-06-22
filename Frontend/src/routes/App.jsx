import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../containers/Layout";
import RegistroRepartidor from "../pages/RegistroRepartidor";
import RegistroEmpresa from "../pages/RegistroEmpresa";
import RegistroUsers from "../pages/RegistroUsers";
import LoginEmpresa from "../pages/LoginEmpresa";
import LoginRepartidores from "../pages/LoginRepartidores";
import LoginUsers from "../pages/LoginUser";
import HomeAdmin from "../pages/HomeAdmin";
import LoginAdmin from "../pages/LoginAdmion";
import PerfilRepartidor from "../pages/MiPerfilR";
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import PagesVuelos from "../pages/PagesVuelos";
// import PagesAdmin from "../pages/PagesAdmin";
export const App = () => {
  return (
    <BrowserRouter>
            <Layout>
                <Routes>
                <Route index element={<Home />} />
                <Route path="/perfilrepartidor" element={<PerfilRepartidor/>} />
                <Route path="/loginadmin" element={<LoginAdmin/>} />
                <Route path="/regisrepartidor" element={<RegistroRepartidor />} />
                <Route path="/regisempresa" element={<RegistroEmpresa />} />
                <Route path="/regisusers" element={<RegistroUsers />} />
                <Route path="/loginempresa" element={<LoginEmpresa />} />
                <Route path="/loginrepartidor" element={<LoginRepartidores />} />
                <Route path="/loginusers" element={<LoginUsers />} />
                <Route path="/homeadmin" element={<HomeAdmin />} />
                      {/* <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/vuelos" element={<PagesVuelos />} />
                <Route path="/admin" element={<PagesAdmin/>}></Route> */}
                </Routes> 
            </Layout>
    </BrowserRouter>
  );
};