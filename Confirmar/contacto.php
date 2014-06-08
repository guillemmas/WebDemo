<?php
header('Content-Type: text/html; charset=UTF-8');

$host = "db519420855.db.1and1.com";
$usuarioHost = "dbo519420855";
$baseDatos = "db519420855";
$password = "BodorriusWeb1?";
	
$usuario = $_POST['id'];
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$asiste = $_POST['asistencia']; 
$asistentes = $_POST['asistentes'];
$mensaje = $_POST['mensaje'];
$para = 'confirmacion@bodorrius.com';
$titulo = 'CONFIRMACIÓN BODA';
$header = 'From: ' . $email;
$msjCorreo = "Nombre: $nombre\n E-Mail: $email\n Asistiran: $asiste\n Nº asistentes: $asistentes\n Mensaje:\n $mensaje";
 
if ($_POST['submit']) {
	if (mail($para, $titulo, $msjCorreo, $header)) {
		/*UPDATE*/
		mysql_connect($host, $usuarioHost, $password) or die("Error al conectar la BD");
		mysql_select_db($baseDatos)or die("Error al seleccionar la BD");
		
		if($asiste == 'Si') {
			$asiste = '1';
		}
		else {
			$asiste = '0';
		}
		
		$query = mysql_query("UPDATE login SET email='$email', asiste='$asiste', asistentes='$asistentes', comentarios='$mensaje' WHERE usuario='$usuario'");
		if($resp = mysql_fetch_row($query)){
			/*OK*/
		}
		else {
			/*KO*/
		}
		echo "<script language='javascript'>
		alert('Mensaje enviado, confirmación realizada.');
		window.location.href = '/';
		</script>";
	} else {
		echo 'Falló el envio';
	}
}
?>
