$(function() {
  // Get a reference to the root of the chat data.
  var messagesRef = new Firebase("https://cristel-d2910.firebaseio.com/contacts");

  // When the user presses enter on the message input, write the message to firebase.
  $("#lastname").keypress(function (e) {
    if (e.keyCode === 13) {
      mandar();
    }
  });


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
var array = [];
 // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(4).on("child_added", function (snapshot) {
	var message = snapshot.val();
	const llave = snapshot.key();

  array.push(message.fecha);
	console.log(array);


/*
    $("<div/>").prepend($("<div/>").prepend([
			$("<div/>").text(message.name),
			$("<div/>").text(message.lastname)
		])
	).appendTo($("#messagesDiv" ));

*/

$("#name").val(message.name);


  });










  var dom = document.getElementById("container");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  option = {
      title: {
          text: 'TITULO',
          left: 'center'
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
      },
      legend: {
          left: 'left',
          data: ['2', '3']
      },
      xAxis: {
          type: 'category',
          name: 'x',
          splitLine: {show: false},
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      yAxis: {
          type: 'log',
          name: 'y'
      },
      series: [
          {
              name: 'primero',
              type: 'line',
              data: [1, 7, 9, 27, 81, 247, 65, 54, 2]
          },
          {
              name: 'segundo',
              type: 'line',
              data: [800, 2, 4, 8, 16, 32, 800, 128, 256]
          }
      ]
  };
  ;
  if (option && typeof option === "object") {
      myChart.setOption(option, true);
  }
















});
