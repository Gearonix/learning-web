import React from 'react'

import './App.css';
import API from "./service/service";


function App() {
    const response = API.useFetchProductsQuery(10)
    const [createPost, {}] = API.useCreatePostMutation()
    const data = response.data


    console.log(data)

    const doPost = async () => {
        const title = prompt()
        await createPost({title, body: 'typicode'})
    }

    return (
    <div className='App'>
      <button onClick={doPost}>click</button>
        {data && data.map(i => <h2 key={i.id}>{i.title}</h2>)}
    </div>
  );
}

export default App;
