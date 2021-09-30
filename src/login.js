(function () {
    const firebaseConfig = {
        apiKey: "AIzaSyAYlEc60qm-F0Um6hQC22m9nqiV8WfU6r8",
        authDomain: "fir-login-64381.firebaseapp.com",
        projectId: "fir-login-64381",
        storageBucket: "fir-login-64381.appspot.com",
        messagingSenderId: "303834836340",
        appId: "1:303834836340:web:fa1b59cea13460bf195021"
    };

    firebase.initializeApp(firebaseConfig);

    // Get Handle on Firebase services
    const auth = firebase.auth();
    const googleAuth = new firebase.auth.GoogleAuthProvider();

    // Get UI elements for LogIn
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const login = document.getElementById("login");
    const signup = document.getElementById("signup");
    const logout = document.getElementById("logout");
    const googlelogin = document.getElementById("googlelogin")

    

    // Google Login ----------------------------------
    // Functionalities for Google-LogIn
    var resultUserEmail;
    googlelogin.addEventListener('click', e => {
            auth.signInWithPopup(googleAuth)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // Make User.Email public
                resultUserEmail = result.user.email;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    })

    // Login State
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      logout.style.display = 'inline';
      login.style.display = 'none';
      signup.style.display = 'none';
      googlelogin.style.display= 'none';
      email.style.display = 'none';
      password.style.display = 'none';
      document.getElementById("loggedInStatus").innerHTML = `<h1>You are logged in using the following email: ${resultUserEmail}`;
    }
    else {
      console.log('User is not logged in');
      logout.style.display = 'none';
      login.style.display = 'inline';
      signup.style.display = 'inline';
      googlelogin.style.display = 'inline'
      email.style.display = 'inline';
      password.style.display = 'inline';
    }
  })

  // Logout
  logout.addEventListener('click', e => {
    auth.signOut();
    document.getElementById("loggedInStatus").innerHTML = `<h1>You are not yet logged in`
  })


}())