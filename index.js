const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const firebase = require('firebase');
/*
*/

const express = require('express')
const app = express()


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


console.log('inicio');
//REALTIME DATABASE



const contactsRef = database.ref('/contact');
console.log(contactsRef);
contactsRef.on('child_added', addOrUpdateIndexRecord);
contactsRef.on('child_changed', addOrUpdateIndexRecord);
contactsRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(contact) {
 console.log(contact);
 console.log("añadido papu");
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
  console.log(contact);
 console.log("añadido papu");
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
