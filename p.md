# PROYECTO - FASE 1
---
## INTEGRANTES
|NOMBRE|CARNET|
|:----------|:----------:|
|Juan Sebastian Julajuj Zelada|	201905711|
|Karen Lizbeth Morales Marroquin|	201908316|
|Oscar Daniel Oliva España|	201903663|
|Carlos Estuardo Monterroso Santos| 201903767|

---
# DOCUMENTACION


 # <center>SCRUM </center>
   ![Imagen](img/srum.png)

 - *Esta metodología es un marco de trabajo ágil que ayuda al equipo a trabajar en conjunto para el desarrollo de un proyecto.*

 - *Esta metodología proporcionó una serie de valores, roles y pautas que genera un ambiente adecuado para la convivencia, concentración y mejora continua del equipo durante el desarrollo del proyecto.*

 - *Esta metodología indica que se debe separar el proyecto por etapas **sprint** lo cual ayuda a reducir un poco la complejidad del proyecto tendiendo al final de cada etapa un entregable o un incremento de funcionalidades del producto.*

 - *Esta metodología da la opción de usar herramientas para gestionar el flujo de trabajo, dividiéndolo en tareas y asignándolas a uno o más responsables, asimismo la supervisión de las tareas por realizar, en proceso, en revisión o terminadas.*

 - *Esta metodología indica que se debe realizar una reunión al iniciar un sprint (sprint planning) en la cual se debe analizar y generar una lista con las funcionalidades requeridas sprint backlog, metas y objetivos.*

 - *Esta metodología indica que debe realizar reuniones diariamente (daily scrum) que permite saber el avance del sprint así como posibles complicaciones o errores que se generan durante el desarrollo de este, esto permite buscar soluciones con el equipo de ser necesario.*

 - *Esta metodología indica que debe realizar una reunión al finalizar el sprint (sprint review) en el cual se verifica las metas u objetivos planteados al inicio del sprint esto permitirá garantizar el correcto funcionamiento del producto.*

 - *esta metodología indica que se debe realizar una reunión al finalizar el sprint (spring retrospective) en el cual se debe analizar si se tuvo fallas a corregir o mejoras que aplicar al inicio del siguiente sprint y asimismo obtener mejora continua.*

<br>

# **Roles dentro de SCRUM**

   - **Product Owner**
       - *Determinar los requisitos generales y actividades iniciales del proyecto*
       - *Representar a los usuarios del producto;
       - *buscar y asegurar los recursos financieros que requiere el proyecto para iniciarse y desarrollarse*
       - *Analizar la viabilidad del emprendimiento*
       - *Garantizar que el producto se entregue*
       - *Desarrollar y establecer los criterios para aceptar las historias de los usuarios*
       - *Aprobar o negar los productos entregables*

   <br>

   - **Scrum Master**
       - *Tiene dos funciones principales dentro del marco de trabajo:*
           - *Gestionar el proceso Scrum*
           - *Ayudar a eliminar impedimentos que puedan afectar a la entrega del producto*
       - *A parte de ello se engarga de las siguientes labores:*
           - *Mentoring y formación*
           - *Coaching*
           - *Facilitar reuniones y eventos si es necesario*

   <br>

   - **Equipo de desarrollo**

       - *El equipo de desarrollo suele estar formado por entre 3 a 9 profesionales que **se encargan de desarrollar el producto, auto-organizándose y auto-gestionándose para conseguir entregar un incremento de software** al final del ciclo de desarrollo*
       - *El equipo de desarrollo se encargará de crear un incremento terminado a partir de los elementos del Product Backlog seleccionados (Sprint Backlog) durante el Sprint Planning*

 <br>

 # ***Porque usar SCRUM***

 *Esta metodología permite dividir en etapas el proyecto lo cual reduce un poco la complejidad de este, así mismo se dividen en tareas y haciendo uso de una herramienta para controlar el flujo de trabajo como trello en la que se indican las tareas a realizar, en proceso, en revisión y terminadas lo que brinda una imagen más clara del avance de la etapa. Además de la constante comunicación entre el equipo de trabajo debido a las diferentes reuniones que se realizan durante la ejecución de la etapa. Al finalizar una etapa se analizar cual fue desempeño del equipo de trabajo durante la etapa y determinar si se puede mejorar o corregir alguna falla cuando se inicie la siguiente etapa del proyecto, esto ayuda a tener una mejora contante al trabajar en equipo.*

