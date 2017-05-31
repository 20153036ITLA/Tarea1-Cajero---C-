var secciones = document.getElementsByTagName('section');
var sueldo = localStorage.getItem('sueldo');

$(document).ready(function () {
	
	$("#ingreso").click(function () {
		swal.setDefaults({
  input: 'text',
  confirmButtonText: 'Seguir',
  showCancelButton: true,
  animation: true,
  progressSteps: ['1', '2']
})

var steps = [
  {
    title: 'Registro',
    text: 'Registra tu numero de tarjeta'
  },
  {
	title: 'Registro',
    text: 'Registra tu numero de PIN'
  }
]

swal.queue(steps).then(function saber(result) {
  swal.resetDefaults()
	
       var datos = JSON.stringify(result);
	 
	   if((result[0].length * result[1].length) > 0) {
	  localStorage.setItem('wilmer',datos);
	   mostrarSection(datos);
	   } else {
		   swal("Upss","Debes rellenar los campos","warning");
	   }
}, function () {
  swal.resetDefaults()
})
	});
	
$("#regresar").click(function () {
	var validar = localStorage.getItem('wilmer');
	if(validar != null) {
	if ($((document.getElementsByTagName('section'))[4]).is(':visible')) {
	  
	  reseteo(secciones);
	  document.getElementsByTagName('section')[3].setAttribute('class','fijo');
	
	} else {
	mostrarSection();
	}
	} else {
		 swal("Upss","Aun no has ingresado nada","warning");
	}
	
  });

$("#salir").click(function () {
	if($((document.getElementsByTagName('section'))[0]).is(':visible')) {
		swal("Informacion","Estas afuera","info");
	} else {
	
		 swal({
  title: 'Estas seguro que deseas salir?',
  text: "No podras regresar eso",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si'
}).then(function () {
	localStorage.clear();
  swal({
    title:'Ha salido con exito',
    text:'Ahora seras redireccionado.',
    type:'success',
	timer:3000,
  });
 setTimeout(function(){
    location.reload();
},3100);

});
}
});

//Boton 1
$("#1").click(function () {
	//Si esta en la seccion de opciones
	if($((document.getElementsByTagName('section'))[1]).is(':visible')) {
			swal({
  title: 'Introduce la cantidad',
  inputPlaceholder: "Equivalente a centenas",
  input: 'text',
  showCancelButton: true,
  confirmButtonText: 'Ok',
}).then(function (text) {
	
	if(parseInt(text) > getSueldo()) {
  swal({
    type: 'warning',
    title: 'Upss!',
    html: 'No tienes suficiente sueldo'
  })
	} else {
		if(parseInt(text) >= 100) {
		 swal({
    title: 'Billete',
    html: 'Elige tu billete preferido'
  })
  var cantidadRetiro = parseInt(text);
       var sueldoNow = getSueldo() - cantidadRetiro; 
        removeSueldo();
		addSueldo(sueldoNow);
		reseteo(secciones);
		document.getElementsByTagName('section')[2].setAttribute('class','fijo');
		
	} else {
		swal("Upss!","Minimo $100","error");
	}
  }
})
	
} else if ($((document.getElementsByTagName('section'))[2]).is(':visible')) {
			swal({
  title: 'Exito',
  confirmButtonText: 'Ok',
  text: 'Retiro hecho con exito!',
  type: 'success',
  timer: 3000
}).then(function () {
	reseteo(secciones);
	document.getElementsByTagName('section')[1].setAttribute('class','fijo');
	}) 
  
	} else if ($((document.getElementsByTagName('section'))[3]).is(':visible')) {
	  reseteo(secciones);
	  document.getElementsByTagName('section')[4].setAttribute('class','fijo');
  } else if ($((document.getElementsByTagName('section'))[4]).is(':visible')) {
	   var sueldoNow = getSueldo() - 50; 
        removeSueldo();
		addSueldo(sueldoNow);
		if(sueldoNow > 0) {
		swal({
  title: 'Exito',
  confirmButtonText: 'Ok',
  text: 'Recarga hecha con exito',
  type: 'success',
  timer: 3000
})
		
	  reseteo(secciones);
	  document.getElementsByTagName('section')[1].setAttribute('class','fijo');
	} else {
		swal({
  title: 'Error',
  confirmButtonText: 'Ok',
  text: 'No tienes sueldo suficiente',
  type: 'warning',
 
})
	}
  }
});

//Boton 2
$("#2").click(function () {
	//Si esta en la seccion de opciones
	if($((document.getElementsByTagName('section'))[1]).is(':visible')) {
				swal.setDefaults({
  input: 'text',
  confirmButtonText: 'Seguir',
  showCancelButton: true,
  animation: true,
  progressSteps: ['1', '2']
})

var steps = [
  {
	title: 'Deposito',
    text: 'Cantidad a depositar'
  },
  {
	title: 'Deposito',
    text: 'Numero de cuenta a depositar'
  }
]

swal.queue(steps).then(function saber(result) {
  swal.resetDefaults()
	 
	   if((result[0].length * result[1].length) > 0) {
		   var numTarjeta = JSON.parse(localStorage.getItem('wilmer'))[0];
		   if(numTarjeta === result[1]) {
			   var cantidad = parseInt(result[0]);
		   
			   var sueldoNow = getSueldo() + cantidad;
			  removeSueldo();
			  addSueldo(sueldoNow);
			    swal("Exito","Deposito hecho con exito!","success");

		   } else {
		   var cantidad = parseInt(result[0]);
		   if(cantidad <= getSueldo()) {
			   var sueldoNow = getSueldo() - cantidad;
			  removeSueldo();
			  addSueldo(sueldoNow);
			  
	   swal("Exito","Deposito hecho con exito!","success");
		   } else {
			    swal("Error","No tienes suficiente sueldo!","warning");
		   }
	   } 
	   } else {
		   swal("Upss","Debes rellenar los campos","warning");
	   }
}, function () {
  swal.resetDefaults()
})
	
} else if ($((document.getElementsByTagName('section'))[3]).is(':visible')) {
	  reseteo(secciones);
	  document.getElementsByTagName('section')[4].setAttribute('class','fijo');
	  
} else if ($((document.getElementsByTagName('section'))[4]).is(':visible')) {
	   var sueldoNow = getSueldo() - 60; 
        removeSueldo();
		addSueldo(sueldoNow);
		if(sueldoNow > 0) {
		swal({
  title: 'Exito',
  confirmButtonText: 'Ok',
  text: 'Recarga hecha con exito',
  type: 'success',
  timer: 3000
})
		
	  reseteo(secciones);
	  document.getElementsByTagName('section')[1].setAttribute('class','fijo');
	} else {
		swal({
  title: 'Error',
  confirmButtonText: 'Ok',
  text: 'No tienes sueldo suficiente',
  type: 'warning',
 
})
	}
  }
});

//Boton 3
$("#3").click(function () {
	//Si esta en la seccion de opciones
	if($((document.getElementsByTagName('section'))[1]).is(':visible')) {
		swal("Sueldo", getSueldo() ,"info");
} else if ($((document.getElementsByTagName('section'))[4]).is(':visible')) {
	   var sueldoNow = getSueldo() - 100; 
        removeSueldo();
		addSueldo(sueldoNow);
		if(sueldoNow > 0) {
		swal({
  title: 'Exito',
  confirmButtonText: 'Ok',
  text: 'Recarga hecha con exito',
  type: 'success',
  timer: 3000
})
		
	  reseteo(secciones);
	  document.getElementsByTagName('section')[1].setAttribute('class','fijo');
	} else {
		swal({
  title: 'Error',
  confirmButtonText: 'Ok',
  text: 'No tienes sueldo suficiente',
  type: 'warning',
 
})
	}
  }
});

//Boton 5
$("#5").click(function () {
	//Si esta en la seccion de opciones
	if($((document.getElementsByTagName('section'))[1]).is(':visible')) {
	swal.setDefaults({
  input: 'text',
  confirmButtonText: 'Seguir',
  showCancelButton: true,
  animation: true,
  progressSteps: ['1', '2']
})

var steps = [
  {
	title: 'Cambio PIN',
    text: 'PIN actual'
  },
  {
	title: 'Cambio PIN',
    text: 'PIN nuevo'
  }
]

swal.queue(steps).then(function saber(result) {
  swal.resetDefaults()
	 
	    if((result[0].length * result[1].length) > 0) {
			
		if(result[0] != result[1]) {
			  swal("Exito","Cambio de PIN hecho con exito!","success");
		} else {
	          swal("Error","El nuevo PIN debe ser diferente","warning");
	    } 
		
	    } else {
		   swal("Upss","Debes rellenar los campos","warning");
	    }
	   
}, function () {
  swal.resetDefaults()
})
	
} else if ($((document.getElementsByTagName('section'))[3]).is(':visible')) {
	  reseteo(secciones);
	  document.getElementsByTagName('section')[4].setAttribute('class','fijo');
} else if ($((document.getElementsByTagName('section'))[4]).is(':visible')) {
	   var sueldoNow = getSueldo() - 200; 
        removeSueldo();
		addSueldo(sueldoNow);
		if(sueldoNow > 0) {
		swal({
  title: 'Exito',
  confirmButtonText: 'Ok',
  text: 'Recarga hecha con exito',
  type: 'success',
  timer: 3000
})
		
	  reseteo(secciones);
	  document.getElementsByTagName('section')[1].setAttribute('class','fijo');
	} else {
		swal({
  title: 'Error',
  confirmButtonText: 'Ok',
  text: 'No tienes sueldo suficiente',
  type: 'warning',
 
})
	}
  }
		});
//Boton 6	
$("#6").click(function () {
	//Si esta en la seccion de opciones
	if($((document.getElementsByTagName('section'))[1]).is(':visible')) {
			swal({
  title: 'Introduce el numero telefonico',
  inputPlaceholder: "809-111-1111",
  input: 'text',
  showCancelButton: true,
  confirmButtonText: 'Ok',
}).then(function (text) {
	    if(text.length >= 10) {
		reseteo(secciones);
		document.getElementsByTagName('section')[3].setAttribute('class','fijo');
		} else {
			swal({
  confirmButtonText: 'Ok',
  text: 'Introduce un numero valido',
  type: 'warning',
  timer: 3000
			})
		}
		
	}) 
	
} else if ($((document.getElementsByTagName('section'))[3]).is(':visible')) {
	  reseteo(secciones);
	  document.getElementsByTagName('section')[4].setAttribute('class','fijo');
	  
} else if ($((document.getElementsByTagName('section'))[4]).is(':visible')) {
	   var sueldoNow = getSueldo() - 300; 
        removeSueldo();
		addSueldo(sueldoNow);
		if(sueldoNow > 0) {
		swal({
  title: 'Exito',
  confirmButtonText: 'Ok',
  text: 'Recarga hecha con exito',
  type: 'success',
  timer: 3000
})
		
	  reseteo(secciones);
	  document.getElementsByTagName('section')[1].setAttribute('class','fijo');
	} else {
		swal({
  title: 'Error',
  confirmButtonText: 'Ok',
  text: 'No tienes sueldo suficiente',
  type: 'warning',
 
})
	}
  }
});

$("#7").click(function () {
	if ($((document.getElementsByTagName('section'))[4]).is(':visible')) {
	   var sueldoNow = getSueldo() - 500; 
        removeSueldo();
		addSueldo(sueldoNow);
		if(sueldoNow > 0) {
		swal({
  title: 'Exito',
  confirmButtonText: 'Ok',
  text: 'Recarga hecha con exito',
  type: 'success',
  timer: 3000
})
		
	  reseteo(secciones);
	  document.getElementsByTagName('section')[1].setAttribute('class','fijo');
	} else {
		swal({
  title: 'Error',
  confirmButtonText: 'Ok',
  text: 'No tienes sueldo suficiente',
  type: 'warning',
 
})
	}
  }
});
});

function mostrarSection(datos) {
		reseteo(secciones);
		secciones[1].setAttribute('class', 'fijo');
	}
	
function reseteo(secciones) {
		for(x=0; x < secciones.length; x++) {
			secciones[x].setAttribute('class', 'nofijo');
		}
	}
function setSueldo(cant) {
		localStorage.setItem('sueldo', cant);
	}
function getSueldo() {
		var sueldo = localStorage.getItem('sueldo');
		return parseInt(sueldo);
	}
	
function removeSueldo() {
     localStorage.removeItem('sueldo');
}

function addSueldo(sd) {
	 localStorage.setItem('sueldo',sd);
}


	
