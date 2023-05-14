import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  //get user data
  useEffect(() => {
    const { email, name, address, contact } = auth?.user;
    setName(name);
    setEmail(email);
    setAddress(address);
    setContact(contact);
  }, [auth?.user]);

  // update function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put("http://localhost:8071/user/update-user", {
        name,
        email,
        password,
        address,
        contact,
      });
      if (data && data.data.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        localStorage.removeItem("auth");
        navigate("/login");
        alert("updated successfully");
      } else {
        alert(data.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("Something went wrong");
    }
  };

  //delete function
  const DeleteUser = async (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8070/user/delete/${auth?.user._id}`)
      .then(() => {
        setAuth({ ...auth, user: null });
        localStorage.removeItem("auth");
        alert("User deleted successfully!");
        navigate("/register");
      })
      .catch((err) => {
        toast.warn("Invalid details 👎!");
      });
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container ">
              <form>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your New Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Enter Your New Address"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="form-control"
                    id="exampleInputContact"
                    placeholder="Enter Your New Contact No"
                  />
                </div>
                Note:You have to login again if you update your details
                <br></br>
                <br></br>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  UPDATE YOUR ACCOUNT
                </button>
                <br></br>
                <br></br>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={DeleteUser}
                >
                  DELETE YOUR ACCOUNT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
