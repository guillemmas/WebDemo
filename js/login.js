window.onload = (function(){
	      	if(sessionStorage.getItem('dataBodorrius')){
	      		loadAnswer();
	      	}
	      	else {
	      		loadForm();
	      	}
	      });
	      function loadAnswer(){
	      	var dataBodorrius = sessionStorage.getItem('dataBodorrius').split('#');	      	
	      	$('.usuarioLogin').html('Bienvenido/s ' + dataBodorrius[1] + '. ');
	      	if(dataBodorrius[2] == 0){
	      		$('.registroMail').html('Ya hemos recibido tu confirmación. Si deseas ponerte en contacto con nosotros puedes hacerlo desde <a href="/Contactar">aquí</a>.');
	      	}
	      	else {
	      		$('.registroMail').html('Aun no nos has enviado tu confirmación. Puedes hacerlo <a href="/Confirmar">aquí</a>.');
	      	}
	      	$('#openModal').addClass('hidden');      	
	      }
	      function loadForm(){
	      	$('#containerModal').load('/Login/login.html', function(){
	      		$('#loginForm').on('submit', function(e){
	      			e.preventDefault();
	      			sendData();
	      		});
	      	});
	      	
	      }
	      var answer = new Array();
	      function sendData(){
	      	var name = $('#name').val();
	      	var pswd = $('#pswd').val();
	      	$.ajax({
	      		data: 'name=' + name + '&pswd=' + pswd,
	      		type: 'POST',
	      		datatype: 'json',
	      		url: '/Login/check.php',
	      		success: function(data){
	      			answer = JSON.parse(data);
	      			saveStorage(answer);
	      		}
	      	});	      	
	      }
	      
	      function saveStorage(data){
	      	if (data == 0) {
	      		$('#answ').text('Localizador erroneo');
	      	}
	      	else {
	      		if (sessionStorage) {
	      			sessionStorage.setItem('dataBodorrius', data['id'] + "#" + data['nombre'] + "#" + data['email']);
	      			loadAnswer();
	      		}
	      		else{
	      			alert('Esta web no es compatible con este navegador.');
	      		}
	      	}
	      }	      