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
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [currentEpochProgress, setCurrentEpochProgress] = useState(0.0);
  const [statusData, setStatusData] = useState({});

  const getEpochData = async () => {
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
        setCurrentEpoch(data.ledger_state.epoch);
        setCurrentEpochProgress(Math.round(data.ledger_state.round / 100));
      })
      .catch((error) => console.error(error));
  };

  const getStatusData = async () => {
    fetch(
      "https://lm-prod-func-api-australiaeast.azurewebsites.net/api/nodes/latest",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var validatorNodeHealth = "DOWN";
        if (data.nodes[0].registeredValidator === true) {
          validatorNodeHealth = data.nodes[0].status;
        }
        if (data.nodes[1].registeredValidator === true) {
          validatorNodeHealth = data.nodes[1].status;
        }

        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        var recordedAt =
          new Date(data.recordedAt).toLocaleDateString(undefined, options) +
          " " +
          new Date(data.recordedAt).toLocaleTimeString(undefined);
        var status = {
          upTimePercentage: data.uptimePercentage,
          proposalsMissed: data.proposalsMissed,
          delegatedStake: data.delegatedStake.toLocaleString(),
          validatorRank: data.position,
          totalValidators: data.totalValidators,
          totalPeers: data.totalPeers,
          totalDelegatedStake: data.totalDelegatedStake.toLocaleString(),
          lastRecordedAt: recordedAt,
          serverHealth: validatorNodeHealth,
        };
        setStatusData(status);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getEpochData();
    getStatusData();

    const interval = setInterval(() => {
      getEpochData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout pageName="status">
      <Helmet>
        <title>Status</title>
      </Helmet>
      <Container>
        <h1>Our Status</h1>
        <div className="row">
          <div className="column">
            <div className="card">
              <h3>Up</h3>
              <h3>Time %</h3>
              <p>{statusData.upTimePercentage}</p>
              <FontAwesomeIcon icon={faThumbsUp} size="3x" color="#6666ff" />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h3>Delegated</h3>
              <h3>Stake</h3>
              <p>{statusData.delegatedStake}</p>
              <FontAwesomeIcon icon={faWallet} size="3x" color="#6666ff" />
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>Server</h3>
              <h3>Health</h3>
              <p>{statusData.serverHealth}</p>
              <FontAwesomeIcon
                icon={statusData.serverHealth === "UP" ? faHeart : faHeartCrack}
                size="3x"
                color="#6666ff"
              />
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>Missed</h3>
              <h3>Proposals</h3>
              <p>{statusData.proposalsMissed}</p>
              <FontAwesomeIcon icon={faPooStorm} size="3x" color="#6666ff" />
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>Validator</h3>
              <h3>Rank</h3>
              <p>{statusData.validatorRank}</p>
              <FontAwesomeIcon icon={faMedal} size="3x" color="#6666ff" />
            </div>
          </div>
        </div>
        <h1>Network Status</h1>
        <div className="row">
          <div className="column">
            <div className="card">
              <h3>Epoch</h3>
              <h3>Progress</h3>
              <p>{currentEpochProgress} %</p>
              <FontAwesomeIcon
                icon={faBarsProgress}
                size="3x"
                color="#6666ff"
              />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h3>Current</h3>
              <h3>Epoch</h3>
              <p>{currentEpoch}</p>
              <FontAwesomeIcon
                icon={faHourglassHalf}
                size="3x"
                color="#6666ff"
              />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h3>Total Peers</h3>
              <h3>Count</h3>
              <p>{statusData.totalPeers}</p>
              <FontAwesomeIcon
                icon={faNetworkWired}
                size="3x"
                color="#6666ff"
              />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h3>Total Validator</h3>
              <h3>Count</h3>
              <p>{statusData.totalValidators}</p>
              <FontAwesomeIcon icon={faServer} size="3x" color="#6666ff" />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h3>Delegated </h3>
              <h3>Stake</h3>
              <p>{statusData.totalDelegatedStake}</p>
              <FontAwesomeIcon icon={faPiggyBank} size="3x" color="#6666ff" />
            </div>
          </div>
        </div>
        <p>Status Last Recorded At {statusData.lastRecordedAt}</p>
      </Container>
    </Layout>
  );
};

export default StatusPage;
