const supertest = require('supertest')
const app = require('../src/app')
const fs = require('fs')
const path = require('path')
const mysqlConnection = require('../src/database/db')


beforeAll(async () => {
    if (process.env.NODE_ENV === "test") {
        // console.log('Clean data tests');
        
        mysqlConnection.query('CALL borrarycrear();', function (err, result) {
            if (err) console.error( err);
            // console.log("Database cleaned"+result);
        });
    }else{
        // console.log('Test can run only in NODE_ENV=`test` enviroment');
        process.exit(0);
    }
});

afterAll(async () => {
    // console.log('Closing DB connection');
    mysqlConnection.destroy();
});

const token = {
    'token':`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbCI6ImNsaWVudGUiLCJpYXQiOjE2ODgyNDI3MjB9.s0Em4t-MEXRPtPMzuJYT8aYfPgbYv1-97o0vDGk_PdM
    `
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sIjoiYWRtaW4iLCJpYXQiOjE2ODgzMDE0NTR9.zZsyY4hLY2KGyPxHLgitt6PjLT-Pc7XW0yB7DLyOPQA
const crearEmpresa = {
    'nombre':"empresa1",
    'descripcion':"EMPRESA DE PRUEBA1",
    'email':"prueba@mail.com",
    'departamento':"Guatemala",
    'municipio':"Guatemala",
    'zona':"1",
    'tipo':"1",
    'password':"123",
    'file':'file'
}
const crearEmpresa2 = {
    'nombre':"empresa1",
    'descripcion':"EMPRESA DE PRUEBA1",
    'email':"emp2@mail.com",
    'departamento':"Guatemala",
    'municipio':"Guatemala",
    'zona':"1",
    'tipo':"1",
    'password':"123",
    'file':'file'
}
const crearRepartidor = {
    'nombres':"Siri",
    'apellidos':"Reyes",
    'correo':"repartidor@mail.com",
    'telefono':'12345678',
    'departamento':"Guatemala",
    'municipio':"Guatemala",
    'zona':"1",
    'licencia':'A',
    'transporte':"1",
    'nit':"123456789",
    'password':"123",
    'file':'file'
}
const crearRepartidor2 = {
    'nombres':"Siri",
    'apellidos':"Reyes",
    'correo':"rep2@mail.com",
    'telefono':'12345678',
    'departamento':"Guatemala",
    'municipio':"Guatemala",
    'zona':"1",
    'licencia':'A',
    'transporte':"1",
    'nit':"123456789",
    'password':"123",
    'file':'file'
}

const loginAdminjson = {
    'username':'admin',
    'password':"123"
}
const loginAdminjsonmaluser = {
    'username':'adminnnn',
    'password':"123"
}
const loginAdminjsonmalpass = {
    'username':'admin',
    'password':"12345"
}

let logeado = {
    'usuario_id': '444',
    'id': '010101',
    'usuario': 'admususususuin',
    'password': 'ppppppp',
    'token': 'tttttt',
    'rol': '100'
}

let respuestahomeadmin = {
    'resp': '444',
    'token': logeado,
    'idUser': '100'
}
let token_actual = '';
let token_actual_erroneo = '1';
let token_admin = ''
let token_empresa = ''
let token_cliente = ''
let token_repartidor_prueba = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInJvbCI6InJlcGFydGlkb3IiLCJpYXQiOjE2ODgyNjE0MDB9.QNmcciHgZpJRUWd1sEYXBzCKg6hN9jxf6RFv_iuXjr0' 
let token_errornoid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiIsInJvbCI6IiIsImlhdCI6MTY4ODI2MTQwMH0.ctC8EHiBz3FD16VE_8JB6KU1iM5k9L5qH8f_cXmwjp0'
let token_repartidor_quemado = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sIjoicmVwYXJ0aWRvciIsImlhdCI6MTY4ODI2MTQwMH0.yBww3SB_rU8ZUsfiM9i1zr7b3sHrmCDJ8B0hF1WK_fs'
let token_empresa_quemado = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sIjoiZW1wcmVzYSIsImlhdCI6MTY4ODI2MTQwMH0.fkLXJlPIYJzStctSx0QYbdTAFQ8Jx_lPPR5oVxZ1X3M'


const solicitudEmp = {
    'token':token.token,
    'password':"123"
}

const loginEmpresa = {
    'username':'prueba@mail.com',
    'password':'123'
}
const loginEmpresa2 = {
    'username':'emp2@mail.com',
    'password':'123'
}
const loginEmpresamaluser = {
    'username':'em@mail.com',
    'password':'123'
}
const loginEmpresamalpass = {
    'username':'emp2@mail.com',
    'password':'123456'
}

const tipo_producto = {
    'nombre':'Producto de prueba',
    'id_empresa':'2'
}
const tipo_producto_error = {
    'nombre':'Producto de prueba',
    'id_empresa':'HOLA'
}
const tipo_producto_nonombre = {
    'id_empresa':'2'
}
const obtener_tipo_producto_nonombre = {
    'empresa_id':'2'
}


const agregarProducto = {
    'nombre':"nombre",
    'precio':"100",
    'descripcion':"Producto de prueba",
    'categoria':"Producto de prueba",
    'menu_id':"1",
    'foto':'foto'
}
const agregarProductoBueno = {
    'nombre':"nombre",
    'precio':"100",
    'descripcion':"Producto de prueba",
    'categoria':"Producto de prueba",
    'menu_id':'2',
    'foto':'foto'
}
const agregarProductonoBD = {
    'nombre':"alitas locas",
    'precio':"precio",
    'descripcion':"Producto de prueba",
    'categoria':"Producto de prueba",
    'menu_id':"0",
    'file':'file'
}
const ObtenerProductobien = {
    'menu_id':"2",
}
const ObtenerProductoerror = {
}
const NuevoCombo = {
    'nombre':'nuevo combo',
    'precio':'100',
    'descripcion':'NUEVO NUEVO COMBO',
    'estado':'1',
    'id_empresa':'2',
    'id_productos':['1,1']
}
const obtenercomboserror = {
    'id_empresa':'2'
}
const obtenercombos = {
    'menu_id':'2'
}
const createUser = {
    'username':'cliente1',
    'password':"123"
}
let respuestamenu = {
    'resp': '444',
    'token': logeado,
    'idEmp':'123'
}
let respuestadesactivar = {
    'resp': '444',
    'token': logeado,
    'idUser':'123'
}
let respuestadesactivar_noUser = {
    'resp': '444',
    'token': logeado,
}

const filePathe = path.resolve(__dirname, './empresa.jpg');
const filePathc = path.resolve(__dirname, './cliente.jpg');
const filePathr = path.resolve(__dirname, './repartidor.jpg');
const filePathp = path.resolve(__dirname, './producto.jpg');
const filePathp2 = path.resolve(__dirname, './Clustering.png');
const filePathcombo = path.resolve(__dirname, './combo.jpg');
// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}
const fileContent64e = base64_encode(filePathe);
const fileContent64c = base64_encode(filePathc);
const fileContent64r = base64_encode(filePathr);
const fileContent64p = base64_encode(filePathp);
const fileContent64combo = base64_encode(filePathcombo);
// const fileContent = fs.readFileSync(filePath);
describe(" AYD-G2 - Test de AlChilazo", () => {
    test('Obtener Ruta principal', async () =>{
        const response = await supertest(app).get('/');
        expect(response.statusCode).toBe(200);
    })
    test('Crear Empresa', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroEmpresa')
        .field('nombre', crearEmpresa.nombre)
        .field('descripcion', crearEmpresa.descripcion)
        .field('email', crearEmpresa.email)
        .field('departamento', crearEmpresa.departamento)
        .field('municipio', crearEmpresa.municipio)
        .field('zona', crearEmpresa.zona)
        .field('tipo', crearEmpresa.tipo)
        .field('password', crearEmpresa.password)
        .attach('imagenes', filePathe,'empresa.jpg');
        expect(response.statusCode).toBe(200);
    })
    test('Crear Empresa 2', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroEmpresa')
        .field('nombre', crearEmpresa.nombre)
        .field('descripcion', crearEmpresa.descripcion)
        .field('email', 'emp2@mail.com')
        .field('departamento', crearEmpresa.departamento)
        .field('municipio', crearEmpresa.municipio)
        .field('zona', crearEmpresa.zona)
        .field('tipo', crearEmpresa.tipo)
        .field('password', crearEmpresa.password)
        .attach('imagenes', filePathe,'empresa.jpg');
        expect(response.statusCode).toBe(200);
    })
    test('Crear Empresa ERROR 500', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroEmpresa')
        .field('nombre', crearEmpresa.nombre)
        .field('descripcion', crearEmpresa.descripcion)
        .field('email', 'empsss2@mail.com')
        .field('departamento', crearEmpresa.departamento)
        .field('municipio', crearEmpresa.municipio)
        .field('zona', 'HOLA')
        .field('tipo', 'JOJOJO')
        .field('password', crearEmpresa.password)
        .attach('imagenes', filePathe,'empresa.jpg');
        expect(response.statusCode).toBe(500);
    })
    test('Crear Empresa sin imagenes', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroEmpresa')
        .field('nombre', crearEmpresa.nombre)
        .field('descripcion', crearEmpresa.descripcion)
        .field('email', crearEmpresa.email)
        .field('departamento', crearEmpresa.departamento)
        .field('municipio', crearEmpresa.municipio)
        .field('zona', crearEmpresa.zona)
        .field('tipo', crearEmpresa.tipo)
        .field('password', crearEmpresa.password)
        .attach('img', filePathe,'empresa.jpg');
        expect(response.statusCode).toBe(500);
    })
    test('Crear Empresa Repetida', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroEmpresa')
        .field('nombre', crearEmpresa.nombre)
        .field('descripcion', crearEmpresa.descripcion)
        .field('email', crearEmpresa.email)
        .field('departamento', crearEmpresa.departamento)
        .field('municipio', crearEmpresa.municipio)
        .field('zona', crearEmpresa.zona)
        .field('tipo', crearEmpresa.tipo)
        .field('password', crearEmpresa.password)
        .attach('imagenes', filePathe,'empresa.jpg');
        expect(response.statusCode).toBe(500);
    })
    test('Crear Empresa falta password', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroEmpresa')
        .field('nombre', crearEmpresa.nombre)
        .field('descripcion', crearEmpresa.descripcion)
        .field('email', crearEmpresa.email)
        .field('departamento', crearEmpresa.departamento)
        .field('municipio', crearEmpresa.municipio)
        .field('zona', crearEmpresa.zona)
        .field('tipo', crearEmpresa.tipo)
        .attach('imagenes', filePathe,'empresa.jpg');
        expect(response.statusCode).toBe(400);
    })
    test('Crear empresa email mal escrito', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroEmpresa')
        .field('nombre', crearEmpresa.nombre)
        .field('descripcion', crearEmpresa.descripcion)
        .field('email', 'email')
        .field('departamento', crearEmpresa.departamento)
        .field('municipio', crearEmpresa.municipio)
        .field('zona', crearEmpresa.zona)
        .field('tipo', crearEmpresa.tipo)
        .field('password', crearEmpresa.password)
        .attach('imagenes', filePathe,'empresa.jpg');
        expect(response.statusCode).toBe(400);
    })
    test('Crear empresa email mal escrito', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroEmpresa')
        .field('nombre', crearEmpresa.nombre)
        .field('descripcion', crearEmpresa.descripcion)
        .field('email', 'email')
        .field('departamento', crearEmpresa.departamento)
        .field('municipio', crearEmpresa.municipio)
        .field('zona', crearEmpresa.zona)
        .field('tipo', crearEmpresa.tipo)
        .field('password', crearEmpresa.password)
        .attach('imagenes', filePathe,'empresa.jpg');
        expect(response.statusCode).toBe(400);
    })
    test('Crear Repartidor', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroRepar')
        .field('nombres', crearRepartidor.nombres)
        .field('apellidos', crearRepartidor.apellidos)
        .field('correo', crearRepartidor.correo)
        .field('telefono', crearRepartidor.telefono)
        .field('departamento', crearRepartidor.departamento)
        .field('municipio', crearRepartidor.municipio)
        .field('zona', crearRepartidor.zona)
        .field('licencia', crearRepartidor.licencia)
        .field('transporte', crearRepartidor.transporte)
        .field('nit', crearRepartidor.nit)
        .field('password', crearRepartidor.password)
        .attach('hoja_vida', filePathr,'repartidor.jpg');
        expect(response.statusCode).toBe(200);
    })
    test('Crear 2do Repartidor', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroRepar')
        .field('nombres', crearRepartidor.nombres)
        .field('apellidos', crearRepartidor.apellidos)
        .field('correo', 'rep2@mail.com')
        .field('telefono', crearRepartidor.telefono)
        .field('departamento', crearRepartidor.departamento)
        .field('municipio', crearRepartidor.municipio)
        .field('zona', crearRepartidor.zona)
        .field('licencia', crearRepartidor.licencia)
        .field('transporte', crearRepartidor.transporte)
        .field('nit', crearRepartidor.nit)
        .field('password', crearRepartidor.password)
        .attach('hoja_vida', filePathr,'repartidor.jpg');
        expect(response.statusCode).toBe(200);
    })
    test('Crear Repartidor sin hoja de vida', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroRepar')
        .field('nombres', crearRepartidor.nombres)
        .field('apellidos', crearRepartidor.apellidos)
        .field('correo', crearRepartidor.correo)
        .field('telefono', crearRepartidor.telefono)
        .field('departamento', crearRepartidor.departamento)
        .field('municipio', crearRepartidor.municipio)
        .field('zona', crearRepartidor.zona)
        .field('licencia', crearRepartidor.licencia)
        .field('transporte', crearRepartidor.transporte)
        .field('nit', crearRepartidor.nit)
        .field('password', crearRepartidor.password)
        .attach('img', filePathr,'repartidor.jpg');
        expect(response.statusCode).toBe(500);
    })
    test('Crear Repartidor Repetido', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroRepar')
        .field('nombres', crearRepartidor.nombres)
        .field('apellidos', crearRepartidor.apellidos)
        .field('correo', crearRepartidor.correo)
        .field('telefono', crearRepartidor.telefono)
        .field('departamento', crearRepartidor.departamento)
        .field('municipio', crearRepartidor.municipio)
        .field('zona', crearRepartidor.zona)
        .field('licencia', crearRepartidor.licencia)
        .field('transporte', crearRepartidor.transporte)
        .field('nit', crearRepartidor.nit)
        .field('password', crearRepartidor.password)
        .attach('hoja_vida', filePathr,'repartidor.jpg');
        expect(response.statusCode).toBe(500);
    })
    test('Crear Repartidor sin correo', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroRepar')
        .field('nombres', crearRepartidor.nombres)
        .field('apellidos', crearRepartidor.apellidos)
        .field('telefono', crearRepartidor.telefono)
        .field('departamento', crearRepartidor.departamento)
        .field('municipio', crearRepartidor.municipio)
        .field('zona', crearRepartidor.zona)
        .field('licencia', crearRepartidor.licencia)
        .field('transporte', crearRepartidor.transporte)
        .field('nit', crearRepartidor.nit)
        .field('password', crearRepartidor.password)
        .attach('hoja_vida', filePathr,'repartidor.jpg');
        expect(response.statusCode).toBe(400);
    })
    test('Crear Repartidor con mal correo', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroRepar')
        .field('nombres', crearRepartidor.nombres)
        .field('apellidos', crearRepartidor.apellidos)
        .field('correo', 'correo')
        .field('telefono', crearRepartidor.telefono)
        .field('departamento', crearRepartidor.departamento)
        .field('municipio', crearRepartidor.municipio)
        .field('zona', crearRepartidor.zona)
        .field('licencia', crearRepartidor.licencia)
        .field('transporte', crearRepartidor.transporte)
        .field('nit', crearRepartidor.nit)
        .field('password', crearRepartidor.password)
        .attach('hoja_vida', filePathr,'repartidor.jpg');
        expect(response.statusCode).toBe(400);
    })
    test('Crear Repartidor con mal numero', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroRepar')
        .field('nombres', crearRepartidor.nombres)
        .field('apellidos', crearRepartidor.apellidos)
        .field('correo', crearRepartidor.correo)
        .field('telefono', '12345')
        .field('departamento', crearRepartidor.departamento)
        .field('municipio', crearRepartidor.municipio)
        .field('zona', crearRepartidor.zona)
        .field('licencia', crearRepartidor.licencia)
        .field('transporte', crearRepartidor.transporte)
        .field('nit', crearRepartidor.nit)
        .field('password', crearRepartidor.password)
        .attach('hoja_vida', filePathr,'repartidor.jpg');
        expect(response.statusCode).toBe(400);
    })
    test('Crear Repartidor con mal nit', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroRepar')
        .field('nombres', crearRepartidor.nombres)
        .field('apellidos', crearRepartidor.apellidos)
        .field('correo', crearRepartidor.correo)
        .field('telefono', crearRepartidor.telefono)
        .field('departamento', crearRepartidor.departamento)
        .field('municipio', crearRepartidor.municipio)
        .field('zona', crearRepartidor.zona)
        .field('licencia', crearRepartidor.licencia)
        .field('transporte', crearRepartidor.transporte)
        .field('nit', '123456')
        .field('password', crearRepartidor.password)
        .attach('hoja_vida', filePathr,'repartidor.jpg');
        expect(response.statusCode).toBe(400);
    })
    test('Login Admin', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginAdmin')
        .send(loginAdminjson);
        logeado.usuario_id = response.body.usuario_id
        logeado.id = response.body.id
        logeado.usuario = response.body.usuario
        logeado.password = response.body.password
        logeado.token = response.body.token
        logeado.rol = response.body.rol
        token_actual = response.body.token
        token_admin = response.body.token
        token_actual_erroneo += response.body.token
        expect(response.statusCode).toBe(200);
    })
    test('Login Admin con mal usuario', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginAdmin')
        .send(loginAdminjsonmaluser)
        // console.log("VERIFICANDO EL CAMBIO DE VARIABLE")
        // console.log(logeado)
        // console.log(token_actual)
        // console.log(loginAdminjson.password)
        expect(response.statusCode).toBe(401);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Login Admin con mala contraseña', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginAdmin')
        .send(loginAdminjsonmalpass)
        expect(response.statusCode).toBe(401)
        // expect(response.body.message).toBe("SSSS");
    })
    test('Login Admin sin username', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginAdmin')
        .field('password', loginAdminjson.password)
        expect(response.statusCode).toBe(400);
    })
    test('Verify Token erroneo', async () =>{
        const response = await supertest(app)
        .post('/solicitudEmp')
        .set('Authorization', `Bearer ${token.token.trim()}`)
        .send(token);
        // .field('password', loginAdminjson.password)
        // .field('token':token.token.trim());
        // expect(response.statusCode).toBe(200)
        // console.log(response.body);
        expect(response.body.message).toBe("invalid token");
    })
    test('Home Admin Solicitudes Empresas', async () =>{
        const response = await supertest(app)
        .post('/solicitudEmp')
        .set('Authorization', `Bearer ${logeado.token.trim()}`)
        .send(logeado);
        // .field('password', loginAdminjson.password)
        // .field('token':token.token.trim());
        expect(response.statusCode).toBe(200)
        // console.log(response.body);
        // expect(response.body).toBe("SSSS");
    })
    test('Home Admin Solicitudes Empresas NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/solicitudEmp')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin Solicitudes Empresas NO ES Admin ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/solicitudEmp')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('VERIFY TOKEN NO TOKEN Home Admin Solicitudes Empresas SIN ROL ', async () =>{
        const response = await supertest(app)
        .post('/solicitudEmp')
        .set('Authorization', `Bearer ${logeado.token.trim()}`);
        // .field('password', loginAdminjson.password)
        // .field('token':token.token.trim());
        expect(response.statusCode).toBe(401)
        // console.log(response.body);
        // expect(response.body).toBe("SSSS");
    })
    test('Login Empresa estado 0', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginEmpresa')
        .send(loginEmpresa);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(401);
    })
    test('Home Admin Respuesta Empresas 1', async () =>{
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_actual
        const response = await supertest(app)
        .post('/respuestaEmp')
        .set('Authorization', `Bearer ${logeado.token.trim()}`)
        .send(respuestahomeadmin);
        // console.log("HHHHHHHHHHHHHHHHHHHHHHH")
        // console.log(respuestahomeadmin)
        expect(response.statusCode).toBe(200)
        // console.log(response.body);
        // expect(response.body).toBe("SSSS");
    })
    test('Home Admin Respuesta Empresas 0', async () =>{
        respuestahomeadmin.resp = '2'
        respuestahomeadmin.idUser = '3'
        respuestahomeadmin.token = token_actual
        const response = await supertest(app)
        .post('/respuestaEmp')
        .set('Authorization', `Bearer ${logeado.token.trim()}`)
        .send(respuestahomeadmin);
        // console.log("HHHHHHHHHHHHHHHHHHHHHHH22")
        // console.log(respuestahomeadmin)
        expect(response.statusCode).toBe(200)
        // console.log(response.body);
        // expect(response.body).toBe("SSSS");
    })
    test('Home Admin Respuesta Empresas NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/respuestaEmp')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin Respuesta Empresas NO ES Admin ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/respuestaEmp')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin Respuesta Empresas NO Tiene IdUser ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestadesactivar_noUser.resp = '1'
        respuestadesactivar_noUser.token = token_admin
        const response = await supertest(app)
        .post('/respuestaEmp')
        .send(respuestadesactivar_noUser);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Empresa Solcitar pedidos', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_empresa_quemado
        const response = await supertest(app)
        .post('/solicitudPed')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Empresa Solcitar pedidos NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/solicitudPed')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Empresa Solcitar pedidos NO ES Empresa ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/solicitudPed')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Empresa Respuesta pedidos NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/respuestaPed')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Empresa Respuesta pedidos NO ES Empresa ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/respuestaPed')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })





    test('Home Admin Solicitud Repartidor', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/solicitudRepar')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin Solicitud Repartidor NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/solicitudRepar')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin Solicitud Repartidor NO ES admin ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/solicitudRepar')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin Respuestas Repartidor', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/respuestaRepar')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin Respuestas Repartidor NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/respuestaRepar')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin Respuestas Repartidor NO ES admin ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/respuestaRepar')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })

    test('Home Admin Respuesta REPARTIDOR 1', async () =>{
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '5'
        respuestahomeadmin.token = token_actual
        const response = await supertest(app)
        .post('/respuestaRepar')
        .set('Authorization', `Bearer ${logeado.token.trim()}`)
        .send(respuestahomeadmin);
        // console.log("HHHHHHHHHHHHHHHHHHHHHHH22")
        // console.log(respuestahomeadmin)
        expect(response.statusCode).toBe(200)
        // console.log(response.body);
        // expect(response.body).toBe("SSSS");
    })
    test('Home Admin Respuesta REPARTIDOR 0', async () =>{
        respuestahomeadmin.resp = '0'
        respuestahomeadmin.idUser = '6'
        respuestahomeadmin.token = token_actual
        const response = await supertest(app)
        .post('/respuestaRepar')
        .set('Authorization', `Bearer ${logeado.token.trim()}`)
        .send(respuestahomeadmin);
        // console.log("HHHHHHHHHHHHHHHHHHHHHHH22")
        // console.log(respuestahomeadmin)
        expect(response.statusCode).toBe(200)
        // console.log(response.body);
        // expect(response.body).toBe("SSSS");
    })


    test('Home Admin SolicitudCambio', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/solicitudCambio')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin SolicitudCambio NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/solicitudCambio')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin SolicitudCambio NO ES admin ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/solicitudCambio')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })

    test('Home Admin RespuestaCambio NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/respuestaCambio')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Home Admin RespuestaCambio NO ES admin ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/respuestaCambio')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })



    test('Login Empresa sin username', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginEmpresa')
        .field('password', loginEmpresa.password)
        expect(response.statusCode).toBe(400);
    })
    test('Login Empresa mal password', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginEmpresa')
        .send(loginEmpresamalpass);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(401);
    })
    test('Login Empresa mal username', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginEmpresa')
        .send(loginEmpresamaluser);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(401);
    })
    test('Login Empresa estado 2', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginEmpresa')
        .send(loginEmpresa2);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(401);
    })
    test('Login Empresa', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginEmpresa')
        .send(loginEmpresa);
        // console.log(createUser.username)
        // console.log(createUser.password)
        logeado.usuario_id = response.body.usuario_id
        logeado.id = response.body.id
        logeado.usuario = response.body.usuario
        logeado.password = response.body.password
        logeado.token = response.body.token
        logeado.rol = response.body.rol
        token_actual = response.body.token
        token_empresa = response.body.token
        token_actual_erroneo += response.body.token
        // console.log(logeado)
        expect(response.statusCode).toBe(200);
    })    
    test('Agregar Tipo Producto', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        
        const response = await supertest(app)
        .post('/AgregarTipoProducto')
        .send(tipo_producto)
        expect(response.statusCode).toBe(200);
        //expect(response.message).toBe("Error al crear producto");
    })
    test('Agregar Tipo Producto ERRROR 500', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        
        const response = await supertest(app)
        .post('/AgregarTipoProducto')
        .send(tipo_producto_error)
        expect(response.statusCode).toBe(500);
        //expect(response.message).toBe("Error al crear producto");
    })
    test('Agregar Tipo Producto nombre no existe', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        
        const response = await supertest(app)
        .post('/AgregarTipoProducto')
        .send(tipo_producto_nonombre)
        expect(response.statusCode).toBe(400);
        //expect(response.message).toBe("Error al crear producto");
    })
    test('Obtener Tipo Producto', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        
        const response = await supertest(app)
        .post('/ObtenerTipoProductos')
        .send(obtener_tipo_producto_nonombre)
        expect(response.statusCode).toBe(200);
        //expect(response.message).toBe("Error al crear producto");
    })
    test('Obtener Tipo Producto Error', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        
        const response = await supertest(app)
        .post('/ObtenerTipoProductos')
        .send(tipo_producto_nonombre)
        expect(response.statusCode).toBe(500);
        //expect(response.message).toBe("Error al crear producto");
    })
    test('Agregar Producto ERROR', async () =>{
        
        const response = await supertest(app)
        .post('/AgregarProducto')
        .set('Authorization', `Bearer ${logeado.token.trim()}`)
        .field('nombre', agregarProducto.nombre)
        .field('precio', agregarProducto.precio)
        .field('descripcion', agregarProducto.descripcion)
        .field('categoria', agregarProducto.categoria)
        .field('menu_id', agregarProducto.menu_id)
        .attach('foto', filePathp,'Clustering.png');
        expect(response.statusCode).toBe(500);
        // expect(response.body.message).toBe("SSSS");

        //expect(response.message).toBe("Error al crear producto");
    })
    test('Agregar Producto', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        const response = await supertest(app)
        .post('/AgregarProducto')
        .field('nombre', agregarProducto.nombre)
        .field('precio', agregarProducto.precio)
        .field('descripcion', agregarProducto.descripcion)
        .field('categoria', agregarProducto.categoria)
        .field('menu_id', agregarProductoBueno.menu_id)
        .attach('foto', filePathp2,'Clustering.png');
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
        //expect(response.message).toBe("Error al crear producto");
    })
    test('Agregar Producto duplicado', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        const response = await supertest(app)
        .post('/AgregarProducto')
        .field('nombre', agregarProducto.nombre)
        .field('precio', agregarProducto.precio)
        .field('descripcion', agregarProducto.descripcion)
        .field('categoria', agregarProducto.categoria)
        .field('menu_id', agregarProductoBueno.menu_id)
        .attach('foto', filePathp2,'Clustering.png');
        expect(response.statusCode).toBe(409);
        // expect(response.body.message).toBe("SSSS");
        //expect(response.message).toBe("Error al crear producto");
    })
    test('Agregar Producto falta 1 campo', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/AgregarProducto')
        .field('precio', agregarProducto.precio)
        .field('descripcion', agregarProducto.descripcion)
        .field('categoria', agregarProducto.categoria)
        .field('menu_id', agregarProducto.menu_id)
        .attach('foto', filePathp,'producto.jpg');
        expect(response.statusCode).toBe(400);
    })
    test('Agregar Producto no encuentra en la BD', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/AgregarProducto')
        .field('nombre', agregarProductonoBD.nombre)
        .field('precio', agregarProductonoBD.precio)
        .field('descripcion', agregarProductonoBD.descripcion)
        .field('categoria', agregarProductonoBD.categoria)
        .field('menu_id', agregarProductonoBD.menu_id)
        .attach('foto', filePathp,'producto.jpg');
        expect(response.statusCode).toBe(500);
    })
    test('Obtener Productos', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/ObtenerProductos')
        .send(ObtenerProductobien)
        expect(response.statusCode).toBe(200);
    })
    test('Obtener Productos ERROR', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/ObtenerProductos')
        .send(ObtenerProductoerror)
        expect(response.statusCode).toBe(500);
    })
    test('Nuevo Combo sin 1 parametro', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/NuevoCombo')
        .field('precio', NuevoCombo.precio)
        .field('descripcion', NuevoCombo.descripcion)
        .field('estado', NuevoCombo.estado)
        .field('id_empresa', NuevoCombo.id_empresa)
        .field('id_productos', NuevoCombo.id_productos)
        .attach('foto', filePathp,'producto.jpg');
        expect(response.statusCode).toBe(400);
    })
    test('Nuevo Combo', async () =>{
        const response = await supertest(app)
        .post('/NuevoCombo')
        .set('Authorization', `Bearer ${token.token.trim()}`)
        .field('nombre', NuevoCombo.nombre)
        .field('precio', NuevoCombo.precio)
        .field('descripcion', NuevoCombo.descripcion)
        .field('estado', NuevoCombo.estado)
        .field('id_empresa', NuevoCombo.id_empresa)
        .field('id_productos', NuevoCombo.id_productos)
        .attach('foto', filePathp,'producto.jpg');
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Nuevo Combo ERROR 500', async () =>{
        const response = await supertest(app)
        .post('/NuevoCombo')
        .set('Authorization', `Bearer ${token.token.trim()}`)
        .field('nombre', NuevoCombo.nombre)
        .field('precio', NuevoCombo.precio)
        .field('descripcion', NuevoCombo.descripcion)
        .field('estado', NuevoCombo.estado)
        .field('id_empresa', 'hola')
        .field('id_productos', NuevoCombo.id_productos)
        .attach('foto', filePathp,'producto.jpg');
        expect(response.statusCode).toBe(500);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Obtener Combos ERROR', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/ObtenerCombos')
        .send(obtenercomboserror)
        expect(response.statusCode).toBe(500);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Obtener Combos -- Empresa', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/ObtenerCombos')
        .send(obtenercombos)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Crear User', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroUser')
        .send(createUser);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Login User', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        const response = await supertest(app)
        .post('/loginUser')
        .send(createUser);
        logeado.usuario_id = response.body.usuario_id
        logeado.id = response.body.id
        logeado.usuario = response.body.usuario
        logeado.password = response.body.password
        logeado.token = response.body.token
        logeado.rol = response.body.rol
        token_actual = response.body.token
        token_cliente = response.body.token
        token_actual_erroneo += response.body.token
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Obtener Empresas - Cliente', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_actual
        const response = await supertest(app)
        .post('/empresas')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Obtener Empresas No ID - Cliente', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/empresas')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Obtener Empresas NO ES CLIENTE - Cliente', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/empresas')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Obtener MENU - Cliente', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestamenu.token = token_actual
        respuestamenu.idEmp = '2'
        const response = await supertest(app)
        .post('/menu')
        .send(respuestamenu);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Obtener MENU No ID - Cliente', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestamenu.resp = '1'
        respuestamenu.token = token_errornoid
        const response = await supertest(app)
        .post('/menu')
        .send(respuestamenu);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Obtener MENU NO ES CLIENTE - Cliente', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestamenu.resp = '1'
        respuestamenu.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/menu')
        .send(respuestamenu);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('DEHAKTIVAR usuarios', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestamenu.resp = '1'
        respuestamenu.token = token_admin
        const response = await supertest(app)
        .post('/desactivarUser')
        .send(respuestamenu);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('DEHAKTIVAR usuarios no trae token ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestamenu.resp = '1'
        respuestamenu.token = token_errornoid
        const response = await supertest(app)
        .post('/desactivarUser')
        .send(respuestamenu);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('DEHAKTIVAR no es el ROL', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestamenu.resp = '1'
        respuestamenu.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/desactivarUser')
        .send(respuestamenu);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    // test('RES DEHAKTIVAR usuarios idUser inválido', async () =>{
    //     // .set('Authorization', `Bearer ${logeado.token.trim()}`)
    //     respuestadesactivar.resp = '1'
    //     respuestadesactivar.idUser = '0'
    //     respuestadesactivar.token = token_admin
    //     const response = await supertest(app)
    //     .post('/resDesactivarU')
    //     .send(respuestadesactivar);
    //     // console.log(createUser.username)
    //     // console.log(createUser.password)
    //     expect(response.statusCode).toBe(400);
    //     // expect(response.body.message).toBe("SSSS");
    // })
    test('RES DEHAKTIVAR usuarios no trae token ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestadesactivar.resp = '1'
        respuestadesactivar.idUser = '9'
        respuestadesactivar.token = token_errornoid
        const response = await supertest(app)
        .post('/resDesactivarU')
        .send(respuestadesactivar);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('RES DEHAKTIVAR no es el ROL', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestadesactivar.resp = '1'
        respuestadesactivar.idUser = '9'
        respuestadesactivar.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/resDesactivarU')
        .send(respuestadesactivar);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('RES DEHAKTIVAR usuarios no trae idUser', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestadesactivar_noUser.resp = '1'
        respuestadesactivar_noUser.token = token_admin
        const response = await supertest(app)
        .post('/resDesactivarU')
        .send(respuestadesactivar_noUser);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('RES DEHAKTIVAR usuarios', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestadesactivar.resp = '1'
        respuestadesactivar.idUser = '9'
        respuestadesactivar.token = token_admin
        const response = await supertest(app)
        .post('/resDesactivarU')
        .send(respuestadesactivar);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe de Usuario TODOS', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/informeUser')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe Usuarios NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/informeUser')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe Usuarios NO ES ADMIN', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/informeUser')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })    
    test('Informe de Usuario Top5Empresas', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/top5Empresas')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe Usuarios Top5Empresas NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/top5Empresas')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe Usuarios Top5Empresas NO ES ADMIN', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/top5Empresas')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe de Usuario Cantidad', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/totalUser')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe Usuarios Cantidad NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/totalUser')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe Usuarios Cantidad NO ES ADMIN', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/totalUser')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe top5Deliverys Cantidad', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/top5Deliverys')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe top5Deliverys NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/top5Deliverys')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe top5Deliverys  NO ES ADMIN', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/top5Deliverys')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe Top5Productos', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/top5Productos')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe Top5Productos NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/top5Productos')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe Top5Productos NO ES ADMIN', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/top5Productos')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe masVendido', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_empresa
        const response = await supertest(app)
        .post('/masVendido')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe masVendido NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/masVendido')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe masVendido NO ES ADMIN', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/masVendido')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe HistorialPedidosEmpresa', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_empresa
        const response = await supertest(app)
        .post('/historialP')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe HistorialPedidosEmpresa NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/historialP')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe HistorialPedidosEmpresa NO ES ADMIN', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_repartidor_prueba
        const response = await supertest(app)
        .post('/historialP')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Informe HistorialPedidosEmpresa ERROR mal ID', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_empresa
        const response = await supertest(app)
        .post('/historialP')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Mi Perfil Repartidor', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_repartidor_quemado
        const response = await supertest(app)
        .post('/miPerfil')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Mi Perfil Repartidor NO Trae Token', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        respuestahomeadmin.token = token_errornoid
        const response = await supertest(app)
        .post('/miPerfil')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
    test('Mi Perfil Repartidor NO ES Repartidor ', async () =>{
        // .set('Authorization', `Bearer ${logeado.token.trim()}`)
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '8'
        respuestahomeadmin.token = token_admin
        const response = await supertest(app)
        .post('/miPerfil')
        .send(respuestahomeadmin);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(400);
        // expect(response.body.message).toBe("SSSS");
    })
   
  
    






















})





