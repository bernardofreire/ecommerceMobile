import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Inicialize o Firestore
const db = getFirestore();

// Função para registrar o usuário
document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuário registrado com sucesso
            const user = userCredential.user;
            console.log("Usuário registrado:", user);
            window.location.href = 'home.html';  // Redirecionar para outra página
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Erro no registro:", errorMessage);
        });
});

// Função para login do usuário
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            const user = userCredential.user;
            console.log("Usuário logado:", user);
            window.location.href = 'home.html';  // Redirecionar para outra página
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Erro no login:", errorMessage);
        });
});

// Gerenciamento do Carrinho
let cart = [];

// Função para adicionar um item ao carrinho e salvar no Firestore
async function addToCart(productName) {
    cart.push(productName);
    alert(`${productName} added to cart!`);
    
    try {
        // Adiciona o item ao Firestore na coleção "cart"
        await addDoc(collection(db, "cart"), {
            productName: productName,
            timestamp: new Date()
        });
        console.log(`${productName} salvo no Firestore`);
    } catch (e) {
        console.error("Erro ao salvar no Firestore:", e);
    }
}

// Função para abrir o modal do carrinho
function toggleCart() {
    document.getElementById('cartModal').classList.toggle('hidden');
    renderCartItems();
}

// Função para fechar o modal do carrinho
function closeCart() {
    document.getElementById('cartModal').classList.add('hidden');
}

// Função para renderizar os itens do carrinho
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('text-gray-700', 'mb-2');
        li.textContent = item;
        cartItemsContainer.appendChild(li);
    });
}
