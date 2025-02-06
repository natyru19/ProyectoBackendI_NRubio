## PROGRAMACIÓN BACKEND I


> Última entrega


Vista de carrito con sus respectivos productos funcionando:<br>
- Se prueba funcionalidad de endpoint.<br>

Actualizar cantidad de productos, eliminar producto del carrito y vaciar carrito funcionando:<br>
- Se prueba funcionalidad de endpoint.<br>

Agrego el mismo estilo que products en relaTimeProducts. Creación de productos funcionando:<br>
- Se prueba funcionalidad de endpoint.<br>

La eliminación de un producto en realTimeProducts impacta ahora en mongo. Crear un carrito y agregar un producto al carrito funcionando:<br>
- Se prueba funcionalidad de endpoint.<br>
- Se puede eliminar un producto desde el front y que se vea reflejado en el back.<br>

Refactorización en router de vistas. Modificación de las asignaciones con valores numéricos. Se muestran los productos nuevamente en /realTimeProducts. Eliminación de producto por id desde Postman funcionando:<br>
- Se prueba funcionalida de endpoint.<br>
- Se mejora la estructura del código.<br>

Refactorización en router y manager de carrito:<br>
- Se mejora la estructura del código.<br>

Refactorización en router de productos:<br>
- Se mejora la estructura del código.<br>

Fix en router de productos, manejando filtros por query params:<br>
- Se puede agregar una opción de búsqueda según la categoría del producto.<br>
- Se puede agregar un ordenamiento según el precio, puede ser tanto ascendente como descendente.<br>
- Se puede agregar una página específica, en caso de no agregar ninguna, se mostrará la 1.<br>
- Se puede agregar un límite de cantidad de productos a mostrar, en caso que no se agregue ninguno, se mostrarán 10.<br>

Conexión con base de datos y uso de paginación:<br>
- Funcionamiento de paginación en /products.<br>
- Se refactoriza /api/products a formato solicitado.<br>
- Creación de la carpeta models con sus respectivos archivos.<br>
- Se realiza conexión con Base de Datos MongoDB.<br>


> Segunda entrega


Utilización de Handlebars y websocket.<br>
- Se pueden eliminar los productos y ver la actualización en tiempo real.<br>
- Se pueden agregar los productos a través de un formulario y ver la actualización en tiempo real.<br>
- Se pueden ver todos los productos agregados hasta el momento.<br>
- Creación de la vistas.<br>


> Primera entrega - Comisión 70410


Últimos ajustes:<br>
- Realización de pruebas para ver el funcionamiento completo de todos los endpoints.<br>
- Modificación en el README y los mensajes de error para que quede más prolijo.<br>

Funcionalidad del carrito:<br>
- Se puede agregar un producto con un ID proporcinado al carrito con un ID proporcionado.<br>
- Se puede crear un nuevo carrito.<br>
- Se pueden listar los productos del carrito con un ID proporcionado.<br>
- Funcionamiento de GET, POST de carrito.<br>

CRUD de productos finalizado:<br>
- Funcionamiento de PUT, DELETE de productos.<br>

Creación de routes y middlewares:<br>
- Utilización de archivo estático con prefijo virtual.<br>
- Organización de la estructura del proyecto utilizando diferentes rutas.<br>
- Creación de métodos de petición CRUD (probando los endpoints en Postman: GET, POST).<br>
- Utilización de códigos de estado para informar la respuesta del proceso.<br>
- Manejo de archivos con FileSystem.<br>

Creación de la ruta products:<br>
- Se puede traer solo el producto con el ID proporcionado.<br>
- Se pueden listar todos los productos o la cantidad de productos que se desee poniendo un límite específico.
