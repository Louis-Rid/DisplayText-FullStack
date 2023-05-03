import Header from "@/components/Header";
import UpdateText from "@/components/UpdateText";

import { useMoralis } from "react-moralis";
import Head from "next/head";
import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [textDisplay, setTextDisplay] = useState("Update Me!");
  const { isWeb3Enabled } = useMoralis();

  return (
    <>
      <Head>
        <title>Hello World!</title>
        <meta name="description" content="Our Smart Contract Lottery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`container mx-auto my-8 max-w-2xl p-5 customBackground text-slate-200 ${
          !isWeb3Enabled ? "grow" : ""
        }`}
      >
        <Header title={textDisplay} />
        <UpdateText
          setTextDisplay={setTextDisplay}
          currentTitle={textDisplay}
        />
      </div>
    </>
  );
}
