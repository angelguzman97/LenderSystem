let tblPrestamos, tblPrestamosTemp;
document.addEventListener("DOMContentLoaded", function () {
    //La variable tblClientes es igual a nuestra datatable. Tabla de los clientes
    tblPrestamosTemp = $("#tblPrestamosTemp").DataTable({
        ajax: {
            //Se manda al controlador Clientes y al método listarCliente
            url: base_url + "Prestamos/listarPrestamoTemp",
            dataSrc: ''
        },
        columns: [{
            'data': 'cliente'
        }, {
            'data': 'total_pago'
        },
        {
            'data': 'estado'
        },
        {
            'data': 'acciones'
        }]
    });

    tblPrestamos = $("#tblPrestamos").DataTable({
        ajax: {
            //Se manda al controlador Clientes y al método listarCliente
            url: base_url + "Prestamos/listarPrestamo",
            dataSrc: ''
        },
        columns: [{
            'data': 'cliente'
        }, {
            'data': 'total_pago'
        },
        {
            'data': 'estado'
        },
        {
            'data': 'acciones'
        }]
    });
})

////////////////////Funciones Clientes//////////////////
//Funcion modal
function frmPrestamo() {
    //Toma el id del h5 del modal del index Usuario y sustituye el título
    document.getElementById("title").innerHTML = "Nuevo Crédito";
    document.getElementById("btnAccion").innerHTML = "Registrar";

    //Se resetea el formulario para que no se muestren los datos ya registrados
    document.getElementById("frmPrestamos").reset();

    //Se muestra el modal
    $("#nuevo_prestamo").modal("show");

    //Se accede al id con document.getElementById() para poder limpiar los id de tipo hiden. Pasándolo vacío
    document.getElementById("id").value = "";
}


function calcularTotal() {
    var credito = document.getElementById("credito");
    var porcentaje = document.getElementById("porcentaje");
    var plazo = document.getElementById("plazo");
    var total = document.getElementById("total");
    var cantidad_dia = document.getElementById("cantidad_dia");
    
    var cantidad = credito.options[credito.selectedIndex].text.replace("$ ", "");
    var porcentajeValor = porcentaje.value / 100;
    var plazoPago = parseInt(plazo.value);
    var totalValor = parseFloat(cantidad) * (1 + porcentajeValor);
    var costoDiarioValor = totalValor / plazoPago;
    
    total.value = "$ " + totalValor.toFixed(2);
    cantidad_dia.value ="$ " + costoDiarioValor.toFixed(2);
    
    const fechaInicio = new Date();
    const fechaUltimoPago = new Date(fechaInicio.setDate(fechaInicio.getDate() + plazoPago));
    fechaUltimoPago.setDate(fechaUltimoPago.getDate() - 1); // Restamos un día para obtener la fecha del último pago
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const fechaFormato = fechaUltimoPago.toLocaleDateString('es-MX', options);
    document.getElementById('fecha_final').value = fechaFormato;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    var plazoSelect = document.getElementById('plazo');
    plazoSelect.addEventListener('change', function () {
      calcularTotal();
    });
  });


