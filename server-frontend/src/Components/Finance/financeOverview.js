import React, { useState, useEffect,useRef } from "react";
import axios from "axios";

import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Footer from "../Common/Footer";

export default function AllFinance() {


  //defining months----------------------------------------------------------------------------------

const [Currentmonth, setMonth] = useState([]);


useEffect(() => {

const currentDate = new Date().toISOString().substr(0, 10);
const currentMonth = currentDate.substr(5, 2);

if (currentMonth === "01") {
  
  setMonth('January');
}
if (currentMonth === "02") {
  
  setMonth('February');
}
if (currentMonth === "03") {
  
  setMonth('March');
}
if (currentMonth === "04") {
 
  setMonth('April');
}
if (currentMonth === "05") {
  
  setMonth('May');
}
if (currentMonth === "06") {
  
  setMonth('June');
}
if (currentMonth === "07") {
 
  setMonth('July');
}
if (currentMonth === "08") {
 
  setMonth('August');
}
if (currentMonth === "09") {
 
  setMonth('September');
}
if (currentMonth === "10") {
  
  setMonth('October');
}
if (currentMonth === "11") {
 
  setMonth('November');
}
if (currentMonth === "12") {
  
  setMonth('December');
}

}, []);

  //Insert Income and Expense----------------------------------------------------------------------------

  const [incomeTot, setincomeTot] = useState([]);
  var iTot = 0;

  const [expenseTot, setexpenseTot] = useState([]);
  var exTot = 0;

  const [isMountedD, setIsMountedD] = useState(false);

  useEffect(() => {
    setIsMountedD(true);

    return () => setIsMountedD(false);
  }, []);

  useEffect(() => {
    if (isMountedD) {
      axios
        .get("http://localhost:8070/financeTransaction/readfinanceT")
        .then((response) => {
          const getType = response.data.map((item) => ({
            did: item._id,
            type: item.type,
            amount: item.amount,
            date: item.date,
          }));

          getType.forEach((data) => {
            // Check if the type is income or expense
            axios
              .get(
                `http://localhost:8070/financeTransaction/readType/${data.type}`
              )
              .then((response) => {
                //console.log(response.data)

                const currentDate = new Date().toISOString().substr(0, 10);
                //const year = currentDate.substr(0, 4);
                const month = currentDate.substr(5, 2);
                //const date = currentDate.substr(8, 2);
                const tableMonth = data.date.substr(5, 2);

               
                //Calculate Tot of income and expense------------------------

                if (data.type === "income" && !isNaN(data.amount) && month === tableMonth) {
                  iTot += data.amount;
                  setincomeTot(iTot);
                }
                if (data.type === "expense" && !isNaN(data.amount) && month === tableMonth) {
                  exTot += data.amount;
                  setexpenseTot(exTot);
                }

                // Check if the Income already been inserted
                axios
                  .get(
                    `http://localhost:8070/financeTransaction/readDuplicateIncome/${data.did}`
                  )
                  .then((duplicate) => {
                    if (duplicate.data.length === 0) {
                      //console.log(duplicate.data.length)

                      if (data.type === "income") {
                        axios.post(
                          "http://localhost:8070/financeTransaction/insertIncome",
                          {
                            amountI: data.amount,
                            dateI: data.date,
                            didI: data.did,
                          }
                        );
                      }
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                // Check if the Expense already been inserted
                axios
                  .get(
                    `http://localhost:8070/financeTransaction/readDuplicateExpense/${data.did}`
                  )
                  .then((duplicate) => {
                    if (duplicate.data.length === 0) {
                      if (data.type === "expense") {
                        axios.post(
                          "http://localhost:8070/financeTransaction/insertExpense",
                          {
                            amountE: data.amount,
                            dateE: data.date,
                            didE: data.did,
                          }
                        );
                      }
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
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

  const getTransactions = async () => {
    const transactionData = async () => {
      axios
        .get("http://localhost:8070/financeTransaction/readfinanceT")
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    transactionData();
  };

  //Search Transactions----------------------------------------------------------------------------

  const searchHandleT = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:8070/financeTransaction/search/${key}`
      );
      result = await result.json();
      if (result) {
        setTransactions(result);
      }
    } else {
      getTransactions();
    }
  };

  //Read Bills----------------------------------------------------------------------------

  const [Bills, setTBills] = useState([]);
  var a = 1;

  useEffect(() => {
    getBills();
  }, []);

  const getBills = async () => {
    const BillsData = async () => {
      axios
        .get("http://localhost:8070/bills/readB")
        .then((res) => {
          setTBills(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    BillsData();
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


  //Add Budget----------------------------------------------------------------------------

  const [budgetadd, setbudget] = useState("");


  const addBudget = () => {



    axios.post("http://localhost:8070/financeTransaction/insertBudget", {

      budget: budgetadd,
      dateBudget: new Date().toISOString().substr(0, 10),

    });
    window.location.reload();
  };


 //Read Budget----------------------------------------------------------------------------

 const [ViewBudget, budgetView] = useState([]);

 useEffect(() => {
   axios.get("http://localhost:8070/financeTransaction/readBudget").then((response) => {
     budgetView(response.data);
   });
 }, []);

 var budget=0;

 {ViewBudget.map((val, key) => (


    budget = val.budget

 ))}


    //Bar Width Transformation----------------------------------------------------------------------------

    useEffect(() => {
      
        bar();
      
    }, [expenseTot, budget]);
    
    const barRef = useRef(null);
    const bar = () => {
      var bar = document.getElementById('barIn');
      var overVal = document.getElementById('over');
    
      var spend = expenseTot;

      var over = expenseTot-budget;
      var roundNum = over.toFixed(2);
      overVal.innerHTML='+ '+ roundNum;
      
      var long = (spend / budget) * 100;
  
      if(spend>budget){
        bar.style.backgroundColor = 'red';
        bar.style.width = '100%';
        overVal.style.display="block";
      }
      else{
        bar.style.width = long + '%';
        bar.style.backgroundColor = '#adb5bd';
      }
      

    }
  

    //Add Budget Window Open and Close----------------------------------------------------------

    function budgetClose() {
      var window = document.getElementById('budgetBack');
  
      window.style.display = 'none';
    }
    function budgetOpen() {
      var window = document.getElementById('budgetBack');
  
      window.style.display = 'block';
    }


  




  return (
    <div>
      <Header></Header>

      <div className="container" style={{ marginLeft: "300px" }}>
        <AdminSideBar></AdminSideBar>

        <div className="marginLeft">


{/* Budget Add-------------------------------------------------------------- */}

          <div className="budgetBack" id='budgetBack'>
            <div className="addBudget" id='addBudget'>
              <br/><br/><br/><br/>
            <button id='close' onClick={budgetClose}>X</button>
            <h5>Current Budget : {budget}</h5>
                      <input
                        type="text"
                        class="form-control"
                        id="budgetInput"
                        
                        onChange={(e) => {
                          setbudget(e.target.value);
                        }}
                        
                      />
                       <button className="btn btn-primary" id="budgetBtnAdd" onClick={addBudget}>Add</button>

            </div>
          </div>




          <div className="IEalign">
            <div
              className="d-block   p-2"
              style={{ marginTop: "100px" }}
              id="income"
            >
              <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
                Income for {Currentmonth}
              </h3>
              <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
                Rs {incomeTot}
              </h3>
            </div>
            <div
              className="d-block   p-2"
              style={{ marginTop: "100px" }}
              id="expense"
            >
              <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
                Expense for {Currentmonth}
              </h3>
              <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
                Rs {expenseTot}
              </h3>
            </div>
          </div>


        <div id="budget">
            <div className="div1in">
                <div id='bedit'><h2>For {Currentmonth} : Rs {budget}</h2> 
                <button className="btn btn-primary" id="budgetBtn" onClick={budgetOpen}>Edit Budget</button></div>

                <div className="bar"><div className="barIn" id='barIn' ref={barRef}></div> </div>
                <div className="barName"> <h5>Spend</h5> <h5>Of</h5></div>

                
                
                <div id='barValue'><h6 id='left'>Rs {expenseTot} </h6> <h6>Rs {budget}</h6></div>
                <h6 id="over">  </h6>
                



            </div>
        </div>



          <div className="d-block p-2" style={{ marginTop: "30px" }}>
            <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
              List of Transactions
            </h3>

            <div style={{ marginBottom: "10px", float: "right" }}>
              <input
                type=""
                className="search-product-box"
                placeholder="Search Transaction"
                onChange={searchHandleT}
              />
            </div>

            <table className="table" id="financeTtable">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Type</th>
                  <th scope="col">Category</th>
                  <th scope="col">Remark</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((val) => (
                  <tr scope="row">
                    <td>{val.name}</td>
                    <td>{val.amount}</td>
                    <td>{val.type}</td>
                    <td>{val.category}</td>
                    <td>{val.remark}</td>
                    <td>{val.date}</td>
                  </tr>
                ))}
              </tbody>
              <div></div>
            </table>
          </div>

          <div className="d-block p-2" style={{ marginTop: "10px" }}>
            <h3 style={{ marginBottom: "30px" }}>List of Bills</h3>

            <div style={{ marginBottom: "10px", float: "right" }}>
              <input
                type=""
                className="search-product-box"
                placeholder="Search Bills"
                onChange={searchHandle}
              />
            </div>

            <table className="table" id="financeBtable">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Index</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>

              <tbody>
                {Bills.map((val) => (
                  <tr scope="row">
                    <td>{a++}</td>
                    <td>{val.name}</td>
                    <td>{val.amount}</td>
                    <td>{val.status}</td>
                    <td>{val.date}</td>
                  </tr>
                ))}
              </tbody>
              <div></div>
            </table>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
