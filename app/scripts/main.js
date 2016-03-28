//'use strict';

/*(function(){*/
	var solicitud = solicitud || {};
	solicitud.habitaciones = [],
	solicitud.maxhabitaciones = 5;

solicitud.addRoom = function(){	
	solicitud.habitaciones.push(new Habitacion());

	if(this.habitaciones.length <= this.maxhabitaciones){
		solicitud.render();
		$('#rooms').text(solicitud.habitaciones.length);
	} 

	if (this.habitaciones.length === this.maxhabitaciones){
			$('.btn').hide();
	} 

}

solicitud.totalPersons = function(typePerson) { 	
	if(typePerson === "adults") {
		var sumaA = 0;
		for (var i = 0; i < solicitud.habitaciones.length; i++) {
			sumaA += solicitud.habitaciones[i].adults;
		}
	return sumaA;
	} 
	if (typePerson === "kids"){
		var sumaK = 0;
		for (var j = 0; j < solicitud.habitaciones.length; j++) {
			sumaK += solicitud.habitaciones[j].kids;
		}
	return sumaK;
	}    	   	
}

solicitud.render = function(){
	var html = ""; 
   for (var i = 0; i < solicitud.habitaciones.length; i++) {    	
	html +='<li id="' + i + '">'+ 
						'<span class="room-title">habitación <span class="num-room">' + (i+1) + '</span></span>' +
						'<i class="material-icons">person</i><select id="selectAdult">' + solicitud.addSelect (solicitud.habitaciones[i].adults)+ '</select>' +
						'<i class="material-icons mi-kid">person</i><select id="selectKid">' +   solicitud.addSelect (solicitud.habitaciones[i].kids) + '</select>' +
						'<a class="delete" href="javascript:void(0);"><i class="material-icons">clear</i></a>' +
						'</li>';
					
}
	$('.room-list').html("");
	$(html).appendTo('.room-list').addClass('room');
	$('a.delete').first().remove();
	solicitud.addSelect();
}

solicitud.addSelect = function(selectedValue){
	var html="";
	for (var i = 0; i <= 20; i++) {
		//console.log(i+  "==" + selectedValue);
			if(i==selectedValue)
			{
			html += '<option value="' + i + '" selected>' + i + '</option>';
			}
			else {
				html += '<option value="' + i + '">' + i + '</option>';	
	}						
			}

					return html;
    }

solicitud.deleteRoom = function(roomIndex){
	//console.log(roomIndex);
	this.habitaciones.splice(roomIndex,1);
	solicitud.render();
	if (this.habitaciones.length < this.maxhabitaciones){
		$('.btn').show();
				}
		$('#adults').text(solicitud.totalPersons("adults"));
		$('#kids').text(solicitud.totalPersons("kids"));
	}
		var Habitacion = function(){ 
		this.adults = 2,
		this.kids = 0,
		this.setAdults = function(num){
		this.adults = num;
		},
		this.setKids = function(num){
		this.kids = num;
	}

}