function registrarPrestamo(e) {
    e.preventDefault();
    
    const cliente = document.getElementById("cliente");
    const cantidad = document.getElementById("credito");
    const porcentaje = document.getElementById("porcentaje").value;
    const total = document.getElementById("total").value;
    const plazo = document.getElementById("plazo").value;
    const cantidad_dia = document.getElementById("cantidad_dia").value;
    const fecha_inicio = document.getElementById("fecha_inicio").value;
    const fecha_final = document.getElementById("fecha_final").value;
    calcularTotal();

    if (cliente.value == "" || cantidad.value == "" || porcentaje.value == "" || total.value == "" || plazo.value == "" || cantidad_dia.value == "" || fecha_inicio.value == "" || fecha_final.value == "") {
        
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else {  
        const url = base_url + "Prestamos/registrar";
        // const url1 = base_url + "Prestamos/registrarPrestamosTemp";
        
        const frm = document.getElementById("frmPrestamos");
        
        // const http1 = new XMLHttpRequest();
        const http = new XMLHttpRequest();

        http.open("POST", url, true);
        // http1.open("POST", url1, true);
        
        // http1.send(new FormData(frm));
        http.send(new FormData(frm));
        ////Temporal
        // http1.onreadystatechange = function () {
            
        //     if (this.readyState == 4 && this.status == 200) {
                
        //         console.log(this.responseText);
        //         const res = JSON.parse(this.responseText);
        //         if (res == "si") {
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'success',
        //                 title: 'Crédito registrado con éxito',
        //                 showConfirmButton: false,
        //                 timer: 3000
        //             })
                   
        //             frm.reset();
                    
        //             $("#nuevo_prestamo").modal("hide");

                    
        //             tblPrestamos.ajax.reload();
                    

                    
        //         } else if (res == "modificado") {
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'success',
        //                 title: 'Crédito modificado con éxito',
        //                 showConfirmButton: false,
        //                 timer: 3000
        //             })

                    
        //             $("#nuevo_prestamo").modal("hide");

                   
        //             tblPrestamos.ajax.reload();
                   

        //         } else {
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'error',
        //                 title: res,
        //                 showConfirmButton: false,
        //                 timer: 3000
        //             })
        //         }
        //     }
        // }
        ///Permanente
        http.onreadystatechange = function () {
            
            if (this.readyState == 4 && this.status == 200) {
                
                console.log(this.responseText);
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Crédito registrado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                   
                    frm.reset();
                    
                    $("#nuevo_prestamo").modal("hide");

                    tblPrestamosTemp.ajax.reload();

                    
                } else if (res == "modificado") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Crédito modificado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })

                    
                    $("#nuevo_prestamo").modal("hide");

                    tblPrestamosTemp.ajax.reload();

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

//Función para el botón editar cliente que recibe un parámetro id. Se mandará a llamar en el controlador usuario. En los botones de listar usuarios. 
function btnEditarPrestamo(id) {
    //Toma el id del h5 del modal del index Usuario y sustituye el título
    document.getElementById("title").innerHTML = "Actualizar crédito";
    document.getElementById("btnAccion").innerHTML = "Modificar";

    //Mostrar los datos reistrados para modificar los datos
    //Se crea una constante que almacena la url y concatena con el controlador Usuarios y su método editar y se concatena el parárametro que su colocó en dentro de la función
    const url = base_url + "Prestamos/editar/" + id;
    //Se crea una constante y se crea una nueva instancia del objeto XMLHttpRequest
    const http = new XMLHttpRequest();
    //Se crea una condición Por el método GET, que se recibe lo que contiene la url y que se ejecuta de forma asincrona(booleana)
    http.open("GET", url, true);
    //Se envía la petición, siendo nueva con un FormData y dentro de ella la constante en este caso el frm 
    http.send();
    //Se verifica el estado por medio de un onreadystatechange. El onreadystatechange se va a estar ejecutando cada vez que el state change esté cambiando 
    http.onreadystatechange = function () {
        //validación. Si el estatus es igual a 200 la respuesta está lista.
        if (this.readyState == 4 && this.status == 200) {
            //Se convierte el mensaje a un JSON
            console.log(this.responseText);
            const res = JSON.parse(this.responseText);
            ////Se almacena los datos obtenidos accediendo a los documents para traer el id del input del index o vista. Y se le agrega la propiedad value donde será igual a la respuesta o lo que traiga del objeto JSON, concatenando a lo que se desea acceder de la bd
            document.getElementById("id").value = res.id;
            document.getElementById("id_ruta").value = res.id_ruta;

            //Se lamacena los datos obtenidos accediendo a los documents para traer los id de cada input del index o vista. Y se le agrega la propiedad value donde será igual a la respuesta o lo que traiga del objeto JSON, concatenando a lo que se desea acceder de la bd 
            document.getElementById("cliente").value = res.id_cliente;
            document.getElementById("porcentaje").value = res.porcentaje;
            document.getElementById("total").value = res.total_pago;
            document.getElementById("plazo").value = res.plazo;
            document.getElementById("cantidad_dia").value = res.cantidad_dias;
            document.getElementById("fecha_inicio").value = res.fecha_inicial;
            document.getElementById("fecha_final").value = res.fecha_final;
            document.getElementById("credito").value = res.id_cantidad;

            //Se muestra el modal
            $("#nuevo_prestamo").modal("show");
        }
    }
}

//Función para el botón eliminar usuarios
function btnEliminarPrestamo(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        text: "¡El crédito no se eliminará de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí!',
        //Este botón se le agregó y es para el botón NO
        cancelButtonText: '¡No!'
    }).then((result) => {
        if (result.isConfirmed) {
            //Cambiar el estado de activo a inactivo y viceversa
            //Se crea una constante que almacena la url y concatena con el controlador Usuarios y su método eliminar y se concatena el parárametro que su colocó en dentro de la función
            const url = base_url + "Prestamos/eliminar/" + id;
            //Se crea una constante y se crea una nueva instancia del objeto XMLHttpRequest
            const http = new XMLHttpRequest();
            //Se crea una condición Por el método GET, que se recibe lo que contiene la url y que se ejecuta de forma asincrona(booleana)
            http.open("GET", url, true);
            //Se envía la petición, siendo nueva con un FormData y dentro de ella la constante en este caso el frm 
            http.send();
            //Se verifica el estado por medio de un onreadystatechange. El onreadystatechange se va a estar ejecutando cada vez que el state change esté cambiando 
            http.onreadystatechange = function () {
                //validación. Si el estatus es igual a 200 la respuesta está lista.
                if (this.readyState == 4 && this.status == 200) {
                    //Se parsea la respuesta y se le pasa al responseText
                    console.log(this.responseText);
                    const res = JSON.parse(this.responseText);

                    //Se hace una validación
                    if (res == "ok") {
                        //Si es igual a "ok". Muestra el mensaje
                        Swal.fire(
                            '¡Cambiado!',
                            'Crédito desactivado con éxito.',
                            'success'
                        )
                        //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                        
                        tblPrestamos.ajax.reload();
                    } else {
                        //Si no es igual a "ok". Muestra el mensaje
                        Swal.fire(
                            '¡Cambiado!',
                            res,
                            'error'
                        )
                    }
                }
            }

        }
    })
}



