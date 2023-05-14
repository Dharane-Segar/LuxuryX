import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import AdminDashBoard from "../AdminDashBoard";
import Footer from "../../Common/Footer";
import { Link } from "react-router-dom";

export default function AllLeave() {
  const [leaves, setLeaves] = useState([]);
  const [query, setQuery] = useState("");
  const [Id, setId] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    function get() {
      axios
        .get("http://localhost:8070/leave/getleaves")
        .then((res) => {
          console.log(res.data);
          setLeaves(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    get();
  }, []);

  function GET(id) {
    axios
      .get(`http://localhost:8070/leave/getId/${id}`)
      .then((res) => {
        setId(res.data.la._id);
        setStatus(res.data.la.status);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  async function updateData(e) {
    e.preventDefault();

    const newStatus = { status };

    await axios
      .put(`http://localhost:8070/leave/update/${Id}`, newStatus)
      .then(() => {
        alert("Leave Application status updated");
        window.location.replace("/allleave");
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <>
      <div>
        <AdminDashBoard></AdminDashBoard>
        <div className="mt-5">
          <div className="container">
            <div className="add_btn mt-2 mb-2">
              <br />
              <br />
              

              <div className="row justify-content-center"><h2 style={{ marginLeft: "200px" }}>Leave Application List</h2></div>
              <br />
              <div>
                <input
                  type="text"
                  id="searchDelivery"
                  style={{ marginLeft: "300px" }}
                  placeholder="Type Leave Id here"
                  onChange={(e) => setQuery(e.target.value)}
                />

<Link style={{ marginLeft: "80px" }}
                to={`http://localhost:3000/reportle/${query}`}
                className="btn btn-primary"
              >
                Yearly Report
              </Link>

              <Link style={{ marginLeft: "80px" }}
                to={`http://localhost:3000/reportle/${query}`}
                className="btn btn-primary"
              >
                Monthly Report
              </Link>

              </div>
            </div>
            <br />

            <br />

            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Leave Id</th>
                  <th scope="col">eid</th>
                  <th scope="col">Fullname</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Days</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  
                  <th scope="col">Status</th>
                  <th scope="col">Operations</th>
                </tr>
              </thead>
              
                  <tbody>
                  {leaves
                .filter(
                  (l) => 
                l.startdate.slice(5,7).includes(query)||
                l.startdate.slice(0,7).includes(query)||
                l.startdate.includes(query)
                 )

                .map((l) => (
                    <tr>
                      <th scope="row">{l.Id}</th>
                      <td>{l.eid}</td>
                      <td>{l.fullname}</td>
                      <td>{l.reason}</td>
                      <td>{l.days}</td>
                      <td>{l.startdate.toString().slice(0,10)}</td>
                      <td>{l.enddate.toString().slice(0,10)}</td>
                      
                      <td>{l.status}</td>
                      <td className="d-flex justify-content-between">
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => GET(l.Id)}
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          <CreateIcon />
                        </button>
                        <button
                        
                        className="btn btn-danger"
                        onClick={(e) => GET(l.Id)}
                        data-toggle="modal"
                        data-target="#delle">
                         
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3
                className=" font-weight-light my-4"
                style={{ alignContent: "center" }}
              >
                Update Status
              </h3>
              <button
                type="button"
                className="close-modal"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="form-floating mb-3">
                <label>Status :</label>
                <br />
                <br />
                <input className="form-control" value={status} type="text" />
              </div>
              <label>Status : &nbsp;</label>
              <input
                type="radio"
                id="a"
                name="status"
                value="Accepted"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                required
              ></input>
              <label htmlFor="m"> &nbsp;&nbsp;Accepted &nbsp;</label>
              <input
                type="radio"
                id="d"
                name="status"
                value="Denied"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                required
              ></input>
              <label htmlFor="f"> &nbsp;&nbsp;Denied</label>
              <br />
            </div>

            <div className="d-grid">
              <button
                className="btn btn-primary"
                type="submit"
                style={{ marginLeft: "100px", marginRight: "100px" }}
                onClick={updateData}
              >
                Update
              </button>
              <br />
            </div>
          </div>
        </div>
        </div>

        <div className="modal1" id="delle">
        <div className="modal-dialog">
          <div className="modal-content">
            

            <div className="modal-body">
                <br></br>
                <h5>Are you sure you want to delete this leave application? </h5>
              
<br></br>
            
<button
                        className="btn btn-danger"
                        type="submit"
                style={{ marginLeft: "130px" }}
                onClick={() => {
                  axios
                    .delete(
                      `http://localhost:8070/leave/deletela/${Id}`
                    )
                    .then((res) => {
                      
                        window.location.replace("/allleave");
                      
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
                href="/allleave"
                
                
              >
                No
              </a>
              
              <br />
              </div>
              <br></br>
            
          </div>
        </div>
        </div>
    
       
         
      
    </>
  );
}
