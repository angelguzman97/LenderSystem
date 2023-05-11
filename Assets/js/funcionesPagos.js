let tblPagos;
document.addEventListener("DOMContentLoaded", function (){
//La variable tblCaantidades es igual a nuestra datatable. Tabla de las cantidades
tblPagos = $("#tblPagos").DataTable({
    ajax: {
        //Se manda al controlador Clientes y al método listarCliente
        url: base_url + "Pagos/listarPago",
        dataSrc: ''
    },
    columns: [{
        'data': 'id'
    },
    {
        'data': 'cliente'
    },
    {
        'data': 'total_pago'
    },
    {
        'data': 'saldo'
    },
    {
        'data': 'cuotas'
    },
    {
        'data': 'atraso'
    }]
});
})

function registrarPago(e) {
  e.preventDefault();

  // Obtener la diapositiva actual
//   const currentSlide = $('.slide.active');

  // Obtener los valores de los campos en la diapositiva actual
  const id_cliente = document.getElementById("id_cliente").value;
  const id_prestamo = document.getElementById("id_prestamo").value;
  const cantidad_dias = document.getElementById("cantidad_dias").value;
  const abono = document.getElementById("abono");
  const fecha_pago = document.getElementById("fecha_pago").value;

  if (id_cliente.value == "" || id_prestamo.value == "" || cantidad_dias.value == "" || abono.value == "" || fecha_pago.value == "") {
      //SweetAlert2. Su ruta está en el footer dentro de templates de Views. Es una alerta
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Todos los campos son obligatorios',
        showConfirmButton: false,
        timer: 3000
    })
     
  } else { //< petición mediante AJAX usando el xml request
      //Se crea una constante que almacena la url y concatena con el controlador Usuarios y su método registrar 
      const url = base_url + "Pagos/registrar";
      const frm = document.getElementById("frmPagos");
      const http = new XMLHttpRequest();
      //Se crea una condición Por el método POST, se le envía una url y que se ejecuta de forma asincrona(booleana)
      http.open("POST", url, true);
      //Se envía la petición, siendo nueva con un FormData y dentro de ella la constante en este caso el frm 
      http.send(new FormData(frm));
      //////////////Temporales///////////////////
      http.onreadystatechange = function () {
          //validación. Si el estatus es igual a 200 la respuesta está lista.
          if (this.readyState == 4 && this.status == 200) {
              //Se convierte el mensaje a un JSON
              const res = JSON.parse(this.responseText);
              console.log(res.responseText);
              if (res == "si") {
                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Pago registrado con éxito',
                      showConfirmButton: false,
                      timer: 3000
                  })

                  //Se verifica si res es igual al mensaje modificado del controlador
              } else {
                  Swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: res,
                      showConfirmButton: false,
                      timer: 3000
                  })
              }
          }
      }
      
  }
}



// function sliderPagos() {
//     //Se crea una constante que almacena la url y concatena con el controlador Compras y su método ingresoTemporal
//     const url = base_url + "Pagos/vistaPagos";
//     //Se crea una constante y se crea una nueva instancia del objeto XMLHttpRequest
//     const http = new XMLHttpRequest();
//     //Se crea una condición Por el método POST, que se envia a la url y que se ejecuta de forma asincrona(booleana)
//     http.open("GET", url, true);
//     //Se envía la petición, siendo nueva con un FormData y dentro de ella la constante en este caso el frm 
//     http.send();
//     //Se verifica el estado por medio de un onreadystatechange. El onreadystatechange se va a estar ejecutando cada vez que el state change esté cambiando 
//     http.onreadystatechange = function () {
//       //validación. Si el estatus es igual a 200 la respuesta está lista.
//       if (this.readyState == 4 && this.status == 200) {
//         //console.log(this.responseText);
//         //Se crea una constante que trae el mensaje del controlador
//         const res = JSON.parse(this.responseText);
//         //Se crea una variable html y se indica que estará vacío
//         var html = '';
  
//         //Iterar sobre los datos del JSON y agregarlos a la estructura HTML
//         for (var i = 0; i < res.length; i++) {
//           html += '<div class="slider-item">';
//           html += '<h2>' + res[i].cliente + '</h2>';
//           html += '<p>' + res[i].id_cliente + '</p>';
//           html += '</div>';
//         }
  
//         //Agregar la estructura HTML al contenedor del slider
//         document.querySelector('.slider-container').innerHTML = html;
//       }
//     }
    
//   }