//Función para el botón reingresar usuarios y secrea una función similar en el controlador usuarios
function btnReingresarPrestamo(id) {
    Swal.fire({
        title: '¿Está seguro de reingresar?',
        text: "¡El crédito no se reingresará de forma permanente, solo cambiará el estado a activo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí!',
        //Este botón se le agregó y es para el botón NO
        cancelButtonText: '¡No!'
    }).then((result) => {
        if (result.isConfirmed) {
            //Cambiar el estado de activo a inactivo y viceversa
            //Se crea una constante que almacena la url y concatena con el controlador Usuarios y su método eliminar y se concatena el parárametro que su colocó en dentro de la función
            const url = base_url + "Prestamos/reingresar/" + id;
            //Se crea una constante y se crea una nueva instancia del objeto XMLHttpRequest
            const http = new XMLHttpRequest();
            //Se crea una condición Por el método GET, que se recibe lo que contiene la url y que se ejecuta de forma asincrona(booleana)
            http.open("GET", url, true);
            //Se envía la petición, siendo nueva con un FormData y dentro de ella la constante en este caso el frm 
            http.send();
            //Se verifica el estado por medio de un onreadystatechange. El onreadystatechange se va a estar ejecutando cada vez que el state change esté cambiando 
            http.onreadystatechange = function () {
                //validación. Si el estatus es igual a 200 la respuesta está lista.
                if (this.readyState == 4 && this.status == 200) {
                    //Se parsea la respuesta y se le pasa al responseText
                    const res = JSON.parse(this.responseText);

                    //Se hace una validación
                    if (res == "ok") {
                        //Si es igual a "ok". Muestra el mensaje
                        Swal.fire(
                            '¡Cambiado!',
                            'Cliente reingresado con éxito.',
                            'success'
                        )
                        //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                        tblPrestamosTemp.ajax.reload();
                        tblPrestamos.ajax.reload();
                    } else {
                        //Si no es igual a "ok". Muestra el mensaje
                        Swal.fire(
                            '¡Cambiado!',
                            res,
                            'error'
                        )
                    }
                }
            }

        }
    })
}

