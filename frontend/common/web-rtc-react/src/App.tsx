import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Main from './pages/Main';
import Room from './pages/Room';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>
    },
    {
        path: '/room/:roomId',
        element: <Room/>
    }
])


function App() {
  return (
      <RouterProvider router={router}/>
  )
}

export default App
