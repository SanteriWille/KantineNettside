import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyBu7Vuf_VMHXQMTPgGyIjj8JILDM6Qp4S4",
      authDomain: "kantine-f25bd.firebaseapp.com",
      projectId: "kantine-f25bd",
      storageBucket: "kantine-f25bd.appspot.com",
      messagingSenderId: "451585102997",
      appId: "1:451585102997:web:4a2e0799f01d92f3bdf79c"
    };
 
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

// Hent vare
// Legg til vare
const addItemToFirestore = async (name, price, description, menuType, itemType) => {
  try {
    const docRef = await addDoc(collection(db, "menu_items"), {
      navn: name,
      pris: price,
      beskrivelse: description,
      menyType: menuType,
      vareType: itemType,
      timestamp: serverTimestamp()
    });
    alert("Vare lagt til!");
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding item: ", error);
    alert("Noe gikk galt, prøv igjen.");
  }
};

document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("vareNavn").value;
  const price = document.getElementById("varePris").value;
  const description = document.getElementById("vareBeskrivelse").value;
  const menuType = document.getElementById("menyVelgerR").value;
  const itemType = document.getElementById("vareType").value;

  if (name && price && description && menuType && itemType) {
    addItemToFirestore(name, price, description, menuType, itemType);
    
    document.getElementById("vareNavn").value = '';
    document.getElementById("varePris").value = '';
    document.getElementById("vareBeskrivelse").value = '';
    document.getElementById("menyVelgerR").value = '';
    document.getElementById("vareType").value = '';
  } else {
    alert("Vennligst fyll ut alle feltene.");
  }
});