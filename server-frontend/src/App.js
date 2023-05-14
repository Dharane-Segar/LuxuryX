import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Common/Login";
import SignUp from "./Components/Admin/SignUp";
import AddSalesExecutive from "./Components/Admin/Employee/AddSalesExecutive";
import AddDeliveryDriver from "./Components/Admin/Employee/AddDeliveryDriver";
import SalesExecutiveHome from "./Components/SalesExecutive/SalesExecutiveHome";
import DeliveryDriverHome from "./Components/DeliveryDriver/DeliveryDriverHome";
import AdminHome from "./Components/Admin/AdminHome";
import AllSalesExecutive from "./Components/Admin/Employee/AllSalesExecutives";
import UpdateSalesExecutive from "./Components/Admin/Employee/UpdateSalesExecutive";
import AllDeliveryDriver from "./Components/Admin/Employee/AllDeliveryDrivers";
import UpdateDeliveryDriver from "./Components/Admin/Employee/UpdateDeliveryDriver";
import ApplyForLeaveSE from "./Components/SalesExecutive/ApplyForLeaveSE";
import ApplyForLeaveDD from "./Components/DeliveryDriver/ApplyForLeaveDD";
import AllLeave from "./Components/Admin/Employee/AllLeaves";
import AddSalary from "./Components/Admin/Employee/AddSalary";
import AllSalary from "./Components/Admin/Employee/AllTransactions";
import UpdateSalary from "./Components/Admin/Employee/UpdateTransaction";
import ViewProfileDD from "./Components/DeliveryDriver/DeliveryDriverViewProfile";
import ViewProfileSE from "./Components/SalesExecutive/SalesExecutiveViewProfile";
import ViewLeaveSE from "./Components/SalesExecutive/SalesExecutiveViewLeave";
import ViewLeaveDD from "./Components/DeliveryDriver/DeliveryDriverViewLeave";
import SalesExecutiveReport from "./Components/Admin/Employee/SalesExecutiveReport";
import DeliveryDriverReport from "./Components/Admin/Employee/DeliveryDriverReport";
import LeaveReport from "./Components/Admin/Employee/LeaveApplicationReport";
import TransactionReport from "./Components/Admin/Employee/TransactionReport";
import ViewSalarySE from "./Components/SalesExecutive/SalesExecutiveSalary";
import ViewSalaryDD from "./Components/DeliveryDriver/DeliveryDriverSalary";

import AddSupplier from "./Components/Supplier/AddSupplier";
import AllSuppliers from "./Components/Supplier/AllSuppliers";
import UpdateSupplier from "./Components/Supplier/UpdateSupplier";
import DeleteSupplier from "./Components/Supplier/DeleteSupplier";
import AddSupplierTransaction from "./Components/Supplier/AddSupplierTransaction";
import AllSupplierTransactions from "./Components/Supplier/AllSupplierTransactions";
import UpdateSupplierTransaction from "./Components/Supplier/UpdateSupplierTransaction";
import DeleteSupplierTransaction from "./Components/Supplier/DeleteSupplierTransaction";
import SupplierTransactionReport from "./Components/Supplier/SupplierTransactionReport";
import SupplierReport from "./Components/Supplier/SupplierReport";
import InventoryReport from "./Components/Supplier/InventoryReport";

import RegCustomers from "./Components/Admin/RegCustomers";

import AddProducts from "./Components/Admin/Products/AddProducts";
import EditProducts from "./Components/Admin/Products/EditProducts";
import ViewProducts from "./Components/Admin/Products/ViewPeoducts";

import Delivery from "./Components/Admin/Delivery/AddDelivery";
import DeliveryList from "./Components/Admin/Delivery/DeliveryList";
import UpdateDelivery from "./Components/Admin/Delivery/UpdateDelivery";
import DeliveryDriverView from "./Components/DeliveryDriver/DeliveryDriverView";

import AllOrder from "./Components/Order/AllOrder";
import UpdateOrder from "./Components/Order/UpdateOrder";
import DeleteOrder from "./Components/Order/DeleteOrder";
import OrderReport from "./Components/Order/OrderReport";

import AddCoupon from "./Components/Coupon/AddCoupon";
import AllCoupons from "./Components/Coupon/AllCoupons";

