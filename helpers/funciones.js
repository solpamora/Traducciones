//obtiene el importe para luego realizar el calculo de retenciones ganancias

export function GetMontoCalcular (retgan_incluye_exng, es_pago_anticipo, pago_monto_neto, pago_monto_exng, pago_monto_total, pago_monto_anteriores_mes) { 
    var monto_base_calculo = 0;

    if (retgan_incluye_exng == 1) {
        if (es_pago_anticipo == 1) {
            monto_base_calculo = pago_monto_total + pago_monto_anteriores_mes;  
        } else {
            monto_base_calculo = pago_monto_neto + pago_monto_exng + pago_monto_anteriores_mes;
        }
    } else {
        monto_base_calculo = pago_monto_neto + pago_monto_anteriores_mes;  
        if (es_pago_anticipo == 1) {
            monto_base_calculo = pago_monto_total + pago_monto_anteriores_mes;  
        } 
    }

    return monto_base_calculo; 
} 

//obtiene el importe para luego realizar el calculo de retenciones IIBB

export function GetMontoCalcularRetencion (retiibb_incluye_exng, es_pago_anticipo, pago_monto_neto, pago_monto_exng, pago_monto_total) { 
    var monto_base_calculo = 0;

    if (retiibb_incluye_exng == 1) {
        monto_base_calculo = pago_monto_neto + pago_monto_exng;
    } else {
        if (es_pago_anticipo==1) {
        // console.log ("entro");
            monto_base_calculo = pago_monto_total;  
        }else{
            monto_base_calculo = pago_monto_neto;
        }
    }

    return monto_base_calculo; 
} 

export function MapearObjetoGananciasResponse (mensaje, modo, alicuota, retencion) {
	var obj;

	return obj = ({
		mensaje: mensaje,
		modo: modo,
		alicuota: alicuota,
		retencion: retencion
	});
}

export function MapearObjetoRetencionesResponse(mensaje, codigo_iso, alicuota, retencion) {
    var obj;
    var jurisdiccion = JurisdiccionPorIso(codigo_iso);
    var agencia = AgenciaPorIso(codigo_iso);
    
    return obj = ({
		mensaje:mensaje,
		jurisdiccion: jurisdiccion,
		agencia: agencia,
		alicuota: alicuota,
		retencion: retencion
	});
}

function JurisdiccionPorIso(codigo_iso) {
    var jurisdiccion = "";
    
    switch (codigo_iso) {
        case "AR-B":
            jurisdiccion = "902";
			break;
        case "AR-C":
            jurisdiccion = "901";
			break;
        case "AR-X":
            jurisdiccion = "904";
			break;
        case "AR-S":
			jurisdiccion = "921";
			break;
        case "AR-M":
            jurisdiccion = "913";
			break;
    }
    return jurisdiccion;
}

function AgenciaPorIso(codigo_iso) {
    var agencia = "";
    
    switch (codigo_iso) {
        case "AR-B":
            agencia = "ARBA";
			break;
        case "AR-C":
            agencia = "AGIP";
			break;
        case "AR-X":
            agencia = "CORDOBA";
			break;
        case "AR-S":
			agencia = "SANTA FE";
			break;
        case "AR-M":
            agencia = "MENDOZA";
			break;
    }
    return agencia;
}

export function FechaHabilitada (fechadesde, fechahasta, fechapago) {

    //console.log('la fecha es:'+fechapago);
	var D_1 = fechadesde.split("-");
	var D_2 = fechahasta.split("-");
	var D_3 = fechapago.split("/");

	var d1 = new Date(D_1[0],parseInt(D_1[1]),parseInt(D_1[2]));
	var d2 = new Date(D_2[0],parseInt(D_2[1]),parseInt(D_2[2]));
	var d3 = new Date(D_3[2],parseInt(D_3[1]),parseInt(D_3[0]));

	// console.log ('fecha convertida' + d2);
	if (d3 >= d1 && d3 <=d2) {
         return true;
    } else {
         return false;
    }
}


export function ConvertFechaApi (fechaconvertir) {

    var splitDate = fechaconvertir.split('-');
    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2]; 

    var  fecha=day + '/' + month + '/' + year;

    return fecha;
}


