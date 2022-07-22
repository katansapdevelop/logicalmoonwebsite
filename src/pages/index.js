import React from "react";
import Helmet from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";

import img_radix_moon from "assets/images/moon-radix.png";

import img_oci_swap from "assets/images/OCISwapLogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";


const IndexPage = () => {
  const copyTextRef = React.useRef(null);

  function copyToClipboard(e) {
    navigator.clipboard.writeText(
      "rv1qtzlupqghjyvdsp3nn0cpkdvmtrfe7ac8czump5r6hgm0rnlhvznj88xw7a"
    );

    copyTextRef.current.style.opacity = 1;
    setTimeout(function () {
      copyTextRef.current.style.opacity = 0;
    }, 750);
  }

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Container>
        <p className="cover">
          <img src={img_radix_moon} alt="Logical Moon Logo" />
          <a href="https://radixlogicalmoon.gitbook.io/radix-logical-moon-docs/staking/why-stake-with-us#oci-swap">
            <img src={img_oci_swap} alt="OciSwap Logo" />
          </a>
        </p>
        <h1 className="heading">Stake With Logical Moon</h1>
        <h1 className="heading">& earn $OCI!</h1>
        <p className="banner">Top 100 Radix Validator Node - Live on Mainnet</p>

        <p className="animateCharacterBanner">
           OciSwap Partner Airdrop Running Now
          <br />
          (Ends 23rd July 19:00 UTC)
        </p>
        <br />
        <div className="bannerArea">
          <span className="bannerButton">
            <a href="https://radixlogicalmoon.gitbook.io/radix-logical-moon-docs/staking/why-stake-with-us#july-22-air-drop"> 
              <span className="bannerButtonText">
                <FontAwesomeIcon icon={faGraduationCap} size="2x" color="#5e95d9" />
                Learn More 
              </span>
            </a>
          </span>
        </div>


        <br />
        <p className="nodeAddressbanner">Validator Address: </p>
        <div className="nodeAddressbanner">
          <p className="nodeAddressbannerText">
            rv1qtzlupqghjyvdsp3nn0cpkdvmtrfe7ac8czump5r6hgm0rnlhvznj88xw7a
          </p>
          <button
            id="copyButton"
            className="copyButton"
            onClick={copyToClipboard}
            title="Copy"
          >
            <div className="copyButtonIcon">
              <FontAwesomeIcon
                icon={faCopy}
                size="2x"
                color="#5e95d9"
              />
            </div>
          </button>
        </div>
        <p className="copyText" ref={copyTextRef}>
          Address Copied
        </p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
