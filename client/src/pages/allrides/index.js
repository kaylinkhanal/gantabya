import React from 'react'

//getServerSideProps => fetches again on every new page request
//getClient
export async function getStaticProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:4000/rides`)
    const data = await res.json()
   
    // Pass data to the page via props
    return { props: { data } }
  }

  //
function AllRides(props) {
    //useState,
    //useEffect
  return (
    <div>{props.data.ridesList.map((item)=>{
        return <li>{item.destinationAddress}</li>
    })}</div>
  )
}

export default AllRides

