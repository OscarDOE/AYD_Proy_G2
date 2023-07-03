DELIMITER //

    CREATE PROCEDURE borrarycrear(


    )
    BEGIN
        -- DROP DEPENDIENTES
        DROP TABLE detalle_pedido;
        DROP TABLE pedido;
        DROP TABLE detalle_tarjeta;
        DROP TABLE direcciones_cliente;
        DROP TABLE autorizacion;
        DROP TABLE detalle_licencia;
        DROP TABLE detalle_combo;
        DROP TABLE combo;
        DROP TABLE producto;
        DROP TABLE menu;
        DROP TABLE tipo_producto;
        DROP TABLE empresa;
        DROP TABLE administrador;
        DROP TABLE cliente;
        DROP TABLE repartidor;
        -- DROP INDEPENDIENTES
        DROP TABLE usuario;
        DROP TABLE tipo_licencia;
        DROP TABLE estado_pedido;
        DROP TABLE tipo_empresa;

        -- Independientes
        CREATE TABLE tipo_empresa (
            id INT NOT NULL AUTO_INCREMENT,
            descripcion VARCHAR(50) NOT NULL,
            PRIMARY KEY (id)
        );

        CREATE TABLE estado_pedido (
            id INT NOT NULL AUTO_INCREMENT,
            descripcion VARCHAR(50) NOT NULL,
            PRIMARY KEY (id)
        );

        CREATE TABLE tipo_licencia (
            id INT NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(50) NOT NULL,
            PRIMARY KEY (id)
        );

        CREATE TABLE usuario (
            id INT NOT NULL AUTO_INCREMENT,
            usuario VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
            PRIMARY KEY (id)
        );
        -- Dependientes 

        CREATE TABLE repartidor (
            usuario_id INT NOT NULL,
            nombres VARCHAR(50) NOT NULL,
            apellidos VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            departamento VARCHAR(50) NOT NULL,
            municipio VARCHAR(50) NOT NULL,
            zona INT NOT NULL,
            transporte INT NOT NULL,
            telefono VARCHAR(15) NOT NULL,
            hoja_vida VARCHAR(500) NOT NULL,
            nit VARCHAR(15) NOT NULL,
            estado INT NOT NULL,
            calificacion FLOAT NOT NULL,
            PRIMARY KEY (usuario_id),
            FOREIGN KEY (usuario_id) REFERENCES usuario(id)
        );


        CREATE TABLE cliente (
            usuario_id INT NOT NULL,
            estado INT NOT NULL,
            cupon INT NOT NULL,
            email VARCHAR(50) NOT NULL,
            PRIMARY KEY (usuario_id),
            FOREIGN KEY (usuario_id) REFERENCES usuario(id)
        );

        CREATE TABLE administrador (
            usuario_id INT NOT NULL,
            PRIMARY KEY (usuario_id),
            FOREIGN KEY (usuario_id) REFERENCES usuario(id)
        );

        -- Empresa
        CREATE TABLE empresa (
            usuario_id INT NOT NULL,
            nombre VARCHAR(50) NOT NULL,
            descripcion VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            departamento VARCHAR(50) NOT NULL,
            municipio VARCHAR(50) NOT NULL,
            zona INT NOT NULL,
            imagenes VARCHAR(500) NOT NULL,
            tipo_empresa_id INT NOT NULL,
            estado INT NOT NULL,
            PRIMARY KEY (usuario_id),
            FOREIGN KEY (usuario_id) REFERENCES usuario(id),
            FOREIGN KEY (tipo_empresa_id) REFERENCES tipo_empresa(id)
        );

        CREATE TABLE tipo_producto (
            id INT NOT NULL AUTO_INCREMENT,
            descripcion VARCHAR(50) NOT NULL,
            empresa_usuario_id INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY(empresa_usuario_id) REFERENCES empresa(usuario_id)
        );

        CREATE TABLE menu (
            id INT NOT NULL AUTO_INCREMENT,
            empresa_usuario_id INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (empresa_usuario_id) REFERENCES empresa(usuario_id)
        );

        CREATE TABLE producto (
            id INT NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(100) NOT NULL,
            descripcion VARCHAR(150) NOT NULL,
            tipo_producto_id INT NOT NULL,
            menu_id INT NOT NULL,
            precio FLOAT NOT NULL,
            imagen VARCHAR(500) NOT NULL,
            estado INT NOT NULL,
            disponibilidad INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (menu_id) REFERENCES menu(id),
            FOREIGN KEY (tipo_producto_id) REFERENCES tipo_producto(id)
        );

        CREATE TABLE combo (
            id INT NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(100) NOT NULL,
            descripcion VARCHAR(250) NOT NULL,
            imagen VARCHAR(500) NOT NULL,
            menu_id INT NOT NULL,
            precio FLOAT NOT NULL,
            estado INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (menu_id) REFERENCES menu(id)
        )
        AUTO_INCREMENT = 1000;

        CREATE TABLE detalle_combo (
            id INT NOT NULL AUTO_INCREMENT,
            combo_id INT NOT NULL,
            producto_id INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (combo_id) REFERENCES combo(id),
            FOREIGN KEY (producto_id) REFERENCES producto(id)
        );

        -- Repartidor

        CREATE TABLE detalle_licencia (
            id INT NOT NULL AUTO_INCREMENT,
            tipo_licencia_id INT NOT NULL,
            repartidor_usuario_id INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (tipo_licencia_id) REFERENCES tipo_licencia(id),
            FOREIGN KEY (repartidor_usuario_id) REFERENCES repartidor(usuario_id)
        );


        CREATE TABLE autorizacion (
            id INT NOT NULL AUTO_INCREMENT,
            zona INT NOT NULL,
            departamento VARCHAR(100) NOT NULL,
            municipio VARCHAR(100) NOT NULL,
            repartidor_usuario_id INT NOT NULL,
            estado INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (repartidor_usuario_id) REFERENCES repartidor(usuario_id)
        );

        -- Cliente
        CREATE TABLE direcciones_cliente (
            id INT NOT NULL AUTO_INCREMENT,
            departamento VARCHAR(50) NOT NULL,
            municipio VARCHAR(50) NOT NULL,
            zona INT NOT NULL,
            cliente_usuario_id INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (cliente_usuario_id) REFERENCES cliente(usuario_id)
        );

        CREATE TABLE detalle_tarjeta (
            id INT NOT NULL AUTO_INCREMENT,
            numero BIGINT NOT NULL,
            cvv INT NOT NULL,
            fecha_emision VARCHAR(50) NOT NULL,
            fecha_terminacion VARCHAR(50) NOT NULL,
            cliente_usuario_id INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (cliente_usuario_id) REFERENCES cliente(usuario_id)
        );

        CREATE TABLE pedido (
            id INT NOT NULL AUTO_INCREMENT,
            repartidor_usuario_id INT,
            cliente_usuario_id INT NOT NULL,
            estado_pedido_id INT NOT NULL,
            calificacion FLOAT NOT NULL,
            fecha_salida VARCHAR(50) NOT NULL,
            fecha_llegada VARCHAR(50),
            precio_total FLOAT NOT NULL,
            direcciones_cliente_id INT NOT NULL,
            detalle_tarjeta_id INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (repartidor_usuario_id) REFERENCES repartidor(usuario_id),
            FOREIGN KEY (cliente_usuario_id) REFERENCES cliente(usuario_id),
            FOREIGN KEY (estado_pedido_id) REFERENCES estado_pedido(id),
            FOREIGN KEY (direcciones_cliente_id) REFERENCES direcciones_cliente(id),
            FOREIGN KEY (detalle_tarjeta_id) REFERENCES detalle_tarjeta(id)
        );
        -- SELECT * FROM autorizacion a ;
        -- SELECT * FROM pedido p ;
        -- SELECT * FROM autorizacion a ;
        -- ALTER TABLE pedido MODIFY fecha_inicio VARCHAR(50);
        -- ALTER TABLE pedido MODIFY fecha_entregado VARCHAR(50);

        -- ALTER TABLE pedido  DROP COLUMN fecha_entregado;
        -- ALTER TABLE autorizacion ADD COLUMN estado INT NOT NULL;

        CREATE TABLE detalle_pedido (
            id INT NOT NULL AUTO_INCREMENT,
            pedido_id INT NOT NULL,
            producto_id INT,
            combo_id INT,
            PRIMARY KEY (id),
            FOREIGN KEY (pedido_id) REFERENCES pedido(id),
            FOREIGN KEY (producto_id) REFERENCES producto(id),
            FOREIGN KEY (combo_id) REFERENCES combo(id),
            CHECK ((combo_id IS NULL AND producto_id IS NOT NULL) OR (combo_id IS NOT NULL AND producto_id IS NULL))
        );



        INSERT INTO usuario (usuario, password) VALUES("admin","123");
        INSERT INTO administrador (usuario_id) VALUES(1);

        INSERT INTO tipo_licencia (nombre) VALUES("A");
        INSERT INTO tipo_licencia (nombre) VALUES("B");
        INSERT INTO tipo_licencia (nombre) VALUES("C");
        INSERT INTO tipo_licencia (nombre) VALUES("M");

        INSERT INTO tipo_empresa  (descripcion) VALUES("Empresa");
        INSERT INTO tipo_empresa  (descripcion) VALUES("Tienda de Conveniencia");
        INSERT INTO tipo_empresa  (descripcion) VALUES("Supermercado");

        INSERT INTO estado_pedido (descripcion) VALUES("En Carrito");
        INSERT INTO estado_pedido (descripcion) VALUES("Pendiente de Aprobación");
        INSERT INTO estado_pedido (descripcion) VALUES("Cocinandose");
        INSERT INTO estado_pedido (descripcion) VALUES("Asignando Repartidor");
        INSERT INTO estado_pedido (descripcion) VALUES("En Camino");
        INSERT INTO estado_pedido (descripcion) VALUES("Cancelado");
        INSERT INTO estado_pedido (descripcion) VALUES("Entregado");

    END //
DELIMITER ;