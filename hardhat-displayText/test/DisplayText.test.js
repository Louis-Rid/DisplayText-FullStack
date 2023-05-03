const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DisplayText", function () {
  describe("constructor", function () {
    it("should initialize the contract correctly", async function () {
      // Deploy the contract
      const TextDisplay = await ethers.getContractFactory("DisplayText");
      const textDisplay = await TextDisplay.deploy("Hello, world!");
      const text = await textDisplay.getText();
      const uses = await textDisplay.getUses();

      // Tests
      expect(text).to.equal("Hello, world!");
      expect(uses.toString()).to.equal("0");
    });
  });

  describe("setText", function () {
    it("should update the text that is displayed", async function () {
      // Deploy the contract
      const TextDisplay = await ethers.getContractFactory("DisplayText");
      const textDisplay = await TextDisplay.deploy("Hello, world!");

      // Update display text
      const setTextTx = await textDisplay.setText("Something New");
      await setTextTx.wait(1);

      // Get Text from contract
      const text = await textDisplay.getText();

      // Test
      expect(text).to.equal("Something New");
    });
  });
});
