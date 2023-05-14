import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const About = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <h1>About us</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default About;
