import React from 'react';
import { Grid, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const ShowAddress = ({ Direcciones }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">Lista de Direcciones</Typography>
      </Grid>
      <Grid item xs={12}>
        {Direcciones.length > 0 ? (
          <Card variant="outlined">
            <CardContent>
              <List>
                {Direcciones.map((direction, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primaryTypographyProps={{ variant: 'body1' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                      primary={`Departamento: ${direction.departamento}`}
                      secondary={`Municipio: ${direction.municipio}, Zona: ${direction.zona}, id: ${direction.id}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ) : (
          <Typography>No hay direcciones registradas.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ShowAddress;