import express from 'express';
import { createRequire } from 'module';
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
    var agente_retgan=parametros.agente_retgan;
    var aplica_retgan_pagos=parametros.aplica_retgan_pagos;
    var codigo_regimen_retgan=parametros.codigo_regimen_retgan;
    var inscripto_retgan =parametros.inscripto_retgan;
    var no_inscripto_persona_humana = parametros.no_inscripto_persona_humana;
    var monto_neto_pago = parametros.monto_neto_pago;
    var monto_no_gravado_pago =parametros.monto_no_gravado_pago;
    var retenciones_anteriores_retgan = parametros.retenciones_anteriores_retgan;
    var incluye_no_gravado_retencion_ganancias = parametros.incluye_no_gravado_retencion_ganancias;
    var anticipo = parametros.anticipo;
    var monto_total_pago = parametros.monto_total_pago;

    var agente_retiibb=parametros.agente_retiibb;
    var incluye_exento_no_gravado_retencion_iibb=parametros.incluye_exento_no_gravado_retencion_iibb;
    var cuit_proveedor=parametros.cuit_proveedor;
    var codigo_iso =parametros.codigo_iso;
    var fecha_pago =parametros.fecha_pago;
    //fin de parametros
   
    var objganancias;
    var objretenciones;
    
   
    objganancias= GetPagoGanancias(agente_retgan,
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
                                    );

    //falta modificar la logica para que busque por 
    //cada codigo que se envie
    objretenciones= GetPagoRetenciones(agente_retiibb,
                                        incluye_exento_no_gravado_retencion_iibb,
                                        cuit_proveedor,
                                        codigo_iso,
                                        anticipo,
                                        monto_neto_pago,
                                        monto_no_gravado_pago,
                                        monto_total_pago,
                                        fecha_pago
                                        );
       
        res.json({
                    Ganancias:{
                        mensaje: objganancias.mensaje,
                        modo: objganancias.modo,
                        alicuota: objganancias.alicuota,
                        importe: objganancias.importe
                    },
                    Retenciones:{
                        mensaje: objretenciones.mensaje,
                        nombre: objretenciones.nombre,
                        alicuota: objretenciones.alicuota,
                        importe: objretenciones.importe
                    }
                    
                });
        res.status(200).send(); 




   
});

export default router;