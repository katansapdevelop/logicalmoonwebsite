import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { faPooStorm } from "@fortawesome/free-solid-svg-icons";

import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";

const StatusPage = () => {
  const [upTimePercentage, setUptimePercentage] = useState(0.0);
  const [totalDelegatedStake, setTotalDelegatedStake] = useState(0);
  const [missedProposals, setMissedProposals] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [currentEpochProgress, setCurrentEpochProgress] = useState(0.00);

  useEffect(() => {
    let jsonBody = {
      "network_identifier": {
          "network": "mainnet"
      },
      "validator_identifier": {
          "address": "rv1qtzlupqghjyvdsp3nn0cpkdvmtrfe7ac8czump5r6hgm0rnlhvznj88xw7a"
      }
  };

    fetch("https://mainnet.radixdlt.com/validator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-radixdlt-target-gw-api": "1.0.2"
      },
      body: JSON.stringify(jsonBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUptimePercentage(data.validator.info.uptime.uptime_percentage);
        setTotalDelegatedStake(
          Math.round(data.validator.stake.value / 1000000000000000000)
        );
        setMissedProposals(data.validator.info.uptime.proposals_missed);
        setCurrentEpoch(data.ledger_state.epoch);
        setCurrentEpochProgress(Math.round(data.ledger_state.round / 100));
      })
      .catch((error) => console.error(error));

    


      fetch("https://lm-prod-func-australiaeast.azurewebsites.net/api/nodes", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8080"
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          
        })
        .catch((error) => console.error(error));

    
  });

  return (
    <Layout pageName="status">
      <Helmet>
        <title>Status</title>
      </Helmet>
      <Container>
        <h1>Our Status</h1>
        <div class="row">
          <div class="column">
            <div class="card">
              <h3>Up</h3>
              <h3>Time %</h3>
              <p>{upTimePercentage}</p>
              <FontAwesomeIcon class="FontAwesomeIcon" icon={faThumbsUp} />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h3>Delegated</h3>
              <h3>Stake</h3>
              <p>{totalDelegatedStake}</p>
              <FontAwesomeIcon class="FontAwesomeIcon" icon={faWallet} />
            </div>
          </div>

          <div class="column">
            <div class="card">
              <h3>Server</h3>
              <h3>Health</h3>
              <p>UP</p>
              <FontAwesomeIcon class="FontAwesomeIcon" icon={faHeart} />
            </div>
          </div>

          <div class="column">
            <div class="card">
              <h3>Missed</h3>
              <h3>Proposals</h3>
              <p>{missedProposals}</p>
              <FontAwesomeIcon class="FontAwesomeIcon" icon={faPooStorm} />
            </div>
          </div>
        </div>
        <h1>Network Status</h1>
        <div class="row">
          <div class="column">
            <div class="card">
              <h3>Epoch</h3>
              <h3>Progress</h3>
              <p>{currentEpochProgress} %</p>
              <FontAwesomeIcon class="FontAwesomeIcon" icon={faBarsProgress} />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h3>Current</h3>
              <h3>Epoch</h3>
              <p>{currentEpoch}</p>
              <FontAwesomeIcon class="FontAwesomeIcon" icon={faHourglassHalf} />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h3>Peers</h3>
              <h3>Count</h3>
              <p>{upTimePercentage}</p>
              <FontAwesomeIcon class="FontAwesomeIcon" icon={faNetworkWired} />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h3>Validator</h3>
              <h3>Count</h3>
              <p>{upTimePercentage}</p>
              <FontAwesomeIcon class="FontAwesomeIcon" icon={faServer} />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default StatusPage;
