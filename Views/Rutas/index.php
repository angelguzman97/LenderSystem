<?php include "Views/Templates/header.php"; ?>
<script src="<?php echo base_url; ?>Assets/js/funcionesUsuarios.js"></script>
<ol class="breadcrumb mb-4 bg-light">
    <li class="breadcrumb-item active fw-bolder fs-4" style="color: black;">Rutas</li>
</ol>
<!--Botón de agregar nuevo ruta-->
<button class="btn btn-primary mb-2" type="button" onclick="frmRuta();"><i class="fa-solid fa-user-plus"></i></button>
<!--El cuerpo de la tabla está almacenado en una variable con una función de ajax. Vor eso se le colocó un id la tabla-->
<table class="table table-responsive" style="text-align: center;" id="tblRutas">
    <thead class="thead table-dark">
        <tr>
            <th style="width: 20px;">Ruta</th>
            <th style="width: 20px;">Estado</th>
            <th style="width: 80px;"></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
        </tr>
    </tbody>
</table>
<!-- Información de las Rutas-->
<div id="nueva_ruta" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <!--Se cambia el id del h5 para poder acceder a la función btnEditarUser-->
                <h5 class="modal-title text-white" id="title">Nueva Ruta</h5>
                <button class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden='true'>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Formulario de ruta -->
                <form id="frmRutas" method="post">
                    <div class="form-group">
                        <label for="ruta">Ruta</label>
                        <!--Esto es para mostrar el id en un input oculto agregado en cualquier parte del formulario-->
                        <input type="hidden" id="id" name="id"></input>
                        <input id="ruta" class="form-control" type="text" name="ruta" placeholder="Ruta/Ruta">
                    </div>
                    <div class="form-group mt-2">
                        <label for="nombre">Nombre</label>
                        <input id="nombre" class="form-control" type="text" name="nombre" placeholder="Nombre">
                    </div>
                    <div class="form-group mt-2">
                        <label for="telefono">Núm. De teléfono</label>
                        <input id="telefono" class="form-control" type="text" name="telefono" placeholder="Núm. De tel.">
                    </div>

                    <!--Se le agrega un id a las fias de las contraseñas para ocultarlos al editar los rutas y no se visualicen y que el ruta pueda cambiarlo por sí mismo-->
                    <div class="row" id="claves">
                        <div class="col-md-6">
                            <div class="form-group mt-2">
                                <label for="clave">Contraseña</label>
                                <input id="clave" class="form-control" type="password" name="clave" placeholder="Contraseña">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mt-2">
                                <label for="confirmar">Confirmar contraseña</label>
                                <input id="confirmar" class="form-control" type="password" name="confirmar" placeholder="Confirmar contraseña">
                            </div>
                        </div>
                    </div>
                                       
                    <button class="btn btn-primary mt-2" type="button" onclick="registrarRuta(event);" id="btnAccion">Registrar</button>
                    <button class="btn btn-danger mt-2" type="button" data-bs-dismiss="modal">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Lista de clientes de las Rutas-->
<div id="lista_cliente" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <!--Se cambia el id del h5 para poder acceder a la función btnEditarUser-->
                <h5 class="modal-title text-white" id="title">Lista de clientes</h5>
                <button class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden='true'>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-responsive tblListaClientes" id="tblListaClientes">
                </table>
                 
            </div>
        </div>
    </div>
</div>

<?php include "Views/Templates/footer.php"; ?>
<link href="<?php echo base_url; ?>Assets/css/styles.css" rel="stylesheet" />