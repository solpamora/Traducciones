import {GetMontoCalcular,MapearObjetoGananciasResponse} from '../helpers/funciones.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

//seccion: tablas del aplicativo
const tabla_porcentaje = require("../bases/tabla_porcentaje.json"); 
const tabla_ganancia_sin_escala = require("../bases/tabla_ganancias_sin_escala.json"); 
// fin seccion

let JSONSql = require('json-sql-tool');
let objUtil = new JSONSql();

var _ = require("underscore");


//Seccion Funciones Exportadas
export function GetPagoGanancias (
	pago_anticipo,
	pago_monto_neto,
	pago_monto_exng,
	pago_monto_total,
	pago_monto_anteriores_mes,
	retgan_agente,
	retgan_aplica,
	retgan_codigo_regimen,
	retgan_incluye_exng,
	retgan_inscripto,
	retgan_noinsc_phsi,
	retgan_anteriores_mes
) 
{ 
    //definir las variables
    var alicuota_porcentaje = 0;
    var importe_retencion = 0;
    var monto_inscripto_no_sujeto_retencion = 0;
    //fin de variables


    if (retgan_agente == 0) {
        return MapearObjetoGananciasResponse("No es agente de RETGAN", "", "", "");
    }
    
    if (retgan_aplica == 0) {
        return MapearObjetoGananciasResponse("No aplica RETGAN en pagos", "", "", ""); 
    }
    

    var filtered = _.where(tabla_porcentaje, {codigo_regimen: retgan_codigo_regimen});

    if (filtered.length === 0) {
        return MapearObjetoGananciasResponse("No se encontró el regimen " + retgan_codigo_regimen + " en la tabla de parametros", "", "", "");
    }

    var importe_calcular = GetMontoCalcular(retgan_incluye_exng, pago_anticipo, pago_monto_neto, pago_monto_exng, pago_monto_total, pago_monto_anteriores_mes) ;
    if (retgan_inscripto == 1) {
        alicuota_porcentaje = filtered[0].porcentaje_inscripto;
        if (alicuota_porcentaje == 0) {
            var importe_buscar = importe_calcular ;
            let tabla_sin_escala_busqueda = objUtil.select('importe_minimo, importe_maximo, importe_retener, porcentaje_adicional, importe_sobre_exceso')
				.from(tabla_ganancia_sin_escala)
				.where('importe_minimo','<=',importe_buscar)
				.where('importe_maximo','>=',importe_buscar)
				.fetch();
            if (tabla_sin_escala_busqueda.length === 0) {
                return MapearObjetoGananciasResponse("No se encontró el monto en la tabla de porcentajes directos", "", "", "");
            } else {
                importe_retencion = (tabla_sin_escala_busqueda[0].importe_retener + ((tabla_sin_escala_busqueda[0].porcentaje_adicional/100)  * Math.abs((importe_buscar - tabla_sin_escala_busqueda[0].importe_sobre_exceso))))-retgan_anteriores_mes;

                return MapearObjetoGananciasResponse ( 
					"Regimen " + retgan_codigo_regimen + " aplica a cálculo por escala (" + "minimo: $"  + tabla_sin_escala_busqueda[0].importe_minimo + ", maximo: $"  + tabla_sin_escala_busqueda[0].importe_maximo + ")",
					"Escala",
					0,
					importe_retencion
				);
            }

            return;
        } else {
            monto_inscripto_no_sujeto_retencion = filtered[0].monto_no_sujeto_retencion;
            if (pago_monto_neto + pago_monto_exng < monto_inscripto_no_sujeto_retencion) {
                return MapearObjetoGananciasResponse("El monto a pagar es menor que el monto no sujeto a retención", "", "", "");
            }
        }
    } else {
        if (retgan_noinsc_phsi == 1) {
            alicuota_porcentaje = filtered[0].porcentaje_no_inscripto_phsi;
        } else {
            alicuota_porcentaje = filtered[0].porcentaje_no_inscripto_no_phsi;
        }  
    }

    importe_retencion = ((importe_calcular -monto_inscripto_no_sujeto_retencion)  * (alicuota_porcentaje /100) )-retgan_anteriores_mes;

    return MapearObjetoGananciasResponse( 
		"Regimen " + retgan_codigo_regimen + " aplica a cálculo por porcentaje directo. Base imponible: $" + importe_calcular.toFixed(2) + ". No sujeto: $" + monto_inscripto_no_sujeto_retencion.toFixed(2) + ". RETGAN anteriores: $" + retgan_anteriores_mes.toFixed(2) + ".", 
		"Porcentaje directo", 
		alicuota_porcentaje, 
		importe_retencion.toFixed(2));
                
    
 } 

 //Fin de Seccion