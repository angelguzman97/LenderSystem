//Recibimos el JSON de los Controladores Usuarios, Clientes de la función listarEmpleado y listarCliente mediante AJAX
let tblMedidas, tblCategorias;
////////////////////Funciones Usuarios//////////////////
//Se comprueba si el documento ya se cargó
document.addEventListener("DOMContentLoaded", function (){
    //La variable tblUsuarios es igual a nuestra datatable. Tabla de los empleados 
   //La variable tblClientes es igual a nuestra datatable. Tabla de los clientes
//    tblUsuarios = $("#tblUsuarios").DataTable({
//     ajax: {
//         //Se manda al controlador Clientes y al método listarCliente
//         url: base_url + "Usuarios/listarEmpleado",
//         dataSrc: ''
//     },
//     columns: [{
//         'data': 'id'
//     },
//     {
//         'data': 'nombre'
//     },
//     {
//         'data': 'estado'
//     },
//     {
//         'data': 'acciones'
//     }]
// });

    //La variable tblMedidas es igual a nuestra datatable. Tabla de las medidas
    tblMedidas = $("#tblMedidas").DataTable({
        ajax: {
            //Se manda al controlador Medidas y al método listarMedida
            url: base_url + "Medidas/listarMedida",
            dataSrc: ''
        },
        columns: [{
            'data': 'id'
        },
        {
            'data': 'nombre'
        },
        {
            'data': 'nombre_corto'
        },
        {
            'data': 'estado'
        },
        {
            'data': 'acciones'
        }]
    });

    //La variable tblCategorias es igual a nuestra datatable. Tabla de las categorías
    tblCategorias = $("#tblCategorias").DataTable({
        ajax: {
            //Se manda al controlador Categorias y al método listarCategoria
            url: base_url + "Categorias/listarCategoria",
            dataSrc: ''
        },
        columns: [{
            'data': 'id'
        },
        {
            'data': 'nombre'
        },
        {
            'data': 'estado'
        },
        {
            'data': 'acciones'
        }]
    });
})




////////////////////Funciones Medidas//////////////////
//Funcion modal
function frmMedida() {
    //Toma el id del h5 del modal del index Usuario y sustituye el título
    document.getElementById("title").innerHTML = "Nueva medida";
    document.getElementById("btnAccion").innerHTML = "Registrar";

    //Se resetea el formulario para que no se muestren los datos ya registrados
    document.getElementById("frmMedidas").reset();

    //Se muestra el modal
    $("#nueva_medida").modal("show");

    //Se accede al id con document.getElementById() para poder limpiar los id de tipo hiden. Pasándolo vacío
    document.getElementById("id").value = "";
}

//Función para registrar y modificar cliente
function registrarMedida(e) {
    e.preventDefault();
    //Se crea la constante donde accede a los id de cada input del index o vista y los almacena en él
    const nombre = document.getElementById("nombre");
    const nombre_corto = document.getElementById("nombre_corto");

    if (nombre.value == "" || nombre_corto.value == "") {
        //SweetAlert2. Su ruta está en el footer dentro de templates de Views. Es una alerta
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })
    } else { //< petición mediante AJAX usando el xml request
        //Se crea una constante que almacena la url y concatena con el controlador Medidas y su método registrar 
        const url = base_url + "Medidas/registrar";
        //Se crea una constante donde se almacena el id del formulario de registrar usuarios
        const frm = document.getElementById("frmMedidas");
        //Se crea una constante y se crea una nueva instancia del objeto XMLHttpRequest
        const http = new XMLHttpRequest();
        //Se crea una condición Por el método POST, se le envía una url y que se ejecuta de forma asincrona(booleana)
        http.open("POST", url, true);
        //Se envía la petición, siendo nueva con un FormData y dentro de ella la constante en este caso el frm 
        http.send(new FormData(frm));
        //Se verifica el estado por medio de un onreadystatechange. El onreadystatechange se va a estar ejecutando cada vez que el state change esté cambiando 
        http.onreadystatechange = function () {
            //validación. Si el estatus es igual a 200 la respuesta está lista.
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                //Se convierte el mensaje a un JSON
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Medida registrada con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    //Reseteo de formulario
                    frm.reset();
                    //Ocultar el modal
                    $("#nueva_medida").modal("hide");

                    //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                    tblMedidas.ajax.reload();

                    //Se verifica si res es igual al mensaje modificado del controlador
                } else if (res == "modificado") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Medida modificada con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })

                    //Ocultar el modal
                    $("#nueva_medida").modal("hide");

                    //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                    tblMedidas.ajax.reload();


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
function btnEditarMedida(id) {
    //Toma el id del h5 del modal del index Usuario y sustituye el título
    document.getElementById("title").innerHTML = "Actualizar medida";
    document.getElementById("btnAccion").innerHTML = "Modificar";

    //Mostrar los datos reistrados para modificar los datos
    //Se crea una constante que almacena la url y concatena con el controlador Usuarios y su método editar y se concatena el parárametro que su colocó en dentro de la función
    const url = base_url + "Medidas/editar/" + id;
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
            document.getElementById("nombre").value = res.nombre;
            document.getElementById("nombre_corto").value = res.nombre_corto;
            //Se muestra el modal
            $("#nueva_medida").modal("show");
        }
    }
}

