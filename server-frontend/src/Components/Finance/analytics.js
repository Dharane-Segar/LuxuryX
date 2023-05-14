import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import Header from "../Admin/Header";
import AdminSideBar from "../Admin/AdminSidebar";

import Footer from "../Common/Footer";
import {  Cell, ResponsiveContainer } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Sector,Pie ,Chart,PieChart
} from "recharts";



export default function Analytics() {


  //Read Income---------------------------------------------------------
 
  const [incomeJan, setIncomeJan] = useState([]);
  var jan=0
  const [incomeFeb, setIncomeFeb] = useState([]);
  var feb=0
  const [incomeMarch, setIncomeMarch] = useState([]);
  var march=0
  const [incomeApril, setIncomeApril] = useState([]);
  var april=0
  const [incomeMay, setIncomeMay] = useState([]);
  var may=0
  const [incomeJune, setIncomeJune] = useState([]);
  var june=0
  const [incomeJuly, setIncomeJuly] = useState([]);
  var july=0
  const [incomeAug, setIncomeAug] = useState([]);
  var aug=0
  const [incomeSep, setIncomeSep] = useState([]);
  var sep=0
  const [incomeNov, setIncomeNov] = useState([]);
  var nov=0
  const [incomeOct, setIncomeOct] = useState([]);
  var oct=0
  const [incomeDec, setIncomeDec] = useState([]);
  var dec=0

  useEffect(() => {
    axios.get("http://localhost:8070/financeTransaction/readIncome").then((response) => {
      const getType = response.data.map((item) => ({
        date: item.date,
        amount: item.amount,
      }));
      
     jan=0;
     feb=0;
     march=0;
     april=0;
     may=0;
     june=0;
     july=0;
     aug=0;
     sep=0;
     oct=0;
     nov=0;
     dec=0;

    
      getType.forEach((data) => {
        var month = data.date.substr(5, 2);
        
        if (month === "01") {
          jan += data.amount;
          setIncomeJan(jan);
        }
        if (month === "02") {
          feb += data.amount;
          setIncomeFeb(feb);
        }
        if (month === "03") {
          march += data.amount;
          setIncomeMarch(march);
        }
        if (month === "04") {
          april += data.amount;
          setIncomeApril(april);
        }
        if (month === "05") {
          may += data.amount;
          setIncomeMay(may);
        }
        if (month === "06") {
          june += data.amount;
          setIncomeJune(june);
        }
        if (month === "07") {
          july += data.amount;
          setIncomeJuly(july);
        }
        if (month === "08") {
          aug += data.amount;
          setIncomeAug(aug);
        }
        if (month === "09") {
          sep += data.amount;
          setIncomeSep(sep);
        }
        if (month === "10") {
          oct += data.amount;
          setIncomeOct(oct);
        }
        if (month === "11") {
          nov += data.amount;
          setIncomeNov(nov);
        }
        if (month === "12") {
          dec += data.amount;
          setIncomeDec(dec);
        }
      });
    });
  }, []);
  


//Read Expense---------------------------------------------------------
 
const [expenseJan, setExpenseJan] = useState([]);
var jan=0
const [expenseFeb, setExpenseFeb] = useState([]);
var feb=0
const [expenseMarch, setExpenseMarch] = useState([]);
var march=0
const [expenseApril, setExpenseApril] = useState([]);
var april=0
const [expenseMay, setExpenseMay] = useState([]);
var may=0
const [expenseJune, setExpenseJune] = useState([]);
var june=0
const [expenseJuly, setExpenseJuly] = useState([]);
var july=0
const [expenseAug, setExpenseAug] = useState([]);
var aug=0
const [expenseSep, setExpenseSep] = useState([]);
var sep=0
const [expenseNov, setExpenseNov] = useState([]);
var nov=0
const [expenseOct, setExpenseOct] = useState([]);
var oct=0
const [expenseDec, setExpenseDec] = useState([]);
var dec=0

useEffect(() => {
  axios.get("http://localhost:8070/financeTransaction/readExpense").then((response) => {
    const getData = response.data.map((item) => ({
      date: item.date,
      amount: item.amount,
    }));
    
   jan=0;
   feb=0;
   march=0;
   april=0;
   may=0;
   june=0;
   july=0;
   aug=0;
   sep=0;
   oct=0;
   nov=0;
   dec=0;

  
    getData.forEach((data) => {
      var month = data.date.substr(5, 2);
      
      if (month === "01") {
        jan += data.amount;
        setExpenseJan(jan);
      }
      if (month === "02") {
        feb += data.amount;
        setExpenseFeb(feb);
      }
      if (month === "03") {
        march += data.amount;
        setExpenseMarch(march);
      }
      if (month === "04") {
        april += data.amount;
        setExpenseApril(april);
      }
      if (month === "05") {
        may += data.amount;
        setExpenseMay(may);
      }
      if (month === "06") {
        june += data.amount;
        setExpenseJune(june);
      }
      if (month === "07") {
        july += data.amount;
        setExpenseJuly(july);
      }
      if (month === "08") {
        aug += data.amount;
        setExpenseAug(aug);
      }
      if (month === "09") {
        sep += data.amount;
        setExpenseSep(sep);
      }
      if (month === "10") {
        oct += data.amount;
        setExpenseOct(oct);
      }
      if (month === "11") {
        nov += data.amount;
        setExpenseNov(nov);
      }
      if (month === "12") {
        dec += data.amount;
        setExpenseDec(dec);
      }
    });
  });
}, []);



//Income and Expense by categories------------------------------------------------------------





const [order, setOrderTot] = useState([]);
var orderTot=0;
const [delivery, setDeliveryTot] = useState([]);
var deliveryTot=0;
const [otherIncome, setOtherIncomeTot] = useState([]);
var otherIncometot=0;


const [supplier, setSupplierTot] = useState([]);
var supplierTot=0;
const [salary, setSalaryTot] = useState([]);
var salaryTot=0;
const [bills, setBillsTot] = useState([]);
var billsTot=0;
const [otherExpense, setOtherExpenseTot] = useState([]);
var otherExpensetot=0;

const [emptyIncome,setEmptyIncome] = useState([]);
const [emptyExpense,setEmptyExpense] = useState([]);

function PieChartData(month) {

  

  axios.get("http://localhost:8070/financeTransaction/readfinanceT").then((response) => {
    const getType = response.data.map((item) => ({
     
      amount: item.amount,
      type:item.type,
      category:item.category,
      date:item.date
    }));
    
    orderTot=0;
    deliveryTot=0;
    otherIncometot=0;

    supplierTot=0;
    salaryTot=0;
    billsTot=0;
    otherExpensetot=0;

    setOrderTot(0);
    setDeliveryTot(0);
    setOtherIncomeTot(0);
    
    setSupplierTot(0);
    setSalaryTot(0);
    setBillsTot(0);;
    setOtherExpenseTot(0);

    getType.forEach((data) => {
      
      const tableMonth = data.date.substr(5, 2);
     

      if (data.type === "income" && !isNaN(data.amount) && tableMonth === month ) {
        if(data.category==="Order"){
          orderTot += data.amount;
          setOrderTot(orderTot)
        }
        if(data.category==="Delivery Fee"){
          deliveryTot += data.amount;
          setDeliveryTot(deliveryTot)
        }
        if(data.category!=="Order" && data.category!=="Delivery Fee")
        {
          otherIncometot += data.amount;
          setOtherIncomeTot(otherIncometot)
        }

      }


      if (data.type === "expense" && !isNaN(data.amount) && tableMonth === month ) {
        if(data.category==="supplier"){
          supplierTot += data.amount;
          setSupplierTot(supplierTot)
        }
        if(data.category==="Salary"){
          salaryTot += data.amount;
          setSalaryTot(salaryTot)
        }
        if(data.category==="Bills"){
          billsTot += data.amount;
          setBillsTot(billsTot);
        }
        if(data.category!=="supplier" && data.category!=="Salary" && data.category!=="Bills")
        {
          otherExpensetot += data.amount;
          setOtherExpenseTot(otherExpensetot)
          
        }
      }
     
     
    });

    if(orderTot === 0 && deliveryTot === 0 && otherIncometot === 0){
      var incomeEmpty = document.getElementById('emptyI');
      incomeEmpty.style.display="block"
      setEmptyIncome("No Data To Show")
    }
    else{
      var incomeEmpty = document.getElementById('emptyI');
      incomeEmpty.style.display="none"
    }

    if(supplierTot === 0 && salaryTot === 0 && billsTot === 0 && otherExpensetot === 0){
      var expenseEmpty = document.getElementById('emptyE');
      expenseEmpty.style.display="block"
      setEmptyExpense("No Data To Show")
    }
    else{
      var expenseEmpty = document.getElementById('emptyE');
      expenseEmpty.style.display="none"
    }

  });
}

useEffect(() => {

  var select = document.getElementById('selectMonth');

  if(select.value === '01'){

    const currentDate = new Date().toISOString().substr(0, 10);
    const currentMonth = currentDate.substr(5, 2);
    select.value = currentMonth;
    PieChartData(currentMonth);
    
  }
  
}, []);




//Pie Chart------------------------------------------------------------------------------------------------------------------------

const incomeData = [
  { name: 'Order', value: order },
  { name: 'Delivery Fee', value: delivery },
  { name: 'Other Income', value: otherIncome },

];

const expenseData = [
  { name: 'Supplier', value: supplier },
  { name: 'Salary', value: salary },
  { name: 'Bills', value: bills },
  { name: 'Other Expense', value: otherExpense },
];




//Bar Chart-----------------------------------------------------------------------------------------------------------------------
const data2 = [
  {
    name: 'Jan',
    income: incomeJan,
    expense: expenseJan,
    amt: 2400,
  },
  {
    name: 'Feb',
    income: incomeFeb,
    expense: expenseFeb,
    amt: 2210,
  },
  {
    name: 'March',
    income: incomeMarch,
    expense: expenseMarch,
    amt: 2290,
  },
  {
    name: 'April',
    income: incomeApril,
    expense: expenseApril,
    amt: 2000,
  },
  {
    name: 'May',
    income: incomeMay,
    expense: expenseMay,
    amt: 2181,
  },
  {
    name: 'June',
    income: incomeJune,
    expense: expenseJune,
    amt: 2500,
  },
  {
    name: 'July',
    income: incomeJuly,
    expense: expenseJuly,
    amt: 2100,
  },
  {
    name: 'Aug',
    income: incomeAug,
    expense: expenseAug,
    amt: 2100,
  },
  {
    name: 'Sep',
    income: incomeSep,
    expense: expenseSep,
    amt: 2100,
  },
  {
    name: 'Oct',
    income: incomeOct,
    expense: expenseOct,
    amt: 2100,
  },
  {
    name: 'Nov',
    income: incomeNov,
    expense: expenseNov,
    amt: 2100,
  },
  {
    name: 'Dec',
    income: incomeDec,
    expense: expenseDec,
    amt: 2100,
  },
];



//Pie Chart Settings------------------------------------------------------------------------------

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill='#000000'>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill='#3e48c1'
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill='#3e48c1'
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Rs ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


const [activeIndex, setActiveIndex] = useState(0);
const onPieEnter = useCallback(
  (_, index) => {
    setActiveIndex(index);
  },
  [setActiveIndex]
);

const [activeIndex2, setActiveIndex2] = useState(0);
const onPieEnter2 = useCallback(
  (_, index) => {
    setActiveIndex2(index);
  },
  [setActiveIndex2]
);








  return (
    <div>
      <Header></Header>

      <div className="container" style={{ marginLeft: "100px" }}>
        <AdminSideBar></AdminSideBar>

        <div style={{ marginLeft: "300px" }}>
          <div className="d-block p-2" style={{ marginTop: "100px" }}>
            <h3 style={{ marginBottom: "30px" }}>Bar Chart</h3>
                <div className="chart1">
               
                <BarChart width={800} height={400} data={data2}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#8884d8" />
                    <Bar dataKey="expense" fill="#82ca9d" />
                </BarChart>
               
                </div>
          </div>



          <select id='selectMonth' onChange={(event) => { PieChartData(event.target.value); }}>
              <option value="01">Jauary</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>


          <div id="row2" style={{ marginTop: "10px" }}>
           
            <div className="pieChart1">
            <h4 style={{ marginTop: "30px",textAlign:"center" }}>Income By Categories</h4>
           
                 <h5 id="emptyI" style={{ marginTop: "50px",textAlign:"center" }}>{emptyIncome}</h5> 

                <PieChart width={500} height={300}>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={incomeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#000000"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    />
                </PieChart>

                </div>

                <div className="pieChart2">
                
                <h4 style={{ marginTop: "30px",textAlign:"center" }}>Expense By Categories</h4>
               
                <h5 id="emptyE" style={{ marginTop: "50px",textAlign:"center" }}>{emptyExpense}</h5>

                <PieChart width={500} height={300}>
                    <Pie
                      activeIndex={activeIndex2}
                      activeShape={renderActiveShape}
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#000000"
                      dataKey="value"
                      onMouseEnter={onPieEnter2}
                    />
                </PieChart>

               

                </div>

          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
