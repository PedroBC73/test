'use strict';

(function(){
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
})(); 