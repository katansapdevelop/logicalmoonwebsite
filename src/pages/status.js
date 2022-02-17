import React , { useState, useEffect  } from "react";
import Helmet from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";

const StatusPage = () => {
 const [upTimePercentage, setUptimePercentage] = useState(0.00);
 const [totalDelegatedStake, setTotalDelegatedStake] = useState(0);
 const [missedProposals, setMissedProposals] = useState(0);

 useEffect(() => {
  let jsonRPCMethodBody = {
    "jsonrpc": "2.0",
    "id": "0",
    'Content-Type': 'application/json',
    "method": "validators.lookup_validator",
    "params": {
        "validatorAddress": "rv1qtzlupqghjyvdsp3nn0cpkdvmtrfe7ac8czump5r6hgm0rnlhvznj88xw7a"
    }
  };

  fetch("https://mainnet.radixdlt.com/archive",{
    method: 'POST',
    headers: {
      'x-radixdlt-method': 'validators.lookup_validator'
    },
    body: JSON.stringify(jsonRPCMethodBody)
    })
    .then((response) => {
      return response.json();
    })
    .then(data => {
      setUptimePercentage(data.result.uptimePercentage);
      setTotalDelegatedStake(Math.round(data.result.totalDelegatedStake/1000000000000000000));
      setMissedProposals(data.result.proposalsMissed);
    })
    .catch(error => console.error(error));
  });

  return (
    <Layout pageName="status">
      <Helmet>
        <title>Status</title>
      </Helmet>
      <Container>
        <h1>Status</h1>
        {/*
        <div className="statuslist">
          <article data-icon="⚙️" className="article1">
            <h3>Up Time %</h3>
            <p>{upTimePercentage}</p>
          </article>
          <article data-icon="💰" className="article2">
            <h3>Total Delegated Stake</h3>
            <p>{totalDelegatedStake}</p>
          </article>
          <article data-icon="❤️" className="article3">
            <h3>Server Health</h3>
            <p>UP</p>
          </article>
          <article data-icon="⚡" className="article4">
            <h3>Missed Proposals</h3>
            <p>{missedProposals}</p>  
          </article>
        </div>
        */}

<div class="row">
  <div class="column">
    <div class="card">
      <h3>Up Time %</h3>
      <p>{upTimePercentage}</p>
      <p>Some text</p>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <h3>Delegated Stake</h3>
      <p>{totalDelegatedStake}</p>
      <p>Some text</p>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <h3>Server Health</h3>
      <p>UP</p>
      <p>Some text</p>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <h3>Missed Proposals</h3>
      <p>{missedProposals}</p>
      <p>Some text</p>
    </div>
  </div>
</div>
        
      </Container>
    </Layout>
  );
};

export default StatusPage;
