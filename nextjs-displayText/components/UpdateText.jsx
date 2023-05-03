import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddress } from "../constants";
import { useState, useEffect, useCallback } from "react";

export default function UpdateText({ setTextDisplay, currentTitle }) {
  const { isWeb3Enabled } = useMoralis();
  const address = contractAddress.address;
  const [userInput, setUserInput] = useState();
  const [uses, setUses] = useState("");

  const { runContractFunction: setText } = useWeb3Contract({
    abi: abi,
    contractAddress: address,
    functionName: "setText",
    params: { textInput: userInput },
    msgValue: 10000000000000000, // <-- set to the appropriate value in wei
  });

  const { runContractFunction: getUses } = useWeb3Contract({
    abi: abi,
    contractAddress: address,
    functionName: "getUses",
    blockNumber: "latest",
  });

  const { runContractFunction: getText } = useWeb3Contract({
    abi: abi,
    contractAddress: address,
    functionName: "getText",
    blockNumber: "latest",
  });

  async function updateUI() {
    const currentTextFromCall = (await getText()).toString();
    const numberOfUsesFromCall = (await getUses()).toString();
    setUses(numberOfUsesFromCall);
    setTextDisplay(currentTextFromCall);
  }

  async function handleSuccess(tx) {
    await tx.wait(1);
    updateUI();
    setUserInput("");
  }

  function handleChange(e) {
    setUserInput(e.target.value);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled, currentTitle]);

  const inputStyles =
    "mt-1 mb-3 block w-full rounded-md border-gray-300 shadow-sm  border-cyan-500 focus:ring-0 focus:border-cyan-950 bg-cyan-600";

  const buttonStyles =
    "px-4 py-2 font-semibold text-sm bg-sky-500 text-white rounded-none shadow-sm disabled:opacity-75";

  return (
    <div>
      {!isWeb3Enabled ? (
        <p className="text-center pt-3">You need to connect to your wallet</p>
      ) : (
        <div className="mt-4">
          <div>
            <h2 className="text-xl text-center mb-3">
              Number of times the word(s) has been updated: {uses ? uses : "0"}
            </h2>
          </div>
          <label htmlFor="textDisplay">What to you want to change it to?</label>
          <input
            id="textDisplay"
            className={inputStyles}
            type="text"
            value={userInput}
            onChange={handleChange}
          />
          <button
            className={buttonStyles}
            disabled={!isWeb3Enabled}
            onClick={async () =>
              await setText({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              })
            }
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
