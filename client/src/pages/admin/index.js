import { useDispatch } from 'react-redux'
import {logout} from '../../redux/reducerSlice/userSlice'
const Home = (props)=> {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
      }
    return (
        <div>
        i am admin page
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
}

export default Home