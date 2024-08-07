import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const [tab, setTab] = useState(false);
  return (
    <div onClick={() => setTab(false)} className="layout1">
      <Header tab={tab} setTab={setTab} />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
