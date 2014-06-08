<?php
header('Content-Type: text/html; charset=UTF-8');

$host = "db519420855.db.1and1.com";
$usuarioHost = "dbo519420855";
$baseDatos = "db519420855";
$password = "BodorriusWeb1?";
	
$usuario = $_POST['id'];
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$avisos = $_POST['avisos']; 
$mensaje = $_POST['mensaje'];
$para = 'contactar@bodorrius.com';
$titulo = 'MENSAJE BODORRIUS.COM';
$header = 'From: ' . $email;
$msjCorreo = "Nombre: $nombre\n E-Mail: $email\n Avisos: $avisos\n Mensaje:\n $mensaje";
 
if ($_POST['submit']) {
	if (mail($para, $titulo, $msjCorreo, $header)) {
		/*UPDATE*/
		mysql_connect($host, $usuarioHost, $password) or die("Error al conectar la BD");
		mysql_select_db($baseDatos)or die("Error al seleccionar la BD");
		
		if($avisos == 'Si') {
			$avisos = '1';
		}
		else {
			$avisos = '0';
		}
		
		$query = mysql_query("INSERT INTO aviso(usuario,nombre,email,avisos,mensaje) VALUES('$usuario','$nombre','$email',$avisos,'$mensaje')");
		if($resp = mysql_fetch_row($query)){
			/*OK*/
		}
		else {
			/*KO*/
		}
		echo "<script language='javascript'>
		alert('Mensaje enviado.');
		window.location.href = '/';
		</script>";
	} else {
		echo 'Falló el envio';
	}
}
?>
