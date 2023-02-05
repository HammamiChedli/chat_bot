const signinBtn = document.querySelector('.btn-send')
const signupBtn = document.querySelector('.signup')
const form = document.querySelector('.royal-form')
const form2 = document.querySelector('.royal-form-signup')
const errorElt = document.querySelector('.form-info')

signupBtn.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const data = new FormData(form2)
    let user = {
        'userName': data.get('name'),
        'email': data.get('email'),
        'password': data.get('password')

    }
    console.log(user)
    form2.reset()
    document.querySelector('.modal').parentElement.style.display = 'none'


})
signinBtn.addEventListener('click', (e) => {

    e.preventDefault()
    const data = new FormData(form)
    let user = {

        'email': data.get('email'),
        'password': data.get('password')

    }
    console.log(user)
    form.reset()
})


