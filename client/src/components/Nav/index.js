import styles from '@/styles/Home.module.css'
import CutomDrawer from '../Drawer'
import Logout from '../logout'
// import { useDispatch } from 'react-redux'
// import {logout} from '../../redux/reducerSlice/userSlice'

const Navbar =()=> {
    // const dispatch = useDispatch()
    // const handleLogout = () => {
    //     dispatch(logout())
    // }
    return(
        <>
        <div className={styles.nav}>
            <div>
            <CutomDrawer/>

            </div>
            <div>
        {/* <button >Logout</button> */}

        <Logout/>

                </div>

        
        </div>
        <div>
         
            <p className={styles.navTitle}>Gantabya</p>
          </div>
        </>
    )
}

export default Navbar