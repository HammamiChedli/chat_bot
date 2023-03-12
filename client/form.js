const signinBtn = document.querySelector('.btn-send');
const signupBtn = document.querySelector('.signup');
const loginForm = document.querySelector('.royal-form');
const form2 = document.querySelector('.royal-form-signup');
const errorElt = document.querySelector('.invalid-feedback');
const errorEmail = document.querySelector('.form-info-email');
const passwordStyle = document.getElementById('password');
const emailInput = document.querySelector('input[name="email"]');
const passwordInput = document.querySelector('input[name="password"]');

let validepass = false;

passwordStyle.style.color = validepass ? 'green' : 'red';

// setError function to display error messages
function setError(element, message) {
    element.textContent = message;
    element.classList.add('error');
}

// removeError function to remove error messages
function removeError(element) {
    element.textContent = '';
    element.classList.remove('error');
}

// When the user clicks on the password field, show the message box
passwordStyle.onfocus = function () {
    errorElt.style.display = 'block';
    errorElt.textContent = validepass ? '' : 'Le mot de pass doit contenir au moins 8 charactaires';
};

// When the user clicks outside of the password field, hide the message box
passwordStyle.onblur = function () {
    errorElt.style.display = 'none';
};

// When the user starts to type something inside the password field
passwordStyle.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    // Validate numbers
    var numbers = /[0-9]/g;
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (
        passwordStyle.value.match(lowerCaseLetters) &&
        passwordStyle.value.match(upperCaseLetters) &&
        passwordStyle.value.match(numbers) &&
        passwordStyle.value.length >= 8
    ) {
        passwordStyle.style.color = 'green';
        errorElt.textContent = 'Le mot de pass est correcte ';
        errorElt.style.color = 'green';
        validepass = true;
    } else {
        validepass = false;
    }
};

const handleSignup = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = new FormData(form2);
    let user = {
        userName: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
    };
    const responce = await fetch('http://localhost:3000/auth/signup/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (responce.ok) {
        fetch('http://localhost:3000/auth/signin/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((er) => console.log(er));
        window.location.href = 'http://127.0.0.1:5173/chat.html';
    } else {
        const err = await responce.json();
        console.log(err);
    }
    form2.reset();
    document.querySelector('.modal').parentElement.style.display = 'none';
};

function validator() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let valid = true;

    // Validate email
    if (!email) {
        valid = false;
        setError(errorEmail, 'Email is required');
    }

}

// setError function to display error messages
function setError(element, message) {
    element.textContent = message;
    element.classList.add('error');
}

// removeError function to remove error messages
function removeError(element) {
    element.textContent = '';
    element.classList.remove('error');
}

// Login form

const loginEmailInput = document.querySelector('#email');
const loginPasswordInput = document.querySelector('#password');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateEmail(loginEmailInput.value)) {
        setError(loginEmailInput, 'Invalid email');
        return;
    } else {
        removeError(loginEmailInput);
    }

    if (loginPasswordInput.value.length < 6) {
        setError(loginPasswordInput, 'Password should have at least 6 characters');
        return;
    } else {
        removeError(loginPasswordInput);
    }

    // Submit form
});

// Sign up form
const signupForm = document.querySelector('.signup-form');
const signupNameInput = document.querySelector('#name');
const signupEmailInput = document.querySelector('#email');
const signupPasswordInput = document.querySelector('#password');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (signupNameInput.value.trim() === '') {
        setError(signupNameInput, 'Name is required');
        return;
    } else {
        removeError(signupNameInput);
    }

    if (!validateEmail(signupEmailInput.value)) {
        setError(signupEmailInput, 'Invalid email');
        return;
    } else {
        removeError(signupEmailInput);
    }

    if (signupPasswordInput.value.length < 6) {
        setError(signupPasswordInput, 'Password should have at least 6 characters');
        return;
    } else {
        removeError(signupPasswordInput);
    }

    // Submit form
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}



