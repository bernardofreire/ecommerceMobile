import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').files[0];

    // Conversão de imagem para URL (exemplo de armazenamento em base64 para simplificar)
    let productImageUrl = '';
    if (productImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
            productImageUrl = reader.result;
            saveProductToFirestore(productName, productPrice, productDescription, productImageUrl);
        };
        reader.readAsDataURL(productImage);
    } else {
        saveProductToFirestore(productName, productPrice, productDescription, productImageUrl);
    }
});

// Função para salvar o produto no Firestore
async function saveProductToFirestore(name, price, description, imageUrl) {
    try {
        await addDoc(collection(db, "products"), {
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl,
            createdAt: new Date()
        });
        alert("Produto cadastrado com sucesso!");
    } catch (e) {
        console.error("Erro ao cadastrar produto:", e);
        alert("Erro ao cadastrar o produto. Tente novamente.");
    }
}
