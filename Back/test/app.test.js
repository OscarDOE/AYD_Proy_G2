const supertest = require('supertest')
const app = require('../src/app')
const fs = require('fs')
const path = require('path')
const mysqlConnection = require('../src/database/db')


beforeAll(async () => {
    if (process.env.NODE_ENV === "test") {
        console.log('Clean data tests');
        
        mysqlConnection.query('CALL sp_cleanDataAndReset();', function (err, result) {
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
    'nombre':"nombre",
    'descripcion':"descripcion",
    'email':"email",
    'departamento':"departamento",
    'municipio':"municipio",
    'zona':"zona",
    'tipo':"tipo",
    'password':"password",
    'file':'file'
}

const filePath = path.resolve(__dirname, './rel.jpg');
// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}
const fileContent64 = base64_encode(filePath);
// const fileContent = fs.readFileSync(filePath);
describe(" AYD-G2 - Test de AlChilazo", () => {
    test('Obtener Empresas enviando token', async () =>{
        const response = await supertest(app).post('/empresas').
        send(token);
        //set('Authorization', `Bearer ${token.token.trim()}`);;
        expect(response.statusCode).toBe(200);
    })
    test('Agregar Producto', async () =>{
        const response = await supertest(app)
        .post('/AgregarProducto')
        // .set('Authorization', `Bearer ${token.token.trim()}`)

        .field('nombre', agregarProducto.nombre)
        .field('precio', agregarProducto.precio)
        .field('descripcion', agregarProducto.descripcion)
        .field('categoria', agregarProducto.categoria)
        .field('menu_id', agregarProducto.menu_id)
        .attach('foto', filePath,'rel.jpg');
        expect(response.statusCode).toBe(200);
        //expect(response.message).toBe("Error al crear producto");
    })
    test('Agregar Producto falta 1 campo', async () =>{
        const response = await supertest(app)
        .post('/AgregarProducto')
        .set('Authorization', `Bearer ${token.token.trim()}`)
        .field('precio', agregarProducto.precio)
        .field('descripcion', agregarProducto.descripcion)
        .field('categoria', agregarProducto.categoria)
        .field('menu_id', agregarProducto.menu_id)
        .attach('foto', filePath,'rel.jpg');
        expect(response.statusCode).toBe(400);
    })
    test('Agregar Producto no encuentra en la BD', async () =>{
        const response = await supertest(app)
        .post('/AgregarProducto')
        .set('Authorization', `Bearer ${token.token.trim()}`)
        .field('nombre', agregarProductonoBD.nombre)
        .field('precio', agregarProductonoBD.precio)
        .field('descripcion', agregarProductonoBD.descripcion)
        .field('categoria', agregarProductonoBD.categoria)
        .field('menu_id', agregarProductonoBD.menu_id)
        .attach('foto', filePath,'rel.jpg');
        expect(response.statusCode).toBe(509);
    })
    test('Crear Empresa', async () =>{
        const response = await supertest(app)
        .post('/registroEmpresa')
        .set('Authorization', `Bearer ${token.token.trim()}`)
        .field('nombre', crearEmpresa.nombre)
        .field('descripcion', crearEmpresa.descripcion)
        .field('email', crearEmpresa.email)
        .field('departamento', crearEmpresa.departamento)
        .field('municipio', crearEmpresa.municipio)
        .field('zona', crearEmpresa.zona)
        .field('tipo', crearEmpresa.tipo)
        .field('password', crearEmpresa.password)
        .attach('foto', fileContent,'rel.jpg');
        expect(response.statusCode).toBe(500);
    })

    test('Obtener Ruta principal', async () =>{
        const response = await supertest(app).get('/');
        expect(response.statusCode).toBe(200);
    })
})
