import React, { useRef,useState } from 'react'
import '../styles/sRegistroRepartidor.css'
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Android } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { Alert } from '@mui/material';

const RegistroEmpresa = () => {

    const navigate = useNavigate();
    const ruta_AWS = 'http://ec2-54-226-103-240.compute-1.amazonaws.com'

    const handleNavigate = () => {
        navigate("/loginempresa");
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


    const [empresa, setEmpresa] = useState({
        nombre: "",
        descripcion: "",
        tipo: "",
        email: "",
        password: "",
        departamento:"",
        municipio:"",
        zona:"",
        imagenes:""
    })



    const handleSubmit = async (e) => {

        e.preventDefault()
        const formData = new FormData();
        formData.append("nombre",empresa.nombre);
        formData.append("descripcion",empresa.descripcion);
        formData.append("tipo",empresa.tipo);
        formData.append("email",empresa.email);
        formData.append("password",empresa.password);
        formData.append("departamento",empresa.departamento);
        formData.append("municipio",empresa.municipio);
        formData.append("zona",empresa.zona);
        formData.append("imagenes",empresa.imagenes);

        
        const endpoint = await fetch(ruta_AWS+'/registroEmpresa', {
            method: "POST",
            body:formData
        });

        // const endpoint = await fetch(ruta_AWS+'/registroEmpresa', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //       },body: JSON.stringify({
        //                 "nombre": empresa.nombre,
        //                 "descripcion": empresa.descripcion,
        //                 "email": empresa.email,
        //                 "departamento": empresa.departamento,
        //                 "municipio": empresa.municipio,
        //                 "tipo": empresa.tipo,
        //                 "password": empresa.password,
        //                 "zona":empresa.zona,
        //                 "imagenes": empresa.imagenes,
        //         })
              
        //     //   body: JSON.stringify(empresa)
        // });

 
        const resp = await endpoint.json();
        if (endpoint.status === 400 || endpoint.status === 500){
            setError(resp.message);
        }
        else{ 
            console.log('---base64---')
            console.log(empresa.imagenes)
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
            setEmpresa({ ...empresa, departamento:e.target.value })
        }   
    };

    const setearMuni = (e) => {
        if(empresa.departamento !== "--Seleccione--"){
        setEmpresa({ ...empresa, municipio:e.target.value })
        console.log(empresa.departamento)
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
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkn2G77BGQM_-dgBLY30jPpUyHjbpbRajZ3XpIVoWeApDVJwNQ6C4eDxLKQdRVuvYq7EU&usqp=CAU" alt="" />
                        </div>
                        <div class="header">
                            Completa tu informacion
                        </div>
                        <div class="element">
                            <label for="username">Nombre del negocio</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, nombre:e.target.value })} type="text" name="nombre" id="Nombre"></input>
                        </div>
                        <div class="element">
                            <label for="label">Descripcion</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, descripcion:e.target.value })}  type="text" name="usuario" id="Usuario"></input>
                        </div>

                        <div class="element">
                        <label for="lang">Categoria</label>
                        <select onChange={(e) => setEmpresa({ ...empresa, tipo:e.target.value })} name="categoria" id="lang">
                            <option value="0">--Seleccione--</option>
                            <option value="1">Restaurante</option>
                            <option value="2">Tienda de convivencia</option>
                            <option value="3">Supermercado</option>
                        </select>
                        </div>
                        <div class="element">
                            <label for="label">Email</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, email:e.target.value })}  type="text" name="email" id="Email"></input>
                        </div>
                        <div class="element">
                            <label for="label">Password</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, password:e.target.value })}  type="password" name="password" id="Password"></input>
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
                            <label for="label">Zona</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, zona:e.target.value })}  type="text" name="c_password" id="Zona"></input>
                        </div>
                        <div class="element">
                            <label for="curriculum">Documentos</label>
                            <input onChange={(e) => setEmpresa({ ...empresa, imagenes:e.target.files[0] }) } type="file" name="f_Perfil" id="fo_Perfil"></input>
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

export default RegistroEmpresa



//onChange={(e) => setEmpresa({ ...empresa, imagenes:e.target.files[0] }) }