import AllFinanceTransactions from "./Components/Finance/financeTransactions";
import UpdateFinanceTransactions from "./Components/Finance/transactionUpdate";
import AddTransactions from "./Components/Finance/addTransactions";
import Bills from "./Components/Finance/bills";
import AddBills from "./Components/Finance/addBills";
import UpdateBills from "./Components/Finance/updateBills";
import Analytics from "./Components/Finance/analytics";
import FinanceOverview from "./Components/Finance/financeOverview";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/addse" element={<AddSalesExecutive />} />
          <Route exact path="/adddd" element={<AddDeliveryDriver />} />
          <Route exact path="/sehome" element={<SalesExecutiveHome />} />
          <Route exact path="/ddhome" element={<DeliveryDriverHome />} />
          <Route exact path="/adhome" element={<AdminHome />} />
          <Route exact path="/allse" element={<AllSalesExecutive />}/>
          <Route
            exact
            path="/updatese/:id"
            element={<UpdateSalesExecutive />}
          />
          <Route exact path="/alldd" element={<AllDeliveryDriver />} />
          <Route
            exact
            path="/updatedd/:id"
            element={<UpdateDeliveryDriver />}
          />
          <Route exact path="/applyse" element={<ApplyForLeaveSE />} />
          <Route exact path="/applydd" element={<ApplyForLeaveDD />} />
          <Route exact path="/allleave" element={<AllLeave />} />
          <Route exact path="/addsalary" element={<AddSalary />} />
          <Route exact path="/updatet/:id" element={<UpdateSalary />} />
          <Route exact path="/allsalary" element={<AllSalary />} />
          <Route exact path="/viewse" element={<ViewProfileSE />} />
          <Route exact path="/viewdd" element={<ViewProfileDD />} />
          <Route exact path="/leavese" element={<ViewLeaveSE />} />
          <Route exact path="/leavedd" element={<ViewLeaveDD />} />
          <Route exact path="/reportse" element={<SalesExecutiveReport />} />
          <Route exact path="/reportdd" element={<DeliveryDriverReport />} />
          <Route exact path="/reportle/:query" element={<LeaveReport />} />
          <Route exact path="/reportt/:query" element={<TransactionReport />} />
          <Route exact path="/viewsalse" element={<ViewSalarySE />} />
          <Route exact path="/viewsaldd" element={<ViewSalaryDD />} />
          <Route path="/supplier" element={<AllSuppliers />} exact />
          <Route path="/addsupplier" element={<AddSupplier />} exact />
          <Route
            path="/updatesupplier/:id"
            element={<UpdateSupplier />}
            exact
          />
          <Route
            path="/deletesupplier/:id"
            element={<DeleteSupplier />}
            exact
          />
          <Route
            path="/addsupplierTransaction"
            element={<AddSupplierTransaction />}
            exact
          />
          <Route
            path="/supplierTransaction"
            element={<AllSupplierTransactions />}
            exact
          />
          <Route
            path="/updatesupplierTransaction/:id"
            element={<UpdateSupplierTransaction />}
            exact
          />
          <Route
            path="/deletesupplierTransaction/:id"
            element={<DeleteSupplierTransaction />}
            exact
          />
          <Route exact path="/inventoryReport" element={<InventoryReport />} />

          <Route
            path="/supplierTransactionReport"
            element={<SupplierTransactionReport />}
            exact
          />
          <Route path="/supplierReport" element={<SupplierReport />} exact />
          <Route exact path="/customer" element={<RegCustomers />} />
          <Route exact path="/AddProducts" element={<AddProducts />} />
          <Route exact path="/EditProducts" element={<EditProducts />} />
          <Route exact path="/ViewProducts" element={<ViewProducts />} />

          <Route exact path = '/addd/:id' element = {<Delivery/>}/>
          <Route exact path="/DeliveryList" element={<DeliveryList />} />
          <Route
            exact
            path="/UpdateDelivery/:id"
            element={<UpdateDelivery />}
          />
          <Route
            exact
            path="/deliveryDriverView"
            element={<DeliveryDriverView />}
          />

          <Route path="/order" element={<AllOrder />} exact />
          <Route path="/updateorder/:id" element={<UpdateOrder />} exact />
          <Route path="/deleteorder/:id" element={<DeleteOrder />} exact />
          <Route path="/orderReport" element={<OrderReport />} exact />

          <Route path="/coupon" element={<AllCoupons />} exact />
          <Route path="/addcoupon" element={<AddCoupon />} exact />

          <Route
            exact
            path="/financeTrans"
            element={<AllFinanceTransactions />}
          />
          <Route
            exact
            path="/financeTransUpdate/:id"
            element={<UpdateFinanceTransactions />}
          />
          <Route exact path="/addTransactions" element={<AddTransactions />} />
          <Route exact path="/bills" element={<Bills />} />
          <Route exact path="/addBills" element={<AddBills />} />
          <Route exact path="/updateBills/:id" element={<UpdateBills />} />
          <Route exact path="/analytics" element={<Analytics />} />
          <Route exact path="/financeOverview" element={<FinanceOverview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
