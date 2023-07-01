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
  // Tu código actual

  const [creditCards, setCreditCards] = useState([
    {
      name: 'John Doe',
      cardNumber: '1234 5678 9012 3456',
      expirationDate: '12/24',
      cvv: '123',
    },
    {
      name: 'Jane Smith',
      cardNumber: '9876 5432 1098 7654',
      expirationDate: '06/23',
      cvv: '456',
    },
    // Agrega más objetos de tarjetas de crédito según sea necesario
  ]);
  

  useEffect(() => {
    // Simulación de carga de datos de tarjetas de crédito
    const fetchCreditCards = async () => {
      // Aquí puedes realizar una solicitud HTTP para obtener la lista de tarjetas de crédito
      // y establecerla en el estado usando setCreditCards()
      const response = await fetch('https://api.example.com/credit-cards');
      const data = await response.json();
      setCreditCards(data);
    };

    fetchCreditCards();
  }, []);

  return (
    <Grid container justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
    </Grid>
  );
};

export default Tarjets;
