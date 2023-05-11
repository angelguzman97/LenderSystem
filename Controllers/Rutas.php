<?php
class Rutas extends Controller
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
    //Accede al index de la carpeta Rutas de la carpeta Views
    public function index()
    {
        //Se verifica si no se tiene una sesión activa. empty es Si no existe
        if (empty($_SESSION['activo']) || $_SESSION['id_ruta'] != 1) {
            //Si no se tiene una sesión activa. Se le manda mediante header la locación concatenada con la constante almacenada "base_url"
            header("location: ".base_url);
        }
        $this->views->getView($this, "index");
    }

    public function listarRutas()
    {
        $data = $this->model->getRutas();
        //Se crea un for para crear las acciones de los botones
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['estado'] == 1) {
                $data[$i]['estado'] = '<button class="btn btn-success" type="button" onclick="btnEliminarUser('.$data[$i]['id'].');"><i class="fa-solid fa-circle-check"></i></button>';
                $data[$i]['acciones'] = '<div>
                                                                <!--Dentro del btnEditarUser y btnEliminarUser se concatena la variable $data en el indice $i y se le pasa al campo id, para que tome solo ese ruta que se le indica-->
                                                                <button class="btn btn-primary" type="button" onclick="btnEditarRuta('.$data[$i]['id'].');" ><i class="fas fa-edit"></i></button>
                                                                <button class="btn btn-secondary" type="button" onclick="btnListaCliente('.$data[$i]['id'].');" ><i class="fas fa-users"></i></button>
                </div>';
            } else {
                $data[$i]['estado'] = '<button class="btn btn-danger" type="button" onclick="btnReingresarUser('.$data[$i]['id'].');"><i class="fa-solid fa-circle-xmark"></i></button>';
                $data[$i]['acciones'] = '<div>
                                                                <!--Dentro del btnEditarUser y btnEliminarUser se concatena la variable $data en el indice $i y se le pasa al campo id, para que tome solo ese ruta que se le indica-->
           
                </div>';
            }
        }

        //Mandamos el JSON a la función JS
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    //Validar login
    public function validar()
    {
        if (empty($_POST['ruta']) || empty($_POST['clave'])) {
            $msg = "Los campos están vacíos";
        } else {
            $ruta = $_POST['ruta'];
            $clave = $_POST['clave'];

            //Encriptar contraseña mediante hash(). Se crea una variable y guarda una función que como parámetro se le indica que el tipo de encriptación es SHA256 y que se le pasa a una variable, en este caso $clave. Y la variable encriptada se coloca en la función registrarRutas(), ya que ese se manda al modelo y a la bd.
            // $hash = hash("SHA256", $clave);

            //Se crea una variable para acceder al modelo 
            $data = $this->model->getRuta($ruta, $clave);
            //Se hace la validación y se crean las sesiones
            if ($data) {
                //Para que las sesiones funcionen se llaman en el constructor
                $_SESSION['id_ruta'] = $data['id'];
                $_SESSION['ruta'] = $data['ruta'];
                $_SESSION['nombre'] = $data['nombre'];

                //Se inicia una sesión para poner en privado las url o rutas. La sesión se llama "activo" y es booleano. Y dentro del constructor se verifica si esa sesión está iniciada
                $_SESSION['activo'] = true;
                $msg = "ok";
            } else {
                $msg = "Ruta o contraseña incorrecta";
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        //Cortar las peticiones
        die();
    }

    //Aquí se crea la función de registrar para que se ejecute en el index de Views/Rutas
    public function registrar()
    {
        //Se almacenan los valores que se obtengan por el método Post de los campos de la bd
        $ruta = $_POST['ruta'];
        $clave = $_POST['clave'];
        $nombre = $_POST['nombre'];
        $telefono = $_POST['telefono'];
        $confirmar = $_POST['confirmar'];

        //Se colocó a lo último porque es para poder modificar los rutas
        $id = $_POST['id'];

        //Encriptar contraseña mediante hash(). Se crea una variable y guarda una función que como parámetro se le indica que el tipo de encriptación es SHA256 y que se le pasa a una variable, en este caso $clave. Y la variable encriptada se coloca en la función registrarRutas(), ya que ese se manda al modelo y a la bd.
       // $hash = hash("SHA256", $clave);

        //Se confirma
        if (empty($ruta) || empty($nombre) || empty($telefono)) {
            //Se crea un mensaje. Para ello se crea una variable
            $msg = "Todos los campos son obligatorios";
        } else {
            //Se verifica si id es igual a vacío, se hace la insersección de datos.
            if ($id == "") {
                //Se verifica si las contraseñas coinciden o no
                if ($clave != $confirmar) {
                    $msg = "Las contraseñas no coinciden";
                } else {
                    //Se crea una variable que accede al modelo y se manda a llamar al método registrarRutas junto con sus parámetros en el modelo
                    $registrarRuta = $this->model->registrarRutas($ruta, $clave, $nombre, $telefono);
                    //Se hace la verificación
                    if ($registrarRuta == "ok") {
                        $msg = "si";
                        //Verficación de ruta existente. Viene del modelo ruta
                    } else if ($registrarRuta == "existe") {
                        $msg = "El ruta ya existe";
                    } else {
                        $msg = "Error al registrar al ruta";
                    }
                }
            } else {
                if (empty($clave) || empty($confirmar)) {
                     //Se crea una variable que accede al modelo y se manda a llamar al método modificarRutas junto con sus parámetros en el modelo
                    $data = $this->model->modificarRutas($ruta, $nombre, $telefono, $id);
                    //Se hace la verificación
                    if ($data == "modificado") {
                        $msg = "modificado";
                    }else {
                        $msg = "Error al modificar ruta";
                    }
                }else{
                    if ($clave != $confirmar) {
                    $msg = "Las contraseñas no coinciden";
                    }else {
                        //Se crea una variable que accede al modelo y se manda a llamar al método modificarRutas junto con sus parámetros en el modelo
                            $data = $this->model->modificarRutasClave($ruta, $clave, $nombre, $telefono, $id);
                        //Se hace la verificación
                        if ($data == "modificado") {
                            $msg = "modificado";
                        }else {
                            $msg = "Error al modificar ruta";
                        }
                    }
                }
                
            }
               
               
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }


    //Aquí se crea la función de editar indicando como parámetro que recibe un entero para que se ejecute en el index de Views/Rutas
    public function editar($id)
    {
        $data = $this->model->editarRuta($id);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    //Aquí se crea la función de eliminar indicando como parámetro que recibe dos enteros para que se ejecute en el index de Views/Rutas
    public function eliminar(int $id)
    {
        //Se crea una variable donde almacena el acceso al modelo ruta (RutasModel) llamando al método eeliminarUser() indicando que recibe dos parámetro un 0 y un entero, en este caso 0 y $id
        $data = $this->model->accionUser(0, $id); 

        //Se hace una validación
        if ($data == 1) {
            $msg = "ok";
        }else {
            $msg = "Error al cambiar el estado del ruta";
        }
        //Se visualiza con un echo y un JSON, donde el JSON_UNESCAPED_UNICODE es para no tener problemas con los acentos
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        //Elimina el proceso
        die();

    }  
    
     //Aquí se crea la función de reingresar indicando como parámetro que recibe un entero para que se ejecute en el index de Views/Rutas
     public function reingresar(int $id)
     {
         //Se crea una ariable donde almacena el acceso al modelo ruta (RutasModel) llamando al método eeliminarUser() indicando que recibe dos parámetros, en este caso 1 para cambiar el estado y $id
         $data = $this->model->accionUser(1, $id); 
 
         //Se hace una validación
         if ($data == 1) {
             $msg = "ok";
         }else {
             $msg = "Error al cambiar el estado del ruta";
         }
         //Se visualiza con un echo y un JSON, donde el JSON_UNESCAPED_UNICODE es para no tener problemas con los acentos
         echo json_encode($msg, JSON_UNESCAPED_UNICODE);
         //Elimina el proceso
         die();
 
     }

     public function listaClientes(int $id)
     {
        $data = $this->model->clientesRuta($id);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
        
        
     }

     //Aquí se crea la función de salir para que se ejecute en el index de Views/Rutas
     public function salir()
     {
        //Se destruye las sesiones
        session_destroy();

        //Se le agrega el header y dentro se le coloca la locación concatenada con la constante base_url, para que lo mande al login o index principal, es decir, que que ingrese de nueo sesión
        header("location: ".base_url);
     }

}
