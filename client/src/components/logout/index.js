import { useDispatch } from 'react-redux'
import {logout} from '../../redux/reducerSlice/userSlice'
import { useSelector } from 'react-redux'
const Logout = (props)=> {
    const { token } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
      }
    return (
        <div>
            {token &&
            <button style={{padding:'10px',margin:'5px',backgroundColor:'blue',color:'white'}} 
            onClick={handleLogout}>Logout</button>
            }
        
        
      </div>
    )
}

export default Logout