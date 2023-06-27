import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
import { Card } from 'antd';
import { useSelector } from 'react-redux';
const { Meta } = Card;
import axios from 'axios'

const CustomCard = (props) => {
   const router = useRouter();
   const {role } = useSelector(state=>state.user)
   const deleteRides = async() => {
    const headers = { 
      "Content-Type": "application/json",
  };
  const data = {
    id: props.item._id
  }
  const res =await axios.delete('http://localhost:4000/rides', { headers, data })
  if(res) props.fetchRides()
   }
 return(
  <Card
  hoverable
  style={{
    width:role=='user'?200:400 ,
    backgroundColor:role=='user'?'aliceblue':null,
    margin:'10px'
  }}
>     
  <button onClick={()=> deleteRides()}>Delete</button>
  <div  onClick={()=>  router.push('/user/'+props.item._id)}>
  {props.item.status}
  <Meta title={props.item.pickUpAddress} description={props.item.destinationAddress} />
  </div>
 
</Card>

)}
export default CustomCard;