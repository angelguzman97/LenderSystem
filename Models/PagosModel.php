<?php
class PagosModel extends Query{
     //Se crean los parámetros que irán dentro de la función registrarUsuarios()
     private $porcentaje, $plazo, $cantidad_dia, $total_pago, $fecha_inicio, $fecha_final, $estado, $id_cantidad, $id_cliente, $id_ruta, $id, $abono, $fecha_pago, $id_prestamo, $pago, $saldo, $dias_atraso, $saldo_vencido, $fecha_saldo, $cuotas_vencidas;
     //Se crean los parámetros que irán dentro de la función editarUser()
 
     public function __construct()
     {
         parent::__construct();
     }

     //Consulta para mostrar los clientes disponibles
     public function getClientesPrestamoss(int $id_ruta)
     {
        $sql = "SELECT cl.*,
        COALESCE(abono, 0) AS abono,
        COALESCE(saldo_vencido, 0) AS saldo_vencido,
        COALESCE(cuotas_vencidas, 0) AS cuotas_vencidas,
        COALESCE(dias_atraso, 0) AS dias_atraso,
        pr.id AS id_prestamo, cl.id AS id_cliente, s.id AS id_saldo,
        pr.total_pago,
        pr.cantidad_dias,
        pr.fecha_inicial,
        pr.fecha_final,
        s.saldo,
        s.saldo_vencido,
        r.id AS id_ruta,
        r.ruta
        FROM prestamos pr INNER JOIN clientes cl 
        LEFT JOIN pagos p ON p.id_prestamo = pr.id
        LEFT JOIN saldos s ON s.id_cliente = cl.id
        LEFT JOIN rutas r
        WHERE r.id = $id_ruta";
         $data = $this->selectAll($sql);
         return $data;
     }
     public function getClientesPrestamos(int $id_ruta, string $fecha_actual)
     {
        // date_default_timezone_set('America/Mexico_City');
        // setlocale(LC_TIME, 'es_MX');

        // $fecha_actual = time(); // Obtiene la fecha actual en formato Unix timestamp
        // $fecha_anterior = strtotime('-1 day', $fecha_actual); // Resta un día a la fecha actual
        // $fecha_anterior_formateada = strftime('%d de %B %Y', $fecha_anterior); // Formatea la fecha resultante

        // $fecha_anterior_formateada;

        $sql = "SELECT cl.*, pr.*,
        cl.id AS id_cliente,
        pr.id AS id_prestamo,
        s.id AS id_saldo,
        p.id AS id_pago,
        s.saldo, s.saldo_vencido,
        COALESCE(dias_atraso, 0) AS dias_atraso,
        COALESCE(cuotas_vencidas, 0) AS cuotas_vencidas,
        SUM(p.dias_atraso),
        SUM(p.cuotas_vencidas)
        FROM clientes cl 
        INNER JOIN prestamos pr ON pr.id_cliente = cl.id 
        INNER JOIN saldos s ON s.id_cliente = cl.id
        LEFT JOIN pagos p ON p.id_cliente = cl.id
        WHERE pr.id_ruta = $id_ruta AND s.fecha_saldo != '$fecha_actual'
        GROUP BY cl.id";
         $data = $this->selectAll($sql);
         return $data;
     }

     public function registrarPago(int $pago, int $abono, int $cuotas_vencidas, int $dias_atraso, string $fecha_pago, int $id_cliente, int $id_prestamo, int $id_ruta)
     {
        $this->pago = $pago;
        $this->abono = $abono;
        $this->cuotas_vencidas = $cuotas_vencidas;
        $this->dias_atraso = $dias_atraso;
        $this->fecha_pago = $fecha_pago;
        $this->id_cliente = $id_cliente;
        $this->id_prestamo = $id_prestamo;
        $this->id_ruta = $id_ruta;
            //Se crea una variable sql donde se hace la consulta
            $sql = "INSERT INTO pagos(pago, abono, cuotas_vencidas, dias_atraso, fecha_pago, id_cliente, id_prestamo, id_ruta) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";

            //Se crea una variable que contiene el array donde indicamos las variables creadas con los this y esa variable se enviará a la carpeta config/App/Query.php
            $datos = array($this->pago, $this->abono, $this->cuotas_vencidas, $this->dias_atraso, $this->fecha_pago, $this->id_cliente, $this->id_prestamo, $this->id_ruta);

            //Accedemos o se llama a la función o método saveUser del Query
            $data = $this->save($sql, $datos);

            //Se hace la comprobación de guardar los registros
            if ($data == 1) {
                $res = "ok";
            } else {
                $res = "error";
            }
        return $res;
    }

    public function actualizarSaldo(int $saldo, int $saldo_vencido, string $fecha_saldo, int $id_cliente)
    {
        $this->id_cliente = $id_cliente;
         $this->saldo = $saldo;
         $this->saldo_vencido = $saldo_vencido;
         $this->fecha_saldo = $fecha_saldo;
         //Se crea una variable sql donde se hace la consulta de actualizar los datos. Actualiza de la tabla trabajadores los campos
         $sql = "UPDATE saldos SET saldo = ?, saldo_vencido = ?, fecha_saldo = ? WHERE id_cliente = ?";
 
         //Se crea una variable que contiene el array donde indicamos las variables creadas con los this y esa variable se enviará a la carpeta config/App/Query.php
         $datos = array($this->saldo, $this->saldo_vencido, $this->fecha_saldo, $this->id_cliente);

         //Accedemos o se llama a la función o método saveUser del Query
         $data = $this->save($sql, $datos);
         if ($data == 1) {
            $res = "ok";
        } else {
            $res = "error";
        }
    return $res;
    }


    public function getPagos(int $id_ruta)
    {
    

       $sql = "SELECT cl.*, pr.*,
       cl.id AS id_cliente,
       pr.id AS id_prestamo,
       s.id AS id_saldo,
       s.saldo,
       p.id AS id_pago,
       s.saldo, s.saldo_vencido,
       COALESCE(dias_atraso, 0) AS dias_atraso,
       COALESCE(cuotas_vencidas, 0) AS cuotas_vencidas,
       SUM(p.dias_atraso) AS atraso,
       SUM(p.cuotas_vencidas) AS cuotas
       FROM clientes cl 
       INNER JOIN prestamos pr ON pr.id_cliente = cl.id 
       INNER JOIN saldos s ON s.id_cliente = cl.id
       LEFT JOIN pagos p ON p.id_cliente = cl.id
       WHERE pr.id_ruta = $id_ruta
       GROUP BY cl.id";
        $data = $this->selectAll($sql);
        return $data;
    }







}
?>