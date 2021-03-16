<?php 
require_once('config.php');

if (!isset($_GET['path'])) {
	$_GET['path'] = "retenciones";
}

$path = explode('/', $_GET['path']);

// if (isset($_SESSION['fichanet']['usuario']['ID']) && $_SESSION['fichanet']['usuario']['estadoID'] == 3 && !in_array($path[0], array('cambiar-contraseña','salir'))) {
// 	header('Location: '.SITEROOT.'cambiar-contraseña');
// }
if (isset($path[1]) && !is_numeric($path[1])) {
	if ($path[1]!="ADD")
	{
		$path[0]=$path[1];
		header('Location: '.SITEROOT.$path[0]);
		return;
	}
}
	if (isset($path[2]) && ($path[2]!='nuevo'&& $path[2]!='modificar' && $path[2]!='observar'))
	{
	
		$path[0]=$path[2];
		header('Location: '.SITEROOT.$path[0]);
		return;
	}


switch ($path[0]) {
	
	case 'retenciones':	
		$nav['page'] = 'retenciones';
		require_once('controller/retenciones.php');
		break;
			
	default:
		require_once('errors/404.php');
		break;
}


?>