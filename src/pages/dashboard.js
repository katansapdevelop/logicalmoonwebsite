import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";

const DashboardPage = () => {
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/radix", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {})
      .catch((error) => console.error(error));
  });

  return (
    <Layout pageName="dashboard">
      <Helmet>
        <title>Radix Dashboard</title>
      </Helmet>
      <Container>
        <h1>Radix Dashboard</h1>

        <div class="row">
          <div class="column">
            <div class="card">
              <span class="tooltip">
                <p class="tooltiptext">
                  Showing the percentage of “proposals” the validator has
                  successfully made over roughly the past 2 weeks
                </p>
                <div id="tailShadow"></div>
                <div id="tail1"></div>
                <div id="tail2"></div>
              </span>
              <h3>Stake Spread</h3>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <span class="tooltip">
                <p class="tooltiptext">
                  Showing the percentage of “proposals” the validator has
                  successfully made over roughly the past 2 weeks
                </p>
                <div id="tailShadow"></div>
                <div id="tail1"></div>
                <div id="tail2"></div>
              </span>
              <h3>Price</h3>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
