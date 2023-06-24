import React,{useContext,useState,useEffect} from 'react'
import '../styles/sHomeAdmin.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from "@mui/material";
import { TrendingUpOutlined } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
//import AppEnvr from '../enviroment/AppEnvr';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));


const PanelEmpresa = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://localhost:4000'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');

    const [rows,setRows] = useState([]);
    const [rows_repartis,setRowsRepartis] = useState([]);
    const [datosperfil, setDatosperfil] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productosNuevos, setProductosNuevos] = useState({
        nombre: "",
        descripcion: "",
        tipo: "",
        precio: "",
        imagen: "",
    });




    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'descripcion', headerName: 'Descripcion', width: 180 },
        { field: 'tipoProducto', headerName: 'Tipo de Producto', width: 130, sortable: true },
        { field: 'precio', headerName: 'Precio', width: 130 },
        { field: 'imagen', headerName: 'Imagen', width: 130 },
        {
            field: "acceptButton",
            headerName: "Editar",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="success"
                  onClick={(e) => onAcceptClickEmp(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Editar
                </Button>
              );
            }
          },
          {
            field: "denyButton",
            headerName: "Eliminar",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="error"
                  onClick={(e) => onDenyClickEmp(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Eliminar
                </Button>
              );
            }
          },
      ];


      const onAcceptClickEmp = async (e,row) =>{ //CAMBIO ESTADO DE EMPRESAS-----------------------------


      };

      const onDenyClickEmp = async (e,row) =>{ //CAMBIO ESTADO DE EMPRESAS-----------------------------


      };


    // useEffect(() => {getDatosRepartidor()}, [] );

    // const getDatosRepartidor = async () =>{

    //   const endpoint = await fetch(ruta_AWS+'/miPerfil', {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },body: JSON.stringify({"token":usuario_logeado.token})
    //   });
    //   const resp_get = await endpoint.json();
    //   console.log(resp_get[0])
    //   setDatosperfil(resp_get[0])
    // }
    

    const handleInputChange = (event) => {
        // // console.log(event.target.name)
        // // console.log(event.target.value)
        // setDatos({
        //     ...datos,
        //     [event.target.name] : event.target.value
        // })
    }

    const enviarDatos = (event) => {
        // console.log("---------")
        // event.preventDefault()
        
        // console.log('enviando datos...' + datos.name + ' ' + datos.usuario+ ' ' + datos.email + ' ' + datos.image + ' ' + datos.password + ' ' + datos.confirmP)
        // fetch(`http://${process.env.REACT_APP_PUERTO}:5000/autos`,{
        //     method: 'POST',
        //     headers: {
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify(datos)
        // })
        // alert("Auto Registrado Correctamente")
        // cambiarpagina()
    }


    return (
        

      <Box sx={{ flexGrow: 1 }}> 
        <div>       


            <br></br>
            <div class="pCuadradoR2">
              <center><h1>Productos</h1></center>

              <h3>Registrando un nuevo Producto</h3>
            <div className='App-header'>
                <div className='Cuadrado-central'>

                    <form className="row" onSubmit={enviarDatos}>
                        <div className="col-md-3">
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Nombre del Producto" 
                                onChange={handleInputChange} 
                                name="Agency" />
                        </div>
                        <div className="col-md-3">
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Descripcion del Producto" 
                                onChange={handleInputChange} 
                                name="Brand" />
                        </div>
                        <br/>
                        <div className='row-md-3'>
                            <div>

                                <h3>Tipo de Producto</h3>
                                    <select name="lenguajes" id="lang1">
                                <option value="S">--Seleccione--</option>
                                <option value="1">Desayuno</option>
                                <option value="2">Almuerzo</option>
                                <option value="3">Cena</option>
                                <option value="4">Bebidas</option>
                                <option value="5">Postres</option>
                        </select>
                                
                            </div>
                        </div>
                        <div>
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Precio" 
                                onChange={handleInputChange} 
                                name="Badge" />
                        </div>
                        <div className="col-md-3">
                            <input 
                                type="file" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Imagen" 
                                onChange={handleInputChange} 
                                name="Price" />
                        </div>
                        <Button type="sumbit" variant="contained">Agregar Item</Button>
                    </form>
                </div>
            </div>

              <center>  <Stack spacing={2} direction="row">
            </Stack></center>
            <div class = "tablecontainer45">
                <div style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row.usuario_id}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    {/* clickedRow: {clickedRow ? `${clickedRow.id}` : null} */}
                </div>
            </div>
            

            </div>



        </div>
        </Box>
    )
}

export default PanelEmpresa