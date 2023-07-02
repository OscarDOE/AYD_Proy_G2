import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import '../App.css'
import Cookies from "universal-cookie"

const DeliveryAddressForm = () => {
  const [department, setDepartment] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [zone, setZone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a través de una solicitud HTTP
    // o realizar cualquier otra acción que desees con los datos del formulario
    //console.log('Datos enviados:', { department, municipality, zone });
    const ruta_AWS = 'http://localhost:4000/'
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    const DataSend = {
      "dep": department,
      "mun": municipality,
      "zona": zone,
      "token": usuario_logeado.token,
    }
    console.log(DataSend)
    const endpoint = await fetch(ruta_AWS + 'detalledir', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(DataSend)
    });
    const resp_get = await endpoint.json();
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