<br>

 # <center> Modelo Branching </center>
### GitFlow

---

![alt text](img/Branch.png "Diagrama")

---




### Proceso de creación de flujo

> Main

La rama Main se crea por defecto al crear el repositorio del proyecto. En ella se hicieron varios commits con el fin de subir todo lo necesario para iniciar el proyecto. Al tener ya versiones en producción actualizamos la rama develop para que el siguiente desarrollador tuviera la ultima versión a trabajar y pudiera fusionarla con su rama.

___Crear proyecto -> Main___

> Develop

La rama develop se crea desde la rama main. En esta rama se fusionan las nuevas funcionalidades y modificaciones que elaboro cada desarrollador.

___Main -> Develop___

> Feature

Las rama feature se crean desde la rama develop. En total se hicieron 5 ramas feature, una para cada desarrollador, estas ramas se cada vez que se utilizaron se tenían que actualizar desde la develop, al agregar las funcionalidades y terminar subir los cambios en dicha rama, se fusionan con la rama develop.

___Develop -> Feature/x -> Develop___

> Release

Las rama release se crean desde la rama develop, las utilizamos para crear las nuevas versiones del software.

___Develop -> Release/x.y.z___

> Tag

Los tag se crean desde la rama main, los utilizamos para marcar las nuevas versiones de lanzamiento para uso de los usuarios.

___Release/x.y.z -> Main -> x.y.z (Tag)___

 # <center> Requerimientos </center>

  - **Antecedentes del proyecto**
    <br>
    Actualmente existen empresas que se puden dividir en 3 tipos: Restaurante, Tienda de conveniencia y Supermercados. A falta de una pagina que proporcione los servicios de pedidos a domicilio, nace el sistema ***AlChilazo 🔥*** 

    Actualmente existen hoteles que ofresen su servicios a nivel global. A falta de una página que proporcione los servicios de viaje, estadía y transporte, nace el sistema ***Full trip***. Con la finalidad de poder ofrerle al turista diferentes opciones para que puedan adquirir el servicio y puedan calificarlo.
    <br>

  - **Necesidades**
    <br>
    Se require una página intuitiva y amigable para el usuario, el cual tiene que ser capaz de registrar usuarios y las empresas que desean registrar los servicios que se prestan a nivel goblal.
    <br>

  - **Funcionales**
        <br>

       |Nombre|Requerimiento   |Descripcion|Nivel de prioridad|
       |------|----------------|-----------|------------------|
       |RF01  |Inicio de sesion|La pagina contara con un *login* para acceder al usuaro por medio de correo o nombre usuario, al igual que la contraseña.|5|
       |RF01  |Registro de Usuario|Si el usuario no cuenta con registros en la pagina, se debera registrar ingresando la informacion que se le solicita (Nombre Completo, Usuario, Fecha de Nacimiento, Correo Electrónico,  Contraseña) y seleccionar que tipo de usuario desea ser.|5|

   <br>

   ## Funcionales

- Proporcionar a los usuarios un sistema funcional para realizar viajes
- Proveer a los usuarios una forma sencilla de entender y de utilizar para realizar viajes
- Registro de usuarios turista
- Registro de hoteles
- Registro de autos
- Registro de aerolineas
- Inicio de sesión de usuarios por rol
- Registro de servicios adicionales al sistema
- Buscador de hoteles
- Filtrar busqueda de hoteles por campos especificos
- Creación de habitaciones disponibles adicionales
- Ingreso de carros para renta para usuaio tipo renta autos
- Reserva de autos para turista
- Busqueda de autos para el usuario
- Filtro para busqueda de autos
- Crear vuelo por tipo
- Busqueda de vuelo
- Filtro para busqueda de vuelo
- Valorar y esribir reseña para vuelo, reservación hotel, auto y servicios adicionales
- Visualizar reseñas

## No Funcionales

- Centralización de datos para el cliente
- Minimización de validaciones para el cliente al momento de programar viaje
- Categorizar usuarios por roles
- Orden en el alquiler de habitaciones
- Solicitar campos necesarios por cada operación
- Diseño sensible de la aplicación y sus funcionalidades
- Seguridad para datos del usuario
- Soporte para multiple usuarios
- Correcto manejo de transacciones simultaneas
- Correcto acceso a reseñas de servicios utilizados
- Correcta confirmación de servicios seleccionados