var cupones = cupones || {};
cupones.numCupon = "",
cupones.numToValidate = "";
cupones.tipoTarifa = "";
cupones.addCupon = function() {
	$("#addcode").hide();
	$("#cupon").remove();
	//$("#cupon").removeClass('open').addClass('close');.html('')

	var newCupon = '<a id="cupon" href="javascript:void(0);" class="close"> Código aplicado: ' + cupones.numCupon + '<i class="material-icons">clear</i></a>';
	$(".discount-cupon").html(newCupon);

};
cupones.closeCupon = function() {
	console.log('cierra cupon');
	cupones.numCupon = "";
	var resetLink = '<a id="cupon" href="javascript:void(0);" class="open">Tengo un cupón <i class="material-icons">expand_more</i></a>';
	$(".discount-cupon").html(resetLink);
	$('#newcupon').val('');
	$("#addcode").hide();
};
cupones.validaCupon = function() {
	var validYear = /^2016/.test(this.numToValidate);
	if (!/^([0-9])*$/.test(this.numToValidate) || cupones.numToValidate == ""){
		$('.warning').text('Debe introducir un número');
	} else if(validYear && cupones.numToValidate.length == 8){
		//console.log("Empieza por 2016" + validYear)
		//console.log("tiene 8 números " + cupones.numToValidate.length);
		$('#newcupon').removeClass('error');
		cupones.numCupon = cupones.numToValidate;
		cupones.addCupon();
	} else {
		//console.log("NO empieza por 2016" + validYear + " O NO tiene 8 números tiene " + cupones.numToValidate.length);
		$('.warning').text('Debe introducir un número que empiece por 2016 y tenga 8 cifras');
	}
};
cupones.addTarifa = function() {
	var newTarifa = '<a id="tarifa" href="javascript:void(0);" class="close"> Tarifa especial: ' + cupones.tipoTarifa + '<i class="material-icons">clear</i></a>';
	$(".discount-tarifa").html(newTarifa);
	$("#addtarifa").remove();
};
cupones.closeTarifa = function() {
	cupones.tipoTarifa = "";
	var resetLink = '<a id="tarifa" href="javascript:void(0);" class="open">Tarifas especiales <i class="material-icons">expand_more</i></a>';
	$(".discount-tarifa").html(resetLink); 
	$('<div id="addtarifa" class="add-tarifa"><button id="tarifa-AACC" class="btn-tarifa button">AA/CC</button>' +
          '<button id="tarifa-SD" class="btn-tarifa button">Senior Discount</button>' +
          '<button id="tarifa-GM" class="btn-tarifa button">Goverment military</button></div>').appendTo('#extras');
        
};
$('#extras').on('click', '.btn-tarifa', function(){
	console.log($(this).text());
	cupones.tipoTarifa = $(this).text();
	cupones.addTarifa();
})
$('#put').on('click', function(){
	cupones.numToValidate = $('#newcupon').val();
	cupones.validaCupon();
});
$('#newcupon').on('focus', function(){
	$(this).addClass('error').val('');
	$('.warning').text('');
}).on('blur', function(){
	$(this).removeClass('error');
}).on('click keypress', function(){
	if(/^2016/.test(this.value) && this.value.length == 7){
		$(this).removeClass('error');
	} else {
		$(this).addClass('error');
	}
});

$('#addcode a').on('click', function(){
	$('#newcupon').val('');
	cupones.closeCupon();
});

$('.search-booking-btn').click(function() {

	$('.wrap-room-list').toggle();
	if (solicitud.habitaciones.length === 0){
		
	$(".btn").trigger( "click");
		
	}

	if($('.wrap-room-list').is(':visible')){
		
		$('.search-booking').addClass('selected');
		//$(this).css('padding','4px');
	} else {

		$('.search-booking').removeClass('selected');
		//$(this).css('padding','6px');
	}
});


// Añadir habitación
$('.btn').click(function(){
	solicitud.addRoom();
	$('#adults').text(solicitud.totalPersons("adults"));
	//Select();
});
var id = "",
	numAdults = "",
	numKids = "",
	elem = "";
// Borrar habitación
$(".room-list").on('click', 'a.delete', function(){

	id = $(this).parent().attr('id');
	$('#'+id).remove();
	solicitud.deleteRoom(id); //borrar habitaciones

})
.on('change', '#selectAdult', function(){

	numAdults =  parseInt(this.value);
	elem = $(this).parent().attr('id');

	solicitud.habitaciones[elem].setAdults(numAdults);
	$('#adults').text(solicitud.totalPersons("adults"));
}) //añadir adultos
.on('change', '#selectKid', function(){

	numKids =  parseInt(this.value);
	elem = $(this).parent().attr('id');

	solicitud.habitaciones[elem].setKids(numKids);
	$('#kids').text(solicitud.totalPersons("kids"));

})//añadir niños

// CONTADORES
$('#rooms').text(solicitud.habitaciones.length + 1);
$('#adults').text(solicitud.totalPersons("adults") + 2);
$('#kids').text(solicitud.totalPersons("kids"));

$('.discount-cupon').on('click', '.open', function() { 
    
    $("#addcode").toggle("slide");

  	if($(this).find('i').text() == 'expand_more'){
        $(this).find('i').text('expand_less');
    } 
    else if($(this).find('i').text() == 'expand_less'){
        $(this).find('i').text('expand_more');
    } 
    $("#addtarifa").hide();
    $('#tarifa').find('i').text('expand_more');

});
$('.discount-cupon').on('click', '.close' , function() { 
     cupones.closeCupon();
     $('#addcode').hide();
});
$('.discount-tarifa').on('click', '.close' , function() { 
     cupones.closeTarifa();
});

$('.discount-tarifa').on('click', '.open', function() { 
    
    $("#addtarifa").toggle("slide");

  	if($(this).find('i').text() == 'expand_more'){
        $(this).find('i').text('expand_less');
    } 
    else if($(this).find('i').text() == 'expand_less'){
        $(this).find('i').text('expand_more');
    } 
    $("#addcode").hide();
    $('#cupon').find('i').text('expand_more');
});

/*})();*/ 