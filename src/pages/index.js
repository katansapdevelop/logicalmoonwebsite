import React from "react";
import Helmet from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";

import img_radix_moon from "assets/images/moon-radix.png";
import img_copy from "assets/images/SVG/copy.svg";

console.log("This is the image: " + img_copy); 

const IndexPage = () => {  
  const copyTextRef = React.useRef(null);
  
  function copyToClipboard(e) {
    navigator.clipboard.writeText('rv1qtzlupqghjyvdsp3nn0cpkdvmtrfe7ac8czump5r6hgm0rnlhvznj88xw7a');
    
    copyTextRef.current.style.opacity = 1;
    setTimeout(function(){
      copyTextRef.current.style.opacity = 0;
 }, 750);
  };

    
  return (
  
  <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Container>
        <p className="cover">
          <img src={img_radix_moon} alt="Logical Moon Logo" />
        </p>
        <h1 className="heading">Stake With Logical Moon!</h1>
        <p className="banner">Top 100 Radix Validator Node - Live on Mainnet</p>
        <p className="animateCharacterBanner">Our fees have reduced to 0.75% from 17/02/2022</p>
        <br/>
        <p className="nodeAddressbanner">Validator Address: </p>
        <div className="nodeAddressbanner">
          <p className="nodeAddressbannerText">rv1qtzlupqghjyvdsp3nn0cpkdvmtrfe7ac8czump5r6hgm0rnlhvznj88xw7a</p>
          <button id="copyButton" className="copyButton" onClick={copyToClipboard} title="Copy">
            <div className="copyButtonIcon">
              <img src={img_copy} alt="Copy"/>   
            </div>           
          </button>
        </div>
        <p className="copyText" ref={copyTextRef}>Address Copied</p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
