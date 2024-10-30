// Configuração Firebase (substitua com suas credenciais)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SUA_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Função para carregar os itens do carrinho
async function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    let total = 0;

    // Limpa o container antes de adicionar os itens
    cartItemsContainer.innerHTML = '';

    // Obtém os itens do carrinho do Firebase
    const querySnapshot = await db.collection('cart').get();
    querySnapshot.forEach((doc) => {
        const item = doc.data();
        const itemPrice = item.price * item.quantity;
        total += itemPrice;

        // Cria o HTML para cada item do carrinho
        const itemHTML = `
            <div class="flex justify-between items-center border-b pb-4">
                <div>
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600">Quantity: ${item.quantity}</p>
                </div>
                <p class="text-lg font-bold">$${itemPrice.toFixed(2)}</p>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Atualiza o total
    totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

// Carregar os itens ao iniciar
loadCartItems();
