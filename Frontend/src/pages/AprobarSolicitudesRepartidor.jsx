import React, { useState, useEffect } from 'react';
import '../styles/sHomeAdmin.css';
import Cookies from 'universal-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

const AprobarSolicitudesRepartidor = () => {
    const ruta_AWS = 'http://localhost:4000';
    const cookies = new Cookies();
    const usuarioLogeado = cookies.get('session');
    const [rowsClientes, setRowsClientes] = useState([]);

    useEffect(() => {
        getDatosCliente();
    }, []);

    const columnsCliente = [
        { field: 'id', headerName: 'Id', width: 20 },
        { field: 'repartidor', headerName: 'Nombre', width: 100 },
        { field: 'zona', headerName: 'Zona', width: 80 },
        { field: 'departamento', headerName: 'Departamento', width: 150, sortable: true },
        { field: 'municipio', headerName: 'Municipio', width: 150, sortable: true },
        {
            field: 'aprobeButton',
            headerName: 'Aprobar',
            description: 'aprobar solicitud.',
            sortable: false,
            width: 140,
            renderCell: (params) => {
                return (
                    <Button color="success" onClick={(e) => onDenyClickUser(e, params.row,1)} variant="contained">
                        Aprobar
                    </Button>
                );
            },
        },
        {
            field: 'denyButton',
            headerName: 'Denegar',
            description: 'denegar solicitud.',
            sortable: false,
            width: 140,
            renderCell: (params) => {
                return (
                    <Button color="error" onClick={(e) => onDenyClickUser(e, params.row,2)} variant="contained">
                        Denegar
                    </Button>
                );
            },
        },
    ];

    const getDatosCliente = async () => {
        const dataSend = {
             token: usuarioLogeado.token
        }
        const endpoint = await fetch(`${ruta_AWS}/solicitudCambio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataSend),
        });
        const respGet = await endpoint.json();
        setRowsClientes(respGet);
    };

    const onDenyClickUser = async (e, row,status) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('estado_solicitud', false);

        const endpoint = await fetch(`${ruta_AWS}/respuestaCambio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: usuarioLogeado.token, idaut: row.id, estado:status }),
        });

        if (endpoint.status !== 400) {
            alert(`¡Cliente ${row.id} ha sido cambiado!`);
        }
        getDatosCliente();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <div>
                {usuarioLogeado?.rol === '1' ? (
                    <>
                        <br />
                        <Grid container justifyContent="center">
                            <Grid item xs={6}>
                                <Item>
                                    <center>
                                        <h1>Solicitud cambio de direccion de repartidores </h1>
                                    </center>
                                </Item>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justifyContent="center">
                            <Grid item xs={5.5}>
                                <Item>
                                    <h3>Repartidores</h3>
                                    <div style={{ height: 400 }}>
                                        <DataGrid
                                            rows={rowsClientes}
                                            columns={columnsCliente}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                        />
                                    </div>
                                </Item>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <center>
                        <h1>¡Cuidado! Aquí solo admins</h1>
                    </center>
                )}
            </div>
        </Box>
    );
};

export default AprobarSolicitudesRepartidor;
