import React from "react";
import Helmet from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";

const StatusPage = () => {
  return (
    <Layout pageName="status">
      <Helmet>
        <title>Status</title>
      </Helmet>
      <Container>
        <h1>Status</h1>
        <div class="statuslist">
          <article data-icon="⚙️" class="article1">
            <h3>Up Time %</h3>
            <p>99.96</p>
          </article>
          <article data-icon="💰" class="article2">
            <h3>Total Delegated Stake</h3>
            <p>8,505,174</p>
          </article>
          <article data-icon="❤️" class="article3">
            <h3>Server Health</h3>
            <p id="ServerHealth">UP</p>
          </article>
        </div>

        
      </Container>
    </Layout>
  );
};

export default StatusPage;
