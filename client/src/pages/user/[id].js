import { useRouter } from 'next/router';
 
export default function Page() {
  const router = useRouter();
  useEffect(()=>{
    fetchRidesDetails()
  }, [])
  const fetchRidesDetails = () => {
    //       fetch('http://localhost:4000/rides/'+router.query.id)
  }
  return <p>Post: {router.query.id}</p>;
}