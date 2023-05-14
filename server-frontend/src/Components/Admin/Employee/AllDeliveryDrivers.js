import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import AdminDashBoard from "../AdminDashBoard";
import Footer from "../../Common/Footer";

export default function AllDeliveryDriver() {
  const [image, setImage] = useState("");
  const [Id,setId] = useState("")
  const [did,setDid]  =useState("");

  function GET(id) {
    axios
      .get(`http://localhost:8070/deliverydriver/getDid/${id}`)
      .then((res) => {
        setImage(res.data.dd.image);
        setId(res.data.dd._id);
        setDid(res.data.dd.did);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const [deliverydrivers, setDeliveryDrivers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function getDD() {
      axios
        .get(`http://localhost:8070/deliverydriver/getdd`)
        .then((res) => {
          console.log(res.data);
          setDeliveryDrivers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getDD();
  }, []);

  function modal() {
    var pdf = document.getElementById("pdf").value;
    pdf.fadeIn().css("display", "flex");
  }

  return (
    <div>
      <AdminDashBoard></AdminDashBoard>
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2" style = {{marginRight: "50px"}}>
            <br />
            <br />
            
            <div className="row justify-content-center" ><h2 style={{ marginLeft: "200px" }}>Delivery Driver List</h2></div>
            <br />
            <div>
              <input
                type="text"
                id="searchDelivery"
                style={{ marginLeft: "250px" }}
                placeholder="Type Sid/Name here"
                onChange={(e) => setQuery(e.target.value)}
              />
              <a
                className="btn btn-primary"
                href="http://localhost:3000/adddd"
                style={{ marginLeft: "120px" }}
              >
                Add Delivery Driver
              </a>

              <a
                className="btn btn-primary"
                href="http://localhost:3000/reportdd"
                style={{ marginLeft: "120px" }}
                onClick={modal}
                id="pdf"
              >
                Generate Report
              </a>
            </div>
          </div>

          <br />

          <table className="table" style={{ marginLeft: "100px",marginRight: "500px" }}>
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">Fullname</th>
                <th scope="col">Email</th>
                
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">DOB</th>
                <th scope="col">License No</th>
                <th scope="col">Vehicle No</th>
                <th scope="col">NIC</th>
                <th scope="col">Basic Salary</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              {deliverydrivers
                .filter(
                  (d) =>
                    d.did.toLowerCase().includes(query) ||
                    d.fullname.toLowerCase().includes(query)
                )
                .map((deliverydriver) => (
                  <tr>
                    <th scope="row">{deliverydriver.did}</th>
                    <td>{deliverydriver.fullname}</td>
                    <td>{deliverydriver.email}</td>
                    
                    <td>{deliverydriver.address}</td>
                    <td>{deliverydriver.phone}</td>
                    <td>{deliverydriver.dob.toString().slice(0,10)}</td>
                    <td>{deliverydriver.licenseno}</td>
                    <td>{deliverydriver.vehicleno}</td>
                    <td>{deliverydriver.nic}</td>
                    <td>{deliverydriver.basicsalary}</td>
                    <td className="d-flex justify-content-between">
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          window.location.replace(
                            `/updatedd/${deliverydriver.did}`
                          );
                        }}
                      >
                        <CreateIcon />
                      </button>
                      <button
                        className="btn"
                        onClick={(e) => GET(deliverydriver.did)}
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        <RemoveRedEyeIcon />
                      </button>
                      
                      <button
                      className="btn btn-danger"
                      onClick={(e) => GET(deliverydriver.did)}
                      data-toggle="modal"
                      data-target="#delemp"
                       
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer></Footer>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <img id="pic1" src={image} data-dismiss="modal" />
            </div>
          </div>
        </div>
      </div>
      <div className="modal1" id="delemp">
        <div className="modal-dialog">
          <div className="modal-content">
            

            <div className="modal-body">
                <br></br>
                <h5>Are you sure you want to delete this employee? </h5>
              
<br></br>
            
<button
                        className="btn btn-danger"
                        type="submit"
                style={{ marginLeft: "130px" }}
                        onClick={() => {
                          axios.delete(
                            `http://localhost:8070/deliverydriver/deletedd/${Id}`
                          );
                          axios
                            .delete(
                              `http://localhost:8070/t/delete/${did}`
                            )
                            .then((res) => {
                              if (res.data === "success") {
                                alert("Delivery Driver deleted successfully");
                                window.location.replace("/alldd");
                              } else if (res.data === "error") {
                                alert("Error in deleting Delivery Driver");
                              }
                            })
                            .catch((err) => {
                              alert(err);
                            });
                        }}
                      >
                Yes
              </button>
              
              <a
                className="btn btn-primary "
                type="submit"
                style={{ marginLeft: "100px" }}
                href="/alldd"
                
                
              >
                No
              </a>
              
              <br />
              </div>
              <br></br>
            
          </div>
        </div>
        </div>


    </div>
  );
}
