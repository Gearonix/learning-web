import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const sendNotification = async () => {
      const permission = await Notification.requestPermission()
      console.log(`notifications status: ${permission}`)
      if (permission === 'granted'){
          console.log(window.subscription)
          await fetch('http://localhost:6868/subscribe', {
              method: 'POST',
              body: JSON.stringify(window.subscription),
              headers: {
                  'content-type': "application/json"
              }
          })
  }}
    const fetchTest = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11')
        const data = await res.json()
        console.log(data)
    }
    fetchTest()

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={sendNotification}>
          send message
        </button>
          <button onClick={fetchTest}>fetch</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