//Función para el botón eliminar usuarios
function btnEliminarMedida(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        text: "¡La medida no se eliminará de forma permanente, solo cambiará el estado a inactivo!",
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
            const url = base_url + "Medidas/eliminar/" + id;
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
                            'Medida eliminada con éxito.',
                            'success'
                        )
                        //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                        tblMedidas.ajax.reload();   
                    }else{
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
function btnReingresarMedida(id) {
    Swal.fire({
        title: '¿Está seguro de reingresar?',
        text: "¡La medida no se reingresará de forma permanente, solo cambiará el estado a activo!",
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
            const url = base_url + "Medidas/reingresar/" + id;
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
                            'Medida reingresada con éxito.',
                            'success'
                        )
                        //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                        tblMedidas.ajax.reload();   
                    }else{
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

////////////////////Funciones Categorias//////////////////
//Funcion modal
function frmCategoria() {
    //Toma el id del h5 del modal del index Usuario y sustituye el título
    document.getElementById("title").innerHTML = "Nueva categoria";
    document.getElementById("btnAccion").innerHTML = "Registrar";

    //Se resetea el formulario para que no se muestren los datos ya registrados
    document.getElementById("frmCategorias").reset();

    //Se muestra el modal
    $("#nueva_categoria").modal("show");

    //Se accede al id con document.getElementById() para poder limpiar los id de tipo hiden. Pasándolo vacío
    document.getElementById("id").value = "";
}

//Función para registrar y modificar cliente
function registrarCategoria(e) {
    e.preventDefault();
    //Se crea la constante donde accede a los id de cada input del index o vista y los almacena en él
    const nombre = document.getElementById("nombre");

    if (nombre.value == "") {
        //SweetAlert2. Su ruta está en el footer dentro de templates de Views. Es una alerta
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Coloque el nombre la categoria',
            showConfirmButton: false,
            timer: 3000
        })
    } else { //< petición mediante AJAX usando el xml request
        //Se crea una constante que almacena la url y concatena con el controlador Usuarios y su método registrar 
        const url = base_url + "Categorias/registrar";
        //Se crea una constante donde se almacena el id del formulario de registrar usuarios
        const frm = document.getElementById("frmCategorias");
        //Se crea una constante y se crea una nueva instancia del objeto XMLHttpRequest
        const http = new XMLHttpRequest();
        //Se crea una condición Por el método POST, se le envía una url y que se ejecuta de forma asincrona(booleana)
        http.open("POST", url, true);
        //Se envía la petición, siendo nueva con un FormData y dentro de ella la constante en este caso el frm 
        http.send(new FormData(frm));
        //Se verifica el estado por medio de un onreadystatechange. El onreadystatechange se va a estar ejecutando cada vez que el state change esté cambiando 
        http.onreadystatechange = function () {
            //validación. Si el estatus es igual a 200 la respuesta está lista.
            if (this.readyState == 4 && this.status == 200) {
                
                //Se convierte el mensaje a un JSON
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Categoría registrada con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    //Reseteo de formulario
                    frm.reset();
                    //Ocultar el modal
                    $("#nueva_categoria").modal("hide");

                    //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                    tblCategorias.ajax.reload();

                    //Se verifica si res es igual al mensaje modificado del controlador
                } else if (res == "modificado") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Categoria modificada con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })

                    //Ocultar el modal
                    $("#nueva_categoria").modal("hide");

                    //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                    tblCategorias.ajax.reload();


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

//Función para el botón editar caja que recibe un parámetro id. Se mandará a llamar en el controlador cajas. En los botones de listar cajas. 
function btnEditarCategoria(id) {
    //Toma el id del h5 del modal del index Usuario y sustituye el título
    document.getElementById("title").innerHTML = "Actualizar categoría";
    document.getElementById("btnAccion").innerHTML = "Modificar";

    //Mostrar los datos reistrados para modificar los datos
    //Se crea una constante que almacena la url y concatena con el controlador Usuarios y su método editar y se concatena el parárametro que su colocó en dentro de la función
    const url = base_url + "Categorias/editar/" + id;
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
            document.getElementById("nombre").value = res.caja;
            //Se muestra el modal
            $("#nueva_categoriaa").modal("show");
        }
    }
}

//Función para el botón eliminar categorías
function btnEliminarCategoria(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        text: "¡La categoría no se eliminará de forma permanente, solo cambiará el estado a inactivo!",
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
            const url = base_url + "Categorias/eliminar/" + id;
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
                            'Categoría eliminada con éxito.',
                            'success'
                        )
                        //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                        tblCategorias.ajax.reload();   
                    }else{
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

//Función para el botón reingresar caja y secrea una función similar en el controlador caantidades
function btnReingresarCategoria(id) {
    Swal.fire({
        title: '¿Está seguro de reingresar?',
        text: "¡La categoría no se reingresará de forma permanente, solo cambiará el estado a activo!",
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
            const url = base_url + "Categorias/reingresar/" + id;
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
                            'Categoría reingresada con éxito.',
                            'success'
                        )
                        //Se llama a la variable de la tabla para recarga la página después de registrar un usuario por medio de AJAX
                        tblCategorias.ajax.reload();   
                    }else{
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