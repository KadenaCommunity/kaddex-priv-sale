import React, { useState, useContext } from "react";
import Pact from "pact-lang-api";
import { getCorrectBalance } from "../utils/reduceBalance";
import { WALLET } from "../utils/wallets";

const savedWallet = localStorage.getItem("wallet");

export const WalletContext = React.createContext(null);

export const WalletProvider = (props) => {
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [wallet, setWallet] = useState(
    savedWallet ? JSON.parse(savedWallet) : null
  );

  const connectWallet = async (wallet) => {
    console.log("wallet", wallet);

    switch (wallet.name) {
      case WALLET.ZELCORE.name:
        break;

      default:
        break;
    }

    // try {
    //   let data = await Pact.fetch.local(
    //     {
    //       pactCode: `(coin.details ${JSON.stringify(accountName)})`,
    //       meta: Pact.lang.mkMeta(
    //         "",
    //         chainId,
    //         GAS_PRICE,
    //         3000,
    //         creationTime(),
    //         600
    //       ),
    //     },
    //     network
    //   );
    //   if (data.result.status === "success") {
    //     await localStorage.setItem("wallet", JSON.stringify(wallet));
    //     setWallet({
    //       ...data.result.data,
    //       balance: getCorrectBalance(data.result.data.balance),
    //     });
    //     await localStorage.setItem("acct", JSON.stringify(data.result.data));
    //   } else {
    //     setAccount({ account: null, guard: null, balance: 0 });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const disconnectWallet = () => {
    localStorage.removeItem("wallet", null);
    //localStorage.removeItem("signing", null);
    window.location.reload();
  };

  const contextValue = {
    wallet,
    openConnectModal,
    setOpenConnectModal,
    connectWallet,
    disconnectWallet,
  };
  return (
    <WalletContext.Provider value={contextValue}>
      {props.children}
    </WalletContext.Provider>
  );
};
