import { react, useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, Button } from '@mui/material';
import Cookies from "universal-cookie"
import '../App.css'

const ruta_AWS = 'http://ec2-54-226-103-240.compute-1.amazonaws.com/'
export default function FormCreditCard() {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario a través de una solicitud HTTP
        const endpoint = await fetch(ruta_AWS + 'detallepago', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                "num": cardNumber,
                "cvv": cvv,
                "emi": "Hoi",
                "ven": expirationDate,
                "token": usuario_logeado.token,
            })
        });
        const resp_get = await endpoint.json();
        console.log(resp_get)
        // o realizar cualquier otra acción que desees con los datos del formulario
        //console.log('Datos enviados:', { name, cardNumber, expirationDate, cvv });
    };
    return (
        <form onSubmit={handleSubmit} className="credit-card-form">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Número de tarjeta"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Fecha de vencimiento"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
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
}
