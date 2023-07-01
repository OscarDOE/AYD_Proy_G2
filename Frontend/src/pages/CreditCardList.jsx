import React from 'react';
import { Grid, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const CreditCardList = ({ creditCards }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">Lista de Tarjetas de Crédito</Typography>
      </Grid>
      <Grid item xs={12}>
        {creditCards.length > 0 ? (
          <Card variant="outlined">
            <CardContent>
              <List>
                {creditCards.map((card, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primaryTypographyProps={{ variant: 'body1' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                      primary={`Nombre: ${card.name}`}
                      secondary={`Número: ${card.cardNumber}, Fecha de vencimiento: ${card.expirationDate}, CVV: ${card.cvv}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ) : (
          <Typography>No hay tarjetas de crédito registradas.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default CreditCardList;
