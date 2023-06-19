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

CREATE TABLE tipo_producto (
     id INT NOT NULL AUTO_INCREMENT,
     descripcion VARCHAR(50) NOT NULL,
     PRIMARY KEY (id)
);
CREATE TABLE usuario (
     id INT NOT NULL AUTO_INCREMENT,
     usuario VARCHAR(50) NOT NULL,
     password VARCHAR(50) NOT NULL,
     PRIMARY KEY (id)
);


-- Dependientes 

CREATE TABLE repartidor (
     usuario_id INT NOT NULL,
     nombres VARCHAR(50) NOT NULL,
     apellidos VARCHAR(50) NOT NULL,
     email VARCHAR(50) NOT NULL,
     departamento VARCHAR(50) NOT NULL,
     municipio VARCHAR(50) NOT NULL,
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
     username VARCHAR(50) NOT NULL,
     password VARCHAR(50) NOT NULL,
     usuario_id INT NOT NULL,
     PRIMARY KEY (usuario_id),
     FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE administrador (
     username VARCHAR(50) NOT NULL,
     password VARCHAR(50) NOT NULL,
     usuario_id INT NOT NULL,
     PRIMARY KEY (usuario_id),
     FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- Empresa
CREATE TABLE empresa (
     usuario_id INT NOT NULL,
     nombre VARCHAR(50) NOT NULL,
     descripcion VARCHAR(50) NOT NULL,
     email VARCHAR(50) NOT NULL,
     departamento VARCHAR(50) NOT NULL,
     municipio VARCHAR(50) NOT NULL,
     imagenes VARCHAR(500) NOT NULL,
     tipo_empresa_id INT NOT NULL,
     estado INT NOT NULL,
     PRIMARY KEY (usuario_id),
     FOREIGN KEY (usuario_id) REFERENCES usuario(id),
     FOREIGN KEY (tipo_empresa_id) REFERENCES tipo_empresa(id)
);

CREATE TABLE menu (
     id INT NOT NULL AUTO_INCREMENT,
     empresa_usuario_id INT NOT NULL,
     PRIMARY KEY (id),
     FOREIGN KEY (empresa_usuario_id) REFERENCES empresa(usuario_id)
);

CREATE TABLE combo (
     id INT NOT NULL AUTO_INCREMENT,
     nombre VARCHAR(100) NOT NULL,
     descripcion VARCHAR(250) NOT NULL,
     menu_id INT NOT NULL,
     PRIMARY KEY (id),
     FOREIGN KEY (menu_id) REFERENCES menu(id)
);

CREATE TABLE producto (
     id INT NOT NULL AUTO_INCREMENT,
     nombre VARCHAR(100) NOT NULL,
     descripcion VARCHAR(150) NOT NULL,
     tipo_producto_id INT NOT NULL,
     menu_id INT NOT NULL,
     imagen VARCHAR(500) NOT NULL,
     PRIMARY KEY (id),
     FOREIGN KEY (menu_id) REFERENCES menu(id),
     FOREIGN KEY (tipo_producto_id) REFERENCES tipo_producto(id)
);

CREATE TABLE detalle_producto (
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


CREATE TABLE pedido (
     id INT NOT NULL AUTO_INCREMENT,
     repartidor_usuario_id INT NOT NULL,
     cliente_usuario_id INT NOT NULL,
     estado_pedido_id INT NOT NULL,
     calificacion FLOAT NOT NULL,
     fecha_inicio DATETIME NOT NULL,
     fecha_entregado DATETIME,
     precio_total FLOAT NOT NULL,
     PRIMARY KEY (id),
     FOREIGN KEY (repartidor_usuario_id) REFERENCES repartidor(usuario_id),
     FOREIGN KEY (cliente_usuario_id) REFERENCES cliente(usuario_id),
     FOREIGN KEY (estado_pedido_id) REFERENCES estado_pedido(id)
);

CREATE TABLE detalle_pedido (
     id INT NOT NULL AUTO_INCREMENT,
     pedido_id INT NOT NULL,
     producto_id INT NOT NULL,
     PRIMARY KEY (id),
     FOREIGN KEY (pedido_id) REFERENCES pedido(id),
     FOREIGN KEY (producto_id) REFERENCES producto(id)
);