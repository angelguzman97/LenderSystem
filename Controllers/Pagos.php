<?php class Pagos extends Controller{
  //Este constructor se hace igual en el controlador home
  public function __construct()
  {
      //Esto inicializa las sesiones
      session_start();

      //Se verifica si no se tiene una sesión activa. empty es Si no existe
      if (empty($_SESSION['activo'])) {
          //Si no se tiene una sesión activa. Se le manda mediante header la locación concatenada con la constante almacenada "base_url"
          header("location: ".base_url);
      }
      //La palabra reservada parent nos sirve para llamarla desde una clase extendida.
      //Cargar el constructor a las vistas
      parent::__construct();
  }

  //Accede al index de la carpeta Usuarios de la carpeta Views
  public function index()
  {
        
    $this->views->getView($this, "index");
      
  }

  public function pagosDelDia()
  { 

     $this->views->getView($this, "PagosDelDia");
  }
  
  public function vistaPagos()
  {
    date_default_timezone_set('America/Mexico_City');
        setlocale(LC_TIME, 'es_MX');

        $fecha_actual = strftime('%d de %B %Y');

    $id_ruta= $_SESSION['id_ruta'];
    $data= $this->model->getClientesPrestamos($id_ruta, $fecha_actual);
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    die();
  }

  public function registrarPago()
  {
      $pago = $_POST['cantidad_dias'];
      $abono = $_POST['abono'];
      $saldo = $_POST['saldo'];
      $cuotas_vencidas = $_POST['cuotas_vencidas'];
      $saldo_vencido = $_POST['saldo_vencido'];
      $fecha_pago = $_POST['fecha_pago'];
      $dias_atraso = $_POST['dias_atraso'];
      $id_cliente = $_POST['id_cliente'];
      $id_prestamo = $_POST['id_prestamo'];
      $id_ruta = $_SESSION['id_ruta'];
      
       
      if (empty($abono)) {
        $abono = 0;
        $cuotas_vencidas =0;
        $dias_atraso = 0;
        $data = $this->model->registrarPago($pago, $abono, $cuotas_vencidas, $dias_atraso,  $fecha_pago, $id_cliente, $id_prestamo, $id_ruta);
        $saldo_actual=$saldo - $pago;
        $saldo_vencido_actual = $saldo_vencido + $pago;
        $data = $this->model->actualizarSaldo($saldo_actual, $saldo_vencido_actual, $fecha_pago, $id_cliente);
                
      }else{
        $pago = 0;
        $cuotas_vencidas =0;
        $dias_atraso = 0;
        $data = $this->model->registrarPago($pago, $abono,$cuotas_vencidas, $dias_atraso, $fecha_pago, $id_cliente, $id_prestamo, $id_ruta);
        $saldo_actual = $saldo - $abono;
        $saldo_vencido_actual = $saldo_vencido + $abono;
       $data = $this->model->actualizarSaldo($saldo_actual, $saldo_vencido_actual, $fecha_pago, $id_cliente);
       

      }
     

      if ($data == "ok") {
        $response = array('msg' => 'si');
      } else {
        $response = array('msg' => 'Error al registrar pago');
      }
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        die();
   }


   public function registrarCuota()
   {
       $pago = $_POST['cantidad_dias'];
       $abono = $_POST['abono'];
       $saldo = $_POST['saldo'];
       $cuotas_vencidas = $_POST['cuotas_vencidas'];
       $saldo_vencido = $_POST['saldo_vencido'];
       $fecha_pago = $_POST['fecha_pago'];
       $dias_atraso = $_POST['dias_atraso'];
       $id_cliente = $_POST['id_cliente'];
       $id_prestamo = $_POST['id_prestamo'];
       $id_ruta = $_SESSION['id_ruta'];
       
       if (empty($abono) || empty($pago)) {
        
        $pago = 0;
        $abono = 0;
        $cuotas_vencidas =1;
        $dias_atraso = 1;
        $data = $this->model->registrarPago($pago, $abono, $cuotas_vencidas, $dias_atraso, $fecha_pago, $id_cliente, $id_prestamo, $id_ruta);
        $saldo_actual=$saldo;
        $saldo_vencido_actual = $saldo_vencido;
        $data = $this->model->actualizarSaldo($saldo_actual, $saldo_vencido_actual, $fecha_pago, $id_cliente);
        
      }
       
 
       if ($data == "ok") {
         $response = array('msg' => 'si');
       } else {
         $response = array('msg' => 'Error al registrar pago');
       }
         echo json_encode($response, JSON_UNESCAPED_UNICODE);
         die();
  }

  public function listaPagos()
    {
       $this->views->getView($this,"listaPagos");
    }

  public function listarPago()
  {
      $id_ruta = $_SESSION['id_ruta'];
      $data = $this->model->getPagos($id_ruta);
      for ($i = 0; $i < count($data); $i++) {
        $data[$i]['total_pago']='<td>'."$" .$data[$i]['total_pago'].' </td>';
        $data[$i]['saldo']='<td>'."$" .$data[$i]['saldo'].' </td>';
        if($data[$i]['cuotas']==0 && $data[$i]['atraso']==0){
          $data[$i]['cuotas']='<td>0</td>';
          $data[$i]['atraso']='<td>0</td>';
        }
      }
      //Se crea un for para crear las acciones de los botones
      echo json_encode($data, JSON_UNESCAPED_UNICODE);
      die(); 
  }




}
