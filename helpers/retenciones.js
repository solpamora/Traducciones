import {GetMontoCalcularRetencion,MapearObjetoRetencionesResponse,ConvertFechaApi} from './funciones.js';
import {createRequire} from 'module';

const require = createRequire(import.meta.url);

//seccion: tablas del aplicativo
const tabla_iibb_alicuota_provincia = require("../bases/tabla_iibb_alicuotas_provincia.json");
// fin seccion

var axios = require('axios') ;

//fin obtener json alicuota

let JSONSql = require('json-sql-tool');
let objUtil = new JSONSql();

var _ = require("underscore");

//Seccion Funciones Exportadas
export function GetPagoRetenciones(
    pago_anticipo,
    pago_monto_neto,
    pago_monto_exng,
    pago_monto_total,
    pago_fecha,
    pago_cuit_proveedor,
	retiibb_agente,
    retiibb_incluye_exng,
    codigo_iso
) { 

    

    //definir las variables
    var alicuota_porcentaje = 0;
	var mensaje = "";
    var monto_minimo_imponible = 0;
    var importe_retencion = 0;

    //fin de variables

    if (retiibb_agente == 0) {
        return MapearObjetoRetencionesResponse("No es agente de RETIIBB", codigo_iso, "", "");
    }
    
    //inicia proceso
    var importe_calcular = GetMontoCalcularRetencion(retiibb_incluye_exng, pago_anticipo, pago_monto_neto, pago_monto_exng, pago_monto_total) ;
    
    
    //busco primero en la tabla por ISO
    let result_iibb = objUtil.select('alicuota,monto_minimo_imponible')
        .from(tabla_iibb_alicuota_provincia)
        .where('codigo_iso','=', codigo_iso)
        .fetch();

    if (result_iibb.length === 0) {
        return MapearObjetoRetencionesResponse("No se encontro ningun dato en IBB por codigo_iso", codigo_iso , "", ""); 
    } else {
        alicuota_porcentaje =  result_iibb[0].alicuota;
        monto_minimo_imponible = result_iibb[0].monto_minimo_imponible;
    }

 
    let fechaapiconsulta=ConvertFechaApi(pago_fecha);

    let alicuota_cuit=0;

//#region  consultar Api Externa
    const codigoisobuscar= codigo_iso.replace('-','');
    let url='https://api.usinadataservices.com.ar/v1/archivos/alicuota_retencion/' + codigoisobuscar + '/'+ pago_cuit_proveedor + '?fechadesde=' + fechaapiconsulta + '&fechahasta=' + fechaapiconsulta 
    const username = 'usina'
    const password = 'digital'
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    axios.get(url, {
        headers: {
            'Authorization': `Basic ${token}`
        }
    })
        .then((res) => {
            alicuota_cuit=res.data.results[0][0].uds_alicuota;
           // console.log(alicuota_cuit);
    })
    .catch((error) => {
        console.error(error)
    })

  //#endregion  

  
    if (alicuota_cuit != 0) {
        //valido las fechas
            alicuota_porcentaje = alicuota_porcentaje.replace(",",".");
            alicuota_porcentaje=alicuota_cuit;
			mensaje = "Encontrado en padrón de retenciones " + codigo_iso + ". Aplica alícuota personalizada " + alicuota_porcentaje
		//}
    } else {
		mensaje = "No se dispone padrón de alícuotas de retenciones para provincia " + codigo_iso + ", se utiliza alícuota genérica de la jurisdicciónNo está en padrón de retenciones. Aplica alícuota genérica " + alicuota_porcentaje
	}

    if (importe_calcular <= monto_minimo_imponible) {
        return MapearObjetoRetencionesResponse('El importe no supera el monto minimo imponible', codigo_iso, '', '');
    }

     //realiza el calculo   
   
    importe_retencion = ((importe_calcular)  * (alicuota_porcentaje /100) );

    return MapearObjetoRetencionesResponse(mensaje, codigo_iso, alicuota_porcentaje, importe_retencion.toFixed(2));                
} 

 //Fin de Seccion