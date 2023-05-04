const words = document.querySelector('#words')


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true
recognition.lang = 'ru'

recognition.addEventListener('result', (e) => {
    const text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')


    const p = document.createElement('p')
    p.textContent = text
    if (e.results[0].isFinal){
        words.appendChild(p)
    }
})


recognition.addEventListener('end', () => {
    recognition.start();
})



console.log('Recognition testing initialized.')

recognition.start()
