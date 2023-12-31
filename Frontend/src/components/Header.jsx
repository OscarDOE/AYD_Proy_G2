import React, { useContext, useState } from 'react'
import '../styles/sHeader.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useHistory } from 'react-router-dom';
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

const Header = () => {

    // const { logOut, getNombre, estado, isAdminIn } = useContext(AppEnvr)
    // const logOutUser = () => {
    //     logOut();
    // }

    // const [esUser, setEsUser] = useState(false)
    // const allTrue = () => {
    //     if (estado.estaLog === true && !isAdminIn()) {
    //         setEsUser(true)
    //         console.log("Si paps");
    //     }else{
    //         alert("Un momento, necesitamos que estes logueado para estas funciones")
    //     }
    // }


    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    const navigate = useNavigate();
    const handleLogOut = () => {
        navigate("/");
        cookies.remove('session')
        cookies.remove('carrito')
        cookies.remove('empresa_seleccionada')
    };
    //console.log(usuario_logeado)

    return (

        <header>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {usuario_logeado?.rol === "1" ? <Link to='/homeadmin'>AlChilazo</Link> : ""}
                            {usuario_logeado?.rol === "2" ? <Link to='/'>AlChilazo</Link> : ""}
                            {usuario_logeado?.rol === "3" ? <Link to='/perfilrepartidor'>AlChilazo</Link> : ""}
                            {usuario_logeado?.rol === "4" ? <Link to='/panelempresa'>AlChilazo</Link> : ""}
                            {usuario_logeado ? "" : <Link to='/'>AlChilazo</Link> }
                            </Typography>
                            

                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {usuario_logeado?.rol === "1" ? 
                                <>
                                <Link to='/homeadmin'><Button color="inherit">Solicitudes pendientes</Button></Link>
                                <Link to='/informeusers'><Button color="inherit">Informe</Button></Link>
                                <Link to='/reportesadmin'><Button color="inherit">Reportes</Button></Link>
                                <Link to='/desacusuarios'><Button color="inherit">Usuarios</Button></Link>
                                <Link to='/solicitudes'><Button color="inherit">Solicitudes</Button></Link>
                                </> 
                                : 
                                <></>}
                                {usuario_logeado?.rol === "2" ? 
                                <>
                                <Link to='/elegirempresa'><Button color="inherit">Nuevo pedido</Button></Link>
                                <Link to='/deliveryaddressform'><Button color="inherit">Direcciones</Button></Link>
                                <Link to='/formcreditcard'><Button color="inherit">Tarjetas</Button></Link>
                                <Link to='/historialpedidos'><Button color="inherit">Historial</Button></Link>
                                </> 
                                : 
                                <></>}
                                {usuario_logeado?.rol === "3" ? 
                                <>
                                <Link to='/perfilrepartidor'><Button color="inherit">Mi perfil</Button></Link>
                                <Link to='/deliveryaddressform'><Button color="inherit">Cambio de zona</Button></Link>
                                <Link to='/pedidosrepartidor'><Button color="inherit">Pedidos</Button></Link>
                                <Link to='/historialrepartidor'><Button color="inherit">Historial</Button></Link>
                                </> 
                                : 
                                <></>}
                                {usuario_logeado?.rol === "4" ? 
                                <>
                                <Link to='/panelempresa'><Button color="inherit">Productos</Button></Link>
                                <Link to='/combosempresa'><Button color="inherit">Combos</Button></Link>
                                <Link to='/solicitudesempresa'><Button color="inherit">Solicitudes</Button></Link>
                                <Link to='/historialempresa'><Button color="inherit">Historial</Button></Link>
                                <Link to='/masvendido'><Button color="inherit">Mas vendido</Button></Link>
                                </> 
                                : 
                                <></>}
                            </Typography>

                            {usuario_logeado ? 
                            <><Button onClick={handleLogOut} color="inherit">Log out</Button></> 
                            : 
                            <>
                            <Link to='/loginadmin'><Button color="inherit">Admin</Button></Link>
                            <Link to='/loginusers'><Button color="inherit">Login</Button></Link>
                            <Link to='/regisusers'><Button color="inherit">Registro</Button></Link>
                            </>}


                        
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
        </header>
    )
}




export default Header