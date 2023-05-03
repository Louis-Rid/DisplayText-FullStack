const { ethers } = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = "Hello World!";

  const displayText = await deploy("DisplayText", {
    from: deployer,
    args: [args],
    log: true,
  });
  console.log(`DisplayText was deployed to: ${displayText.address}`);
};

module.exports.tags = ["all", "DisplayText"];
