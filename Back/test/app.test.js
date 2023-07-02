const supertest = require('supertest')
const app = require('../src/app')
const fs = require('fs')
const path = require('path')
const mysqlConnection = require('../src/database/db')


beforeAll(async () => {
    if (process.env.NODE_ENV === "test") {
        console.log('Clean data tests');
        
        mysqlConnection.query('CALL borrarycrear();', function (err, result) {
            if (err) console.error( err);
            console.log("Database cleaned"+result);
        });
    }else{
        console.log('Test can run only in NODE_ENV=`test` enviroment');
        process.exit(0);
    }
});

afterAll(async () => {
    console.log('Closing DB connection');
    mysqlConnection.destroy();
});

const token = {
    'token':`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbCI6ImNsaWVudGUiLCJpYXQiOjE2ODgyNDI3MjB9.s0Em4t-MEXRPtPMzuJYT8aYfPgbYv1-97o0vDGk_PdM
    `
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sIjoiYWRtaW4iLCJpYXQiOjE2ODgzMDE0NTR9.zZsyY4hLY2KGyPxHLgitt6PjLT-Pc7XW0yB7DLyOPQA
const agregarProducto = {
    'nombre':"nombre",
    'precio':"precio",
    'descripcion':"Producto de prueba",
    'categoria':"Producto de prueba",
    'menu_id':"4",
    'file':'file'
}
const agregarProductonoBD = {
    'nombre':"alitas locas",
    'precio':"precio",
    'descripcion':"Producto de prueba",
    'categoria':"Producto de prueba",
    'menu_id':"4",
    'file':'file'
}
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
const createUser = {
    'username':'cliente1',
    'password':"123"
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

const solicitudEmp = {
    'token':token.token,
    'password':"123"
}

const filePathe = path.resolve(__dirname, './empresa.jpg');
const filePathc = path.resolve(__dirname, './cliente.jpg');
const filePathr = path.resolve(__dirname, './repartidor.jpg');
const filePathp = path.resolve(__dirname, './producto.jpg');
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
    test('Crear Empresa', async () =>{
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
        expect(response.statusCode).toBe(200);
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
        expect(response.statusCode).toBe(200);
    })
    test('Login Admin con mal usuario', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginAdmin')
        .send(loginAdminjsonmaluser)
        // console.log(loginAdminjson.username)
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
        .set('Authorization', `Bearer ${token.token.trim()}`)
        .send(logeado);
        // .field('password', loginAdminjson.password)
        // .field('token':token.token.trim());
        expect(response.statusCode).toBe(200)
        // console.log(response.body);
        // expect(response.body).toBe("SSSS");
    })
    test('Home Admin Respuesta Empresas 1', async () =>{
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '3'
        const response = await supertest(app)
        .post('/respuestaEmp')
        .set('Authorization', `Bearer ${token.token.trim()}`)
        .send(respuestahomeadmin);
        console.log("HHHHHHHHHHHHHHHHHHHHHHH")
        console.log(respuestahomeadmin)
        // expect(response.statusCode).toBe(200)
        // console.log(response.body);
        expect(response.body).toBe("SSSS");
    })
    test('Home Admin Respuesta Empresas 0', async () =>{
        respuestahomeadmin.resp = '1'
        respuestahomeadmin.idUser = '2'
        const response = await supertest(app)
        .post('/respuestaEmp')
        .set('Authorization', `Bearer ${token.token.trim()}`)
        .send(respuestahomeadmin);
        console.log("HHHHHHHHHHHHHHHHHHHHHHH22")
        console.log(respuestahomeadmin)
        expect(response.statusCode).toBe(200)
        // console.log(response.body);
        // expect(response.body).toBe("SSSS");
    })





















    test('Crear User', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/registroUser')
        .send(createUser);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
    })
    test('Login User', async () =>{
        // .set('Authorization', `Bearer ${token.token.trim()}`)
        const response = await supertest(app)
        .post('/loginUser')
        .send(createUser);
        // console.log(createUser.username)
        // console.log(createUser.password)
        expect(response.statusCode).toBe(200);
    })

    // loginUser
    // test('Obtener Empresas enviando token', async () =>{
    //     const response = await supertest(app).post('/empresas').
    //     send(token);
    //     //set('Authorization', `Bearer ${token.token.trim()}`);;
    //     expect(response.statusCode).toBe(200);
    // })
    // test('Agregar Producto', async () =>{
    //     const response = await supertest(app)
    //     .post('/AgregarProducto')
    //     // .set('Authorization', `Bearer ${token.token.trim()}`)

    //     .field('nombre', agregarProducto.nombre)
    //     .field('precio', agregarProducto.precio)
    //     .field('descripcion', agregarProducto.descripcion)
    //     .field('categoria', agregarProducto.categoria)
    //     .field('menu_id', agregarProducto.menu_id)
    //     .attach('foto', filePath,'rel.jpg');
    //     expect(response.statusCode).toBe(200);
    //     //expect(response.message).toBe("Error al crear producto");
    // })
    // test('Agregar Producto falta 1 campo', async () =>{
    //     const response = await supertest(app)
    //     .post('/AgregarProducto')
    //     .set('Authorization', `Bearer ${token.token.trim()}`)
    //     .field('precio', agregarProducto.precio)
    //     .field('descripcion', agregarProducto.descripcion)
    //     .field('categoria', agregarProducto.categoria)
    //     .field('menu_id', agregarProducto.menu_id)
    //     .attach('foto', filePath,'rel.jpg');
    //     expect(response.statusCode).toBe(400);
    // })
    // test('Agregar Producto no encuentra en la BD', async () =>{
    //     const response = await supertest(app)
    //     .post('/AgregarProducto')
    //     .set('Authorization', `Bearer ${token.token.trim()}`)
    //     .field('nombre', agregarProductonoBD.nombre)
    //     .field('precio', agregarProductonoBD.precio)
    //     .field('descripcion', agregarProductonoBD.descripcion)
    //     .field('categoria', agregarProductonoBD.categoria)
    //     .field('menu_id', agregarProductonoBD.menu_id)
    //     .attach('foto', filePath,'rel.jpg');
    //     expect(response.statusCode).toBe(509);
    // })

})





