import express from 'express';
import {createRequire} from 'module';
import {GetPagoGanancias} from '../helpers/ganancias.js';
import {GetPagoRetenciones} from '../helpers/retenciones.js';

const router = express.Router();

const require = createRequire(import.meta.url);

//Seccion EndPoint
//todos empiezan con calculadora

router.post('/', (req,res) => {

    //obiene los parametros
    const parametros = req.body;

    //Seccion :capturar los parametros recibidos
    var retgan_agente = parametros.retgan_agente;
    var retgan_aplica = parametros.retgan_aplica;
    var retgan_codigo_regimen = parametros.retgan_codigo_regimen;
    var retgan_inscripto = parametros.retgan_inscripto;
    var retgan_noinsc_phsi = parametros.retgan_noinsc_phsi;
    var pago_monto_neto = parametros.pago_monto_neto;
    var pago_monto_exng = parametros.pago_monto_exng;
    var pagos_anteriores_iva_retgan = parametros.pago_monto_anteriores_mes;
    var retgan_anteriores_mes = parametros.retgan_anteriores_mes;
    var retgan_incluye_exng = parametros.retgan_incluye_exng;
    var pago_anticipo = parametros.pago_anticipo;
    var pago_monto_total = parametros.pago_monto_total;
    var retiibb_agente = parametros.retiibb_agente;
    var retiibb_incluye_exng = parametros.retiibb_incluye_exng;
    var pago_cuit_proveedor = parametros.pago_cuit_proveedor;
    var codigo_iso = parametros.codigo_iso;
    var pago_fecha = parametros.pago_fecha;
    //fin de parametros
   
	//imprimir las variables
	//  console.log("retgan_agente =" + parametros.retgan_agente);
	//  console.log(" retgan_aplica =" + parametros.retgan_aplica);
	//  console.log(" retgan_codigo_regimen =" + parametros.retgan_codigo_regimen);
	//  console.log(" retgan_inscripto =" + parametros.retgan_inscripto);
	//  console.log(" retgan_noinsc_phsi =" + parametros.retgan_noinsc_phsi);
	//  console.log(" pago_monto_neto =" + parametros.pago_monto_neto);
	//  console.log(" pago_monto_exng =" + parametros.pago_monto_exng);
	//  console.log(" pagos_anteriores_iva_retgan =" + parametros.pagos_anteriores_iva_retgan);
	//  console.log(" retgan_anteriores_mes =" + parametros.retgan_anteriores_mes);
	//  console.log(" retgan_incluye_exng =" + parametros.retgan_incluye_exng);
	//  console.log(" pago_anticipo =" + parametros.pago_anticipo);
	//  console.log(" pago_monto_total =" + parametros.pago_monto_total);
	//  console.log(" retiibb_agente =" + parametros.retiibb_agente);
	//  console.log(" retiibb_incluye_exng =" + parametros.retiibb_incluye_exng);
	//  console.log(" pago_cuit_proveedor =" + parametros.pago_cuit_proveedor);
	//  console.log(" codigo_iso =" + parametros.codigo_iso);
	//  console.log(" pago_fecha =" + parametros.pago_fecha);


    var objganancias;
    var objretenciones;
    
    objganancias = GetPagoGanancias (
		pago_anticipo,
		pago_monto_neto,
		pago_monto_exng,
		pago_monto_total,
		pagos_anteriores_iva_retgan,
		retgan_agente,
		retgan_aplica,
		retgan_codigo_regimen,
		retgan_incluye_exng,
		retgan_inscripto,
		retgan_noinsc_phsi,
		retgan_anteriores_mes
	);


	//Recorrer por Jurisdiccion
	var RetIIBB_result=[];

	codigo_iso.forEach(function(table) {		
		var item_codigo_jurisdiccion = table.jurisdiccion;
		objretenciones = GetPagoRetenciones (
			pago_anticipo,
			pago_monto_neto,
			pago_monto_exng,
			pago_monto_total,
			pago_fecha,
			pago_cuit_proveedor,
			retiibb_agente,
			retiibb_incluye_exng,
			item_codigo_jurisdiccion
		);
		
		RetIIBB_result.push (objretenciones);
	
	});
	
	
       
    res.json({
		RetGanancias:{
			mensaje: objganancias.mensaje,
			modo: objganancias.modo,
			alicuota: objganancias.alicuota,
			retencion: objganancias.retencion
		},
		RetIIBB:[RetIIBB_result]
		
	 });
    res.status(200).send(); 
});

export default router;