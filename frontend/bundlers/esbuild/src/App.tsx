import React, {useState} from 'react'
import './index.css'
import './style.css'
import Logo from './doom_guy.jpg'
import s from './App.module.scss'
import './Test.scss'

const App = () => {
  const [counter, setCounter] = useState(0)
  const a: number = 2
  return <div>
      <img src={Logo} alt={''}/>
      React Esbuild !!!sdf !!fsdfsdf
      <div className={s.test}>
          TESTTEST!!!df
      </div>
      <button onClick={() => setCounter(2)}>CCC</button>
      {a}
  </div>
}


export default App
