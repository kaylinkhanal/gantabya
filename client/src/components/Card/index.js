import { Card } from 'antd';
import styles from '@/styles/Home.module.css'

const CustomCard = (props) => {
 return(
    <div className={styles.card} >
               {props.item.destinationAddress}
               {props.item.pickupAddres}
               {props.item.status}
              </div>
)}
export default CustomCard;