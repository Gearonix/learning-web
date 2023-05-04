import './App.css';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS,CREATE_USER} from "./query/query";
import {useEffect, useState} from "react";

function App() {
  const response = useQuery(GET_ALL_USERS)
  const [mutation] = useMutation(CREATE_USER)
  const [data,setData] = useState([])
  useEffect(() => {
      setData(response?.data?.getUsers)
  },[response])

  const addUser = () => {
    mutation({
      variables: {
        input: {
          username: 'react_username',
          age: 50,
        }
      }
    }
  ).then(({data}) => {
      getAll()
    })

  }
  const getAll = () => {
    response.refetch()
  }

  console.log(response)

  return (
    <div className="App">
      <button onClick={addUser}>click</button>
      {data?.map(i => <h1 key={i.id}>{i.username}</h1>)}
    </div>
  );
}

export default App;
