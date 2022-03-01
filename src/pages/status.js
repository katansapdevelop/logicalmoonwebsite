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
import { faMedal } from "@fortawesome/free-solid-svg-icons";

import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";

const StatusPage = () => {
  const [upTimePercentage, setUptimePercentage] = useState(0.0);
  const [totalDelegatedStake, setTotalDelegatedStake] = useState(0);
  const [missedProposals, setMissedProposals] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [currentEpochProgress, setCurrentEpochProgress] = useState(0.0);
  const [validatorRank, setValidatorRank] = useState(64);
  const [allTotalDelegatedStake, setAllTotalDelegatedStake] = useState(0);
  const [serverHealth, setServerHealth] = useState("DOWN");
  

  useEffect(() => {
    let jsonBody = {
      network_identifier: {
        network: "mainnet",
      },
      validator_identifier: {
        address:
          "rv1qtzlupqghjyvdsp3nn0cpkdvmtrfe7ac8czump5r6hgm0rnlhvznj88xw7a",
      },
    };

    fetch("https://mainnet.radixdlt.com/validator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-radixdlt-target-gw-api": "1.0.2",
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
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {})
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
              <span class="tooltip">
                <p class="tooltiptext">
                 Showing the percentage of “proposals” the validator has successfully made over roughly the past 2 weeks
                </p>
                <div id="tailShadow"></div>
                <div id="tail1"></div>
                <div id="tail2"></div>
              </span>
              <h3>Up</h3>
              <h3>Time %</h3>
              <p>{upTimePercentage}</p>
              <FontAwesomeIcon icon={faThumbsUp} size="3x" />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h3>Delegated</h3>
              <h3>Stake</h3>
              <p>{totalDelegatedStake}</p>
              <FontAwesomeIcon icon={faWallet} size="3x" />
            </div>
          </div>

          <div class="column">
            <div class="card">
              <h3>Server</h3>
              <h3>Health</h3>
              <p>{serverHealth}</p>
              <FontAwesomeIcon icon={serverHealth == "UP" ? faHeart : faHeartCrack} size="3x" />
            </div>
          </div>

          <div class="column">
            <div class="card">
              <span class="tooltip">
                <p class="tooltiptext">
                Showing the total number of “proposals” the validator has missed over roughly the past 2 weeks (Note impact to stake is only in the epoch the proposal were missed)
                </p>
                <div id="tailShadow"></div>
                <div id="tail1"></div>
                <div id="tail2"></div>
              </span>
              <h3>Missed</h3>
              <h3>Proposals</h3>
              <p>{missedProposals}</p>
              <FontAwesomeIcon icon={faPooStorm} size="3x" />
            </div>
          </div>

          <div class="column">
            <div class="card">
              <span class="tooltip">
                <p class="tooltiptext">
                  Rank is based on the total stake delegated to a node and
                  compared against all nodes
                </p>
                <div id="tailShadow"></div>
                <div id="tail1"></div>
                <div id="tail2"></div>
              </span>
              <h3>Validator</h3>
              <h3>Rank</h3>
              <p>{validatorRank}</p>
              <FontAwesomeIcon icon={faMedal} size="3x" />
            </div>
          </div>
        </div>
        <h1>Network Status</h1>
        <div class="row">
          <div class="column">
            <div class="card">
              <span class="tooltip">
              <p class="tooltiptext">An epoch is 10000 rounds and roughly lasts 30 minutes. The precise length of an epoch is based on the rate that the network produces rounds</p>
                <div id="tailShadow"></div>
                <div id="tail1"></div>
                <div id="tail2"></div>
              </span>
              <h3>Epoch</h3>
              <h3>Progress</h3>
              <p>{currentEpochProgress} %</p>
              <FontAwesomeIcon icon={faBarsProgress} size="3x" />
            </div>
          </div>
          <div class="column">
            <div class="card">
            <span class="tooltip">
              <p class="tooltiptext">An epoch is a period of time defined by a crypto, blockchain or DLT network protocol during which the validator nodes that participate in consensus (the validator set) are fixed</p>
                <div id="tailShadow"></div>
                <div id="tail1"></div>
                <div id="tail2"></div>
              </span>
            
              <h3>Current</h3>
              <h3>Epoch</h3>
              <p>{currentEpoch}</p>
              <FontAwesomeIcon icon={faHourglassHalf} size="3x" />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h3>Total Peers</h3>
              <h3>Count</h3>
              <p>{upTimePercentage}</p>
              <FontAwesomeIcon icon={faNetworkWired} size="3x" />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h3>Total Validator</h3>
              <h3>Count</h3>
              <p>{upTimePercentage}</p>
              <FontAwesomeIcon icon={faServer} size="3x" />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <span class="tooltip">
                <p class="tooltiptext">
                  Total delegated stake across all nodes in the network
                </p>
                <div id="tailShadow"></div>
                <div id="tail1"></div>
                <div id="tail2"></div>
              </span>
              <h3>Delegated </h3>
              <h3>Stake</h3>
              <p>{allTotalDelegatedStake}</p>
              <FontAwesomeIcon icon={faPiggyBank} size="3x" />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default StatusPage;
