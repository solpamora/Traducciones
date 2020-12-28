import {GetMontoCalcularRetencion,MapearObjetoRetencionesResponse,FechaHabilitada} from './funciones.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

//seccion: tablas del aplicativo
const tabla_iibb_cuit = require("../bases/tabla_iibb_cuit.json");
const tabla_iibb_alicuota_provincia = require("../bases/tabla_iibb_alicuotas_provincia.json");
// fin seccion


let JSONSql=require('json-sql-tool');
let objUtil=new JSONSql();

var _ = require("underscore");


//Seccion Funciones Exportadas
export function GetPagoRetenciones(agente_retiibb,
    incluye_exento_no_gravado_retencion_iibb,
    cuit_proveedor,
    codigo_iso,
    anticipo,
    monto_neto_pago,
    monto_no_gravado_pago,
    monto_total_pago,
    fecha_pago
                                ) 
{ 
    //definir las variables
    var alicuota_porcentaje=0;
    var monto_minimo_imponible=0;
    var importe_retencion=0;


    //fin de variables


    if (agente_retiibb==0)
    {
        return MapearObjetoRetencionesResponse("No es agente de RETIIBB",codigo_iso,"","");
    }
    
    //inicia proceso
    var importe_calcular= GetMontoCalcularRetencion(incluye_exento_no_gravado_retencion_iibb,anticipo,monto_neto_pago,monto_no_gravado_pago,monto_total_pago) ;
    
    //console.log("el importe es" + importe_calcular);

    //busco primero en la tabla por ISO
    let result_iibb=objUtil.select('alicuota,monto_minimo_imponible')
        .from(tabla_iibb_alicuota_provincia)
        .where('codigo_iso','=', codigo_iso)
        .fetch();

    if (result_iibb.length===0)
    {
        return MapearObjetoRetencionesResponse( "no se encontro ningun dato en IIIBB  por codigo_iso",codigo_iso,"",""); 
    }else{
        alicuota_porcentaje=  result_iibb[0].alicuota;
        monto_minimo_imponible=  result_iibb[0].monto_minimo_imponible;
    }

    //busco en la tabla por cuit
    let result_iibb_cuit=objUtil.select('alicuota,fechadesde,fechahasta')
    .from(tabla_iibb_cuit)
    .where('cuit','=', cuit_proveedor)
    .where('codigo_iso','=', codigo_iso)
//    .where('fechadesde','>=', fecha_pago)
//    .where('fechahasta','<=', fecha_pago)
    .fetch();

    if (result_iibb_cuit.length!=0)
    {
        //console.log('se encontro por cuit' + fecha_pago );
        //valido las fechas

        var fechahabilitada=FechaHabilitada(result_iibb_cuit[0].fechadesde,result_iibb_cuit[0].fechahasta,fecha_pago);
        if (result_iibb_cuit[0].alicuota!="0,00" && fechahabilitada)
        {
             alicuota_porcentaje=  result_iibb_cuit[0].alicuota.replace(",",".");
        }
    }

    if (importe_calcular<=monto_minimo_imponible)
    {
        return MapearObjetoRetencionesResponse( 
            'El importe no supera el monto minimo imponible',codigo_iso,'','');
    }


     //realiza el calculo   
   
    importe_retencion= ((importe_calcular)  * (alicuota_porcentaje /100) );

    return MapearObjetoRetencionesResponse("Calculo por Porcentaje Asociado",codigo_iso,alicuota_porcentaje + '%',importe_retencion.toFixed(2));
                
    
 } 

 //Fin de Seccion