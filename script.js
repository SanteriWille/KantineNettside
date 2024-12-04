  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyBu7Vuf_VMHXQMTPgGyIjj8JILDM6Qp4S4",
      authDomain: "kantine-f25bd.firebaseapp.com",
      projectId: "kantine-f25bd",
      storageBucket: "kantine-f25bd.appspot.com",
      messagingSenderId: "451585102997",
      appId: "1:451585102997:web:4a2e0799f01d92f3bdf79c"
    };
 
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
  
    document.getElementById('logBtn').addEventListener('click', async function(event) {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }
  
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential);

        const docRef = doc(db, 'admin', 'admints');
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists() && docSnap.data().dbemail === email && docSnap.data().dbpassword === password) {
          window.location.href = "redigerevarer.html";
        } else {
          alert("Incorrect email or password.");
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        alert("Error: " + error.message);
      }

      password.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("logBtn").click();
        }
      })
    });
