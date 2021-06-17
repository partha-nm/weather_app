console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageone = document.querySelector('#msg_1')
const messagetwo = document.querySelector('#msg_2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    messageone.textContent ='loading content ...'
    messagetwo.textContent = ' '

    fetch('http://localhost:5000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageone.textContent = data.error
        } else {
            messageone.textContent =data.location
            messagetwo.textContent = data.forecast
        }
    })
})
})