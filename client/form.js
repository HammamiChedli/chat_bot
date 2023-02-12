const signinBtn = document.querySelector('.btn-send')
const signupBtn = document.querySelector('.signup')
const form = document.querySelector('.royal-form')
const form2 = document.querySelector('.royal-form-signup')
const errorElt = document.querySelector('.form-info-pass')
const errorEmail = document.querySelector('.form-info-email')
const passwordStyle = document.querySelector('.password')
let validepass = false


passwordStyle.style.color = validepass ? 'green' : 'red'

// When the user clicks on the password field, show the message box
passwordStyle.onfocus = function () {

    errorElt.style.display = "block";
    errorElt.textContent = validepass ? '' : `Le mot de pass doit contenir au moins 8 charactaires `

}

// When the user clicks outside of the password field, hide the message box
passwordStyle.onblur = function () {

    errorElt.style.display = "none";
}

// When the user starts to type something inside the password field

passwordStyle.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    // Validate numbers
    var numbers = /[0-9]/g;
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (passwordStyle.value.match(lowerCaseLetters)
        && passwordStyle.value.match(upperCaseLetters)
        && passwordStyle.value.match(numbers)
        && passwordStyle.value.length >= 8) {
        passwordStyle.style.color = 'green'
        errorElt.textContent = 'Le mot de pass est correcte '
        errorElt.style.color = 'green'
        validepass = true

    } else {

        validepass = false

    }

}

const handleSignup = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const data = new FormData(form2)
    let user = {
        'userName': data.get('name'),
        'email': data.get('email'),
        'password': data.get('password')

    }
    const responce = await fetch('http://localhost:3000/auth/signup/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    if (responce.ok) {
        window.location.href = 'http://127.0.0.1:5173/chat.html'
    } else {
        const err = await responce.json()

        console.log(err)


    }
    form2.reset()
    document.querySelector('.modal').parentElement.style.display = 'none'

}
const handleSignin = async (e) => {

    e.preventDefault()
    const data = new FormData(form)
    let user = {

        'email': data.get('email'),
        'password': data.get('password')

    }
    if (user.email == '' || user.password == '') {
        errorElt.textContent = 'vous devez renseigner un mot de passe'
        errorEmail.textContent = 'Vous devez renseigner un email'
        return
    } else {
        const responce = await fetch('http://localhost:3000/auth/signin/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(user)
        })
        if (responce.ok) {
            window.location.href = 'http://127.0.0.1:5173/chat.html'

        }


        form.reset()
    }


}

signinBtn.addEventListener('click', handleSignin)
signupBtn.addEventListener('click', handleSignup)
