<?php
class ClientesGModel extends Query
{
    //Se crean los parámetros que irán dentro de la función registrarUsuarios()
    private $cliente, $apellidos, $telefono, $edad, $direccion, $trabajo, $img, $id, $estado, $fecharegistro, $id_ruta;
    //Se crean los parámetros que irán dentro de la función editarUser()

    public function __construct()
    {
        parent::__construct();
    }

    public function getClientesG()
    {  
        //Al c.id se le coloca un alias ara que no muetre el id de las cajas, sino del id del trabajador 
        $sql = "SELECT cl.*, pr.id AS id_prestamo, pr.total_pago, cl.id AS id_cliente, r.ruta FROM clientes cl INNER JOIN rutas r ON cl.id_ruta = r.id INNER JOIN prestamos pr ON pr.id_cliente = cl.id";
        //Accedemos o se llama a la función o método select del Query
        $data = $this->selectAll($sql);
        return $data;
    }

    //Se crea una función del botón editar usuarios y poder visualizarlo en el index, donde indicamos 1 parámetro de tipo int que vienen del controlador usuarios
    public function infoClientes(int $id)
    {
        //Se crea una variable sql donde almacena la consulta a la bd.
        // Selecciona toda la tabla de trabajadores donde el id sea igual al parametro $id   
        $sql = "SELECT * FROM clientes WHERE id = $id";

        //Se crea una variable donde almacena el llamado al método select() donde se obtiene un solo dato y se le pasa a la variable $sql
        $data = $this->select($sql);

        //Se retorna la variable
        return $data;
    }

     //Se crea una función del botón editar usuarios y poder visualizarlo en el index, donde indicamos 1 parámetro de tipo int que vienen del controlador usuarios
     public function getPagosClientesG(int $id)
     {
         //Se crea una variable sql donde almacena la consulta a la bd.
         // Selecciona toda la tabla de trabajadores donde el id sea igual al parametro $id   
         $sql = "SELECT * FROM pagos WHERE id_cliente = $id";
 
         //Se crea una variable donde almacena el llamado al método select() donde se obtiene un solo dato y se le pasa a la variable $sql
         $data = $this->selectAll($sql);
 
         //Se retorna la variable
         return $data;
     }

}
?>