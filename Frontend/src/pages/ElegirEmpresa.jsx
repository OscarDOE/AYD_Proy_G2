import React, { useContext, useState, useEffect } from 'react'
import Cookies from "universal-cookie"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';




const ElegirEmpresa = () => {

    const ruta_AWS = 'http://ec2-54-226-103-240.compute-1.amazonaws.com'
    const cookies = new Cookies();
    const navigate = useNavigate();
    const usuario_logeado = cookies.get('session');
    console.log(usuario_logeado);
    // console.log('empresa cookies')
    // console.log(cookies.get('empresa_seleccionada'))


    const [empresas, setEmpresas] = useState([]);
    const [empresaSelected, setEmpresaSelected] = useState([]);
    const [carrito, setCarrito] = useState([]);
 
    const getEmpresas = async () =>{
        const endpoint = await fetch(ruta_AWS+'/empresas', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setEmpresas(resp_get)
      
    }


    const agregarEmpresa = (empresa) => {
        alert('¡Empresa ' + empresa.nombre + ' seleccionada!')
        setEmpresaSelected(empresa)
        cookies.set('empresa_seleccionada', empresa)
        cookies.set('carrito', [])
        navigate("/elegirproductos");
    }


    useEffect(() => {getEmpresas()}, [] );

    return (
        <Box sx={{ flexGrow: 1, marginTop: 5 }} >
            {usuario_logeado?.rol === "2" ?
                <>
                    <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                        {
                            empresas.map((empresa, index) => (
                                <Grid item xs={2.5} key={index} sx={{ margin: 2 }}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={empresa.imagenes}
                                            title="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {empresa.nombre}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {empresa.descripcion}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>

                                            <Button onClick={() => (agregarEmpresa(empresa))} sx={{ margin: 'auto' }} variant="contained" color="success">
                                                Seleccionar
                                            </Button>

                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        }
                        <Grid item xs={6}>

                        </Grid>


                    </Grid>

                    {/* -------------- termina ternario ------------------- */}
                </>
                :
                <>
                    <h1>¡Cuidado! Aquí solo usuarios</h1>
                </>}
        </Box>

    )
}


export default ElegirEmpresa
