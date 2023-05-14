import React from "react";
import Layout from "../components/Layout/Layout";
const Location = () => {
  return (
    <Layout>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.967745772956!2d79.85120572149756!3d6.894461512631331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bde9b7a136d%3A0x5df7977a64160442!2sLuxuryX%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1681128062107!5m2!1sen!2slk"
        width="600"
        height="450"
        style={{ border: "0" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </Layout>
  );
};

export default Location;
