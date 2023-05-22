import { logout,setToken,setRole } from '../../redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const UserDashBoard = ()=> {
  const {role} =useSelector(state=> state.user)
    return (
        <div style={{textAlign:'center'}}>
          <h1> Hello {role} </h1>
      </div>
    )
}

export default UserDashBoard