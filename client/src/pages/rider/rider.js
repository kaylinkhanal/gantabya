import { useDispatch } from 'react-redux'
import { logout } from '../../redux/reducerSlice/userSlice'
const Home = (props) => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div>
            i am Nabin From the Rider Page
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home