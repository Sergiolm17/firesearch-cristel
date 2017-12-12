$(function() {
	//GET TIENDA
	var n = $( "input:checked" ).length;

	var messagesRef = new Firebase("https://cristel-d2910.firebaseio.com/marcas/"+n);

//$("#name").keypress(function (e) {
//    if (e.keyCode === 13) {
//      mandar();
//    }
//	});
//	var add = document.getElementById("add");
//	add.addEventListener("click",mandar);


	function countChecked() {
		var n = $( "input:checked" ).length;
		$("#messagesDiv").empty();
		act();
		$("#llaveto").text(n);
	};
	countChecked();
	$( "#tienda" ).on( "click", countChecked );
	// Get a reference to the root of the chat data.


function mandar() {
	//inicio de fecha
	var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	var f=new Date();
	var dia = f.getDate();
	var mes =  meses[f.getMonth()];
	var año = f.getFullYear();
	//fin de fecha

	var name = $("#name").val();
	var n = $( "input:checked" ).length;
  var messagesRef = new Firebase("https://cristel-d2910.firebaseio.com/marcas/"+n);
	messagesRef.push({name:name,dia:dia,mes:mes,año:año});
  $("#name").val(null);
};

function act (){
	var n = $( "input:checked" ).length;
	var messagesRef = new Firebase("https://cristel-d2910.firebaseio.com/marcas/"+n);
  messagesRef.limitToLast(20).on("child_added", function (snapshot) {
		var message = snapshot.val();
		var llave = snapshot.key();
			$("<div/>",{id:llave,
      class:"col-12 col-xs-12",
      style:"border: 1px solid #c2c2c2;padding: 0.3%;border-radius: 4px;margin-bottom: 2px;"
    	}).prepend([
			//$("<em/>").text(message.completo + ": "),
			$("<div/>",{class :"col-xs-6 col-md-6 col-lg-6"}).append([$("<h2/>").text(message.name)]),
			$("<div/>",{class:"col-xs-6 col-md-6 col-lg-6"
    }).append([$("<input/>",{
				type  : 'button',
				value : "ELIMINAR",
				class :"btn btn-danger btn-block",
				//id    : llave,
				on    : {
				click: function() {
					var n = $( "input:checked" ).length;
					var refllave = new Firebase("https://cristel-d2910.firebaseio.com/marcas/"+n+"/"+llave);
					refllave.remove();
					var elem = document.getElementById(llave);
					elem.parentElement.removeChild(elem);
				}
			}
		})])
	]).appendTo($("#messagesDiv"));
		$("#messagesDiv")[0].scrollTop = $("#messagesDiv")[0].scrollHeight;
	}
);}

	//cuando se elimina un elemento
	messagesRef.on("child_removed", function (snapshot) {
		var message = snapshot.val();
		var llave = snapshot.key();
		console.log("se elimino "+llave);
		var elem = document.getElementById(llave);
		elem.parentElement.removeChild(elem);
	 });

});
