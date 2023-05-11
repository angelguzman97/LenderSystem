<?php
class Clientes extends Controller
{
    //Este constructor se hace igual en el controlador home
    public function __construct()
    {
        //Esto inicializa las sesiones
        session_start();

        //La palabra reservada parent nos sirve para llamarla desde una clase extendida.
        //Cargar el constructor a las vistas
        parent::__construct();
    }
    //Accede al index de la carpeta Usuarios de la carpeta Views
    public function index()
    {

        $this->views->getView($this, "index");
    }
    public function listaClientes()
    {

        $this->views->getView($this, "listaClientes");
    }


    ////////////////////Temporales///////////
    public function listarClienteTemp()
    {
        $id_ruta = $_SESSION['id_ruta'];
        date_default_timezone_set('America/Mexico_City');
        setlocale(LC_TIME, 'es_MX');

        $fecharegistro = strftime('%d de %B %Y');

        $data = $this->model->getClientesTemp($id_ruta, $fecharegistro);
        //Se crea un for para crear las acciones de los botones
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['estado'] == 1) {
                $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                $data[$i]['acciones'] = '<div>
                                                                <!--Dentro del btnEditarUser y btnEliminarUser se concatena la variable $data en el indice $i y se le pasa al campo id, para que tome solo ese usuario que se le indica-->
            <button class="btn btn-primary" type="button" onclick="btnEditarCliente(' . $data[$i]['id'] . ');" ><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger" type="button" onclick="btnEliminarCliente(' . $data[$i]['id'] . ');"><i class="fa-solid fa-x"></i></button>
        </div>';
            } else {
                $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                $data[$i]['acciones'] = '<div>
                                                                <!--Dentro del btnEditarUser y btnEliminarUser se concatena la variable $data en el indice $i y se le pasa al campo id, para que tome solo ese usuario que se le indica-->
           <button class="btn btn-success" type="button" onclick="btnReingresarCliente(' . $data[$i]['id'] . ');"><i class="fa-solid fa-check"></i></button>
        </div>';
            }
        }

        //Mandamos el JSON a la función JS
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    //////////////Tabla Permantente
    public function listarCliente()
    {
        $id_ruta = $_SESSION['id_ruta'];
        $data = $this->model->getClientes($id_ruta);
        //Se crea un for para crear las acciones de los botones
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['estado'] == 1) {
                $data[$i]['estado'] = '<button class="btn btn-success" type="button" onclick="btnEliminarCliente('.$data[$i]['id'].');"><i class="fa-solid fa-circle-check"></i></button>';
                $data[$i]['acciones'] = '<div>
                                                                <!--Dentro del btnEditarUser y btnEliminarUser se concatena la variable $data en el indice $i y se le pasa al campo id, para que tome solo ese usuario que se le indica-->
            <button class="btn btn-primary" type="button" onclick="btnEditarCliente(' . $data[$i]['id'] . ');" ><i class="fas fa-edit"></i></button>
        </div>';
            } else {
                $data[$i]['estado'] = '<button class="btn btn-danger" type="button" onclick="btnReingresarCliente('.$data[$i]['id'].');"><i class="fa-solid fa-circle-xmark"></i></button>';
                $data[$i]['acciones'] = '<div>
        </div>';
            }
        }

        //Mandamos el JSON a la función JS
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function registrar()
    {
        //Se almacenan los valores que se obtengan por el método Post de los campos de la bd
        $cliente = $_POST['cliente'];
        $apellidos = $_POST['apellidos'];
        $edad = $_POST['edad'];
        $telefono = $_POST['telefono'];
        $direccion = $_POST['direccion'];
        $trabajo = $_POST['trabajo'];
        date_default_timezone_set('America/Mexico_City');
        setlocale(LC_TIME, 'es_MX');

        $fecharegistro = strftime('%d de %B %Y');

        $id_ruta = $_SESSION['id_ruta'];

        //Se colocó a lo último porque es para poder modificar los clientes
        $id = $_POST['id'];

        //Almacenar imagen
        //Se crea una variable por el método $_FILES este método recoge archivos y se va descomprimiendo poco a poco. $_FILES['imagen']-> 'imagen' es el name de la etiqueta input HTML.
        $img = $_FILES['imagen'];
        //Se crea una variable para obtener el name o nombre que tiene la imagen, en este caso de la variable $img
        $name = $img['name'];
        //Se crea una variable para obtener el nombre temporal (tmp_name) de la imagen
        $tmpname = $img['tmp_name'];

        //Se crea una variable fecha para sobreescribir el nombre de las imágenes. Años "Y", Mes "m", Días "d", Horas "H", Minutos "i", Segundos "s".
        $fecha = date("YmdHis");

        //Se confirma
        if (empty($cliente) || empty($apellidos) || empty($edad) || empty($telefono) || empty($direccion) || empty($trabajo) || empty($fecharegistro)) {
            //Se crea un mensaje. Para ello se crea una variable
            $msg = "Todos los campos son obligatorios";
        } else {

            //Se crea una condición ara verificar si existe algún nombre
            if (!empty($name)) {
                //Se crea una variablbe para sobreescribir el nombre de la imagen. que almacena la fecha y se concatena la extensión de la imagen
                $imgNombre = $fecha . ".jpg";
                //Se crea una variable para enviar la imagen a donde se alamacenará y se le concatena la variable $imgNombre
                $destino = "Assets/img/" . $imgNombre;
                //Se hace una validación para poder modificar los productos. Llamando al input oculto. Por método POST. Si está vacío.
                //También para no tener problemas a la hora de registrar un producto, y no tener imagen, se le hace una condición para que solo almacene el nombre. Si no está vacío, almacena solo el nombre
            } else if (!empty($_POST['foto_actual']) && empty($name)) {
                //Si no está vacío, es decir, si tiene el mismo nombre o es la misma imagen, se deja, Es decir, la variable $imgNombre toma el valor de la foto actual
                $imgNombre = $_POST['foto_actual'];
            } else {
                //Si no tiene el mismo nombre o no tiene imagen. Se coloca la que es por defecto
                $imgNombre = 'default.png';
            }

            //Se verifica si id es igual a vacío, se hace la insersección de datos.
            if ($id == "") {
                //Se crea una variable que accede al modelo y se manda a llamar al método registrarUsuarios junto con sus parámetros en el modelo
                $data = $this->model->registrarClientes($cliente, $apellidos, $edad, $telefono, $direccion, $trabajo, $imgNombre, $fecharegistro, $id_ruta);
                //Se hace la verificación
                if ($data == "ok") {
                    if (!empty($name)) {
                        //Se mueve la imagen donde se desea guardar con la función move_uploaded_file(), donde los parámetros es el nombre temporal y el destino a donde se guardará la imagen
                        move_uploaded_file($tmpname, $destino);
                    }
                    $msg = "si";
                    //Verficación de usuario existente. Viene del modelo usuario
                } else if ($data == "existe") {
                    $msg = "El Cliente ya existe";
                } else {
                    $msg = "Error al registrar al cliente";
                }
            } else {
                //Se crea una variable para acceder al modelo de editar productos y así eliminar la foto.
                $imgDelete = $this->model->editarCliente($id);
                //Se hace una condición o validadción. Si img del campo foto de la bd es diferente de la foto que tenemos por default o si img del campo foto es diferente del nombre
                if ($imgDelete['foto'] != 'default.png' && $imgDelete['foto'] != $imgNombre) {
                    //Para evitar problemas se hace una verificación si existe algún archivo con ese nombre con la función file_exist indicándole la ruta donde se encuentra $imgDelete del campo foto ->esto está en la bd
                    if (file_exists("Assets/img/" . $imgDelete['foto'])) {
                        //Si existe se borra el archivo o foto para no tener 2 veces la misma imagen del producto que se modifica. Se puede poner la misma foto con otro producto pero no la misma imagen del mismo producto, en ese caso lo reemplaza
                        unlink("Assets/img/" . $imgDelete['foto']); //<-Esta función borra la foto o archivo existente
                    }
                }

                //Se crea una variable que accede al modelo y se manda a llamar al método modificarUsuarios junto con sus parámetros en el modelo
                $data = $this->model->modificarClientes($cliente, $apellidos, $edad, $telefono, $direccion, $trabajo,  $imgNombre, $fecharegistro, $id, $id_ruta);
                //Se hace la verificación
                if ($data == "modificado") {
                    //Se hace una validación para que ejecute este código. Si no está vaciío
                    if (!empty($name)) {
                        //Se mueve la imagen donde se desea guardar con la función move_uploaded_file(), donde los parámetros es el nombre temporal y el destino a donde se guardará la imagen
                        move_uploaded_file($tmpname, $destino);
                    }
                    $msg = "modificado";
                } else {
                    $msg = "Error al modificar cliente";
                }
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }

    //Aquí se crea la función de editar indicando como parámetro que recibe un entero para que se ejecute en el index de Views/Usuarios
    public function editar(int $id)
    {
        //Se crea una ariable donde almacena el acceso al modelo usuario (UsuariosModel) llamando al método editarUser() indicando que recibe un parámetro entero, en este caso $id
        $data = $this->model->editarCliente($id);

        //Se visualiza con un echo y un JSON, donde el JSON_UNESCAPED_UNICODE es para no tener problemas con los acentos
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    //Aquí se crea la función de eliminar indicando como parámetro que recibe dos enteros para que se ejecute en el index de Views/Usuarios
    public function eliminar(int $id)
    {
        //Se crea una variable donde almacena el acceso al modelo usuario (UsuariosModel) llamando al método eeliminarUser() indicando que recibe dos parámetro un 0 y un entero, en este caso 0 y $id
        $data = $this->model->accionCliente(0, $id);

        //Se hace una validación
        if ($data == 1) {
            $msg = "ok";
        } else {
            $msg = "Error al cambiar el estado del cliente";
        }
        //Se visualiza con un echo y un JSON, donde el JSON_UNESCAPED_UNICODE es para no tener problemas con los acentos
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        //Elimina el proceso
        die();
    }

    //Aquí se crea la función de reingresar indicando como parámetro que recibe un entero para que se ejecute en el index de Views/Usuarios
    public function reingresar(int $id)
    {
        //Se crea una ariable donde almacena el acceso al modelo usuario (UsuariosModel) llamando al método eeliminarUser() indicando que recibe dos parámetros, en este caso 1 para cambiar el estado y $id
        $data = $this->model->accionCliente(1, $id);

        //Se hace una validación
        if ($data == 1) {
            $msg = "ok";
        } else {
            $msg = "Error al cambiar el estado del cliente";
        }
        //Se visualiza con un echo y un JSON, donde el JSON_UNESCAPED_UNICODE es para no tener problemas con los acentos
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        //Elimina el proceso
        die();
    }

    //Aquí se crea la función de salir para que se ejecute en el index de Views/Usuarios
    public function salir()
    {
        //Se destruye las sesiones
        session_destroy();

        //Se le agrega el header y dentro se le coloca la locación concatenada con la constante base_url, para que lo mande al login o index principal, es decir, que que ingrese de nueo sesión
        header("location: " . base_url);
    }
}
