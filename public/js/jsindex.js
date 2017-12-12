  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4gYIOxfAofl77qpJTseZci-RR-9BEGRA",
    authDomain: "cristelsalida.firebaseapp.com",
    databaseURL: "https://cristelsalida.firebaseio.com",
    projectId: "cristelsalida",
    storageBucket: "cristelsalida.appspot.com",
    messagingSenderId: "728010011839"
  };
  firebase.initializeApp(config);


  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().languageCode = 'es';
  // To apply the default browser preference instead of explicitly setting it.
  // firebase.auth().useDeviceLanguage();

