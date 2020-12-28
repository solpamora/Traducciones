//obtiene el importe para luego realizar el calculo de ganancias
export function GetMontoCalcular  (incluye_no_gravado_pagos,es_anticipo,monto_neto,monto_no_gravado,monto_total) { 
    var monto_calcular=0;
    if (incluye_no_gravado_pagos==1)
    {
        if (es_anticipo==1)
        {
        // console.log ("entro");
            monto_calcular= monto_total;  
        }else{
            monto_calcular= monto_neto + monto_no_gravado;
        }
        
    }else{
        monto_calcular= monto_neto;  
        if (es_anticipo==1)
        {
        // console.log ("entro");
            monto_calcular= monto_total;  
        } 
    }
    
    return monto_calcular; 
 } 

 export function GetMontoCalcularRetencion  (incluye_exento_no_gravado_retencion_iibb,es_anticipo,monto_neto,monto_no_gravado,monto_total) { 
    var monto_calcular=0;
    if (incluye_exento_no_gravado_retencion_iibb==1)
    {
        monto_calcular= monto_neto + monto_no_gravado;
        
    }else{
        if (es_anticipo==1)
        {
        // console.log ("entro");
            monto_calcular= monto_total;  
        }else{
            monto_calcular= monto_neto;
        }
    }
    
    return monto_calcular; 
 } 



 export function MapearObjetoGananciasResponse(mensaje,modo,alicuota,importe)
 {
     var obj;

     return obj =(
         {
            mensaje:mensaje,
            modo: modo,
            alicuota:alicuota,
            importe:importe
         });

 }

 export function MapearObjetoRetencionesResponse(mensaje,nombre,alicuota,importe)
 {
     var obj;
    var nombretraduccion=TraduccionIso(nombre);

    
     return obj =(
         {
            mensaje:mensaje,
            nombre: nombretraduccion,
            alicuota:alicuota,
            importe:importe
         });

 }


 function TraduccionIso(codigo_iso)
 {
    var nombretraduccion="";
    
    switch (codigo_iso)
    {
        case "AR-B":
            nombretraduccion="ARBA";
          break;
          case "AR-C":
            nombretraduccion="AGIP";
          break;
          case "AR-X":
            nombretraduccion="CORDOBA";
          break;
          case "AR-S":
            nombretraduccion="SANTA FE";
          break;
          case "AR-M":
            nombretraduccion="MENDOZA";
          break;

    }
   // console.log(codigo_iso + '' + nombretraduccion);
    return nombretraduccion;
 }

 export function FechaHabilitada(fechadesde,fechahasta,fechapago)
 {
    //console.log('la fecha es:'+fechapago);
      var D_1 =fechadesde.split("-");
      var D_2 =fechahasta.split("-");
      var D_3 =fechapago.split("/");

      var d1= new Date(D_1[0],parseInt(D_1[1]),parseInt(D_1[2]));
      var d2= new Date(D_2[0],parseInt(D_2[1]),parseInt(D_2[2]));
      var d3= new Date(D_3[2],parseInt(D_3[1]),parseInt(D_3[0]));

   // console.log ('fecha convertida' + d2);
     if (d3 >= d1  && d3 <=d2)
     {
         //console.log('la fecha esta conmprendida');
         return true;
     }else{
         return false;
     }



 }


