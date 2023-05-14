import React, { useState, useEffect,useRef } from "react";
import axios from "axios";

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Footer from "../Common/Footer";
import { useReactToPrint } from "react-to-print";


export default function AllSuppliers() {


      //Delivery Transactions----------------------------------------------------------------------------

      const [isMountedD, setIsMountedD] = useState(false);

      useEffect(() => {
        setIsMountedD(true);
    
        return () => setIsMountedD(false);
      }, []);
    
      useEffect(() => {
        if (isMountedD) {
          axios.get("http://localhost:8070/delivery/get")
            .then((response) => {
              const dataToInsert = response.data.map((item) => ({
                did: item._id,
                name: item.deliveryid,
                type: 'income',
                category: 'Delivery Fee',
                amount: item.deliveryfee,
                remark: 'Deliveri Amount',
                date: new Date().toISOString().substr(0, 10),
              }));
    
              dataToInsert.forEach((data) => {
                // Check if the driver's salary has already been inserted
                axios.get(`http://localhost:8070/financeTransaction/readDuplicate/${data.did}`)
                  .then((response) => {
                    // console.log(response.data)
                    if (response.data.length === 0) {
                      axios.post("http://localhost:8070/financeTransaction/insertT", {
                        name: data.name,
                        type: data.type,
                        category: data.category,
                        amount: data.amount,
                        remark: data.remark,
                        date: data.date,
                        did: data.did
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
    
      }, [isMountedD]);

    //Orders Transactions----------------------------------------------------------------------------

    useEffect(() => {
        if (isMountedD) {
          axios.get("http://localhost:8070/order/order")
            .then((response) => {
              const dataToInsert = response.data.map((item) => ({
                did: item._id,
                name: item.ProductName,
                type: 'income',
                category: 'Orders',
                amount: item.Price,
                remark: 'Product Sells',
                date: new Date().toISOString().substr(0, 10),
              }));
    
              dataToInsert.forEach((data) => {
                // Check if the driver's salary has already been inserted
                axios.get(`http://localhost:8070/financeTransaction/readDuplicate/${data.did}`)
                  .then((response) => {
                    // console.log(response.data)
                    if (response.data.length === 0) {
                      axios.post("http://localhost:8070/financeTransaction/insertT", {
                        name: data.name,
                        type: data.type,
                        category: data.category,
                        amount: data.amount,
                        remark: data.remark,
                        date: data.date,
                        did: data.did
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
    
      }, [isMountedD]);



 //Supplier Transactions----------------------------------------------------------------------------

 useEffect(() => {
    if (isMountedD) {
     axios.get("http://localhost:8070/supplierTransaction/supplierTransaction")
        .then((response) => {
          const dataToInsert = response.data.map((item) => ({
            did: item._id,
            name: item.Supplier,
            type: 'expense',
            category: 'supplier',
            amount: item.Amount,
            remark: 'For suppliers',
            date: item.SuppliedDate
          }));

          dataToInsert.forEach((data) => {
            // Check if the driver's salary has already been inserted
            axios.get(`http://localhost:8070/financeTransaction/readDuplicate/${data.did}`)
              .then((response) => {
                // console.log(response.data)
                if (response.data.length === 0) {
                  axios.post("http://localhost:8070/financeTransaction/insertT", {
                    name: data.name,
                    type: data.type,
                    category: data.category,
                    amount: data.amount,
                    remark: data.remark,
                    date: data.date,
                    did: data.did
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }, [isMountedD]);


//Salary Transactions--------------------------------------------------------------------------------

useEffect(() => {
    if (isMountedD) {
      axios.get("http://localhost:8070/salary/getsalary")
        .then((response) => {
          const dataToInsert = response.data.map((item) => ({
            did: item._id,
            name: item.eid,
            type: 'expense',
            category: 'Salary',
            amount: item.netsalary,
            remark: 'Salary for employees',
            date: item.paydate
          }));

          dataToInsert.forEach((data) => {
            // Check if the driver's salary has already been inserted
            axios.get(`http://localhost:8070/financeTransaction/readDuplicate/${data.did}`)
              .then((response) => {
                // console.log(response.data)
                if (response.data.length === 0) {
                  axios.post("http://localhost:8070/financeTransaction/insertT", {
                    name: data.name,
                    type: data.type,
                    category: data.category,
                    amount: data.amount,
                    remark: data.remark,
                    date: data.date,
                    did: data.did
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }, [isMountedD]);





 //Read Transactions----------------------------------------------------------------------------

    const [eid, setTid] = useState("");
    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        getTransactions();
    }, []);

    
    const getTransactions= async () => {
        const transactionData = async () => {
            axios.get("http://localhost:8070/financeTransaction/readfinanceT").then((res) => {
               
                setTransactions(res.data);
            }).catch((err) => {
                alert(err.message)
            })
        }
        transactionData();
    }



     //Delete Transactions----------------------------------------------------------------------------

  const deleteT = (id) => {

    const response = window.confirm('Are You Sure?');

    if (response) {
      axios.delete(`http://localhost:8070/financeTransaction/deleteT/${id}`);
      alert("successfully Deleted");
      window.location.reload();
    }



  };


  
     //Search Transactions----------------------------------------------------------------------------

     const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8070/financeTransaction/search/${key}`);
            result = await result.json();
            if (result) {
                setTransactions(result);
            }
        } else {
            getTransactions();
        }
    };

  //PDF GENERATE----------------------------------------------------------

  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "TransactionReport",
    onAfterPrint: () => {
      window.location.replace("/financeTrans");
    },
  });



    return (

        <div>
            <Header></Header>

            <div className="containerf">
                <AdminSideBar></AdminSideBar>

            <div className="marginLeft">   
                <div className="container transT" style={{marginTop:"100px",marginLeft:"300px"}}>
                    <h3>All Transactions</h3>
                   
                    <div >
                        <input
                           style={{ textAlign: 'left',marginRight:'10px'}}
                            type=""
                            className="search-product-box"
                            placeholder="Search Transaction"
                            onChange={searchHandle}
                        />
                        <button style={{ marginBottom: "10px", marginLeft: "150px" }} className="btn btn-primary" onClick={generatePDF}>Generate Supplier Report</button>
                        <button style={{ marginBottom: "10px", marginLeft: "500px" }} className="btn btn-primary" onClick={() => {
                            window.location.replace(`http://localhost:3000/addTransactions`);
                        }}>Add Transaction</button>
                    </div>
                   
                    
        
                        
                  <div ref = {componentPDF}> 
                    <table className="table" id="financeTtable">
                        <thead>
                            <tr className="table-dark">

                                
                                <th scope='col'>Name</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'>Type</th>
                                <th scope='col'>Category</th>
                                <th scope='col'>Remark</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Operations</th>
                                

                            </tr>
                        </thead>

                        <tbody>

                            {
                                transactions.map((val) => (
                                    
                                            <tr scope="row">
                                                
                                                <td >{val.name}</td>
                                                <td >{val.amount}</td>
                                                <td >{val.type}</td>
                                                <td >{val.category}</td>
                                                <td >{val.remark}</td>
                                                <td >{val.date}</td>

                                        
                                        <td >
                                            <button className="btn btn-secondary" onClick={()=>{
                                                window.location.replace(`http://localhost:3000/financeTransUpdate/${val._id}`)
                                            }}><CreateIcon /></button>
                                       
                                            <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={()=>deleteT(val._id)}><DeleteOutlineIcon /></button>

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