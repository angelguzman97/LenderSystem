<?php  include "Views/Templates/header.php"; ?>
<script src="<?php echo base_url; ?>Assets/js/funcionesAdmin.js"></script>
<ol class="breadcrumb mb-4 bg-light">
    <li class="breadcrumb-item active fw-bolder fs-4" style="color: black;">Todos Los Clientes</li>
</ol>
<!--Botón de agregar nuevo Cliente-->

<!--El cuerpo de la tabla está almacenado en una variable con una función de ajax. Vor eso se le colocó un id la tabla-->
<table class="table table-responsive" id="tblClientesG">
    <thead class="thead table-dark">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Crédito</th>
            <th>Ruta</th>
            <th>Estado</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
        </tr>
    </tbody>
</table>
<!--------------------------Información--------------------------->
<div id="info_cliente" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <!--Se cambia el id del h5 para poder acceder a la función btnEditarUser-->
                <h5 class="modal-title text-white" id="title">Nuevo Cliente</h5>
                <button class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden='true'>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Formulario de cliente -->
                <form id="frmClientes" method="post">
                    <div class="form-group">
                        <label for="nombre" class="fw-bold">Nombre(s)</label>
                        <input style="border: 0;" id="cliente" class="form-control" type="text" name="cliente" readonly>
                    </div>
                    <div class="form-group mt-2">
                        <label for="apellidos" class="fw-bold">Apellidos</label>
                        <input id="apellidos" class="form-control" type="text" name="apellidos" readonly>
                    </div>
                    <div class="row">
                    <div class="col-3 form-group mt-2">
                        <label for="edad" class="fw-bold">Edad</label>
                        <!--Esto es para mostrar el id en un input oculto agregado en cualquier parte del formulario-->
                        <input type="hidden" id="id" name="id"></input>
                        <input id="edad" class="form-control " type="number" name="edad" readonly>
                    </div>
                    <div class="col-4 form-group mt-2">
                        <label for="telefono" class="fw-bold">Teléfono</label>
                        <input id="telefono" class="form-control" type="text" name="telefono" readonly>
                    </div>
                    </div>
                    <div class="form-group mt-2" >
                        <label for="direccion" class="fw-bold">Dirección</label>
                        <input id="direccion" class="form-control" name="direccion" readonly>
                    </div>       
                    <div class="form-group mt-2">
                        <label for="trabajo" class="fw-bold">Trabajo</label>
                        <input id="trabajo" class="form-control" name="trabajo" readonly>
                    </div>
                    <div class="col-md-12 w-50">
                    <div class="form-group">
                      <label class="fw-bold" class="fw-bold">Foto</label><br>
                      <!--Se crea esta etiqueta para previsualizar la imagen a subir y se le coloca un id-->
                      <img class="img-thumbnail" src="" id="img-preview">
                        </div>
                    </div>       
                    <div class="form-group  col-xs-12">
                        <label for="fecharegistro" class="fw-bold">Fecha de registro</label>
                        <input id="fecharegistro" class="form-control" type="text" name="fecharegistro" readonly>
                    </div>
                    <button class="btn btn-danger mt-2" type="button" data-bs-dismiss="modal">Cerrar</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!-------------------------------Historial------------------------>
<div id="histo_cliente" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <!--Se cambia el id del h5 para poder acceder a la función btnEditarUser-->
                <h5 class="modal-title text-white" id="title">Historial</h5>
                <button class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden='true'>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-responsive" id="tblHistoClientesG">
                </table>
                 
            </div>
        </div>
    </div>
</div>


<link href="<?php echo base_url; ?>Assets/css/styles.css" rel="stylesheet" />
<?php include "Views/Templates/footer.php";  ?>
