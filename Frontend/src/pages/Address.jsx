import React, { useContext, useState, useEffect } from 'react';
import '../styles/sHomeAdmin.css';
import Cookies from 'universal-cookie';
import { Grid, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import DeliveryAddressForm from './DeliveryAddressForm';
import ShowAddress from './ShowAddress';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

const Address = () => {
    const [directions, setDirections] = useState([
        {
            departamento: '--',
            municipio: '--',
            zona: '--',
            id: '--'
        },
    ]);
    useEffect(() => {
        // Simulación de carga de datos de tarjetas de crédito
        const fetchAddress = async () => {
            const ruta_AWS = 'http://ec2-54-226-103-240.compute-1.amazonaws.com/'
            const cookies = new Cookies();
            const usuario_logeado = cookies.get('session');
            const Send = {
                token: usuario_logeado.token
            }
            const endpoint = await fetch(ruta_AWS + 'direccion', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(Send)
            });
            const data = await endpoint.json();
            console.log(data);
            setDirections(data);
        };

        fetchAddress();
    }, []);

    return (
        <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* Tu código existente */}
            <Grid item xs={12}>
                <Item>
                    <DeliveryAddressForm />
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <ShowAddress Direcciones={directions} />
                </Item>
            </Grid>
        </Grid>
    );
};

export default Address;
