// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DisplayText {
    uint256 internal s_numberOfUses;
    string internal s_textDisplay;

    constructor(string memory textDisplay) {
        s_numberOfUses = 0;
        s_textDisplay = textDisplay;
    }

    function setText(
        string memory textInput
    ) public payable returns (string memory) {
        s_textDisplay = textInput;
        s_numberOfUses = s_numberOfUses + 1;
        return s_textDisplay;
    }

    function getUses() public view returns (uint256) {
        return s_numberOfUses;
    }

    function getText() public view returns (string memory) {
        return s_textDisplay;
    }
}
