import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components/macro";
import ModalContainer from "../components/shared/ModalContainer";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import KPTxView from "../components/shared/KPTxView";
import { ReactComponent as KadenaLogo } from "../assets/images/crypto/kadena-logo.svg";
import { PactContext } from "../contexts/PactContext";
import { reduceBalance, extractDecimal } from "../utils/reduceBalance";
import { ReactComponent as CloseIcon } from "../assets/images/shared/cross.svg";
import WalletRequestView from "../components/shared/WalletRequestView";
import { WalletContext } from "../contexts/WalletContext";
import pwError from "../components/alerts/pwError";

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const Label = styled.span`
  font-size: 13px;
  font-family: montserrat-bold;
  text-transform: capitalize;
`;

const KpennyContainer = ({ data }) => {
  const pact = React.useContext(PactContext);
  const wallet = useContext(WalletContext);

  const [amount, setAmount] = useState("");
  const [amountModal, setAmountModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTxModal, setShowTxModal] = useState(false);

  const getButtonLabel = () => {
    if (!pact.account.account) return "Connect Wallet";
    // if (!pact.hasWallet()) return "Set signing method in wallet";
    if (!amount) return "Enter an amount";
    if (amount > pact.account.balance) return `Insufficient KDA balance`;
    return "RESERVE";
  };

  const onWalletRequestViewModalClose = () => {
    pact.setIsWaitingForWalletAuth(false);
    pact.setWalletError(null);
  };

  return (
    <>
      <KPTxView
        show={showTxModal}
        amtKda={amountModal}
        onClose={() => setShowTxModal(false)}
        isRedeem={false}
      />
      <WalletRequestView
        show={pact.isWaitingForWalletAuth}
        error={pact.walletError}
        onClose={() => onWalletRequestViewModalClose()}
      />
      <ModalContainer
        title="Reserve your KDX"
        containerStyle={{ maxWidth: 500 }}
      >
        <Input
          // error={isNaN(fromValues.amount)}
          // leftLabel={`from ${fromNote}`}
          // rightLabel={`balance: ${reduceBalance(fromValues.balance) ?? '-'}`}
          placeholder="enter amount of KDA"
          numberOnly
          value={amount}
          onChange={async (e, { value }) => {
            setAmount(value);
          }}
        />
        <>
          <RowContainer>
            <Label>Reserve</Label>
            <span>KDX for KDA</span>
          </RowContainer>
        </>
        {getButtonLabel() === "RESERVE" ? (
          <>
            <RowContainer>
              <Label>send</Label>
              <span>{amount} KDA</span>
            </RowContainer>
          </>
        ) : (
          <></>
        )}
        <Button
          buttonStyle={{ marginTop: 24, marginRight: 0 }}
          disabled={
            pact.account.account &&
            (getButtonLabel() !== "RESERVE" ||
              isNaN(amount))
          }
          loading={loading}
          onClick={async () => {
            if (!pact.account.account) {
              wallet.setOpenConnectModal(true);
              return;
            }
            setLoading(true);
            if (
              pact.signing.method !== "sign" &&
              pact.signing.method !== "none"
            )  {
              const res = await pact.kpennyReserveLocal(amount);
            } else {
              setAmountModal(amount)
              const res = await pact.reserveWallet(amount);
              if (!res) {
                pact.setIsWaitingForWalletAuth(true);
              } else {
                pact.setWalletError(null);
                setShowTxModal(true);
              }
              if (res?.result?.status === "success") {
                setAmount("")
              }
              setLoading(false);
            }
          }}
        >
          {getButtonLabel()}
        </Button>
      </ModalContainer>
    </>
  );
};

export default KpennyContainer;
