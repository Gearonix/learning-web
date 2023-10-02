import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const NotFound = () => {
    const [test,setTest] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setTest(true)
        },500)
    })
    return <div data-testid={'not-found-page'}>
        not found
        <Link to={'/users'} data-testid={'link'}>to users</Link>
        {test && <span data-testid={'test-test'}>test!</span>}
    </div>
}

export default NotFound


