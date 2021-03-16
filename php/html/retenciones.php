<?php require_once('resources/html/head.php'); ?>
	<title>Calculadora</title>
	
<body id="page-top">

<!-- Page Wrapper -->
<div id="wrapper">
    <?php require_once('resources/html/nav.php'); ?>

     <!-- Content Wrapper -->
     <div id="content-wrapper" class="d-flex flex-column">
         <!-- Main Content -->
        <div id="content">
        <?php require_once('resources/html/navtop.php'); ?>
            <div class="container-fluid">   
                <!-- Page Heading -->
                    
                <!-- fin Page Heading -->
                <!--editar-->
                <div class="card shadow mb-4">
                    <div class="card-body">
                    <form id="form1" style="" >
						<div class="card-header py-2">
							<div class="row">
								<div class="col-sm-3">
									<h5 class="m-0 font-weight-bold text-primary">Datos del Pago</h5>
								</div>
							</div>
						</div>

                        <div class="form-group">
                            <div class="row">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Fecha de Pago </label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="" name="pago_fecha" placeholder="dd/mm/yyyy" class="form-control" data-vv-id="1" aria-required="false" aria-invalid="false" value="<?php echo date("d/m/Y") ?>">
                                </div>
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Es Anticipo</label>
                                </div>
                                <div class="col-sm-2">
                                <label class="btn btn-sm "><input type="radio" id="obligatorio" name="pago_anticipo" value="1"> Si</label> 
                                    <label class="btn btn-sm "><input type="radio" id="obligatorio" name="pago_anticipo" value="0" checked> No</label>
                                </div>
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Cuit Proveedor </label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="" name="pago_cuit_proveedor"   placeholder="" class="form-control" data-vv-id="1" aria-required="false" aria-invalid="false">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Importe total del pago  </label>
                                 </div>
                                 <div class="col-sm-2">
                                    <input type="number" id="pago_monto_total" name="pago_monto_total"   placeholder="" class="form-control" data-vv-id="1" aria-required="false" aria-invalid="false" onchange="$('#pago_monto_neto').val($('#pago_monto_total').val()); " value="100000">
                                </div>
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Importe neto de IVA</label>
                                 </div>
                                 <div class="col-sm-2">
                                    <input type="number" id="pago_monto_neto" name="pago_monto_neto"   placeholder="" class="form-control" data-vv-id="1" aria-required="false" aria-invalid="false" value="100000">
                                </div>
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Importes NG</label>
                                 </div>
                                 <div class="col-sm-2">
                                    <input type="number" id="pago_monto_exng" name="pago_monto_exng"   placeholder="" class="form-control" data-vv-id="1" aria-required="false" aria-invalid="false" value="0">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Pagos ant. en el mes, netos de IVA  </label>
                                 </div>
                                 <div class="col-sm-2">
                                    <input type="number" id="pago_monto_anteriores_mes" name="pago_monto_anteriores_mes"   placeholder="" class="form-control" data-vv-id="1" aria-required="false" aria-invalid="false" value="0">
                                </div>
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">RETGAN anteriores en el mes </label>
                                 </div>
                                 <div class="col-sm-2">
                                    <input type="number" id="retgan_anteriores_mes" name="retgan_anteriores_mes"   placeholder="" class="form-control" data-vv-id="1" aria-required="false" aria-invalid="false" value="0">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                            </div>
                        </div>

						<div class="card-header py-2">
							<div class="row">
								<div class="col-sm-3">
									<h5 class="m-0 font-weight-bold text-primary">Ganancias</h5>
								</div>
							</div>
						</div>

                        <div class="form-group">
                            <div class="row">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Soy Agente de RETGAN </label>
                                </div>
                                <div class="col-sm-2">
                                <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retgan_agente" value="1" checked> Si</label> 
                                    <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retgan_agente" value="0"> No</label>
                                </div>

                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Aplicar RETGAN en pagos </label>
                                </div>
                                <div class="col-sm-2">
                                <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retgan_aplica" value="1" checked> Si</label> 
                                    <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retgan_aplica" value="0"> No</label>
                                </div>
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Incluir NG en base imponible de RETGAN </label>
                                </div>
                                <div class="col-sm-2">
                                <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retgan_incluye_exng" value="1" checked> Si</label> 
                                    <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retgan_incluye_exng" value="0"> No</label>
                                </div>
                            </div>
                        </div>
                       
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Situación Proveedor en Ganancias</label>
                                 </div>
                                 <div class="col-sm-2">
                                 <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retgan_inscripto" value="1" checked> Insc</label> 
                                    <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retgan_inscripto" value="0"> No Insc</label>
                                </div>
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label " >En caso de ser No Inscripto  </label>
                                 </div>
                                 <div class="col-sm-4">
                                 <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retgan_noinsc_phsi" value="1" > Es PF o Suc. Indiv.</label> 
                                    <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retgan_noinsc_phsi" value="0" checked> No es PF o Suc. Indiv.</label>
                                </div>
                                
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Régimen aplicable Proveedor</label>
                                 </div>
                                 <div class="col-sm-8">
                                    <select class="form-control" id="obligatorio" name="retgan_codigo_regimen">
                                        <option value="32">(32) Alquileres de bienes inmuebles rurales, incluyendo leasing (incluye subrurales) </option>
                                        <option value="31">(31) Alquileres de bienes inmuebles urbanos, incluyendo leasing (incluye suburbanos) </option>
                                        <option value="30">(30) Alquileres o arrendamientos de bienes muebles</option>
                                        <option value="112">(112) Beneficios provenientes del cumplimiento de los requisitos de los planes de seguro de retiro...</option>
                                        <option value="25">(25) Comisionista, rematador, consignatario y demás auxiliares de comercio</option>
                                        <option value="124">(124) Corredor, viajante de Comercio, y Despachante de Aduana</option>
                                        <option value="55">(55) Distribucion de peliculas. Transmision de programas. Television via satelital</option>
                                        <option value="78">(78) Enajenación de bienes muebles y bienes de cambio</option>
                                        <option value="110">(110) Explotacion de derechos de autor</option>
                                        <option value="116">(116) Honorarios de Director de Sociedad....</option>
                                        <option value="43">(43) Interés accionario, excedentes y retornos cooperativas (excepto las de consumo) </option>
                                        <option value="19">(19) Intereses por operaciones Realizadas en entidades financieras...</option>
                                        <option value="94" selected="selected">(94) Locaciones de obra y/o servicios no ejecutados en relación de dependencia</option>
                                        <option value="51">(51) Obligaciones de no hacer, o por abandono o no ejercicio de una actividad</option>
                                        <option value="53">(53) Operaciones realizadas por intermedio de mercados de cereales a termino...</option>
                                        <option value="111">(111) Otra cesion o locacion de derechos, excepto operaciones mercados de cereal...</option>
                                        <option value="21">(21) Otros Intereses originados en operaciones no comprendidas</option>
                                        <option value="35">(35) Regalías</option>
                                        <option value="113">(113) Rescates -totales o parciales- por desistimiento de los planes de seguro de retiro...</option>
                                        <option value="779">(779) Subsidios abonados por el Estado, por enajenación de bienes muebles y bienes de cambio</option>                
                                        <option value="86">(86) Transferencia temporaria o definitiva de derechos de llave, marcas, patentes, etc</option>
                                        <option value="95">(95) Transporte de carga nacional e internacional</option>

                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                            </div>
                        </div>

						<div class="card-header py-2">
							<div class="row">
								<div class="col-sm-3">
									<h5 class="m-0 font-weight-bold text-primary">IIBB</h5>
								</div>
							</div>
						</div>

                        <div class="form-group">
                            <div class="row">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Soy Agente de RETIIBB </label>
                                </div>
                                <div class="col-sm-2">
                                <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retiibb_agente" value="1" checked> Si</label> 
                                    <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retiibb_agente" value="0"> No</label>
                                </div>

                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Aplicar RETIIBB en</label>
                                </div>
                                <div class="col-sm-2">
                                <input disabled type="checkbox" name="iso_b" value="AR-B"> <label for="cbox2">AR-B (ARBA)</label></input><br>
                                <input disabled type="checkbox" name="iso_c" value="AR-C" checked> <label for="cbox2">AR-C (AGIP)</label></input><br>
                                <input disabled type="checkbox" name="iso_x" value="AR-X"> <label for="cbox2">AR-X (Cordoba)</label></input><br>
                                <input disabled type="checkbox" name="iso_s" value="AR-S"> <label for="cbox2">AR-S (Santa Fe)</label></input><br>
                                <input disabled type="checkbox" name="iso_m" value="AR-M"> <label for="cbox2">AR-M (Mendoza)</label></input><br>
                                
                                </div>
                                <div class="col-sm-2">
                                    <label for="titulo" class="control-label">Incluir NG en base imponible de RETIIBB </label>
                                </div>
                                <div class="col-sm-2">
                                <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retiibb_incluye_exng" value="1" checked> Si</label> 
                                    <label class="btn btn-sm "><input type="radio" id="obligatorio" name="retiibb_incluye_exng" value="0"> No</label>
                                </div>
                               
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                
                            </div>
                        </div>
                       
                        <div class="form-group">
                            <div class="row">
                            </div>
                        </div>

						<div class="card-header py-2">
							<div class="row">
								<div class="col-sm-8">
									<button type="button" class="btn btn-primary edit"><i class="load-indicator"><div class="v-spinner" style="display: none;"><div class="v-clip" style="height: 20px; width:20px; border-width: 2px; border-style: solid; border-color: rgb(255,255, 255) rgb(255, 255,255) transparent; border-radius: 100%; background:transparent;"></div></div></i> Realizar cálculo <i class="fas fa-calculator"></i></button>
								</div>
							</div>
						</div>
                        
                        <div class="form-group">
                            <div class="row">
                            </div>
                        </div>

						<div class="card-header py-2">
							<div class="row">
								<div class="col-sm-3">
									<h5 class="m-0 font-weight-bold text-primary">Resultado</h5>
								</div>
							</div>
						</div>
                        <div class="form-group">
							<pre id="resultadojson" class="resultadojson">
						</div>

                        </form>
                        
                    </div>
                </div>
                        
                 </pre>
                <!-- fin editar -->
            </div> 
        </div>
      <!-- End of Main Content -->

     </div>
     <!-- End of Page Wrapper -->

</div>	
<!-- End of Page Wrapper -->
 

  <?php require_once('resources/html/script.php'); ?>  
<?php require_once('resources/html/footer.php'); ?>


<script> 
$(".edit").on('click', function () {
    var formData = new FormData(form1);

	$(".ajax-msg").html("Aguarde unos minutos, estamos procesando su pedido... ");
	$("#miModal").modal("show");
	$.ajax({
		url: '<?php echo SITEROOT ?>resources/middleware/calcular.php', 
		type: 'POST', 
		dataType: 'JSON', 
		data: formData,
		contentType: false, 
		processData: false,
		success: function(data){
			if (data.status == 'success'){
				$("#miModal").modal("hide");
				var respuesta = JSON.stringify(JSON.parse(data.mensaje), null, 2);
			    //console.log()
				$(".resultadojson").text(respuesta);
				//$(".resultadojson").html(data.mensaje); 
				//$("#miModal").modal("show");
			} else {
				$('[id=obligatorio]').css('border', '1px solid #1fadf2'); 
				$(".ajax-msg").html(data.mensaje);
				$("#miModal").modal("show");
			}; 
		},
		error: function(data){
		}
	}); 
}); 
</script> 
</body> 
</html> 
