import { ConnectButton } from "web3uikit";

export default function Header({ title }) {
  return (
    <div className="border-b-2 border-cyan-100 flex flex-row pb-3">
      <h1 className=" font-bold text-3xl">{title}</h1>
      <div className="ml-auto  flex  items-center">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
