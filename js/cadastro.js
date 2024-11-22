import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxlJSIRdcrkrFSFQtiIMxU903PJxPglCI",
  authDomain: "shamegame-a48a5.firebaseapp.com",
  projectId: "shamegame-a48a5",
  storageBucket: "shamegame-a48a5.firebasestorage.app",
  messagingSenderId: "1087895213201",
  appId: "1:1087895213201:web:b38e6049500080ee929b30",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  if (!validarForm()) {
    return;
  }

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const senha2 = document.getElementById("senha2").value;

  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        nome: nome,
        email: email,
      })
        .then(() => {
          alert("Conta criada e dados salvos com sucesso!");
          window.location.href = "login.html";
        })
        .catch((error) => {
          alert("Erro ao salvar os dados: " + error.message);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Erro ao criar conta: " + errorMessage);
    });
});

function validarForm() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const senha2 = document.getElementById("senha2").value;

  if (!nome || !email || !senha || !senha2) {
    Erro("Todos os campos são obrigatórios!");
    return false;
  }

  const emailValidacao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValidacao.test(email)) {
    Erro("Por favor, insira um email válido.");
    return false;
  }

  if (senha.length < 8) {
    Erro("A senha deve ter pelo menos 8 caracteres.");
    return false;
  }

  if (senha !== senha2) {
    Erro("As senhas não conferem.");
    return false;
  }

  return true;
}

function Erro(message, isError = true) {
  const errorMessageDiv = document.getElementById("error-message");
  errorMessageDiv.innerHTML = message;
  errorMessageDiv.style.color = isError ? "red" : "green";
  errorMessageDiv.style.display = "block";
}
