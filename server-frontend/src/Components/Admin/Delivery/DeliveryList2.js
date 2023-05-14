import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DeliveryList2 = (props) => {

  const{_id,deliveryid,orderid,trackingid,did,deliveryaddress,deliveryfee,status}=props.deliveries
  
  const id = _id.toString()

  const deleteDelivery = (_id) =>{
    //const id = Delivery_id 
    axios.delete(`http://localhost:8070/delivery/delete/${id}`).then(() =>{
     alert("Delivery Deleted Successfully")
     window.location.replace('/DeliveryList')
  })
  .catch((error) => {
      console.log(error.response.data)
  })
}

  return (
    <>  
      <tr>
        <td><center>{deliveryid}</center></td>
        <td><center>{orderid}</center></td>
        <td><center>{trackingid}</center></td>
        <td><center>{did}</center></td>
        <td><center>{deliveryaddress}</center></td>
        <td><center>{deliveryfee}</center></td>
        <td><center>{status}</center></td>
                                   
        <td>
            <Link className='btn btn-secondary' to={{pathname: `/UpdateDelivery/${id}`}}>
            <CreateIcon />
            </Link>
        </td>
        <td>
            <button type="button" className='btn btn-danger' onClick={deleteDelivery}><DeleteOutlineIcon /></button>
        </td>
        </tr>
    </> 
  )
}

export default DeliveryList2