import styles from '@/styles/Home.module.css'
import CutomDrawer from '../Drawer'
const Navbar =()=> {
    return(
        <>
        <div className={styles.nav}>
        <CutomDrawer/>
        </div>
        <div>
         
            <p className={styles.navTitle}>Gantabya</p>
          </div>
        </>
    )
}

export default Navbar