# <center>Mapeo de Historias de usuario </center>
   ![Imagen](IMAGENES/mapeo.jpg)


  # <center> Historias de usuario / criterios de aceptación. </center>
<br>



   - **Como usuario Turista debo poder buscar donde se generen consultas en cascada de los hoteles.**
       - *Se necesita que el sistema pueda filtrar los hoteles por país, ciudad, cantidad de personas y rango de precio y/o fechas.*
       - *Se necesita solicitar los siguientes datos de las habitaciones: fecha de disponibilidad y la cantidad de habitaciones disponibles en cada hotel.*

   <br>
       - **Como usuario Turista deseo poder realizar reservaciones en diversos hoteles en fechas establecidas, visualizando las fechas y disponibilidad de los hoteles.**
       - *Mostrar un calendario para cada hotel en el cual se muestre la disponibilidad de este en diversas fechas.*
       - *Para poder realizar la reservación se debe solicitar el usuario del turista, la cantidad de habitaciones a reservar y una confirmación de la contraseña para finalizar la reservación.*
       - *Se deben crear las medidas necesarias para la seguridad de la información del cliente, así como su usuario y contraseña.*

   <br>

   - **Como administrador deseo poder agregar autos manualmente.**
       - *Se necesita crear un formulario con los datos necesarios para registrar autos nuevos con los datos de: Marca, placa modelo y precio.*

   <br>

   - **Como usuario Turista deseo poder alquilar un auto para poder movilizarme en el destino o ubicación del viaje.**
       - *Se necesita realizar un formulario en el cual se colocarán los datos de los turistas y de los autos que rentan especificando el tiempo de renta y el momento en que se rento*


   <br>


   - **Como usuario Turista deseo poder realizar búsqueda de mi auto ideal por medio de filtros para luego alquilarlo**
       - *Se necesita hacer un sistema de búsqueda de automóviles, haciendo por marca, modelo y rango de precio.*
       - *Se necesita solicitar los siguientes datos en un formulario para completar la compra: Usuario del turista, cantidad de días a rentar y la confirmación de la contraseña.*

   <br>

   - **Como Administrador deseo poder crear vuelos de forma manual con sus tipos correspondientes.**
       - *Se necesita registrar dos tipos de vuelos: de ida y de ida y vuelta. *
       - *Para la ceración de vuelos se necesitan los siguientes datos los cuales deberán ser solicitados: fecha del vuelo, destino del vuelo, cantidad de asientos disponibles y el precio del vuelo.*

   <br>


   - **Se desea tener un sistema de organización de los Hoteles disponibles, registrando reservaciones y llevando estadísticas acerca del uso de estas.**
       - *Crear un subsistema que lleve el control de estadísticas de los diversos negocios.*

   <br>

   - **Como usuario turista deseo poder crear una cuenta de usuario.**
       - *Se necesita crear un formulario en el cual se capturará el nombre completo de turista, así como su fecha de nacimiento, correo electrónico el cual debe verificarse que sea válido, un nombre de usuario y una contraseña la cual deberá confirmarse nuevamente para verificar que no se ha confundido.*
       - *Se necesita un sistema de validación para corroborar que los datos ingresados sean verídicos.*

   <br>

   - **Como usuario turista deseo poder iniciar sesión en mi cuenta de usuario previamente creada.**
       - *Se necesita crear un formulario en el cual se colocarán el correo electrónico o el usuario del cliente junto con la contraseña de inicio de sesión.*
       - *Se necesita validar que los datos ingresados coincidan con los datos guardados para realizar correctamente el login.*

   <br>

   - **Como Usuario administrador deseo poder Registrar nuevos hoteles en el sistema.**
       - *Se necesita crear un formulario para ingresar el nombre del hotel, el país donde se ubica junto con la ciudad, un correo electrónico único para cada hotel y una contraseña para cada correo la cual servirá como método de ingreso y gestión del hotel.*
       - *Se necesita un sistema para poder crear los correos o validarlos de manera que se trate de un correo único por hotel.*

   <br>


   - **Como usuario administrador deseo poder registrar nuevos sedes o rentas de autos en el sistema.**
       - *Se necesita crear un formulario el cual registrara un nombre de la renta de autos, el país y ciudad en el cual se ingresa, un correo electrónico para poder identificarlo y una contraseña segura para iniciar sesión.*
       - *Se necesita verificar que la contraseña ingresada sea segura*
       - *Se necesita verificar que el correo ingresado sea de la empresa en cuestión y no sea utilizada para otros motivos.*

   <br>

   - **Como usuario administrador deseo poder registrar nuevas aerolíneas en el sistema.**
       - *Se necesita crear un formulario en el cual se registren el nombre de la aerolínea, el país y ciudad donde se encuentran, así como un correo y una contraseña.*
       - *Se necesita verificar que el correo ingresado sea válido y la contraseña sea lo suficientemente segura.*

   <br>

   - **Como Usuario deseo poder realizar una búsqueda de los autos disponibles.**
       - *Se necesitan filtrar la búsqueda de los autos por destino y rango de precios.*
       - *Se necesita hacer un subsistema para realizar el alquiler de los vehículos, en los cuales se solicitarán los siguientes campos: usuario turista, cantidad de asientos que necesita y confirmación de la contraseña.*

   <br>

   - **Como usuario turista deseo dejar una reseña de los diversos servicios**
       - *Se necesita realizar un sistema de reseñas debidamente organizado.*
       - *2.	Se solicitarán por medio de un formulario los siguientes datos: Usuario Turista, tipo de servicio (Hotel, Auto, Aerolínea), descripción de la reseña y confirmación de la contraseña.*

   <br>

   - **Como usuario turista deseo poder registrarme para vuelos específicos.**
       - *1.Se necesitan registrar las reservaciones a los vuelos de los turistas*

   <br>


