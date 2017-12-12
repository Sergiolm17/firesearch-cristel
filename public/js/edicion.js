$(function() {
  // Get a reference to the root of the chat data.
  var messagesRef = new Firebase("https://cristel-d2910.firebaseio.com/contacts");

  // When the user presses enter on the message input, write the message to firebase.
  $("#lastname").keypress(function (e) {
    if (e.keyCode === 13) {
      mandar();
    }
  });

var add = document.getElementById("add");
add.addEventListener("click",adds);

function adds(){
mandar();
}
function mandar() {

	var name = $("#name").val();
  var lastname = $("#lastname").val();
  var celular = $("#celular").val();
	var odesf = $("#odesf").val();
	var odcil = $("#odcil").val();
	var oiesf = $("#oiesf").val();
	var oicil = $("#oicil").val();
	var odgrad = $("#odgrad").val();
	var oigrad = $("#oigrad").val();
	var llavesita = $("#llaveto").text();
	console.log(llavesita);
  console.log(lastname);
	var refllave = new Firebase("https://cristel-d2910.firebaseio.com/contacts/"+llavesita);
	refllave.update({odesf:odesf , odcil:odcil ,oiesf:oiesf ,oicil:oicil,name:name, lastname:lastname, odgrad:odgrad, oigrad:oigrad, celular:celular});

}
 // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(1).on("child_added", function (snapshot) {
	var message = snapshot.val();
	const llave = snapshot.key();

	console.log(llave);


/*
    $("<div/>").prepend($("<div/>").prepend([
			$("<div/>").text(message.name),
			$("<div/>").text(message.lastname)
		])
	).appendTo($("#messagesDiv" ));

*/

$("#name").val(message.name);
$("#lastname").val(message.lastname);
$("#celular").val(message.celular);
$("#odesf").val(message.odesf);
$("#odcil").val(message.odcil);
$("#oiesf").val(message.oiesf);
$("#oicil").val(message.oicil);
$("#odgrad").val(message.odgrad);
$("#oigrad").val(message.oigrad);
$("#llaveto").text(llave);

 $("#messagesDiv")[0].scrollTop = $("#messagesDiv")[0].scrollHeight;

  });
});
