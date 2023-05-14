import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import axios from "axios"


const DeliveryDriverView2 = (props) => {

  const{_id,deliveryid,orderid,trackingid,did,deliveryaddress,deliveryfee,status}=props.deliveries
  
  const id = _id.toString()

  const updateDispatched = (e) => {
    e.preventDefault() //Like preventing page to refresh

    const Deliveries = {
        status: "Dispatched",
    }


    axios.put(`http://localhost:8070/delivery/updateDD/${id}`, Deliveries).then(() => {
        console.log("Delivery updated successfully");
        alert("Delivery Updated Successfully")
        window.location.replace('/deliveryDriverView')
    })
        .catch((error) => {
            console.log(error.response.data)
        })
}


const updateDelivered = (e) => {
    e.preventDefault() //Like preventing page to refresh

    const Deliveries = {
        status: "Delivered",
    }


    axios.put(`http://localhost:8070/delivery/updateDD/${id}`, Deliveries).then(() => {
        console.log("Delivery updated successfully");
        alert("Delivery Updated Successfully")
        window.location.replace('/deliveryDriverView')
    })
        .catch((error) => {
            console.log(error.response.data)
        })
}


const updateInProcess = (e) => {
    e.preventDefault() //Like preventing page to refresh

    const Deliveries = {
        status: "In-progress",
    }


    axios.put(`http://localhost:8070/delivery/updateDD/${id}`, Deliveries).then(() => {
        console.log("Delivery updated successfully");
        alert("Delivery Updated Successfully")
        window.location.replace('/deliveryDriverView')
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
        <button type="button" className='btn btn-danger' onClick={updateInProcess}>progress</button>
        </td>
        <td>
            <button type="button" className='btn btn-primary' onClick={updateDispatched}>Dispatched</button>
        </td>
        <td>
            <button type="button" className='btn btn-secondary' onClick={updateDelivered}>Delivered</button>
        </td>
        </tr>
    </> 
  )
}

export default DeliveryDriverView2