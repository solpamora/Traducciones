import {GetMontoCalcular,MapearObjetoGananciasResponse} from '../helpers/funciones.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

//seccion: tablas del aplicativo
const tabla_porcentaje = require("../bases/tabla_porcentaje.json"); 
const tabla_ganancia_sin_escala = require("../bases/tabla_ganancias_sin_escala.json"); 
// fin seccion


let JSONSql=require('json-sql-tool');
let objUtil=new JSONSql();

var _ = require("underscore");


//Seccion Funciones Exportadas
export function GetPagoGanancias(agente_retgan,
                                aplica_retgan_pagos,
                                codigo_regimen_retgan,
                                incluye_no_gravado_retencion_ganancias,
                                anticipo,
                                monto_neto_pago,
                                monto_no_gravado_pago,
                                monto_total_pago,
                                inscripto_retgan,
                                no_inscripto_persona_humana,
                                retenciones_anteriores_retgan
                                ) 
{ 
    //definir las variables
    var alicuota_porcentaje=0;
    var importe_retencion=0;
    var monto_inscripto_no_sujeto_retencion=0;
    //fin de variables


    if (agente_retgan==0)
    {
        return MapearObjetoGananciasResponse("No es agente de RETGAN","","","");
    }
    
    if (aplica_retgan_pagos==0)
    {
        return MapearObjetoGananciasResponse("No aplica RETGAN en pagos","","",""); 
    }
    

    var filtered = _.where(tabla_porcentaje, {codigo_regimen: codigo_regimen_retgan});

    if (filtered.length===0)
    {
        return MapearObjetoGananciasResponse( "no se encontro el regimen en la tabla de parametros","","","");
    }

    var importe_calcular= GetMontoCalcular(incluye_no_gravado_retencion_ganancias,anticipo,monto_neto_pago,monto_no_gravado_pago,monto_total_pago) ;
    if (inscripto_retgan==1)
    {
        alicuota_porcentaje=filtered[0].porcentaje_inscripto;
        if (alicuota_porcentaje ==0)
        {
            var importe_buscar=importe_calcular ;
            let tabla_sin_escala_busqueda=objUtil.select('importe_minimo,importe_maximo,importe_retener,porcentaje_adicional,importe_sobre_exceso')
            .from(tabla_ganancia_sin_escala)
            .where('importe_minimo','<=',importe_buscar)
            .where('importe_maximo','>=',importe_buscar)
            .fetch();
            if (tabla_sin_escala_busqueda.length===0)
            {
                return MapearObjetoGananciasResponse( "no se encontro el monto en la tabla sin escala","","","");
            }else {
                importe_retencion=(tabla_sin_escala_busqueda[0].importe_retener +  ((tabla_sin_escala_busqueda[0].porcentaje_adicional/100)  * Math.abs((importe_buscar - tabla_sin_escala_busqueda[0].importe_sobre_exceso))))-retenciones_anteriores_retgan;

                return MapearObjetoGananciasResponse( 
                                                    "",'calculo por Escala (' + 'minimo: '  + tabla_sin_escala_busqueda[0].importe_minimo + ' maximo: '  + tabla_sin_escala_busqueda[0].importe_maximo + ')',
                                                    0,
                                                    importe_retencion
                                                    );
            }

            return;


        }else{
            monto_inscripto_no_sujeto_retencion=filtered[0].monto_no_sujeto_retencion;
            if (monto_neto_pago + monto_no_gravado_pago <monto_inscripto_no_sujeto_retencion)
            {
                return MapearObjetoGananciasResponse( "el monto informado no supera el monto minimo para realizar el calculo","","","");
            }
        }
    }else{
        if (no_inscripto_persona_humana==1){
            alicuota_porcentaje=filtered[0].porcentaje_no_inscripto_ph;
        }else{
            alicuota_porcentaje=filtered[0].porcentaje_no_inscripto_comun;
        }  
    }

    importe_retencion= ((importe_calcular -monto_inscripto_no_sujeto_retencion)  * (alicuota_porcentaje /100) )-retenciones_anteriores_retgan;

    return MapearObjetoGananciasResponse( "","Calculo por Porcentaje Asociado",alicuota_porcentaje + '%',importe_retencion.toFixed(2));
                
    
 } 

 //Fin de Seccion