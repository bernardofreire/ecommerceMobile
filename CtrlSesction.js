// sessionControl.js

// Função para armazenar o token no localStorage após o login
function setSessionToken(token) {
    localStorage.setItem('sessionToken', token);
}

// Função para verificar se o usuário está autenticado
function checkSession() {
    const token = localStorage.getItem('sessionToken');
    if (!token) {
        // Se não tiver token, redireciona para a tela de login
        window.location.href = 'login.html';
    }
}

// Função de logout que remove o token e redireciona para login
function logout() {
    localStorage.removeItem('sessionToken');
    window.location.href = 'login.html';
}

// Chama a função de verificação de sessão ao carregar a página `home.html`
if (window.location.pathname.includes('home.html')) {
    checkSession();
}

// Exporta as funções para serem usadas em outros arquivos
export { setSessionToken, logout };
