import React, { useState, useEffect } from 'react';
import axios from "axios";
import AdminDashBoard from '../AdminDashBoard';
import Footer from '../../Common/Footer';
import { Link, useParams, withRouter } from 'react-router-dom';



function AddDelivery() {

    const [deliveryid, setdeliveryid] = useState("");
    const [orderid, setorderid] = useState("");
    const [trackingid, settrackingid] = useState("");
    const [did, setdid] = useState("");
    const [deliveryaddress, setdeliveryaddress] = useState("");
    const [deliveryfee, setdeliveryfee] = useState("");

    const { id } = useParams();

    useEffect(() => {
        setorderid(id)
    })

    async function sendData(e) { //Function for add delivery
        e.preventDefault();


        if (!deliveryid || !orderid || !trackingid || !did || !deliveryaddress || !deliveryfee) {
            alert("Fields can't be empty");
        }
        else
            if (deliveryid.length !== 3)
                alert("Delivery id should be at least 3 numbers ")
            else
                if (orderid.length !== 3)
                    alert("Order id should be at least 3 numbers ")
                else
                    if (trackingid.length !== 3)
                        alert("Tracking id should be at least 3 numbers ")
                    else
                        if ((did.startsWith("D") === false) && (did.length != 4))
                            alert("Invalid Delivery driver id ")
                        else {
                            const delivery = {
                                deliveryid,
                                orderid,
                                trackingid,
                                did,
                                deliveryaddress,
                                deliveryfee
                            }
                            await axios.post("http://localhost:8070/delivery/add", delivery).then((res) => { // backend link
                                if (res.data === "Taken") {
                                    alert("Delivery already added provide another delivery to be added ");

                                } else
                                    alert("Inserted new Delivery");
                                window.location.replace('/DeliveryList')
                            }).catch((msg) => {
                                alert("Delivery Error" + msg);
                            })
                        }
    }

    return (
        <div>
            <AdminDashBoard></AdminDashBoard>
            <div>
                <div>
                    <main >
                        <div className="container1">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <br /><br /><br />
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Add Delivery </h3></div>
                                        <div className="card-body">
                                            <form method="post">

                                                <div className="form-floating mb-3">
                                                    <label>Delivery Id : </label><br /><br />
                                                    <input className="form-control" type="number" name="did" placeholder="Type delivery id" aria-required="true" onChange={(e) => {
                                                        setdeliveryid(e.target
                                                            .value);
                                                    }} required />

                                                </div>
                                                <div className="form-floating mb-3">
                                                    <label>Order Id :</label><br /><br />
                                                    <input className="form-control" type="text" name="oid" placeholder="Type order id" value={id} onChange={(e) => { setorderid(e.target.value); }} required readOnly />
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <label>Tracking Id :</label><br /><br />
                                                    <input className="form-control" type="number" name="tid" placeholder="Type tracking id" onChange={(e) => { settrackingid(e.target.value); }} required />
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <label>Delivery Driver Id :</label><br /><br />
                                                    <input className="form-control" type="text" name="did" placeholder="Type Delivery Driver id" onChange={(e) => { setdid(e.target.value); }} required />
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <label>Delivery address :</label><br /><br />
                                                    <input className="form-control" type="text" name="da" placeholder="Type delivery address" onChange={(e) => { setdeliveryaddress(e.target.value); }} required />
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <label>Delivery fee :</label><br /><br />
                                                    <input className="form-control" type="number" name="df" placeholder="Type delivery fee" onChange={(e) => { setdeliveryfee(e.target.value); }} required />
                                                </div>


                                                <br />

                                                <div className="d-grid">
                                                    <input type='submit' className="btn btn-primary btn-block" onClick={sendData} value="Add"></input></div>

                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer></Footer>
        </div>

    )
}

export default AddDelivery;