$(function() {
  // Get a reference to the root of the chat data.
  var messagesRef = new Firebase("https://cristel-d2910.firebaseio.com/contacts");

  // When the user presses enter on the message input, write the message to firebase.
  $("#lastname").keypress(function (e) {
    if (e.keyCode === 13) {
      mandar();		
    }
  });
	
	
var uno = document.getElementById("uno");
uno.addEventListener("click",unos);	
function unos (){
	var odesf = $("#odesf").val();
	if (odesf !== "") {
	odesf = odesf * -1 ;
	$("#odesf").val(odesf);
	}
}
	
var dos = document.getElementById("dos");
dos.addEventListener("click",doss);	
function doss (){
	var odcil = $("#odcil").val();
	if (odcil !== "") {
	odcil = odcil * -1 ;
	$("#odcil").val(odcil);
	}
}
	
var tres = document.getElementById("tres");
tres.addEventListener("click",tress);	
function tress (){
	var oiesf = $("#oiesf").val();
	if (oiesf !== "") {
	oiesf = oiesf * -1 ;
	$("#oiesf").val(oiesf);
	}
}
	
var cuatro = document.getElementById("cuatro");
cuatro.addEventListener("click",cuatros);	
function cuatros (){
	var oicil = $("#oicil").val();
	if (oicil !== "") {
	oicil = oicil * -1 ;
	$("#oicil").val(oicil);
	}
}	
	
	
	
var add = document.getElementById("add");
add.addEventListener("click",adds);

function adds(){
mandar();
}	
function mandar() {
	
	var name = $("#name").val();
	var lastname = $("#lastname").val();
	
	var odesf = $("#odesf").val();
	var odcil = $("#odcil").val();
	
	var oiesf = $("#oiesf").val();
	var oicil = $("#oicil").val();
	
	var odgrad = $("#odgrad").val();
	var oigrad = $("#oigrad").val();
	
	var dip = $("#dip").val();
	
	var tienda = "1";
	

	var d = new Date();
	var days = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
	

	
	messagesRef.push({
		odesf:odesf,
		odcil:odcil,
		oiesf:oiesf,
		oicil:oicil,
		name:name,
		lastname:lastname,
		odgrad:odgrad,
		oigrad:oigrad,
		dip:dip,
		tienda:tienda,
		fecha:d.days
	});
   
	$("#name").val("");
	$("#lastname").val("");

	$("#odesf").val("");
	$("#odcil").val("");

	$("#oiesf").val("");
	$("#oicil").val("");

	$("#odgrad").val("");
	$("#oigrad").val("");
	
	$("#dip").val("");
}

 // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(2).on("child_added", function (snapshot) {
	var message = snapshot.val();
	
/*
    $("<div/>").prepend($("<div/>").prepend([
			$("<div/>").text(message.name),
			$("<div/>").text(message.lastname)
		])
	).appendTo($("#messagesDiv" ));

*/


	$("#ulti-name").text(message.name),
	$("#ulti-lastname").text(message.lastname),

	$("#ulti-odesf").text(message.odesf),
	$("#ulti-odcil").text(message.odcil),
	$("#ulti-oiesf").text(message.oiesf),
	$("#ulti-oicil").text(message.oicil),

	$("#ulti-odgrad").text(message.oigrad),
	$("#ulti-oigrad").text(message.odgrad),

	$("#ulti-dip").text(message.dip),
	
	$("#messagesDiv")[0].scrollTop = $("#messagesDiv")[0].scrollHeight;
	
});
});
