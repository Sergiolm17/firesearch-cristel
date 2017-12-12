$(function() {
  // Get a reference to the root of the chat data.
  var messagesRef = new Firebase("https://cristel-d2910.firebaseio.com/nombremarcas");

  // When the user presses enter on the message input, write the message to firebase.
  $("#name").keypress(function (e) {
    if (e.keyCode === 13) {
      adds();
    }
  });


var add = document.getElementById("add");
add.addEventListener("click",adds);

function adds(){
  console.log("dentraste a adds");
mandar();
}

function MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function mandar() {
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var f=new Date();
  var completo = f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  var name = $("#name").val();
  name = MaysPrimera(name.toLowerCase());
  messagesRef.push({name:name});
  $("#name").val(null);
}


// Add a callback that is triggered for each chat message.
 messagesRef.limitToLast(1).on("child_added", function (snapshot) {
 var message = snapshot.val();
//	$("#ulti-odesf").text(message.odesf),

 });

  // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(10).on("child_added", function (snapshot) {
	var message = snapshot.val();
	var llave = snapshot.key();
	console.log(llave);

    $("<div/>",{
      id:llave,
      class:"col-12 col-xs-12",
      style:"border: 1px solid #c2c2c2;padding: 1%;border-radius: 4px;"
    }).prepend([
      //$("<em/>").text(message.completo + ": "),
      $("<div/>",{class :"col-6 col-xs-6"}).text(message.name),
      $("<div/>",{class:"col-6 col-xs-6"}).append(
        [
          $("<input/>",{
            type  : 'button',
            value : "ELIMINAR",
            class :"btn btn-danger btn-block",
            //id    : message.completo,
            on    : {
              click: function() {
                var refllave = new Firebase("https://cristel-d2910.firebaseio.com/nombremarcas/"+llave);
                refllave.remove()
               // var elem = document.getElementById(llave);
               // elem.removeChild(elem);
              }
            }
          })
        ]
      )
	  ]).appendTo($("#messagesDiv"));


    $("#messagesDiv")[0].scrollTop = $("#messagesDiv")[0].scrollHeight;
  });
  

    //cuando se elimina un elemento
    messagesRef.on("child_removed", function (snapshot) {
      var message = snapshot.val();
      var llave = snapshot.key();
      console.log("se elimino "+llave);
      var elem = document.getElementById(llave);
      elem.parentElement.removeChild(elem);
    });

});
