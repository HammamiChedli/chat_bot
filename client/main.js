import bot from './assets/bot.svg'
import user from './assets/user.svg'
import util from './utility'


let botResponse = []
let userQuestion = []
const userStorage = localStorage.getItem('user')
const botStorage = localStorage.getItem('bot')
const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')



if (userStorage && botStorage) {

    let html = util.getDataStorage()
    chatContainer.innerHTML += html

}

let loadInterval
const loader = (element) => {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}


function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            // to focus scroll to the bottom 
            chatContainer.scrollTop = chatContainer.scrollHeight;
            // to get 1 character by the index
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}







const handleSubmit = async (e) => {
    e.preventDefault()
    const uniqueId = util.uniqueId()
    const data = new FormData(form)
    let userMessage = {
        'id': uniqueId,
        'message': data.get('prompt')
    }
    userQuestion.push(userMessage)

    localStorage.setItem('user', JSON.stringify(userQuestion))


    const userMes = JSON.parse(localStorage.getItem('user'))

    userMes.filter(x => x.id === uniqueId)
    let userInput = ""
    userMes.forEach((x) => {
        userInput = x.message
    })

    chatContainer.innerHTML += util.chatStripe(false, userInput)

    // to clear the textarea input 
    form.reset()

    // bot's chatstripe

    chatContainer.innerHTML += util.chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })

    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.message.trim() // trims any trailing spaces/'\n' 

        let botMessage = {
            'id': uniqueId,
            'message': parsedData
        }

        botResponse.push(botMessage)
        localStorage.setItem('bot', JSON.stringify(botResponse))

        const botMes = JSON.parse(localStorage.getItem('bot'))
        console.log(botMes)
        botMes.filter(x => x.id === uniqueId)
        let y = '';
        botMes.forEach((x) => {
            y = x.message
        })
        console.log(y)
        typeText(messageDiv, y)
    } else {
        const err = await response.text()

        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }

}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})