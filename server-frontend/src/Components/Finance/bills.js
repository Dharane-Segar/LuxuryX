import React, { useState, useEffect,useRef } from "react";
import axios from "axios";

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Footer from "../Common/Footer";
import { useReactToPrint } from "react-to-print";

export default function AllSuppliers() {

    const [eid, setTid] = useState("");
    const [Bills, setTBills] = useState([]);
    var a=1;

    useEffect(() => {
        getBills();
    }, []);

    
    const getBills= async () => {
        const BillsData = async () => {
            axios.get("http://localhost:8070/bills/readB").then((res) => {
                
                setTBills(res.data);
            }).catch((err) => {
                alert(err.message)
            })
        }
        BillsData();
    }



     //Delete Transactions----------------------------------------------------------------------------

    const deleteBills = (id) => {

    const response = window.confirm('Are You Sure?');

    if (response) {
      axios.delete(`http://localhost:8070/bills/deleteBills/${id}`);
      alert("successfully Deleted");
      window.location.reload();
    }



  };


  
     //Search Bills----------------------------------------------------------------------------

     const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8070/bills/search/${key}`);
            result = await result.json();
            if (result) {
                setTBills(result);
            }
        } else {
            getBills();
        }
    };


//Add bills to transaction----------------------------------------------------------------------------

  const [id, setBillId] = useState('');
  const [isMountedD, setIsMountedD] = useState(false);

  useEffect(() => {
    setIsMountedD(true);

    return () => setIsMountedD(false);
  }, []);

  useEffect(() => {
    if (isMountedD) {
      axios.get(`http://localhost:8070/bills/readBillsByID/${id}`)
        .then((response) => {
           // console.log(response.data)
          const dataToInsert = response.data.map((item) => ({
            did: item._id,
            name: item.name,
            type: 'expense',
            category: 'Bills',
            amount: item.amount,
            remark: 'Bill Payment',
            date: new Date().toISOString().substr(0, 10),
          }));

          dataToInsert.forEach((data) => {
            
                    //console.log(response.data)
                  axios.post("http://localhost:8070/financeTransaction/insertT", {
                    name: data.name,
                    type: data.type,
                    category: data.category,
                    amount: data.amount,
                    remark: data.remark,
                    date: data.date,
                    did: data.did
                  });
               
                axios.delete(`http://localhost:8070/bills/deleteBills/${id}`);
                alert("successfully Added To Transactions");
                window.location.reload();

          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }, [id]);

  //PDF GENERATE----------------------------------------------------------

  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "BillsReport",
    onAfterPrint: () => {
      window.location.replace("/bills");
    },
  });


    return (

        <div>
            <Header></Header>

            <div className="containerf">
                <AdminSideBar></AdminSideBar>
            <div className="marginLeft">    
                <div className="container transT" style={{marginTop:"100px",marginLeft:"300px"}}>
                    <h3 style = {{marginLeft: "100px"}}>All Bills</h3>
                   
                    <div >
                        <input
                           style={{ textAlign: 'left',marginRight:'10px' }}
                           type=""
                           className="search-product-box"
                           placeholder="Search Bills"
                           onChange={searchHandle}
                       />
                        
                        <button style={{ marginBottom: "10px", marginLeft: "150px" }} className="btn btn-primary" onClick={generatePDF}>Generate Bills Report</button>
                        <button style={{ marginBottom: "10px", marginLeft: "500px" }} className="btn btn-primary" onClick={() => {
                            window.location.replace(`http://localhost:3000/addBills`);
                        }}>Add Bills</button>
                    </div>
                   
                    
        
                        
                    <div ref = {componentPDF}> 
                    <table className="table" id="financeBtable">
                        <thead>
                            <tr className="table-dark">

                                
                                <th scope='col'>Index</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Operations</th>
                                

                            </tr>
                        </thead>

                        <tbody>

                            {
                                Bills.map((val) => (
                                    
                                            <tr scope="row">
                                                
                                                <td>{a++}</td>
                                                <td>{val.name}</td>
                                                <td>{val.amount}</td>
                                                <td>{val.status}</td>
                                                <td>{val.date}</td>

                                        
                                        <td >
                                            <button className="btn btn-primary" style={{ marginRight: "5px" }} onClick={()=>{
                                                setBillId(val._id)
                                            }}>Paid</button>
                                            <button className="btn btn-secondary" onClick={()=>{
                                                window.location.replace(`http://localhost:3000/updateBills/${val._id}`)
                                            }}><CreateIcon /></button>
                                       
                                            <button className="btn btn-danger" style={{ marginLeft: "5px" }} onClick={()=>deleteBills(val._id)}><DeleteOutlineIcon /></button>

                                        </td>

                                                
                                            </tr>
                                        
                                    ))
                                
                            }


                        </tbody>
                        <div>
                        

                        </div>
                    </table>
                </div>
                </div>
                </div>
            </div>


            <Footer></Footer>
        </div >

    )
}