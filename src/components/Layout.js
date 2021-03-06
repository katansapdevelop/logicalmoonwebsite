import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import "assets/stylesheets/application.scss";

import Header from "components/Header";
import Footer from "components/Footer";

const Layout = ({ children, pageName }) => {
  let className = "";

  if (pageName) {
    className = `${className} page-${pageName}`;
  }

  return (
    <>
      <Helmet bodyAttributes={{ class: className }}>
        <title>Radix Logical Moon</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
