import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


// Inicializar Firestore
const db = getFirestore();

// Função para registrar o usuário
document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const role = "user";  // Definir o tipo de usuário como "user"

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário registrado:", user);

      // Adicionar o usuário ao Realtime Database com o campo 'role'
      set(ref(database, 'users/' + user.uid), {
        email: user.email,
        role: role
      }).then(() => {
        console.log("Usuário adicionado com sucesso ao banco de dados.");
      }).catch((error) => {
        console.error("Erro ao adicionar usuário ao banco de dados:", error);
      });

      window.location.href = "home.html"; // Redirecionar para a página home
    })
    .catch((error) => {
      console.error("Erro no registro:", error.message);
    });
});

// Função para login do usuário
ddocument.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Buscar o papel do usuário no banco de dados
      const userRef = ref(database, 'users/' + user.uid);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userRole = userData.role;
          console.log("Tipo de usuário:", userRole);

          // Redirecionar ou habilitar/desabilitar funções com base no papel
          if (userRole === 'admin') {
            window.location.href = "admin-dashboard.html"; // Página de administrador
          } else {
            window.location.href = "home.html"; // Página de usuário comum
          }
        } else {
          console.log("Usuário não encontrado no banco de dados.");
        }
      }).catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
      });
    })
    .catch((error) => {
      console.error("Erro no login:", error.message);
      alert("Conta não autorizada!");
    });
});

// Verificação de autenticação
onAuthStateChanged(auth, (user) => {
  if (user) {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      user.getIdToken().then((newToken) => {
        sessionStorage.setItem("authToken", newToken);
      });
    }
  } else {
    sessionStorage.removeItem("authToken");
    // Verifica se está em uma página restrita
    if (window.location.pathname !== "/index.html") {
      window.location.href = "index.html"; // Redirecionar para login se não autenticado
    }
  }
});

// Função de logout
document.getElementById("logoutButton")?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    sessionStorage.removeItem("authToken"); // Remove o token da sessão
    alert("Logout bem-sucedido!");
    window.location.href = "index.html"; // Redireciona para a página de login
  } catch (error) {
    console.error("Erro ao deslogar:", error.message);
  }
});

// Gerenciamento do Carrinho
let cart = [];

// Função para adicionar um item ao carrinho e salvar no Firestore
async function addToCart(productName) {
  cart.push(productName);
  alert(`${productName} adicionado ao carrinho!`);

  try {
    // Adiciona o item ao Firestore na coleção "cart"
    await addDoc(collection(db, "cart"), {
      productName: productName,
      timestamp: new Date(),
    });
    console.log(`${productName} salvo no Firestore`);
  } catch (e) {
    console.error("Erro ao salvar no Firestore:", e);
  }
}

// Função para abrir o modal do carrinho
function toggleCart() {
  document.getElementById("cartModal").classList.toggle("hidden");
  renderCartItems();
}

// Função para fechar o modal do carrinho
function closeCart() {
  document.getElementById("cartModal").classList.add("hidden");
}

// Função para renderizar os itens do carrinho
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("text-gray-700", "mb-2");
    li.textContent = item;
    cartItemsContainer.appendChild(li);
  });
}
