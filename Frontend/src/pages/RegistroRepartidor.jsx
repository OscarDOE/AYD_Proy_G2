import React, { repartidoref,useState } from 'react'
import '../styles/sRegistroRepartidor.css'
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Android } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { Alert } from '@mui/material';

const RegistroRepartidor = () => {

    const navigate = useNavigate();
    const ruta_AWS = 'http://ec2-54-226-103-240.compute-1.amazonaws.com'

    const handleNavigate = () => {
        navigate("/loginrepartidor");
    };


    const [value, setValue] = useState(false);
    const [error, setError] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [municipios, setMunicipios] = useState([]);

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




    const [repartidor, setRepartidor] = useState({
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        departamento: "",
        municipio:"",
        transporte: "",
        licencia: "",
        nit: "",
        password:"",
        hoja_vida: ""
    })

    const handleSubmit = async (e) => {

        e.preventDefault()
        const formData = new FormData();
        formData.append("nombres",repartidor.nombres);
        formData.append("apellidos",repartidor.apellidos);
        formData.append("correo",repartidor.correo);
        formData.append("telefono",repartidor.telefono);
        formData.append("departamento",repartidor.departamento);
        formData.append("municipio",repartidor.municipio);
        formData.append("transporte",repartidor.transporte);
        formData.append("licencia",repartidor.licencia);
        formData.append("nit",repartidor.nit);
        formData.append("password",repartidor.password);
        formData.append("hoja_vida",repartidor.hoja_vida);


        const endpoint = await fetch(ruta_AWS+'/registroRepar', {
            method: "POST",
            body:formData
        });

        const resp = await endpoint.json();
        if (endpoint.status === 400 || endpoint.status === 500){
            setError(resp.message);
        }
        else{ 
            setError(null);
            alert("¡Registrado correctamente!")
            handleNavigate()
        }
        
        };

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
                setRepartidor({ ...repartidor, departamento:e.target.value })
            }   
        };

        const setearMuni = (e) => {
            if(repartidor.departamento !== "--Seleccione--"){
            setRepartidor({ ...repartidor, municipio:e.target.value })
            console.log(repartidor.departamento)
            console.log(e.target.value)
            }
        };




    return (
        <div>
            <div class="popup-overlay"></div>
            <div class="popups">
                <form action="/" class="form2" onSubmit={handleSubmit}>
                    <div class="form">
                        <div class="avatar">
                            <img src="https://static.vecteezy.com/system/resources/previews/012/665/408/original/delivery-and-courier-motorbike-logo-free-vector.jpg" alt="" />
                        </div>
                        <div class="header">
                            Completa tu informacion
                        </div>
                        <div class="element">
                            <label for="repartidorname">Nombre</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, nombres:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>
                        <div class="element">
                            <label for="password">Apellido</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, apellidos:e.target.value })}  type="text" name="usuario" id="Usuario"></input>
                        </div>
                        <div class="element">
                            <label for="password">Email</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, correo:e.target.value })}  type="text" name="email" id="Email"></input>
                        </div>
                        <div class="element">
                            <label for="label">Password</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, password:e.target.value })}  type="password" name="password" id="Password"></input>
                        </div>
                        <div class="element">
                        <label for="password">Departamento</label>
                            <select value={selectedTitle} onChange={handleTitleChange}>
                                <option value="">-- Seleccione --</option>
                                {jsonData.map((item, index) => (
                                    <option key={index} value={item.title}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div class="element">
                            <label for="password">Municipio</label>
                            <select onChange={setearMuni}>
                            <option value="">-- Seleccione --</option>
                                {municipios.map((municipio, index) => (
                                    <option key={index} value={municipio}>
                                        {municipio}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div class="element">
                            <label for="password">Telefono</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, telefono:e.target.value })}  type="text" name="c_password" id="Telefono"></input>
                        </div>
                        <div class="element">
                            <label for="password">NIT</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, nit:e.target.value })}  type="text" name="c_password" id="Nit"></input>
                        </div>
                        <div class="element">
                        <label for="lang">Tipo de licencia</label>
                        <select onChange={(e) => setRepartidor({ ...repartidor, licencia:e.target.value })}  name="lenguajes" id="lang1">
                            <option value="S">--Seleccione--</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="M">M</option>
                            <option value="NA">NA</option>
                        </select>
                        </div>
                        <div class="element">
                        <label for="lang">Motocicleta propio</label>
                        <select onChange={(e) => setRepartidor({ ...repartidor, transporte:e.target.value })} name="lenguajes" id="lang2">
                            <option value="S">--Seleccione--</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                        </div>
                        {/* <div class="element">
                            
                            <FormControlLabel control={<Checkbox  onChange={(event)=>setValue(event.target.checked)} />} label="Motocicleta propia" />
                            
                        </div> */}
                        <div class="element">
                            <label for="curriculum">CV</label>
                            <input onChange={(e) => setRepartidor({ ...repartidor, hoja_vida:e.target.files[0] })}  type="file" name="f_Perfil" id="fo_Perfil"></input>
                        </div>
                        <div class="element">
                            {/* <button onClick={()=>console.log(value)} type="submit">Registrar</button> */}
                            <button type="submit" >Registrar</button>
                        </div>
                    </div>
                </form>
                {error ? <Alert variant="filled" severity="error">{error}</Alert> : ""}
            </div>
        </div>
    )
}

export default RegistroRepartidor


// onChange={(e) => setRepartidor({ ...repartidor, hoja_vida:e.target.files[0] })}