import React from "react";

function SalesExecutiveSideBar() {
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
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i className="fas fa-tachometer-alt" style={{color:"white"}}></i>
                  </div>
                  <a className="nav-link" style={{color:"white"}}href="./viewse">
                    View Profile
                  </a>
                </a>

                <a
                  class="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                  style={{color:"white"}}
                >
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i class="fas fa-columns" style={{color:"white"}}></i>
                  </div>
                  Leaves
                  <div class="sb-sidenav-collapse-arrow" style={{color:"white"}}>
                    <i class="fas fa-angle-down" style={{color:"white"}}></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="collapsePages"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                  style={{color:"white"}}
                >
                  <nav
                    class="sb-sidenav-menu-nested nav accordion"style={{color:"white"}}
                    id="sidenavAccordionPages"
                  >
                    <a class="nav-link" style={{color:"white"}}href="./applyse">
                      Apply for leave
                    </a>

                    <a className="nav-link" href="./leavese" style={{color:"white"}}>
                      View leaves
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
                  style={{color:"white"}}
                >
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i class="fas fa-columns" style={{color:"white"}}></i>
                  </div>
                  Coupons
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
                    <a class="nav-link" href="/addcoupon" style={{color:"white"}}>
                      Add Coupons
                    </a>

                    <a className="nav-link" href="/coupon" style={{color:"white"}}>
                      View Coupons
                    </a>
                  </nav>
                </div>
                <a
                  class="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample1"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  style={{color:"white"}}
                >
                  <div className="sb-nav-link-icon" style={{color:"white"}}>
                    <i class="fas fa-columns" style={{color:"white"}}></i>
                  </div>
                  Salary
                  <div class="sb-sidenav-collapse-arrow" style={{color:"white"}}>
                    <i class="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="collapseExample1"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    class="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <a class="nav-link" href="./viewsalse" style={{color:"white"}}>
                      My Salaries
                    </a>
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

export default SalesExecutiveSideBar;
