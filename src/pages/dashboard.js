import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";

import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  BarElement,
  PieController,
  BarController,
  DoughnutController,
} from "chart.js";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  BarElement,
  PieController,
  BarController,
  DoughnutController
);

const DashboardPage = () => {
  // Background colours
  const backgroundColors = [
    "#6666ff",
    "#1ae0cc",
    "#5e95d9",
    "#f770f0",
    //"#42d5eb",
    //"#5692c4",
    "#00d9ff",
  ];

  const [currentEpoch, setCurrentEpoch] = useState(0);

  // Charts
  const epochProgressLabels = ["% Complete", "% Pending"];
  const [currentEpochProgressData, setCurrentEpochProgressData] = useState({
    labels: epochProgressLabels,
    datasets: [
      {
        label: "Epoch Progress",
        data: [0, 100],
        backgroundColor: backgroundColors.slice(0,2),
        borderColor: ["#5e95d9", "#5e95d9"],
        borderWidth: 1,
      },
    ],
  });

  const [marketData30Days, setMarketData30Days] = useState({
    marketChart: {
      labels: ["01/01"],
      datasets: [
        {
          label: "Radix Price",
          data: [0],
          borderColor: "#6666ff",
          backgroundColor: backgroundColors.slice(0,1),
        },
      ],
    },
  });

  const [marketData1Year, setMarketData1Year] = useState({
    marketChart: {
      labels: ["01/01"],
      datasets: [
        {
          label: "Radix Price",
          data: [0],
          borderColor: "#6666ff",
          backgroundColor: backgroundColors.slice(0,1),
        },
      ],
    },
  });

  const currentStakeSpreadLabels = [
    "Top 100",
    "Outside Top 100",
    "Unregistered",
    "Radix Foundation Unregistered",
    "Radix Foundation",
  ];
  const [currentStakeSpreadData, setCurrentStakeSpreadData] = useState({
    labels: currentStakeSpreadLabels,
    datasets: [
      {
        label: "Stake Spread",
        data: [100, 100, 100, 100, 100],
        backgroundColor: backgroundColors.slice(0,5),
        borderColor: ["#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9"],
        borderWidth: 1,
      },
    ],
  });

  const currentStakeSpreadTop120Labels = [
    "1 to 10",
    "11 to 20",
    "21 to 50",
    "51 to 100",
    "101 to 120",
  ];
  const [currentStakeSpreadTop120Data, setCurrentStakeSpreadTop120Data] =
    useState({
      labels: currentStakeSpreadTop120Labels,
      datasets: [
        {
          label: "Stake Spread",
          data: [100, 100, 100, 100, 100],
          backgroundColor: backgroundColors.slice(0,5),
          borderColor: ["#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9"],
          borderWidth: 1,
        },
      ],
    });

  const [unregisteredValidatorStakeData, setUnregisteredValidatorStakeData] =
    useState({
      labels: [
        "Validator 1",
        "Validator 2",
        "Validator 3",
        "Validator 4",
        "Validator 5",
      ],
      datasets: [
        {
          label: "Unregistered Stake",
          data: [10, 10, 10, 10, 10],
          backgroundColor: backgroundColors.slice(0,5),
          borderColor: ["#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9"],
          borderWidth: 1,
        },
      ],
    });

  // API Read Functions
  const getMarketData = (async) => {
    let radixMarketData = {};

    fetch("https://api.coingecko.com/api/v3/coins/radix", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((radixInfo) => {})
      .catch((error) => console.error(error));

    fetch(
      "https://api.coingecko.com/api/v3/coins/radix/market_chart?vs_currency=USD&days=30&interval=daily",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((radixPriceData) => {
        let priceData = [];
        let priceLabels = [];
        radixPriceData.prices.forEach((priceRecord) => {
          priceLabels.push(
            new Date(priceRecord[0]).toLocaleDateString(navigator.language, {
              month: "numeric",
              day: "numeric",
            })
          );
          priceData.push(priceRecord[1]);
        });

        radixMarketData.marketChart = {
          labels: priceLabels,
          datasets: [
            {
              label: "Radix Price",
              data: priceData,
              borderColor: "#6666ff",
              borderWidth: 1,
              backgroundColor: backgroundColors.slice(0,1),
            },
          ],
        };

        setMarketData30Days(radixMarketData);
      })
      .catch((error) => console.error(error));

    let radixMarketData1Year = {};
    let dateFrom = new Date();
    if (dateFrom.getMonth() > 6) {
      dateFrom.setMonth(dateFrom.getMonth() - 6);
    } else {
      let month = 11 + (dateFrom.getMonth() - 6);
      dateFrom.setYear(dateFrom.getYear() - 1);
      dateFrom.setMonth(month);
    }

    dateFrom = dateFrom.getTime().toString().substring(0, 10);
    let dateTo = new Date();
    dateTo = dateTo.getTime().toString().substring(0, 10);

    let uri =
      "https://api.coingecko.com/api/v3/coins/radix/market_chart/range?vs_currency=usd&from=" +
      dateFrom +
      "&to=" +
      dateTo;

    fetch(uri, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((radixPriceData) => {
        let priceData = [];
        let priceLabels = [];

        let storePrice = true;
        radixPriceData.prices.forEach((priceRecord) => {
          if (storePrice === true) {
            priceLabels.push(
              new Date(priceRecord[0]).toLocaleDateString(navigator.language, {
                month: "numeric",
                day: "numeric",
              })
            );
            priceData.push(priceRecord[1]);
          }

          storePrice = !storePrice;
        });

        radixMarketData1Year.marketChart = {
          labels: priceLabels,
          datasets: [
            {
              label: "Radix Price",
              data: priceData,
              borderColor: "#6666ff",
              borderWidth: 1,
              backgroundColor: backgroundColors.slice(0,1),
            },
          ],
        };

        setMarketData1Year(radixMarketData1Year);
      })
      .catch((error) => console.error(error));
  };

  /*
   * Generate chart data to show the current epoch progress
   */
  const setEpochData = (ledger_state) => {
    setCurrentEpoch(ledger_state.epoch);
    let percentageComplete = Math.round(ledger_state.round / 100);
    let percentageIncomplete = 100 - percentageComplete;
    setCurrentEpochProgressData({
      labels: epochProgressLabels,
      datasets: [
        {
          label: "Epoch Progress",
          data: [percentageComplete, percentageIncomplete],
          backgroundColor: backgroundColors.slice(0,2),
          borderColor: ["#5e95d9", "#5e95d9"],
          borderWidth: 1,
        },
      ],
    });
  };

  const setValidatorStakeSpreadData = (validators) => {
    let totalDelegatedStake = 0;
    let delegatedStakeRegisterValidators = 0;
    let delegatedStakeRegisterValidatorsTop1to10 = 0;
    let delegatedStakeRegisterValidatorsTop11to20 = 0;
    let delegatedStakeRegisterValidatorsTop21to50 = 0;
    let delegatedStakeRegisterValidatorsTop51to100 = 0;
    let delegatedStakeRegisterValidatorsTop101to120 = 0;
    let delegatedStakeUnregisterValidators = 0;
    let delegatedStakeOutsideValidatorSet = 0;
    let radixFoundation = 0;
    let radixFoundationUnregistered = 0;
    let validatorCurrentPosition = 0;
    let unregisteredValidatorLabel = [];
    let unregisteredValidatorStake = [];
    validators.forEach((validator) => {
      validatorCurrentPosition = validatorCurrentPosition + 1;

      let validatorStakeValue = Math.round(
        validator.stake.value / 1000000000000000000
      );

      totalDelegatedStake = totalDelegatedStake + validatorStakeValue;

      switch (validator.properties.registered) {
        // Registered Validators
        case true:
          // Radix Foundation Stake all seem to have the same URL
          if (
            validator.properties.url ===
            "https://learn.radixdlt.com/article/will-the-radix-foundation-operate-validator-nodes"
          ) {
            radixFoundation = radixFoundation + validatorStakeValue;
          } else {
            delegatedStakeRegisterValidators =
              delegatedStakeRegisterValidators + validatorStakeValue;

            switch (true) {
              case validatorCurrentPosition <= 10:
                delegatedStakeRegisterValidatorsTop1to10 =
                  delegatedStakeRegisterValidatorsTop1to10 +
                  validatorStakeValue;
                break;
              case validatorCurrentPosition <= 20:
                delegatedStakeRegisterValidatorsTop11to20 =
                  delegatedStakeRegisterValidatorsTop11to20 +
                  validatorStakeValue;
                break;
              case validatorCurrentPosition <= 50:
                delegatedStakeRegisterValidatorsTop21to50 =
                  delegatedStakeRegisterValidatorsTop21to50 +
                  validatorStakeValue;
                break;
              case validatorCurrentPosition <= 100:
                delegatedStakeRegisterValidatorsTop51to100 =
                  delegatedStakeRegisterValidatorsTop51to100 +
                  validatorStakeValue;
                break;
              case validatorCurrentPosition <= 120:
                delegatedStakeRegisterValidatorsTop101to120 =
                  delegatedStakeRegisterValidatorsTop101to120 +
                  validatorStakeValue;
                break;
              default:
                break;
            }
          }

          // Registered Validators Outside Top 100
          if (validatorCurrentPosition >= 100)
            delegatedStakeOutsideValidatorSet =
              delegatedStakeOutsideValidatorSet + validatorStakeValue;

          break;
        default:
          // Unregistered Validators
          switch (validator.properties.url) {
            case "https://learn.radixdlt.com/article/will-the-radix-foundation-operate-validator-nodes":
              radixFoundationUnregistered =
                radixFoundationUnregistered + validatorStakeValue;
              break;
            default:
              delegatedStakeUnregisterValidators =
                delegatedStakeUnregisterValidators + validatorStakeValue;
              if (validatorStakeValue > 0) {
                switch (validator.properties.name) {
                  case "Discontinued due to no longer being in top 100":
                    unregisteredValidatorLabel.push("NextGen Staking");
                    break;
                  default:
                    // Clean up the name to remove rubbish characters
                    // Consider cropping the names to like 20 chars
                    unregisteredValidatorLabel.push(
                      validator.properties.name.replace(/[^a-zA-Z0-9 .]/g, "")
                    );
                    break;
                }
                unregisteredValidatorStake.push(validatorStakeValue);
              }
              break;
          }
          break;
      }
    });

    setCurrentStakeSpreadData({
      labels: currentStakeSpreadLabels,
      datasets: [
        {
          label: "Stake Spread",
          data: [
            delegatedStakeRegisterValidators,
            delegatedStakeOutsideValidatorSet,
            delegatedStakeUnregisterValidators,
            radixFoundationUnregistered,
            radixFoundation,
          ],
          backgroundColor: backgroundColors.slice(0,5),
          borderColor: ["#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9"],
          borderWidth: 1,
        },
      ],
    });

    setCurrentStakeSpreadTop120Data({
      labels: currentStakeSpreadTop120Labels,
      datasets: [
        {
          label: "Stake Spread",
          data: [
            delegatedStakeRegisterValidatorsTop1to10,
            delegatedStakeRegisterValidatorsTop11to20,
            delegatedStakeRegisterValidatorsTop21to50,
            delegatedStakeRegisterValidatorsTop51to100,
            delegatedStakeRegisterValidatorsTop101to120,
          ],
          backgroundColor: backgroundColors.slice(0,5),
          borderColor: ["#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9"],
          borderWidth: 1,
        },
      ],
    });

    setUnregisteredValidatorStakeData({
      labels: unregisteredValidatorLabel.slice(0, 5),
      datasets: [
        {
          label: "Unregistered Stake",
          data: unregisteredValidatorStake.slice(0, 5),
          backgroundColor: backgroundColors.slice(0,5),
          borderColor: ["#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9", "#5e95d9"],
          borderWidth: 1,
        },
      ],
    });
  };

  const getValidatorData = async () => {
    let jsonBody = { network_identifier: { network: "mainnet" } };

    fetch("https://mainnet.radixdlt.com/validators", {
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
        setEpochData(data.ledger_state);
        setValidatorStakeSpreadData(data.validators);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getMarketData();
    getValidatorData();

    const interval = setInterval(() => {
      getMarketData();
      getValidatorData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout pageName="dashboard">
      <Helmet>
        <title>Radix Dashboard</title>
      </Helmet>
      <Container>
        <h1>Radix Dashboard</h1>

        <div className="row">
          <div className="column">
            <div className="card">
              <h3>Stake Spread</h3>
              <Chart
                type="pie"
                data={currentStakeSpreadData}
                redraw={true}
              ></Chart>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>Stake Spread (Top 120)</h3>
              <Chart
                type="pie"
                data={currentStakeSpreadTop120Data}
                redraw={true}
              ></Chart>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>Unregistered Stake (Top 5)</h3>
              <Chart
                type="pie"
                data={unregisteredValidatorStakeData}
                redraw={true}
              ></Chart>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <div className="card">
              <h3>Price USD (30 Days) </h3>
              {typeof marketData30Days.marketChart.labels != undefined && (
                <Chart
                  type="line"
                  data={marketData30Days.marketChart}
                  redraw={true}
                ></Chart>
              )}
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>Price USD (180 Days) </h3>
              {typeof marketData1Year.marketChart.labels != undefined && (
                <Chart
                  type="line"
                  data={marketData1Year.marketChart}
                  redraw={true}
                ></Chart>
              )}
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>Epoch {currentEpoch} Progress</h3>
              <Chart
                type="bar"
                data={currentEpochProgressData}
                redraw={true}
              ></Chart>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
