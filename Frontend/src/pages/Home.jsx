import React, { useEffect, useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../styles/sHome.css'
import logo from '../logo.PNG';
import Yellows from '../Yellows.png';
import bienvenido from '../binvenido.PNG';
import Thermometer from "react-thermometer";
import { PieChart, Pie, Cell, Legend } from 'recharts';





const ruta_AWS = ''





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

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
};

const Home = () => {



    useEffect(() => { getHumedadR() }, []);
    useEffect(() => { getAguaR() }, []);
    useEffect(() => { getTExternaR() }, []);
    useEffect(() => { getTInternaR() }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getHumedadR();
            getAguaR();
            getTExternaR();
            getTInternaR();
        }, 1000);
        return () => clearInterval(interval);
      }, []);


    const [datapie1, setDataPie1] = useState(0);
    const [datapie2, setDataPie2] = useState(0);
    const [datater1, setDataTer1] = useState(0);
    const [datater2, setDataTer2] = useState(0);


    const dataPieChrt = {
        labels: ['Porcentaje', 'Resto faltante'], //partidos
        datasets: [
          {
            data: [datapie1, 100-datapie1], //valPartidos
            backgroundColor: ['#8258FA', '#00FFBF', '#B4045F','#298A08','#FACC2E'],
            hoverBackgroundColor: ['#8258FA', '#00FFBF', '#B4045F','#298A08','#FACC2E']
          }
        ]
    };

    const dataPieChrt2 = {
        labels: ['Porcentaje', 'Resto faltante'], //partidos
        datasets: [
          {
            data: [datapie2, 100-datapie2], //valPartidos
            backgroundColor: ['#B4045F','#298A08'],
            hoverBackgroundColor: ['#B4045F','#298A08']
          }
        ]
    };


    const getHumedadR = async () =>{
        const endpoint_get = await fetch(ruta_AWS+'/getHumedadR', {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        setDataPie1(resp_get.result[0].valor)
    }

    const getAguaR = async () =>{
        const endpoint_get = await fetch(ruta_AWS+'/getAguaR', {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        setDataPie2(resp_get.result[0].valor)
    }

    const getTExternaR = async () =>{
        const endpoint_get = await fetch(ruta_AWS+'/getTExternaR', {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        setDataTer1(resp_get.result[0].valor)
    }

    const getTInternaR = async () =>{
        const endpoint_get = await fetch(ruta_AWS+'/getTInternaR', {
            method: "GET"
        });
        const resp_get = await endpoint_get.json();
        setDataTer2(resp_get.result[0].valor)
    }






    //NUEVAS VARIABLES

    //TEMPERATURA:
    let value = datater1;
    let value2 = datater2;
    let color = 'blue'
    let color2 = 'blue'
    if (value > 25) {
        color = 'orange'
    }
    if (value > 35) {
        color = 'red'
    }

    if (value2 > 25) {
        color2 = 'orange'
    }
    if (value2 > 35) {
        color2 = 'red'
    }
    value2 = value2+15

    value = value + 15

    //tarta
    const [data, setData] = useState([
        { name: 'Resto', value: parseInt(datapie1) },
        { name: 'Porcentaje', value: (100-datapie1) },
    ]);
    const [data2, setData2] = useState([
        { name: 'Resto', value: datapie2 },
        { name: 'Porcentaje', value: (100-datapie2) },
    ]);


    return (

        <Box sx={{ flexGrow: 1 }}>
            {/* <ThemeProvider theme={darkTheme}>
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
                            AlChilazo
                        </Typography>


                        <Button color="inherit" component={Link} to={'/'}>Login</Button>
                        <Button color="inherit" component={Link} to={'/reportes'}>Registro</Button>


                    </Toolbar>
                </AppBar>
            </ThemeProvider> */}
            <br></br>

            <Grid container justifyContent="center" rowSpacing={2} columnSpacing={{ xs: 10, sm: 2 }} >


                <Grid item xs={2}>
                    <Item  sx={{ borderRadius: '30px', '& button': { m: 1 } }}>
                        <h3>Repartidores</h3>
                        <img src={`https://www.mutuabalear.es/verfichero.php?id=3044`} height="100"/>
                        <div style={{textAlign: 'left'}}>
                        <Typography variant="subtitle1">Los repartidores son una parte esencial de AlChilazo. <br></br> ¡Inicia sesion o Registrate si aun no lo has hecho!
                        </Typography></div>
                        <div style={{marginBottom: '10px'}}>
                        <Button component={Link} to={'/regisrepartidor'} variant="contained">Registrate</Button>
                        </div>
                        <div>
                        <Button component={Link} to={'/loginrepartidor'} variant="contained" color="success">Login</Button>
                        </div>
                        
                    </Item>
                    
                </Grid>

                <Grid item xs={6} >
                    <Item sx={{ borderRadius: '30px' }}>
                        <img src={logo} height="50"/>
                        <div style={{ marginRight: 15 + 'px'}}>
                        {/* <img src={Yellows} height="300" /> */}
                        <img src={bienvenido} height="300"/>
                        </div>

                    </Item>
                </Grid>


            </Grid>
            
            <br></br>

            <Grid container justifyContent="center" rowSpacing={2} columnSpacing={{ xs: 10, sm: 2 }} >


                <Grid item xs={6} >
                    <Item sx={{ borderRadius: '30px' }}>
                        <h3> 
                        </h3>

                        <img src={'https://img.freepik.com/free-vector/way-concept-illustration_114360-1191.jpg?w=1060&t=st=1686721139~exp=1686721739~hmac=79ed7828f07d92246c256f57da0a14afd33f6a2b66589a04da991f5a273c7409'} height="300" width="500"/>

                        <h3> 
                        </h3>
                    </Item>
                </Grid>

                


                <Grid item xs={2}>
                    <Item  sx={{ borderRadius: '30px', '& button': { m: 1 } }}>
                        <h3>Empresas</h3>
                        <img src={`https://business-review.eu/wp-content/uploads/2022/01/AdobeStock_94420693.jpeg`} height="120"/>
                        <div style={{textAlign: 'left'}}>
                        
                        <Typography variant="body1">Bienvenidos a los negocios de comida
                        que desean ofrecer sus productos.
                        <br></br> ¡Inicia sesion o Registrate!
                        </Typography></div>
                        <div style={{marginBottom: '10px'}}>
                        <Button component={Link} to={'/regisempresa'} variant="contained">Registrate</Button>
                        </div>
                        <div>
                        <Button component={Link} to={'/loginempresa'}  variant="contained" color="success">Login</Button>
                        </div>
                        
                    </Item>
                    
                </Grid>


            </Grid>
            

            <br></br>

            <Grid container style={{backgroundColor: '#1A2027' , color:'white'}} rowSpacing={2} columnSpacing={{ xs: 10, sm: 2 }} >


                        <Grid item xs={3}  >
                            <Item style={{backgroundColor: '#1A2027' , color:'white'}} >
                                <div style={{textAlign: 'justify'}}>
                                <h2>¿Quienes somos?</h2>
                                <h3>La empresa fue establecida
                                en Guatemala a inicios de este año y desde entonces la empresa busca
                                expandir sus operaciones a varias coberturas del País, mediante una
                                solución tecnológica</h3>
                                </div>  
                            </Item> 
                        </Grid>
                        <Grid item xs={3} >
                            <Item style={{backgroundColor: '#1A2027' , color:'white'}} >
                                <div style={{textAlign: 'justify'}}>
                                <h2>Equipo</h2>
                                <h3>201902663 - Oscar Daniel Oliva España <br></br>
                                201905711 - Juan Sebastian Julajuj Zelada <br></br>
                                201903767 - Carlos Estuardo	Monterroso Santos <br></br>
                                201908316 - Karen Lisbeth Morales Marroquin</h3>
                                </div>
                            </Item> 
                        </Grid>

                        <Grid item xs={3}  >
                            <Item style={{backgroundColor: '#1A2027' , color:'white'}} >
                                <div style={{textAlign: 'justify'}}>
                                <h2> Politicas de privacidad</h2>
                                <h3>Recogemos información para proporcionar los mejores servicios a todos nuestros usuarios: 
                                    desde determinar información básica, como el idioma que hablas, hasta datos más complejos, 
                                    como los anuncios que te resultarán más útiles.</h3>
                                </div>                               
                            </Item> 
                        </Grid>

                        <Grid item xs={3} >
                            <Item style={{backgroundColor: '#1A2027' , color:'white'}} >
                                <div style={{textAlign: 'justify'}}>
                                <h2> Terminos y condiciones</h2>
                                <h3>Estos Términos del Servicio reflejan la forma de trabajar de Google como empresa, las leyes por las que nos regimos 
                                    y determinados aspectos que siempre hemos creído que son ciertos. 
                                    Por ello, estos Términos del Servicio ayudan a definir la relación</h3>
                                </div>                               
                            </Item> 
                        </Grid>




            </Grid>

        </Box >
    )
}

export default Home