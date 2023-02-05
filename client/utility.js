import bot from './assets/bot.svg'
import user from './assets/user.svg'


const setupCounter = (element) => {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

const uniqueId = () => {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}
const getDataStorage = () => {

  const parseUserMessage = JSON.parse(localStorage.getItem('user'))
  const parseBotMessage = JSON.parse(localStorage.getItem('bot'))
  let html = ''
  for (let i of parseUserMessage) {
    html += `
      <div class="wrapper false">
          <div class="chat">
              <div class="profile">
                  <img 
                    src=${user}
                    alt=user
                  />
              </div>
              <div class="message" id=${i.id}>${i.message}</div>
          </div>
      </div>
        `
    for (let y of parseBotMessage) {
      html += `
          <div class="wrapper ai">
              <div class="chat">
                  <div class="profile">
                      <img 
                        src=${bot}
                        alt=user
                      />
                  </div>
                  <div class="message" id=${y.id}>${y.message}</div>
              </div>
          </div>
            `
      break
    }
    continue
  }
  return html
}
function chatStripe(isAi, value, uniqueId) {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
              <div class="profile">
                  <img 
                    src=${isAi ? bot : user} 
                    alt="${isAi ? 'bot' : 'user'}" 
                  />
              </div>
              <div class="message" id=${uniqueId}>${value}</div>
          </div>
      </div>
  `
  )
}

const typeText = (element, text, elt) => {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      // to focus scroll to the bottom 
      elt.scrollTop = elt.scrollHeight;
      // to get 1 character by the index
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

export default { setupCounter, uniqueId, getDataStorage, chatStripe, typeText }