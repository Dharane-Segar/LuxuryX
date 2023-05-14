import React from "react";

function AdminSideBar() {
  return (
    <div>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <a className="nav-link">
                  <div className="sb-nav-link-icon">
                    <i className="fa fa-tachometer-alt" style={{color:"white"}}></i>
                  </div>
                  <a className="nav-link" style={{color:"white"}} >
                    <b className="box">Menu</b>
                  </a>
                </a>

                <a
                  className="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i className="fa fa-columns" style={{color:"white"}}></i>
                  </div>
                  <div className="box" style={{color:"white"}}>Orders</div>
                  
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fa fa-angle-down" style={{color:"white"}}></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseLayouts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav" style={{color:"white"}} >
                    
                    <a className="nav-link" style={{color:"white"}}href="/order">
                      View Orders
                    </a>
                  </nav>
                </div>

                <a
                  class="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i class="fa fa-columns" style={{color:"white"}}></i>
                  </div>
                  <div style={{color:"white"}}> Products</div>
                 
                  <div class="sb-sidenav-collapse-arrow" style={{color:"white"}}>
                    <i class="fa fa-angle-down" style={{color:"white"}}></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="collapsePages"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    class="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <a class="nav-link" style={{color:"white"}}href="/AddProducts">
                      Add products
                    </a>

                    <a className="nav-link" style={{color:"white"}}href="/ViewProducts">
                      View products
                    </a>

                    <div
                      class="collapse"
                      id="pagesCollapseError"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    ></div>
                  </nav>
                </div>
                <a
                  class="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                 
                >
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i class="fa fa-columns"></i>
                  </div>
                  <div style={{color:"white"}}>Customers</div>
                  
                  <div class="sb-sidenav-collapse-arrow" style={{color:"white"}}>
                    <i class="fa fa-angle-down" style={{color:"white"}}></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="collapseExample"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    class="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <a className="nav-link" style={{color:"white"}}href="/customer">
                      Registered Customers
                    </a>

                  </nav>
                </div>

                <a
                  class="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsesup"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i class="fa fa-columns" ></i>
                  </div>
                  <div style={{color:"white"}}>Suppliers</div>
                  
                  <div class="sb-sidenav-collapse-arrow" style={{color:"white"}}>
                    <i class="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="collapsesup"
                  aria-labelledby="headingThree"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav class="sb-sidenav-menu-nested nav accordion">
                    <a class="nav-link" style={{color:"white"}} href="/addsupplier">
                      Add Suppliers
                    </a>
                    <a className="nav-link" style={{color:"white"}} href="/supplier">
                      View Suppliers
                    </a>
                    <a class="nav-link" style={{color:"white"}} href="/addsupplierTransaction">
                      Add Supplier Transaction
                    </a>
                    <a className="nav-link" style={{color:"white"}}href="/supplierTransaction">
                      View Supplier Transactions
                    </a>

                    <a className="nav-link" style={{color:"white"}}href="/inventoryReport">
                      Inventory Report
                    </a>

                    <div
                      class="collapse"
                      id="pagesCollapseError"
                      aria-labelledby="headingThree"
                      data-bs-parent="#sidenavAccordionPages"
                    ></div>
                  </nav>
                </div>

                <a
                  class="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i class="fas fa-columns"></i>
                  </div>
                  <div style={{color:"white"}}>Delivery</div>
                  
                  <div class="sb-sidenav-collapse-arrow" style={{color:"white"}}>
                    <i class="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="collapseExample"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    class="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    

                    <a className="nav-link" style={{color:"white"}}href="/DeliveryList">
                      View Delivery
                    </a>
                  </nav>
                </div>

                <a className="nav-link">
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <a className="nav-link" style={{color:"white"}}>
                    <b>Business</b>
                  </a>
                </a>

                <a
                  class="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsesu"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i class="fas fa-columns"></i>
                  </div>
                  <div style={{color:"white"}}> Employees</div>
                 
                  <div class="sb-sidenav-collapse-arrow" style={{color:"white"}}>
                    <i class="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="collapsesu"
                  aria-labelledby="headingFour"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav class="sb-sidenav-menu-nested nav accordion">
                    
                    <a className="nav-link" style={{color:"white"}}href="http://localhost:3000/allse">
                      View Sales Executive
                    </a>
                    
                    <a className="nav-link" style={{color:"white"}}href="http://localhost:3000/alldd">
                      View Delivery Driver
                    </a>
                    <a
                      className="nav-link"style={{color:"white"}}
                      href="http://localhost:3000/allleave"
                    >
                      View Leave Applications
                    </a>
                    <a
                      className="nav-link"style={{color:"white"}}
                      href="http://localhost:3000/addsalary"
                    >
                      Add salary transaction
                    </a>
                    <a
                      className="nav-link"style={{color:"white"}}
                      href="http://localhost:3000/allsalary"
                    >
                      View Salary transaction
                    </a>

                    <div
                      class="collapse"
                      id="pagesCollapseError"
                      aria-labelledby="headingFour"
                      data-bs-parent="#sidenavAccordionPages"
                    ></div>
                  </nav>
                </div>

                <a
                  class="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapses"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i class="fas fa-columns"></i>
                  </div>
                  <div style={{color:"white"}}>Finance</div>
                  
                  <div class="sb-sidenav-collapse-arrow" style={{color:"white"}}>
                    <i class="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="collapses"
                  aria-labelledby="headingFive"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav class="sb-sidenav-menu-nested nav accordion">
                    <a class="nav-link" style={{color:"white"}} href = "http://localhost:3000/financeOverview">
                      Overview
                    </a>
                    <a className="nav-link" style={{color:"white"}}href="http://localhost:3000/financeTrans">
                      Transaction
                    </a>
                    <a class="nav-link" style={{color:"white"}}href="http://localhost:3000/bills">
                      Bills
                    </a>
                    <a className="nav-link" style={{color:"white"}}href="http://localhost:3000/analytics">
                      Analytics
                    </a>

                    <div
                      class="collapse"
                      id="pagesCollapseError"
                      aria-labelledby="headingFive"
                      data-bs-parent="#sidenavAccordionPages"
                    ></div>
                  </nav>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
