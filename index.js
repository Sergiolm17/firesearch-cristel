const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const firebase = require('firebase');
/*
var http = require('http');
var fs = require('fs');

//create a server object:
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(process.env.PORT || 5000);

*/


/*
http.createServer(function(req, res){
  fs.readFile('index.html',function (err, data){
      res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
      res.write(data);
      res.end();
  });
}).listen(process.env.PORT || 5000);


*/
const express = require('express')
const app = express()


app.get('/',function(req,res){

  
  res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 5000)




 // load values from the .env file in this directory into process.env
dotenv.load();
console.log(process.env.FIREBASE_DATABASE_URL);

// configure firebase
firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const database = firebase.database();

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);



//REALTIME DATABASE



const contactsRef = database.ref('/contacts');
contactsRef.on('child_added', addOrUpdateIndexRecord);
contactsRef.on('child_changed', addOrUpdateIndexRecord);
contactsRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(contact) {
  // Get Firebase object
  const record = contact.val();
  // Specify Algolia's objectID using the Firebase object key
  record.objectID = contact.key;
  // Add or update object
  index
    .saveObject(record)
    .then(() => {
      console.log('Objeto de Firebase indexado', record.objectID);
    })
    .catch(error => {
      console.error('Error al indexar objero en Algolia', error);
      process.exit(1);
    });
}

function deleteIndexRecord(contact) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = contact.key;
  // Remove the object from Algolia
  index
    .deleteObject(objectID)
    .then(() => {
      console.log('Objeto de Firebase eliminado de Algolia', objectID);
    })
    .catch(error => {
      console.error('Error al eliminar contacto en Algoliaa', error);
      process.exit(1);
    });
}
