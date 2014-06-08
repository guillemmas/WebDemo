<?PHP
	$host = "db519420855.db.1and1.com";
	$usuarioHost = "dbo519420855";
	$baseDatos = "db519420855";
	$password = "BodorriusWeb1?";
	
	$usuario = $_POST['name'];
	$pswd = $_POST['pswd'];
	$answer = array();
	mysql_connect($host, $usuarioHost, $password) or die("Error al conectar la BD");
	mysql_select_db($baseDatos)or die("Error al crear Select");
	$query = mysql_query("SELECT usuario, nombre, isnull(email) as email FROM login WHERE usuario='$usuario' AND password='$pswd' AND activo=1");
	if($resp = mysql_fetch_row($query)){
		$idUsuario = $resp[0];
		$nombre = $resp[1];
		$email = $resp[2];
		$answer[id] = $idUsuario;
		$answer[nombre] = $nombre;
		$answer[email] = $email;
		
		$query = mysql_query("UPDATE login SET acceso = 1 WHERE usuario = '$idUsuario'");
	}
	else {
		$answer = 0;
	}
	echo json_encode($answer);
?>