import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import '../App.css'
import Cookies from "universal-cookie"

const DeliveryAddressForm = () => {
  const [department, setDepartment] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [zone, setZone] = useState('');

  const jsonData = [
    {
        "title" : "Alta Verapaz",
        "mun" : [
            "Chahal",
            "Chisec",
            "Cobán",
            "Fray Bartolomé de las Casas",
            "Lanquín",
            "Panzós",
            "Raxruha",
            "San Cristóbal Verapaz",
            "San Juan Chamelco",
            "San Pedro Carchá",
            "Santa Cruz Verapaz",
            "Senahú",
            "Tactic",
            "Tamahú",
            "Tucurú",
            "Santa María Cahabón",
            "Santa Catarina La Tinta"
        ]
    },
    {
        "title" :"Baja Verapaz",
        "mun" : [
            "Cubulco",
            "Granados",
            "Purulhá",
            "Rabinal",
            "Salamá",
            "San Jerónimo",
            "San Miguel Chicaj",
            "Santa Cruz El Chol"
        ]
    },
    {
        "title" :"Chimaltenango",
        "mun" : [
            "Acatenango",
            "Chimaltenango",
            "El Tejar",
            "Parramos",
            "Patzicía",
            "Patzún",
            "Pochuta",
            "San Andrés Itzapa",
            "San José Poaquil",
            "San Juan Comalapa",
            "San Martín Jilotepeque",
            "Santa Apolonia",
            "Santa Cruz Balanyá",
            "Tecpán",
            "Yepocapa",
            "Zaragoza"
        ]
    },
    {
        "title" : "Chiquimula",
        "mun" : [
            "Camotán",
            "Chiquimula",
            "Concepción Las Minas",
            "Esquipulas",
            "Ipala",
            "Jocotán",
            "Olopa",
            "Quezaltepeque",
            "San Jacinto",
            "San José La Arada",
            "San Juan Ermita"
        ]
    },
    {
        "title" : "El Progreso",
        "mun" : [
            "El Jícaro",
            "Guastatoya",
            "Morazán",
            "San Agustín Acasaguastlán",
            "San Antonio La Paz",
            "San Cristóbal Acasaguastlán",
            "Sanarate"
        ]
    },
    {
        "title" : "Escuintla",
        "mun" : [
            "Escuintla",
            "Guanagazapa",
            "Iztapa",
            "La Democracia",
            "La Gomera",
            "Masagua",
            "Nueva Concepción",
            "Palín",
            "San José",
            "San Vicente Pacaya",
            "Santa Lucía Cotzumalguapa",
            "Siquinalá",
            "Tiquisate"
        ]
    },
    {
        "title" : "Guatemala",
        "mun" : [
            "Amatitlán",
            "Chinautla",
            "Chuarrancho",
            "Fraijanes",
            "Guatemala",
            "Mixco",
            "Palencia",
            "Petapa",
            "San José del Golfo",
            "San José Pinula",
            "San Juan Sacatepéquez",
            "San Pedro Ayampuc",
            "San Pedro Sacatepéquez",
            "San Raymundo",
            "Santa Catarina Pinula",
            "Villa Canales"
        ]
    },
    {
        "title" : "Huehuetenango",
        "mun" : [
            "Aguacatán",
            "Chiantla",
            "Colotenango",
            "Concepción Huista",
            "Cuilco",
            "Huehuetenango",
            "Ixtahuacán",
            "Jacaltenango",
            "La Democracia",
            "La Libertad",
            "Malacatancito",
            "Nentón",
            "San Antonio Huista",
            "San Gaspar Ixchil",
            "San Juan Atitán",
            "San Juan Ixcoy",
            "San Mateo Ixtatán",
            "San Miguel Acatán",
            "San Pedro Necta",
            "San Rafael La Independencia",
            "San Rafael Petzal",
            "San Sebastián Coatán",
            "San Sebastián Huehuetenango",
            "Santa Ana Huista",
            "Santa Bárbara",
            "Santa Cruz Barillas",
            "Santa Eulalia",
            "Santiago Chimaltenango",
            "Soloma",
            "Tectitán",
            "Todos Santos Cuchumatan"
        ]
    },
    {
        "title" : "Izabal",
        "mun" : [
            "El Estor",
            "Livingston",
            "Los Amates",
            "Morales",
            "Puerto Barrios"
        ]
    },
    {
        "title" : "Jalapa",
        "mun" : [
            "Jalapa",
            "Mataquescuintla",
            "Monjas",
            "San Carlos Alzatate",
            "San Luis Jilotepeque",
            "San Manuel Chaparrón",
            "San Pedro Pinula"
        ]
    },
    {
        "title" : "Jutiapa",
        "mun" : [
            "Agua Blanca",
            "Asunción Mita",
            "Atescatempa",
            "Comapa",
            "Conguaco",
            "El Adelanto",
            "El Progreso",
            "Jalpatagua",
            "Jerez",
            "Jutiapa",
            "Moyuta",
            "Pasaco",
            "Quezada",
            "San José Acatempa",
            "Santa Catarina Mita",
            "Yupiltepeque",
            "Zapotitlán"
        ]
    },
    {
        "title" : "Petén",
        "mun" : [
            "Dolores",
            "Flores",
            "La Libertad",
            "Melchor de Mencos",
            "Poptún",
            "San Andrés",
            "San Benito",
            "San Francisco",
            "San José",
            "San Luis",
            "Santa Ana",
            "Sayaxché",
            "Las Cruces"
        ]
    },
    {
        "title" : "Quetzaltenango",
        "mun" : [
            "Almolonga",
            "Cabricán",
            "Cajolá",
            "Cantel",
            "Coatepeque",
            "Colomba",
            "Concepción Chiquirichapa",
            "El Palmar",
            "Flores Costa Cuca",
            "Génova",
            "Huitán",
            "La Esperanza",
            "Olintepeque",
            "Ostuncalco",
            "Palestina de Los Altos",
            "Quetzaltenango",
            "Salcajá",
            "San Carlos Sija",
            "San Francisco La Unión",
            "San Martín Sacatepéquez",
            "San Mateo",
            "San Miguel Sigüilá",
            "Sibilia",
            "Zunil"
        ]
    },
    {
        "title" : "Quiché",
        "mun" : [
            "Canillá",
            "Chajul",
            "Chicamán",
            "Chiché",
            "Chichicastenango",
            "Chinique",
            "Cunén",
            "Ixcán",
            "Joyabaj",
            "Nebaj",
            "Pachalum",
            "Patzité",
            "Sacapulas",
            "San Andrés Sajcabajá",
            "San Antonio Ilotenango",
            "San Bartolomé Jocotenango",
            "San Juan Cotzal",
            "San Pedro Jocopilas",
            "Santa Cruz del Quiché",
            "Uspantán",
            "Zacualpa"
        ]
    },
    {
        "title" : "Retalhuleu",
        "mun" : [
            "Champerico",
            "El Asintal",
            "Nuevo San Carlos",
            "Retalhuleu",
            "San Andrés Villa Seca",
            "San Felipe",
            "San Martín Zapotitlán",
            "San Sebastián",
            "Santa Cruz Muluá"
        ]
    },
    {
        "title" : "Sacatepéquez",
        "mun" : [
            "Alotenango",
            "Antigua",
            "Ciudad Vieja",
            "Jocotenango",
            "Magdalena Milpas Altas",
            "Pastores",
            "San Antonio Aguas Calientes",
            "San Bartolomé Milpas Altas",
            "San Lucas Sacatepéquez",
            "San Miguel Dueñas",
            "Santa Catarina Barahona",
            "Santa Lucía Milpas Altas",
            "Santa María de Jesús",
            "Santiago Sacatepéquez",
            "Santo Domingo Xenacoj",
            "Sumpango"
        ]
    },
    {
        "title" : "San Marcos",
        "mun" : [
            "Ayutla",
            "Catarina",
            "Comitancillo",
            "Concepción Tutuapa",
            "El Quetzal",
            "El Rodeo",
            "El Tumbador",
            "Esquipulas Palo Gordo",
            "Ixchiguan",
            "La Reforma",
            "Malacatán",
            "Nuevo Progreso",
            "Ocos",
            "Pajapita",
            "Río Blanco",
            "San Antonio Sacatepéquez",
            "San Cristóbal Cucho",
            "San José Ojetenam",
            "San Lorenzo",
            "San Marcos",
            "San Miguel Ixtahuacán",
            "San Pablo",
            "San Pedro Sacatepéquez",
            "San Rafael Pie de La Cuesta",
            "San Sibinal",
            "Sipacapa",
            "Tacaná",
            "Tajumulco",
            "Tejutla"
        ]
    },
    {
        "title" : "Santa Rosa",
        "mun" : [
            "Barberena",
            "Casillas",
            "Chiquimulilla",
            "Cuilapa",
            "Guazacapán",
            "Nueva Santa Rosa",
            "Oratorio",
            "Pueblo Nuevo Viñas",
            "San Juan Tecuaco",
            "San Rafael Las Flores",
            "Santa Cruz Naranjo",
            "Santa María Ixhuatán",
            "Santa Rosa de Lima",
            "Taxisco"
        ]
    },
    {
        "title" : "Sololá",
        "mun" : [
            "Concepción",
            "Nahualá",
            "Panajachel",
            "San Andrés Semetabaj",
            "San Antonio Palopó",
            "San José Chacaya",
            "San Juan La Laguna",
            "San Lucas Tolimán",
            "San Marcos La Laguna",
            "San Pablo La Laguna",
            "San Pedro La Laguna",
            "Santa Catarina Ixtahuacan",
            "Santa Catarina Palopó",
            "Santa Clara La Laguna",
            "Santa Cruz La Laguna",
            "Santa Lucía Utatlán",
            "Santa María Visitación",
            "Santiago Atitlán",
            "Sololá"
        ]
    },
    {
        "title" : "Suchitepéquez",
        "mun" : [
            "Chicacao",
            "Cuyotenango",
            "Mazatenango",
            "Patulul",
            "Pueblo Nuevo",
            "Río Bravo",
            "Samayac",
            "San Antonio Suchitepéquez",
            "San Bernardino",
            "San Francisco Zapotitlán",
            "San Gabriel",
            "San José El Idolo",
            "San Juan Bautista",
            "San Lorenzo",
            "San Miguel Panán",
            "San Pablo Jocopilas",
            "Santa Bárbara",
            "Santo Domingo Suchitepequez",
            "Santo Tomas La Unión",
            "Zunilito"
        ]
    },
    {
        "title" : "Totonicapán",
        "mun" : [
            "Momostenango",
            "San Andrés Xecul",
            "San Bartolo",
            "San Cristóbal Totonicapán",
            "San Francisco El Alto",
            "Santa Lucía La Reforma",
            "Santa María Chiquimula",
            "Totonicapán"
        ]
    },
    {
        "title" : "Zacapa",
        "mun" : [
            "Cabañas",
            "Estanzuela",
            "Gualán",
            "Huité",
            "La Unión",
            "Río Hondo",
            "San Diego",
            "Teculután",
            "Usumatlán",
            "Zacapa"
        ]
    }
]

const [selectedTitle, setSelectedTitle] = useState('');
const [municipios, setMunicipios] = useState([]);
const cookies = new Cookies();
const usuario_logeado = cookies.get('session');

const handleTitleChange = (e) => {
  let selectedIndex = -1;
  if(e.target.value !== "--Seleccione--"){
      jsonData.forEach((element, i) => {
          if (element.title === e.target.value) {
              selectedIndex = i;
          }
      });
      const munArray = jsonData[selectedIndex].mun;
      setSelectedTitle(jsonData[selectedIndex].title);
      setMunicipios(munArray);
      setDepartment(e.target.value)
  }   
};

const setearMuni = (e) => {
  if(department !== "--Seleccione--"){
  setMunicipality(e.target.value)
  // console.log(department)
  // console.log(e.target.value)
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a través de una solicitud HTTP
    // o realizar cualquier otra acción que desees con los datos del formulario
    //console.log('Datos enviados:', { department, municipality, zone });
    const ruta_AWS = 'http://localhost:4000/'
    
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
    if (endpoint.status === 400 || endpoint.status === 500){
    }
    else{ 
        alert("¡Datos enviados correctamente!")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="delivery-address-form">
      <Grid container spacing={2}>
      {usuario_logeado?.rol === "2" || usuario_logeado?.rol === "3"   ? 
          <>
        <Grid item xs={12}>
          <label for="password">Departamento</label>
          <select 
          style={{
            'width':'100%',
            'font-size':' 15px',
            'height': '30px',
            'padding': '5px'
          }} value={selectedTitle} onChange={handleTitleChange}>
            <option value="">-- Seleccione --</option>
            {jsonData.map((item, index) => (
              <option key={index} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>


                        
          {/* <TextField
            label="Departamento"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            fullWidth
            required
          /> */}
        </Grid>
        <Grid item xs={12}>
          <label for="password">Municipio</label>
          <select
          style={{
            'width':'100%',
            'font-size':' 15px',
            'height': '30px',
            'padding': '5px'
          }}  onChange={setearMuni}>
            <option value="">-- Seleccione --</option>
            {municipios.map((municipio, index) => (
              <option key={index} value={municipio}>
                {municipio}
              </option>
            ))}
          </select>
          {/* <TextField
            label="Municipio"
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            fullWidth
            required
          /> */}
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
            {/* -------------- termina ternario ------------------- */}
          </>
          :
          <>
            <h1>¡Cuidado! Aquí solo usuarios</h1>
          </>}
      </Grid>
    </form>
  );
};

export default DeliveryAddressForm;
