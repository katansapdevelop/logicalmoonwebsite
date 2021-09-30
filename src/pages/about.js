import React from "react";
import Helmet from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";

const AboutPage = () => {
  return (
    <Layout pageName="about">
      <Helmet>
        <title>About</title>
      </Helmet>
      <Container>
        <h1>About Us</h1>
        <p>The team at Logical Moon have been involved in the cryptocurrency scene since 2016 and have followed the 
          Radix Project from very early on.  Although we are relative new comers to running a validator node, 
          the team is composed of individuals with extensive experience in delivering/maintaining 
          enterprise grade solutions across a variety of industries
        </p>
        <p>
          The node we have setup runs on Azure in Australia South East Region.  We also run a backup node, 
          to fail over to, in the Australia East region to ensure high availability. 
          We provide 24/7 support and leverage the Azure alerting capabilities to escalate to our team
          to address any issues. We push to ensure the server is performant/secured and constantly review/ 
          update our infrastructure accordingly  
        </p>
        <p>
          We care about the network and the Radix project. To achieve a truly decentralised network, it is important
          to ensure there are enough nodes globally available and with a spread of stake distributed adequately amongst them.  
          For that reason if our node reaches 1% of total staked percentage, we will lock the node to ensure no further 
          stakes are accepted.  This strategy will remain in place for Logical Moon whilst we are in Olympia and will be re-evaluated in 2023 
          once Radix is fully sharded as part of Xi'an
        </p>
        <br/>
        <br/>
        <div class="reasons">
          <div class="reasonitem">
            <div class="reasonitemtext">Low<br/>Fees</div>
            <div><span class="material-icons">monetization_on</span></div>
          </div>
          <div class="reasonitem">
            <div class="reasonitemtext">High<br/>Availability</div>
            <div><span class="material-icons">settings</span></div>
          </div>
          <div class="reasonitem">
            <div class="reasonitemtext">Secure<br/><br/></div>
            <div><span class="material-icons">enhanced_encryption</span></div>
          </div>
        </div>
        
      </Container>
    </Layout>
  );
};

export default AboutPage;
