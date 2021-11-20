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
        <p>The team at Logical Moon are composed of two friends who are based out of Brisbane, Australia. We have been 
          involved in the cryptocurrency scene since 2016 and have followed the Radix Project since December 2017.  
          We both have extensive experience in delivering/maintaining enterprise grade solutions across a variety of 
          industries and have a genuine passion for technology 
        </p>
        <p>
          The validator node itself was brought to life in September 2021 and we were able to quickly establish ourselves 
          into the top 100 having been involved in an early investment group for Radix.
          It currently runs on Azure in the Australia South East Region and we have a backup node constantly running 
          in the Australia East region to ensure high availability. 
          We provide 24/7 support and leverage Azure's alerting capabilities to escalate any issues to our team. We 
          constantly push to ensure the server is performant/secured and review/update our infrastructure regularly  
        </p>
        <p>
          We care about the network, the community and ultimately the Radix project as a whole. To achieve a truly decentralised network, it is important
          to ensure there are enough nodes globally available and with a spread of stake distributed adequately amongst them.  
          For that reason if our node reaches 1% of total staked percentage, we will lock the node to ensure no further 
          stakes are accepted.  This strategy will remain in place for Logical Moon whilst we are in Olympia and will be re-evaluated in 2023 
          once Radix is fully sharded as part of Xi'an
        </p>
        <br/>
        <br/>
        <div className="reasons">
          <div className="reasonitem">
            <div className="reasonitemtext">Low<br/>Fees</div>
            <div><span class="material-icons">monetization_on</span></div>
          </div>
          <div className="reasonitem">
            <div className="reasonitemtext">High<br/>Availability</div>
            <div><span className="material-icons">settings</span></div>
          </div>
          <div className="reasonitem">
            <div className="reasonitemtext">Secure<br/><br/></div>
            <div><span className="material-icons">enhanced_encryption</span></div>
          </div>
        </div>
        
      </Container>
    </Layout>
  );
};

export default AboutPage;
