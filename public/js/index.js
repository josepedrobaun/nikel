const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

//Check o login
checkLogged();

//Logar no Sistema - INDEX
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Não encontramos nenhuma conta com este e-mail, verifique seu usuário e senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Não encontramos nenhuma conta com este e-mail, verifique seu usuário e senha.");
            return;
        }
        
        saveSession(email,checkSession);

        window.location.href = "home.html";
    }
});

//Criar Conta - INDEX
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5) {
        alert("Preencha o camo com um e-mail válido.")
        return;
    }

    if(password.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos.")
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso!");
});

//Função que vai checar se está logado
function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

//Função que salva um novo usuário
function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

//Função que irá salvar a sessão
function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

//Função que vai verificar se existe a conta no LocalStorage
function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}