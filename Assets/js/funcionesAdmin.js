let tblClientesG, tblHistoClientesG;
document.addEventListener("DOMContentLoaded", function () {
    //La variable tblClientes es igual a nuestra datatable. Tabla de los clientes
    tblClientesG = $("#tblClientesG").DataTable({
        ajax: {
            //Se manda al controlador Clientes y al método listarCliente
            url: base_url + "ClientesG/listarClientesG",
            dataSrc: ''
        },
        columns: [{
            'data': 'id'
        }, {
            'data': 'cliente'
        },
        {
            'data':'total_pago'
        },
        {
            'data':'ruta'
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
function frmCliente() {
    //Toma el id del h5 del modal del index Usuario y sustituye el título
    document.getElementById("title").innerHTML = "Nuevo cliente";
    document.getElementById("btnAccion").innerHTML = "Registrar";

    //Se resetea el formulario para que no se muestren los datos ya registrados
    document.getElementById("frmClientes").reset();

    //Se muestra el modal
    $("#info_cliente").modal("show");
    $("#tblHistoClientesG").modal("show");

    //Se accede al id con document.getElementById() para poder limpiar los id de tipo hiden. Pasándolo vacío
    document.getElementById("id").value = "";

    //Se llama a la unción de eliminar imagen de la previsualización y así limpiar el FILES
    deleteImg();
}

//Función para registrar y modificar cliente
function registrarCliente(e) {
    e.preventDefault();
    //Se crea la constante donde accede a los id de cada input del index o vista y los almacena en él
    const cliente = document.getElementById("cliente");
    const apellidos = document.getElementById("apellidos");
    const edad = document.getElementById("edad");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");
    const trabajo = document.getElementById("trabajo");

    if (cliente.value == "" || apellidos.value == "" || edad.value == "" || telefono.value == "" || direccion.value == "" || trabajo.value == "") {
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
        const url = base_url + "Clientes/registrar";
        // const url1 = base_url + "Clientes/registrarClientesTemp";
        //Se crea una constante donde se almacena el id del formulario de registrar usuarios
        const frm = document.getElementById("frmClientes");
        //Se crea una constante y se crea una nueva instancia del objeto XMLHttpRequest
        // const http1 = new XMLHttpRequest();
        const http = new XMLHttpRequest();
        //Se crea una condición Por el método POST, se le envía una url y que se ejecuta de forma asincrona(booleana)
        http.open("POST", url, true);
        // http1.open("POST", url1, true);
        //Se envía la petición, siendo nueva con un FormData y dentro de ella la constante en este caso el frm 
        // http1.send(new FormData(frm));
        http.send(new FormData(frm));
        //////////////Temporales///////////////////
        // http1.onreadystatechange = function () {
        //     //validación. Si el estatus es igual a 200 la respuesta está lista.
        //     if (this.readyState == 4 && this.status == 200) {
        //         //Se convierte el mensaje a un JSON
        //         console.log(this.responseText);
        //         const res = JSON.parse(this.responseText);
        //         if (res == "si") {
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'success',
        //                 title: 'Cliente registrado con éxito',
        //                 showConfirmButton: false,
        //                 timer: 3000
        //             })
        //             //Reseteo de formulario
        //             frm.reset();
        //             //Ocultar el modal
        //             $("#nuevo_cliente").modal("hide");

        //             //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
        //             tblClientes.ajax.reload();

        //             //Se verifica si res es igual al mensaje modificado del controlador
        //         } else if (res == "modificado") {
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'success',
        //                 title: 'Cliente modificado con éxito',
        //                 showConfirmButton: false,
        //                 timer: 3000
        //             })

        //             //Ocultar el modal
        //             $("#nuevo_cliente").modal("hide");

        //             //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
        //             tblClientes.ajax.reload();


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

        //Se verifica el estado por medio de un onreadystatechange. El onreadystatechange se va a estar ejecutando cada vez que el state change esté cambiando 
        http.onreadystatechange = function () {
            //validación. Si el estatus es igual a 200 la respuesta está lista.
            if (this.readyState == 4 && this.status == 200) {
                //Se convierte el mensaje a un JSON
                console.log(this.responseText);
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Cliente registrado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    //Reseteo de formulario
                    frm.reset();
                    //Ocultar el modal
                    $("#nuevo_cliente").modal("hide");

                    //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                    tblClientesTemp.ajax.reload();

                    //Se verifica si res es igual al mensaje modificado del controlador
                } else if (res == "modificado") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Cliente modificado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })

                    //Ocultar el modal
                    $("#nuevo_cliente").modal("hide");

                    //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                    tblClientesTemp.ajax.reload();


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
function btnInfoCliente(id) {
    //Toma el id del h5 del modal del index Usuario y sustituye el título
    document.getElementById("title").innerHTML = "Información del cliente";

    //Mostrar los datos reistrados para modificar los datos
    //Se crea una constante que almacena la url y concatena con el controlador Usuarios y su método editar y se concatena el parárametro que su colocó en dentro de la función
    const url = base_url + "ClientesG/infoCliente/" + id;
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
            const res = JSON.parse(this.responseText);
            ////Se almacena los datos obtenidos accediendo a los documents para traer el id del input del index o vista. Y se le agrega la propiedad value donde será igual a la respuesta o lo que traiga del objeto JSON, concatenando a lo que se desea acceder de la bd
            document.getElementById("id").value = res.id;

            //Se lamacena los datos obtenidos accediendo a los documents para traer los id de cada input del index o vista. Y se le agrega la propiedad value donde será igual a la respuesta o lo que traiga del objeto JSON, concatenando a lo que se desea acceder de la bd 
            document.getElementById("cliente").value = res.cliente;
            document.getElementById("apellidos").value = res.apellidos;
            document.getElementById("edad").value = res.edad;
            document.getElementById("telefono").value = res.telefono;
            document.getElementById("direccion").value = res.direccion;
            document.getElementById("trabajo").value = res.trabajo;

            //Para mostrar también la foto del producto que se desea modificar. Se trae por su id con su atributo src. Y para evitar problemas se concatena la base_url + la carpeta donde se almacena + la respuesta  del campo de la base de datos
            document.getElementById("img-preview").src = base_url + 'Assets/img/' + res.foto;

            // document.getElementById("icon-cerrar").innerHTML = '<button class="btn btn-danger" onclick = "deleteImg();"><i class="fas fa-times"></i></button>';
            //Ocultar botón de agregar foto mientras haya foto
            // document.getElementById("icon-image").classList.add("d-none");

            //Se capturan los id de los inputs ocultos y se les da el mismo valor para saber si se cambió o no o si se eliminó la foto
            // document.getElementById("foto_actual").value = res.foto;


            document.getElementById("fecharegistro").value = res.fecha_registro;

            //Se muestra el modal
            $("#info_cliente").modal("show");
        }
    }
}
//Función para el botón editar cliente que recibe un parámetro id. Se mandará a llamar en el controlador usuario. En los botones de listar usuarios. 
function btnHistorialCliente(id) {
    const url = base_url + 'ClientesG/histoClientesG/' + id;
    const http = new XMLHttpRequest();
    http.open('GET', url, true);
    http.send();
    http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);
        console.log(this.responseText);
        let htmlHeader = `<thead class="thead table-dark"><tr>
        <th>ID</th>
        <th>Pago</th>
        <th>Abono</th>
        <th>Cuotas</th>
        <th>Atrasos</th>
        <th>Fecha</th>
        </tr></thead>`;
        let htmlBody = '';
            res.forEach(row => {
              htmlBody+=`<tr>
              <td>${row['id']}</td>
              <td>${"$ "+row['pago']}</td>
              <td>${"$ "+row['abono']}</td>
              <td>${row['cuotas_vencidas']}</td>
              <td>${row['dias_atraso']}</td>
              <td>${row['fecha_pago']}</td>
              </tr>`
            });
          
          
        document.getElementById("tblHistoClientesG").innerHTML = htmlHeader + '<tbody>' + htmlBody + '</tbody>';
        $('#histo_cliente').modal('show');       
      }
    };
}
  
  

//Función para el botón eliminar usuarios
function btnEliminarCliente(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        text: "¡El cliente no se eliminará de forma permanente, solo cambiará el estado a inactivo!",
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
            const url = base_url + "Clientes/eliminar/" + id;
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
                            'Cliente eliminado con éxito.',
                            'success'
                        )
                        //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                        tblClientes.ajax.reload();
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
function btnReingresarCliente(id) {
    Swal.fire({
        title: '¿Está seguro de reingresar?',
        text: "¡El usuario no se reingresará de forma permanente, solo cambiará el estado a activo!",
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
            const url = base_url + "Clientes/reingresar/" + id;
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
                        tblClientes.ajax.reload();
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

//Función para previsualizar fotos del producto. Esta función se llama en el index o donde se desea previsualizar una foto
function preview(e) {
    //Se almacena en una constante url. Indicando el indice donde se encuentra [0]
    const url = e.target.files[0];
    //Se almacena en una constante urlTmp (URL Temporal) dentro de esa constante, se crea una URL objeto con la palabra reservada createObjectURL. Donde se le pasa a la url o constante anterior .
    const urlTmp = URL.createObjectURL(url);
    //Se accede a la etiqueta mediante su id junto con su atributo src. Y se le pasa a la urlTmp (Constante anterior). 
    document.getElementById("img-preview").src = urlTmp;

    //Se accede a la etiqueta mediante su id y se le agrega una clase de bootstrap .add("d-none") para que oculte el botón después de mostrar la imagen. 
    document.getElementById("icon-image").classList.add("d-none");

    //Se accede a la etiqueta span mediante su id  y se le agrega un boton con código HTML (innerHTML). Y para mostrar el mombre la imagen después del botón se le coloca el ${} y dentro de ello se le coloca la constante url indicándole que se requiere el indice nombre['name']
    document.getElementById("icon-cerrar").innerHTML = `<button class="btn btn-danger" onclick = "deleteImg();"><i class="fas fa-times"></i></button>
    ${url['name']}`;
}

//Función del botón para que desaparezca la imagen que se previsualiza
function deleteImg() {
    //primero se limpia la imagen. Enviándole un vacío
    document.getElementById("icon-cerrar").innerHTML = '';

    //Se accede a la etiqueta mediante su id y se le agrega una clase de bootstrap .remove("d-none") para que quite la clase que se agregó y aparezca el botón después de quitar la imagen. 
    document.getElementById("icon-image").classList.remove("d-none");

    //Se accede a la etiqueta mediante su id junto con su atributo src. Y se le pasa un vacío para quitar la imagen previsualizada. 
    document.getElementById("img-preview").src = '';

    //Se accede a la etiqueta input por su id con el value, y se le pasa un vacío para que no guarde en la base de datos
    document.getElementById("imagen").value = '';

    //Se accede a la etiqueta input oculto por su id con el value, y se le pasa un vacío para comprobar que se quitó
    document.getElementById("foto_actual").value = '';
}