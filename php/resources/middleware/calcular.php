<?php
require_once('../../config.php');

$param_pago_fecha = trim($_POST['pago_fecha']);
$param_pago_cuit_proveedor = trim($_POST['pago_cuit_proveedor']);
$param_pago_anticipo = trim($_POST['pago_anticipo']);
$param_pago_monto_total = validarvalor(trim($_POST['pago_monto_total']));
$param_pago_monto_neto = validarvalor(trim($_POST['pago_monto_neto']));
$param_pago_monto_exng = validarvalor(trim($_POST['pago_monto_exng']));
$param_pago_monto_anteriores_mes = validarvalor(trim($_POST['pago_monto_anteriores_mes']));
$param_retgan_agente = trim($_POST['retgan_agente']);
$param_retgan_aplica = trim($_POST['retgan_aplica']);
$param_retgan_incluye_exng = trim($_POST['retgan_incluye_exng']);
$param_retgan_inscripto = trim($_POST['retgan_inscripto']);
$param_retgan_noinsc_phsi = trim($_POST['retgan_noinsc_phsi']);
$param_retgan_codigo_regimen = trim($_POST['retgan_codigo_regimen']);
$param_retgan_anteriores_mes = validarvalor(trim($_POST['retgan_anteriores_mes']));
$param_retiibb_agente = trim($_POST['retiibb_agente']);
$param_retiibb_incluye_exng = trim($_POST['retiibb_incluye_exng']);
// $param_codigo_iso = trim($_POST['codigo_iso']);
$param_codigo_iso_b = validarseleccionoption($_POST['iso_b']);
$param_codigo_iso_c = validarseleccionoption($_POST['iso_c']);
$param_codigo_iso_x= validarseleccionoption($_POST['iso_x']);
$param_codigo_iso_s = validarseleccionoption($_POST['iso_s']);
$param_codigo_iso_m = validarseleccionoption($_POST['iso_m']);


$validacion_param_form = 0;
foreach ($param_form as $key => $value) {
    if ($value == '') {
        $validacion_param_form++;
    }
}
if ($validacion_param_form > 0) {
	echo json_encode(array('status' => 'error','mensaje'=>'Los campos requeridos estan marcados'));
	die();
}


if ($param_pago_fecha=="") {
  $param_pago_fecha="01/01/2021";
}

$curl = curl_init();

$request_param= '{
    "pago_fecha":"'.$param_pago_fecha.'",
    "pago_cuit_proveedor":"'.$param_pago_cuit_proveedor.'",
    "pago_anticipo":'.$param_pago_anticipo.',  
    "pago_monto_total":'.$param_pago_monto_total.',
    "pago_monto_neto":'.$param_pago_monto_neto.',
    "pago_monto_exng":'.$param_pago_monto_exng.',
    "pago_monto_anteriores_mes":'.$param_pago_monto_anteriores_mes.',
    "retgan_agente":'.$param_retgan_agente.',
    "retgan_aplica":'.$param_retgan_aplica.',
    "retgan_incluye_exng":'.$param_retgan_incluye_exng.',
    "retgan_inscripto":'.$param_retgan_inscripto.',
    "retgan_noinsc_phsi":'.$param_retgan_noinsc_phsi.',
    "retgan_codigo_regimen":'.$param_retgan_codigo_regimen.',
    "retgan_anteriores_mes":'.$param_retgan_anteriores_mes.',
    "retiibb_agente":'.$param_retiibb_agente.',
    "retiibb_incluye_exng":'.$param_retiibb_incluye_exng.',
    "codigo_iso":"AR-C",
    "codigo_iso_multi":[';
//      if ($param_codigo_iso_b!=null) {
//        $request_param.='{"jurisdiccion":"'.$param_codigo_iso_b.'"}';
//      }
//      if ($param_codigo_iso_c!=null) {
//        $request_param.=',{"jurisdiccion":"'.$param_codigo_iso_c.'"}';
//      }
//      if ($param_codigo_iso_x!=null) {
//        $request_param.=',{"jurisdiccion":"'.$param_codigo_iso_x.'"}';
//      }
//      if ($param_codigo_iso_s!=null) {
//        $request_param.=',{"jurisdiccion":"'.$param_codigo_iso_s.'"}';
//      }
//      if ($param_codigo_iso_m!=null) {
//        $request_param.=',{"jurisdiccion":"'.$param_codigo_iso_m.'"}';
//      }       
      $request_param.=']
  }';

   //echo $request_param;
   //die();
curl_setopt_array($curl, array(
	//CURLOPT_URL => "https://sos-contadores-calculadora.herokuapp.com/calculadora",
	CURLOPT_URL => "http://localhost:5000/calculadora",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 0,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "POST",
	CURLOPT_POSTFIELDS => $request_param,
	CURLOPT_HTTPHEADER => array(
	"Content-Type: application/json"
	),
));

$response = curl_exec($curl);
//echo $response;
// die();

if (!curl_errno($curl)) {
    switch ($http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE)) {
		case 200:  # OK
			$res=json_decode($response,true);
			echo json_encode(array('status' => 'success','mensaje' =>$response));
			// echo json_encode(array('status' => 'success','mensaje' =>'Modalidad:'.$res['modo'].'<br>'.'Alicuota:'.$res['alicuota'].'<br>'.'Importe a Retener: $'.$res['importe']));
			break;
		default:  # not found
			$res=json_decode($response,true);
			echo json_encode(array('status' => 'success','mensaje' => $res['mensaje']));
			break;       
    }
}
curl_close($curl);
die();

function validarvalor(& $valor) {
	if ($valor == null) {
		return 0;
	}
	return $valor;
}

function validarseleccionoption(& $valor) {
	if (!isset($valor)) {
		return null;
	}
	return $valor;
}

?>
