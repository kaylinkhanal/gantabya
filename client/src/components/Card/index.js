import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
import { Card } from 'antd';
import { useSelector } from 'react-redux';
const { Meta } = Card;

const CustomCard = (props) => {
   const router = useRouter();
   const {role } = useSelector(state=>state.user)
 return(
  <Card
  hoverable
  onClick={()=>  router.push('/user/'+props.item._id)}
  style={{
    width:role=='user'?200:400 ,
    backgroundColor:role=='user'?'aliceblue':null,
    margin:'10px'
  }}
>     
  {props.item.status}
  <Meta title={props.item.pickUpAddress} description={props.item.destinationAddress} />
</Card>

)}
export default CustomCard;