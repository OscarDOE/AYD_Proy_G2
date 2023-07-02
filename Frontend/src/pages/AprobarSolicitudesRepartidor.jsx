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
        { field: 'nombre', headerName: 'Nombre', width: 70 },
        { field: 'zona', headerName: 'Zona', width: 170 },
        { field: 'departamento', headerName: 'Departamento', width: 200, sortable: true },
        { field: 'municipio', headerName: 'Municipio', width: 200, sortable: true },
        {
            field: 'denyButton',
            headerName: 'Actions',
            description: 'Actions column.',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                return (
                    <Button color="success" onClick={(e) => onDenyClickUser(e, params.row)} variant="contained">
                        Aprobar
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
        let list = []
        for (let index = 0; index < respGet.length; index++) {
            list.append({
                repartidor:respGet[index].nombres,
                zona:respGet[index].zona,
                departamento:respGet[index].departamento,
                municipio:respGet[index].municipio,
            })
        }
        setRowsClientes(list);
    };

    const onDenyClickUser = async (e, row) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('estado_solicitud', false);

        const endpoint = await fetch(`${ruta_AWS}/resDesactivarU`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: usuarioLogeado.token, idUser: row.id }),
        });

        if (endpoint.status !== 400) {
            alert(`¡Cliente ${row.id} | ${row.usuario} deshabilitado!`);
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
                                        <h1>Solicitud de Repartidores</h1>
                                    </center>
                                </Item>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justifyContent="center">
                            <Grid item xs={5.5}>
                                <Item>
                                    <h3>Clientes</h3>
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
