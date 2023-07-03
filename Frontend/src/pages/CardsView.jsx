import React, { useContext, useState, useEffect } from 'react';
import '../styles/sHomeAdmin.css';
import Cookies from 'universal-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import FormCreditCard from './FormCreditCard';
import CreditCardList from './CreditCardList';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

const Tarjets = () => {
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    const [creditCards, setCreditCards] = useState([
        {
            numero: '--',
            cvv: '--',
            fecha_creacion: '--',
            fecha_terminacion: '--',
            id: '--'
        },
        // Agrega más objetos de tarjetas de crédito según sea necesario
    ]);


    useEffect(() => {
        // Simulación de carga de datos de tarjetas de crédito
        const fetchCreditCards = async () => {
            const ruta_AWS = 'http://ec2-54-226-103-240.compute-1.amazonaws.com/'
            const cookies = new Cookies();
            const usuario_logeado = cookies.get('session');
            const Send = {
                token: usuario_logeado.token
            }
            const endpoint = await fetch(ruta_AWS + 'tarjeta', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(Send)
            });
            const data = await endpoint.json();
            console.log(data);
            setCreditCards(data);

        };

        fetchCreditCards();
    }, []);

    return (
        <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {usuario_logeado?.rol === "2" ? 
          <>
            {/* Tu código existente */}
            <Grid item xs={12}>
                <Item>
                    <FormCreditCard />
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <CreditCardList creditCards={creditCards} />
                </Item>
            </Grid>
            {/* -------------- termina ternario ------------------- */}
                </>
                :
                <>
                    <h1>¡Cuidado! Aquí solo usuarios</h1>
                </>}
        </Grid>
    );
};

export default Tarjets;
