import React,{useContext,useState,useEffect} from 'react'
import '../styles/sHomeAdmin.css'
import Cookies from "universal-cookie"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { TrendingUpOutlined } from '@mui/icons-material';
//import AppEnvr from '../enviroment/AppEnvr';

const HomeAdmin = () => {
    //const { logIn, getNombre } = useContext(AppEnvr)
    const ruta_AWS = 'http://localhost:4000'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    // const link_image = usuario_logeado?.usuario_logeado.foto_perfil

    const [clickedRow, setClickedRow] = useState();
    const [rows,setRows] = useState([]);
    const [rows_repartis,setRowsRepartis] = useState([]);


    const [servicio, setServicio] = useState({
        // id_servicio_solicitado: "",
        // id_turista: usuario_logeado.usuario_logeado.id,
        // tipo_servicio:"",
        // solicitante:usuario_logeado.usuario_logeado.usuario,
        estado_solicitud: false
    })

    useEffect(() => {getDatosEmpresas()}, [] );
    useEffect(() => {getDatosRepartis()}, [] );



    const columns = [
        { field: 'usuario_id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'descripcion', headerName: 'Descripcion', width: 180 },
        { field: 'email', headerName: 'Email', width: 130, sortable: true },
        { field: 'departamento', headerName: 'Departamento', width: 130 },
        { field: 'municipio', headerName: 'Municipio', width: 130 },
        { field: 'tipo_empresa_id', headerName: 'Tipo', width: 130 },
        { field: 'estado', headerName: 'Estado soli', width: 130 },
        {
            field: "acceptButton",
            headerName: "Actions",
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
                  Aceptar
                </Button>
              );
            }
          },
          {
            field: "denyButton",
            headerName: "Actions",
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
                  Rechazar
                </Button>
              );
            }
          },
      ];

      const columns_repartidor = [
        { field: 'usuario_id', headerName: 'ID', width: 70 },
        { field: 'nombres', headerName: 'Nombres', width: 130 },
        { field: 'apellidos', headerName: 'Apellidos', width: 130 },
        { field: 'email', headerName: 'Email', width: 130, sortable: true },
        { field: 'departamento', headerName: 'Departamento', width: 130 },
        { field: 'municipio', headerName: 'Municipio', width: 130 },
        { field: 'transporte', headerName: 'Transporte', width: 130 },
        { field: 'telefono', headerName: 'Telefono', width: 130 },
        { field: 'nit', headerName: 'Nit', width: 130 },
        { field: 'calificacion', headerName: 'Calificacion', width: 130 },
        { field: 'estado', headerName: 'Estado soli', width: 130 },
        {
            field: "acceptButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="success"
                  onClick={(e) => onAcceptClickRep(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Aceptar
                </Button>
              );
            }
          },
          {
            field: "denyButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
              return (
                <Button
                  color="error"
                  onClick={(e) => onDenyClickRep(e, params.row)}
                  //onClick={deleteVuelos}
                  variant="contained"
                >
                  Rechazar
                </Button>
              );
            }
          },
      ];


      


      const getDatosEmpresas = async () =>{
        const endpoint = await fetch(ruta_AWS+'/solicitudEmp', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        console.log(JSON.stringify(resp_get))
        setRows(resp_get)
        console.log(resp_get)

        // const endpoint_get = await fetch(ruta_AWS+'/solicitudEmp', {
        //     method: "GET"
        // });
  
      }



      const getDatosRepartis = async () =>{
        const endpoint = await fetch(ruta_AWS+'/solicitudRepar', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"token":usuario_logeado.token})
        });
        const resp_get = await endpoint.json();
        setRowsRepartis(resp_get)

        // const endpoint_get = await fetch(ruta_AWS+'/solicitudRepar', {
        //     method: "GET"
        // });
        
      }


      const onAcceptClickEmp = async (e,row) =>{ //CAMBIO ESTADO DE EMPRESAS-----------------------------
        e.preventDefault();
        setClickedRow(row);
        const formdata = new FormData();
        formdata.append("estado_solicitud",true);


        // const endpoint = await fetch(ruta_AWS+`/api/solicitudes/${row.id}`, {
        //     method: "PATCH",
        //     body:formdata
        // });


        const endpoint = await fetch(ruta_AWS+`/respuestaEmp`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"resp":"1","token":usuario_logeado.token,"idUser":row.usuario_id})
        });
        if (endpoint.status != 400){
          alert("¡Empresa " + row.usuario_id + " | " + row.nombre + " aceptado!")
        }
        getDatosEmpresas()

      };

      const onDenyClickEmp = async (e,row) =>{ //CAMBIO ESTADO DE EMPRESAS-----------------------------
        e.preventDefault();
        setClickedRow(row);
        const formdata = new FormData();
        formdata.append("estado_solicitud",false);
      

        const endpoint = await fetch(ruta_AWS+`/respuestaEmp`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"resp":"0","token":usuario_logeado.token,"idUser":row.usuario_id})
        });
        if (endpoint.status != 400){
          alert("¡Empresa " + row.usuario_id + " | " + row.nombre + " denegado!")
        }

        getDatosEmpresas()
      };



      //-------------------------------- CAMBIOS ESTADO REPARTIDORES ------------

      const onAcceptClickRep = async (e,row) =>{ //CAMBIO ESTADO DE REPARTIDORES-----------------------------
        e.preventDefault();
        setClickedRow(row);
        const formdata = new FormData();
        formdata.append("estado_solicitud",true);


        const endpoint = await fetch(ruta_AWS+`/respuestaRepar`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"resp":"1","token":usuario_logeado.token,"idUser":row.usuario_id})
        });

        if (endpoint.status != 400){
          alert("¡Repartidor " + row.usuario_id + " | " + row.nombres + " aceptado!")
        }

        getDatosRepartis()

      };

      const onDenyClickRep = async (e,row) =>{ //CAMBIO ESTADO DE REPARTIDORES-----------------------------
        e.preventDefault();
        setClickedRow(row);
        const formdata = new FormData();
        formdata.append("estado_solicitud",false);
      

        const endpoint = await fetch(ruta_AWS+`/respuestaRepar`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },body: JSON.stringify({"resp":"0","token":usuario_logeado.token,"idUser":row.usuario_id})
        });

        if (endpoint.status != 400){
          alert("¡Repartidor " + row.usuario_id + " | " + row.nombres + " denegado!")
        }
        getDatosRepartis()
      };







    return (
        


        <div>
          {usuario_logeado?.rol === "1" ? 
          <>


            <div class="pCuadradoR2">
              <center><h2>Solicitudes empresas</h2></center>
            <div class = "tablecontainer45">
                <div style={{ height: 400, width: '100%' }}>
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
              <center><h2>Solicitudes repartidores</h2></center>
            <div class = "tablecontainer46">
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row.usuario_id}
                        rows={rows_repartis}
                        columns={columns_repartidor}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    {/* clickedRow: {clickedRow ? `${clickedRow.id}` : null} */}
                </div>
            </div>
            </div>
            <div class="sCuadradoR2">
                <h1>Bienvenido </h1>
                <h2>{usuario_logeado.username}</h2>
            </div>

            {/* -------------- termina ternario ------------------- */}
            </>
            :
            <>
             <center><h1>¡Cuidado! Aqui solo admins </h1></center>
            </>}

        </div>
    )
}

export default HomeAdmin