<?php include "Views/Templates/header.php"; ?>
<div class="card">
    <div class="card-header bg-dark text-white fs-4">
       Pagos del Día
    </div>
    <div class="card-body">
        <form id="frmEmpresa">
            <div for="clientes">
            <div class="col-6"><div class="form-group mt-2"><label for="clientes programados" class="fw-bold">Clientes Programados:</label><input style="border: 0; width: 35px;" id="clientes_programados" name="clientes_programados" value=" 31" readonly ></div></div>
            
            <div class="col-6"><div class="form-group mt-2"><label for="clientes visitados" class="fw-bold">Clientes Visitados:</label><input style="border: 0; width: 35px;" id="clientes_visitados" name="clientes_visitados" value=" 25" readonly ></div></div>
            
            <div class="col-6"><div class="form-group mt-2"><label for="clientes pendientes" class="fw-bold">Clientes Pendientes:</label><input style="border: 0; width: 35px;" id="clientes_pendientes" name="clientes_pendientes" value="6" readonly ></div></div>
            </div>
            <!-------------Caja inicial-------------------->
            <div for="caja inicial">
            <div class="col-6"><div class="form-group mt-2"><label for="Caja" class="fw-bold">Caja Inicial: $</label><input style="border: 0; width: 35px;" id="caja_inicial" name="caja_inicial" value="2,305" readonly ></div></div>
            </div>
            <!-------------ingresos y cobros-------------------->
            <div for="ingresos y cobros">
            <div class="col-6"><div class="form-group mt-2"><label for="ingresos" class="fw-bold">Ingresos: $</label><input style="border: 0; width: 35px;" id="ingresos" name="ingresos" value="0" readonly ></div></div>
            
            <div class="col-6"><div class="form-group mt-2"><label for="cobrado" class="fw-bold">Cobrado: $</label><input style="border: 0; width: 35px;" id="cobrado" name="cobrado" value="5,495" readonly ></div></div>
            </div>

            <!-------------Retiros, Prestamos y Gastos-------------------->
            <div for="Retiros, Prestamos y Gastos">
            <div class="col-6"><div class="form-group mt-2"><label for="retiros" class="fw-bold">Retiros: $</label><input style="border: 0; width: 35px;" id="retiros" name="retiros" value="0" readonly ></div></div>
            
            <div class="col-6"><div class="form-group mt-2"><label for="prestamos" class="fw-bold">Prestamos: $</label><input style="border: 0; width: 35px;" id="prestamos" name="prestamos" value="0" readonly ></div></div>

            <div class="col-6"><div class="form-group mt-2"><label for="gastos" class="fw-bold">Gastos: $</label><input style="border: 0; width: 35px;" id="gastos" name="gastos" value="0" readonly ></div></div>
            </div>

            <!-------------Caja final-------------------->
            <div for="caja final">
            <div class="col-6"><div class="form-group mt-2"><label for="Caja final" class="fw-bold">Caja Final: $</label><input style="border: 0; width: 35px;" id="caja_final" name="caja_final" value="7,800" readonly ></div></div>
            </div>





            <button class="btn btn-primary mt-2" type="button" onclick="modificarEmpresa()">Modificar</button>
        </form>
    </div>
</div>

<?php include "Views/Templates/footer.php"; ?>