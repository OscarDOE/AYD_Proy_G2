import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import '../App.css'

const DeliveryAddressForm = () => {
  const [department, setDepartment] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [zone, setZone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a través de una solicitud HTTP
    // o realizar cualquier otra acción que desees con los datos del formulario
    console.log('Datos enviados:', { department, municipality, zone });
  };

  return (
    <form onSubmit={handleSubmit} className="delivery-address-form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Departamento"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Municipio"
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Zona"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DeliveryAddressForm;
