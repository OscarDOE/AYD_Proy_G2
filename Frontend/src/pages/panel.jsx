import React,{useContext,useState,useEffect} from 'react'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from "@mui/material";
import { TrendingUpOutlined } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
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
    // console.log(usuario_logeado)

    const [rows,setRows] = useState([]);
    const [rows_repartis,setRowsRepartis] = useState([]);
    const [datosperfil, setDatosperfil] = useState([]);
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [val, setVal] = useState('');
    const [tipoName, setTipoName] = useState('');
    const [tipoProductos, setTipoProductos] = useState([]);
    const [productosNuevos, setProductosNuevos] = useState({
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: "",
        foto: "",
        menu_id:null
    });




    const columns = [
        // { field: 'id', headerName: 'ID', width: 130 },
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'descripcion', headerName: 'Descripcion', width: 180 },
        { field: 'tipo_producto_id', headerName: 'Tipo de Producto', width: 130, sortable: true },
        { field: 'precio', headerName: 'Precio', width: 130 },
        { 
          field: 'foto_perfil', 
          headerName: 'Imagen', 
          width: 130,
          renderCell: (params) => {
              // console.log(params)
              return (
                <>
                  <Avatar src={params.row.imagen} />  
                  {/* .imagen hace referencia a lo que viene de la respuesta del json cuando se obtienen todos los productos */}
                </>
              );
            }
      },
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

    useEffect(() => {getProductos()}, [] );
    useEffect(() => {getTipoProductos()}, [] );

    const getProductos = async () =>{
      const endpoint = await fetch(ruta_AWS+'/ObtenerProductos', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify({"menu_id":usuario_logeado.usuario_id})
      });
      const resp_get = await endpoint.json();
      setRows(resp_get.data)

    }


    const getTipoProductos = async () =>{
      const endpoint = await fetch(ruta_AWS+'/ObtenerTipoProductos', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify({"empresa_id":usuario_logeado.usuario_id})
      });
      const resp_get = await endpoint.json();
      setTipoProductos(resp_get)

    }

    const postTipoProductos = async () =>{
      const endpoint = await fetch(ruta_AWS+'/AgregarTipoProducto', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify({"id_empresa":usuario_logeado.usuario_id, "nombre":tipoName})
      });
      const resp_get = await endpoint.json();
      console.log(tipoName)

    }

    const enviarDatos = async (e) => {

      e.preventDefault()
      const formData = new FormData();
      formData.append("nombre",productosNuevos.nombre);
      formData.append("descripcion",productosNuevos.descripcion);
      formData.append("categoria",productosNuevos.categoria);
      formData.append("precio",productosNuevos.precio);
      formData.append("foto",productosNuevos.foto);
      formData.append("menu_id",usuario_logeado.usuario_id);


      
      const endpoint = await fetch(ruta_AWS+'/AgregarProducto', {
          method: "POST",
          body:formData
      });

      const resp = await endpoint.json();
      if (endpoint.status === 400 || endpoint.status === 500){
          setError(resp.message);
      }
      else{ 
          setError(null);
          alert("¡Producto registrado correctamente!")
          getProductos()
      }
    }


  return (


    <Box sx={{ flexGrow: 1 }}>
        {usuario_logeado?.rol === "4" ?
          <>   {/* parte inicial del ternario */}

            <br></br>

            <Grid container justifyContent="center" >
              <Grid item xs={6} >
                <Item>
                  <center><h1>Bienvenido {usuario_logeado.nombre}</h1></center>
                  <center><h1>Productos</h1></center>

                </Item>
              </Grid>
            </Grid>

              <br></br>

              <Grid container justifyContent="center">
                <Grid item xs={4} >
                  <Item>
                  <form className="row1" onSubmit={postTipoProductos}>
                  <h3>Registra una categoria</h3>
                  <input
                          type="text"
                          style={{
                            'marginTop': '55px',
                            'width': '100%', 'padding': '12px 20px', 'margin': '20px 0', 'box-sizing': 'border-box'
                          }}
                          placeholder="Nombre de categoria"
                          onChange={(e) => setTipoName( e.target.value )}
                          name="Agency" />
                  <Button type="sumbit" variant="contained">Agregar categoria</Button>
                  </form>
                  </Item>
                </Grid>

                <Grid item xs={6} >
                  <Item>
                    <h3>Registrando un nuevo Producto</h3>
                    <form className="row" onSubmit={enviarDatos}>

                        <input
                          type="text"
                          style={{
                            'marginTop': '55px',
                            'width': '100%', 'padding': '12px 20px', 'margin': '20px 0', 'box-sizing': 'border-box'
                          }}
                          placeholder="Nombre del Producto"
                          onChange={(e) => setProductosNuevos({ ...productosNuevos, nombre: e.target.value })}
                          name="Agency" />

                        <input
                          type="text"
                          style={{
                            'marginTop': '55px',
                            'width': '100%', 'padding': '12px 20px', 'margin': '20px 0', 'box-sizing': 'border-box'
                          }}
                          placeholder="Descripcion del Producto"
                          onChange={(e) => setProductosNuevos({ ...productosNuevos, descripcion: e.target.value })}
                          name="Brand" />

                  
                          <h3>Tipo de Producto</h3>
                          <select
                          style={{
                            'width':'100%',
                            'font-size':' 15px',
                            'height': '30px',
                            'padding': '5px'
                          }} 
                          onChange={(e) => setProductosNuevos({ ...productosNuevos, categoria: e.target.value })} name="lenguajes" id="lang1">
                            {
                              tipoProductos.map(opt=><option>{opt}</option>)
                            }
                          </select>


                        <input
                          type="text"
                          style={{
                            'marginTop': '55px',
                            'width': '100%', 'padding': '12px 20px', 'margin': '20px 0', 'box-sizing': 'border-box'
                          }}
                          placeholder="Precio"
                          onChange={(e) => setProductosNuevos({ ...productosNuevos, precio: e.target.value })}
                          name="Badge" />

                        <input
                          type="file"
                          style={{
                            'marginTop': '55px',
                            'width': '100%'
                          }}
                          placeholder="Imagen"
                          onChange={(e) => setProductosNuevos({ ...productosNuevos, foto: e.target.files[0] })}
                          name="Price" />

                      <Button type="sumbit" variant="contained">Agregar Item</Button>
                    </form>
                  </Item>
                </Grid>
              </Grid>

            <br></br>

            <Grid container justifyContent="center" >
              <Grid item xs={6} >
                <Item>
                  <div class="tablecontainer45">
                    <div style={{ height: '100%', width: '100%' }}>
                      <DataGrid
                        // getRowId={(row) => row.nombre}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                      />
                      {/* clickedRow: {clickedRow ? `${clickedRow.id}` : null} */}
                    </div>
                  </div>
                </Item>
              </Grid>
            </Grid>




            {/* -------------- termina ternario ------------------- */}
          </>
          :
          <>
            <center><h1>¡Cuidado! Aqui solo empresas </h1></center>
          </>}

    </Box>
  )
}

export default PanelEmpresa