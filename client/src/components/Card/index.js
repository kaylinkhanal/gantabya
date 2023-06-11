import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
import { Card } from 'antd';
const { Meta } = Card;

const CustomCard = (props) => {
   const router = useRouter();
 return(
  <Card
  hoverable
  onClick={()=>  router.push('/user/'+props.item._id)}
  style={{
    width: 400,
  }}
>      
  <Meta title={props.item.pickUpAddress} description={props.item.destinationAddress} />
</Card>

)}
export default CustomCard;