# Diagrama de Entidad Relacion
El siguiente diagrama es una representacion de la entidad relacion que se utilizara para la base de datos que se empleara en el proyecto.

![ER](./IMAGENES/ER.png)


# Mockups de las principales vistas para la página web.
* Login
![1](./IMAGENES/Mockups/login.JPG)
```Página qu ese muestra al momento de que un usuario necesite ingresar a la aplicacion utilizando correo o usuario y contraseña```
- Home
![2](./IMAGENES/Mockups/home.JPG)
```Es la página principal que se muestra en la aplicacion independientemente de si se encuentra un usuario utilizando la aplicacion, es posible realizar busquedas aplicando distintos filtros si se necesita```
![3](./IMAGENES/Mockups/home1.JPG)
```Vistas de las distintas páginas que pueden aparecen en la aplicacion dependiendo del tipo de busqueda que se necesite```
- Usuario turista
![4](./IMAGENES/Mockups/userturista.JPG)
```El usuario turista es capaz de realizar busquedas, colocar reseñas, ver reseñas y realizar reservciones de habitaciones, viajes o vehículos```
![5](./IMAGENES/Mockups/userturista1.JPG)
```Formulario necesario para poder realizar una reservación de habitaciones```
![6](./IMAGENES/Mockups/userturista2.JPG)
```El usuario turista es capaz de ver y realiar reseñas de un servicio que se le ha proporcionado```
![7](./IMAGENES/Mockups/userturista3.JPG)
```Formularios necesarios para realizar reservas de vehículo o viajes```
- Usuario hotel
![8](./IMAGENES/Mockups/userhotel.JPG)
```El usuario hotel es capaz de ver las reseñas que se le han dado y crear nuevas habitaciones disponibles```
![9](./IMAGENES/Mockups/userhotel1.JPG)
```Formulario necesario completar para la creacion de habitaciones```
- Usuario autos
![10](./IMAGENES/Mockups/userautos.JPG)
```El usuario de automovilies puede ser capaz de ver las reseñas que se le han proporcionado y creacion de vehículos disponibles```
![11](./IMAGENES/Mockups/userautos1.JPG)
```Formulario necesario completar para crear nuevos vehículos disponibles```
- Usuario aerolinea
![12](./IMAGENES/Mockups/useraerolinea.JPG)
```El usuario de aerolinea es capaz de ver las reseñas que se le han proporcionado y la creacion de vuelos```
![13](./IMAGENES/Mockups/useraerolinea1.JPG)
```Formulario necesario completar para la creacion de un vuelo```
- Usuario administrador
![14](./IMAGENES/Mockups/useradministrador.JPG)
```El usuario administrador cuenta con la opcion para poder crear nuevos usuarios de diferentes tipos ingresando los datos necesarios para completar la informacion.```
![15](./IMAGENES/Mockups/useradministrador1.JPG)
```Formularios utilizados para la creacion de cada uno de los usuarios```


