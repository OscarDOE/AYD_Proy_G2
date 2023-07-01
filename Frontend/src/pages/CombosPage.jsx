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


const CombosPage = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://localhost:4000'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');


    const [rows,setRows] = useState([]);
    const [rowsCombo,setRowsCombo] = useState([]);
    const [productosId,setProductosIds] = useState([]);
    const [clickedRow, setClickedRow] = useState();
    const [error, setError] = useState(null);
    const [comboNuevo, setComboNuevo] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        foto: "",
        id_empresa:null
    });

    const columnsCombos = [
      // { field: 'id', headerName: 'ID', width: 130 },
      { field: 'nombre', headerName: 'Nombre', width: 130 },
      { field: 'descripcion', headerName: 'Descripcion', width: 180 },
      { field: 'precio', headerName: 'Precio', width: 130 },
      { 
        field: 'imagen', 
        headerName: 'Imagen', 
        width: 130,
        renderCell: (params) => {

            return (
              <>
                <Avatar src={params.row.imagen} />  
                {/* .imagen hace referencia a lo que viene de la respuesta del json cuando se obtienen todos los productos */}
              </>
            );
          }
    },
    { field: 'estado', headerName: 'Estado', width: 130 }

    ];




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
            headerName: "Agregar",
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
                  Agregar
                </Button>
              );
            }
          },

      ];


      const onAcceptClickEmp = async (e,row) =>{ //CAMBIO ESTADO DE EMPRESAS-----------------------------
        e.preventDefault();
        setClickedRow(row);
        productosId.push(row.id)

      };


    useEffect(() => {getProductos()}, [] );
    useEffect(() => {getCombos()}, [] );

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

    const getCombos = async () =>{
      const endpoint = await fetch(ruta_AWS+'/ObtenerCombos', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify({"menu_id":usuario_logeado.usuario_id})
      });
      const resp_get = await endpoint.json();
      setRowsCombo(resp_get.data)
      console.log(resp_get.data)
    }

    const enviarDatos = async (e) => {

      e.preventDefault()
      const formData = new FormData();
      formData.append("nombre",comboNuevo.nombre);
      formData.append("descripcion",comboNuevo.descripcion);
      formData.append("id_empresa",usuario_logeado.usuario_id);
      formData.append("precio",comboNuevo.precio);
      formData.append("estado", "1");
      formData.append("foto",comboNuevo.foto);
      formData.append("id_productos",productosId);
      

      const endpoint = await fetch(ruta_AWS+'/NuevoCombo', {
          method: "POST",
          body:formData
      });

      const resp = await endpoint.json();
      if (endpoint.status === 400 || endpoint.status === 500){
          setError(resp.message);
      }
      else{ 
          setError(null);
          alert("¡Combo registrado correctamente!")
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
                  <center><h1>Combos</h1></center>

                </Item>
              </Grid>
            </Grid>

              <br></br>

              <Grid container justifyContent="center">
                <Grid item xs={6} >
                  <Item>
                    <h3>Registrando un nuevo Combo</h3>
                    <form className="row" onSubmit={enviarDatos}>

                        <input
                          type="text"
                          style={{
                            'marginTop': '55px',
                            'width': '100%', 'padding': '12px 20px', 'margin': '20px 0', 'box-sizing': 'border-box'
                          }}
                          placeholder="Nombre del Combo"
                          onChange={(e) => setComboNuevo({ ...comboNuevo, nombre: e.target.value })}
                          name="Agency" />

                        <input
                          type="text"
                          style={{
                            'marginTop': '55px',
                            'width': '100%', 'padding': '12px 20px', 'margin': '20px 0', 'box-sizing': 'border-box'
                          }}
                          placeholder="Descripcion del Combo"
                          onChange={(e) => setComboNuevo({ ...comboNuevo, descripcion: e.target.value })}
                          name="Brand" />

                  
                          <h3>Seleccione los productos</h3>
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



                        <input
                          type="text"
                          style={{
                            'marginTop': '55px',
                            'width': '100%', 'padding': '12px 20px', 'margin': '20px 0', 'box-sizing': 'border-box'
                          }}
                          placeholder="Precio"
                          onChange={(e) => setComboNuevo({ ...comboNuevo, precio: e.target.value })}
                          name="Badge" />

                        <input
                          type="file"
                          style={{
                            'marginTop': '55px',
                            'width': '100%'
                          }}
                          placeholder="Imagen"
                          onChange={(e) => setComboNuevo({ ...comboNuevo, foto: e.target.files[0] })}
                          name="Price" />

                      <Button type="sumbit" variant="contained">Agregar Combo</Button>
                    </form>
                  </Item>
                </Grid>
              </Grid>

            <br></br>

            <Grid container justifyContent="center" >
              <Grid item xs={6} >
                <Item>
                <div style={{ height: '100%', width: '100%' }}>
                  <DataGrid
                    // getRowId={(row) => row.nombre}
                    rows={rowsCombo}
                    columns={columnsCombos}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                  {/* clickedRow: {clickedRow ? `${clickedRow.id}` : null} */}
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

export default CombosPage