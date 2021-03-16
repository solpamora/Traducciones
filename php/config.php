<?php 
	
session_start();
define('SITEROOT', '/');
define('SITEURL', 'http://localhost:81');
//define('SITEURL', 'http://sos-funcionalidades.amavia.com.ar');
//define('SITEURL', 'http://sd-1378580-h00002.ferozo.net');
$smtp_host = 'localhost';
$smtp_email = 'info@amavia.com.ar';
$smtp_password = 'solpamiaava';
$smtp_alias = 'info@amavia.com.ar';
$smtp_name = "Pruebas";
$smtp_port = '587';
$smtp_destino = 'fhatzen@gmail.com'; //default
$smtp_destino_name = 'Pablo Martinez'; //default

$enviar_mails=1;
?>