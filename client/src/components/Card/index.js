import { Card } from 'antd';
import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
const CustomCard = (props) => {
   const router = useRouter();
 return(
    <div className={styles.card} 
      onClick={()=>  router.push('/user/'+props.item._id)}
    >
               {props.item.destinationAddress}
               {props.item.pickupAddres}
               {props.item.status}
              </div>
)}
export default CustomCard;