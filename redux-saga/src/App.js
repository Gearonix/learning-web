import { useSelector, useDispatch } from "react-redux";
import {incrementWorker} from "./redux/sagas";
import {increaseCount} from "./redux/reducers/counter";


const App = () => {
  const count = useSelector(store => store?.counter?.count || 0);
  const dispatch = useDispatch();

  const handleIncrease = () => {
      dispatch(increaseCount('helloworld_saga'))
  };

  return(
    <div>
      <button onClick={handleIncrease}>+1</button>
      <h1>{count}</h1>
    </div>
  );
};

export default App;
