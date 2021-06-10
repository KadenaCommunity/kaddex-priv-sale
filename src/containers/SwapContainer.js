import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components/macro";
import { ReactComponent as SwapArrowsIcon } from "../assets/images/shared/switch-arrows.svg";
// import ModalContainer from "../components/shared/ModalContainer";
import Input from "../components/shared/Input";
import InputToken from "../components/shared/InputToken";
import ButtonDivider from "../components/shared/ButtonDivider";
import MyButton from "../components/shared/Button";
import { reduceBalance, limitDecimalPlaces } from "../utils/reduceBalance";
import TokenSelector from "../components/shared/TokenSelector";
import TxView from "../components/shared/TxView";
import { PactContext } from "../contexts/PactContext";
import { throttle, debounce } from "throttle-debounce";
import pwError from "../components/alerts/pwError";
import walletError from "../components/alerts/walletError";
import { getCorrectBalance } from "../utils/reduceBalance";
import WalletRequestView from "../components/shared/WalletRequestView";
import { WalletContext } from "../contexts/WalletContext";
import {Button} from "semantic-ui-react";

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
  flex-flow: row;
  width: 100%;
  @media (max-width: ${({ theme: { mediaQueries } }) =>
      `${mediaQueries.mobilePixel + 1}px`}) {
    flex-flow: column;
    margin-bottom: 0px;
  }
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  @media (max-width: ${({ theme: { mediaQueries } }) =>
      `${mediaQueries.mobilePixel + 1}px`}) {
    flex-flow: row;
  }
`;

const Label = styled.span`
  font: normal normal normal 14px/15px Roboto;
  color: #FFFFFF;
  text-transform: capitalize;
`;

const Value = styled.span`
  font-family: montserrat-bold;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  width: 100%;
`;

const Title = styled.span`
  font: normal normal bold 32px/57px Montserrat;
  letter-spacing: 0px;
  color: #FFFFFF;
  text-transform: capitalize;
`;

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row;
  gap: 32px;
  padding: 20px 20px;
  width: 100%;
  border-radius: 10px;
  border: 2px solid #FFFFFF;
  box-shadow: 0 0 5px #FFFFFF;
  opacity: 1;
  background: transparent;
  @media (max-width: ${({ theme: { mediaQueries } }) =>
      `${mediaQueries.mobilePixel + 1}px`}) {
    flex-flow: column;
    gap: 0px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  width: 100%;
`;

const SwapContainer = () => {
  const [tokenSelectorType, setTokenSelectorType] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [fromValues, setFromValues] = useState({
    amount: "",
    balance: "",
    coin: "",
    address: "",
    precision: 0,
  });
  const [toValues, setToValues] = useState({
    amount: "",
    balance: "",
    coin: "",
    address: "",
    precision: 0,
  });
  const [inputSide, setInputSide] = useState("");
  const [fromNote, setFromNote] = useState("");
  const [toNote, setToNote] = useState("");
  const [showTxModal, setShowTxModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingPair, setFetchingPair] = useState(false);
  const [priceImpact, setPriceImpact] = useState("");
  const pact = useContext(PactContext);
  const wallet = useContext(WalletContext);

  useEffect(() => {
    if (!isNaN(fromValues.amount)) {
      if (inputSide === "from" && fromValues.amount !== "") {
        setToNote("(estimated)");
        setFromNote("");
        setInputSide(null);
        if (
          fromValues.coin !== "" &&
          toValues.coin !== "" &&
          !isNaN(pact.ratio)
        ) {
          if (fromValues.amount.length < 5) {
            throttle(
              500,
              setToValues({
                ...toValues,
                amount: reduceBalance(
                  pact.computeOut(fromValues.amount),
                  toValues.precision
                ),
              })
            );
          } else {
            debounce(
              500,
              setToValues({
                ...toValues,
                amount: reduceBalance(
                  pact.computeOut(fromValues.amount),
                  toValues.precision
                ),
              })
            );
          }
        }
      }
      if (isNaN(pact.ratio) || fromValues.amount === "") {
        setToValues((prev) => ({ ...prev, amount: "" }));
      }
    }
  }, [fromValues.amount]);

  useEffect(() => {
    if (!isNaN(toValues.amount)) {
      if (inputSide === "to" && toValues.amount !== "") {
        setFromNote("(estimated)");
        setToNote("");
        setInputSide(null);
        if (
          fromValues.coin !== "" &&
          toValues.coin !== "" &&
          !isNaN(pact.ratio)
        ) {
          if (toValues.amount.length < 5) {
            console.log(pact.computeIn(toValues.amount));
            throttle(
              500,
              setFromValues({
                ...fromValues,
                amount: reduceBalance(
                  pact.computeIn(toValues.amount),
                  fromValues.precision
                ),
              })
            );
          } else {
            debounce(
              500,
              setFromValues({
                ...fromValues,
                amount: reduceBalance(
                  pact.computeIn(toValues.amount),
                  fromValues.precision
                ),
              })
            );
          }
        }
      }
      if (isNaN(pact.ratio) || toValues.amount === "") {
        setFromValues((prev) => ({ ...prev, amount: "" }));
      }
    }
  }, [toValues.amount]);

  useEffect(() => {
    if (!isNaN(pact.ratio)) {
      if (fromValues.amount !== "" && toValues.amount === "") {
        setToValues({
          ...toValues,
          amount: reduceBalance(
            pact.computeOut(fromValues.amount),
            toValues.precision
          ),
        });
      }
      if (fromValues.amount === "" && toValues.amount !== "") {
        setFromValues({
          ...fromValues,
          amount: reduceBalance(
            pact.computeIn(toValues.amount),
            fromValues.precision
          ),
        });
      }
      if (fromValues.amount !== "" && toValues.amount !== "") {
        setToValues({
          ...toValues,
          amount: reduceBalance(
            pact.computeOut(fromValues.amount),
            toValues.precision
          ),
        });
      }
    }
  }, [pact.ratio]);

  useEffect(() => {
    if (!isNaN(pact.ratio)) {
      setPriceImpact(
        pact.computePriceImpact(
          Number(fromValues.amount),
          Number(toValues.amount)
        )
      );
    } else {
      setPriceImpact("");
    }
  }, [
    fromValues.coin,
    toValues.coin,
    fromValues.amount,
    toValues.amount,
    pact.ratio,
  ]);

  useEffect(() => {
    if (tokenSelectorType === "from") return setSelectedToken(fromValues.coin);
    if (tokenSelectorType === "to") return setSelectedToken(toValues.coin);
    return setSelectedToken(null);
  }, [tokenSelectorType]);

  useEffect(() => {
    const getReserves = async () => {
      if (toValues.coin !== "" && fromValues.coin !== "") {
        setFetchingPair(true);
        await pact.getPair(fromValues.address, toValues.address);
        await pact.getReserves(fromValues.address, toValues.address);
        setFetchingPair(false);
      }
    };
    getReserves();
  }, [fromValues.coin, toValues.coin]);

  useEffect(() => {
    if (pact.walletSuccess) {
      setLoading(false);
      setFromValues({ amount: "", balance: "", coin: "", address: "" });
      setToValues({ amount: "", balance: "", coin: "", address: "" });
      pact.setWalletSuccess(false);
    }
  }, [pact.walletSuccess]);

  const swapValues = () => {
    const from = { ...fromValues };
    const to = { ...toValues };
    setFromValues({ ...to });
    setToValues({ ...from });
    if (toNote === "(estimated)") {
      setFromNote("(estimated)");
      setToNote("");
    }
    if (fromNote === "(estimated)") {
      setToNote("(estimated)");
      setFromNote("");
    }
  };

  const onTokenClick = async ({ crypto }) => {
    let balance;
    if (crypto.code === "coin") {
      if (pact.account) {
        balance = pact.account.balance;
      }
    } else {
      let acct = await pact.getTokenAccount(
        crypto.code,
        pact.account.account,
        tokenSelectorType === "from"
      );
      if (acct) {
        balance = getCorrectBalance(acct.balance);
      }
    }
    if (tokenSelectorType === "from")
      setFromValues((prev) => ({
        ...prev,
        balance: balance,
        coin: crypto.name,
        address: crypto.code,
        precision: crypto.precision,
      }));
    if (tokenSelectorType === "to")
      setToValues((prev) => ({
        ...prev,
        balance: balance,
        coin: crypto.name,
        address: crypto.code,
        precision: crypto.precision,
      }));
  };

  const onWalletRequestViewModalClose = () => {
    pact.setIsWaitingForWalletAuth(false);
    pact.setWalletError(null);
  };

  const getButtonLabel = () => {
    if (!pact.account.account) return "Connect wallet";
    //if (!pact.hasWallet()) return "Set signing method in wallet";
    if (!fromValues.coin || !toValues.coin) return "Select tokens";
    if (fetchingPair) return "Fetching Pair...";
    if (isNaN(pact.ratio)) return "Pair does not exist!";
    if (!fromValues.amount || !toValues.amount) return "Enter an amount";
    if (fromValues.amount > fromValues.balance)
      return `Insufficient ${fromValues.coin} balance`;
    return "SWAP";
  };

  return (
    <>
      <TokenSelector
        show={tokenSelectorType !== null}
        selectedToken={selectedToken}
        onTokenClick={onTokenClick}
        fromToken={fromValues.coin}
        toToken={toValues.coin}
        onClose={() => setTokenSelectorType(null)}
      />
      <TxView
        show={showTxModal}
        selectedToken={selectedToken}
        onTokenClick={onTokenClick}
        onClose={() => setShowTxModal(false)}
      />
      <WalletRequestView
        show={pact.isWaitingForWalletAuth}
        error={pact.walletError}
        onClose={() => onWalletRequestViewModalClose()}
      />
      {/* <ConnectWalletModal
        show={openConnectWalletModal}
        onClose={() => setOpenConnectWalletModal(false)}
      /> */}
      <TitleContainer>
        <Title style={{ fontFamily: "montserrat-bold" }}>Swap</Title>
      </TitleContainer>
      <FormContainer>
        <Input
          error={isNaN(fromValues.amount)}
          topLeftLabel={`from ${fromNote}`}
          bottomLeftLabel={`balance: ${
            reduceBalance(fromValues.balance) ?? "-"
          }`}
          placeholder="enter amount"
          inputRightComponent={
            fromValues.coin ? (
              <InputToken
                icon={pact.tokenData[fromValues.coin].icon}
                code={pact.tokenData[fromValues.coin].name}
                onClick={() => setTokenSelectorType("from")}
              />
            ) : null
          }
          withSelectButton
          numberOnly
          value={fromValues.amount}
          onSelectButtonClick={() => setTokenSelectorType("from")}
          onChange={async (e, { value }) => {
            setInputSide("from");
            setFromValues((prev) => ({
              ...prev,
              amount: limitDecimalPlaces(value, fromValues.precision),
            }));
          }}
        />
        <ButtonDivider icon={<SwapArrowsIcon />} onClick={swapValues} />
        <Input
          error={isNaN(toValues.amount)}
          topLeftLabel={`to ${toNote}`}
          bottomLeftLabel={`balance: ${reduceBalance(toValues.balance) ?? "-"}`}
          placeholder="enter amount"
          inputRightComponent={
            toValues.coin ? (
              <InputToken
                icon={pact.tokenData[toValues.coin].icon}
                code={pact.tokenData[toValues.coin].name}
                onClick={() => setTokenSelectorType("to")}
              />
            ) : null
          }
          withSelectButton
          numberOnly
          value={toValues.amount}
          onSelectButtonClick={() => setTokenSelectorType("to")}
          onChange={async (e, { value }) => {
            setInputSide("to");
            setToValues((prev) => ({
              ...prev,
              amount: limitDecimalPlaces(value, toValues.precision),
            }));
          }}
        />
      </FormContainer>
      {!isNaN(pact.ratio) &&
      fromValues.amount &&
      fromValues.coin &&
      toValues.amount &&
      toValues.coin ? (
        <>
          <ResultContainer>
            <RowContainer>
              <Label>price</Label>
              <Value>{`${reduceBalance(pact.ratio * (1 + priceImpact))} ${
                fromValues.coin
              } per ${toValues.coin}`}</Value>
            </RowContainer>
            <RowContainer>
              <Label>Price Impact</Label>
              <Value>
                {pact.priceImpactWithoutFee(priceImpact) < 0.0001 &&
                pact.priceImpactWithoutFee(priceImpact)
                  ? "< 0.01%"
                  : `${reduceBalance(
                      pact.priceImpactWithoutFee(priceImpact) * 100,
                      4
                    )}%`}
              </Value>
            </RowContainer>
            <RowContainer>
              <Label>max slippage</Label>
              <Value>{`${pact.slippage * 100}%`}</Value>
            </RowContainer>
            <RowContainer>
              <Label>liquidity provider fee</Label>
              <Value>{`${reduceBalance(
                pact.liquidityProviderFee * parseFloat(fromValues.amount),
                14
              )} ${fromValues.coin}`}</Value>
            </RowContainer>
          </ResultContainer>
        </>
      ) : (
        <></>
      )}
      <ButtonContainer>
        <Button.Group>
        <MyButton
          /* background="none" */
          disabled={
            pact.account.account &&
            (getButtonLabel() !== "SWAP" ||
              isNaN(fromValues.amount) ||
              isNaN(toValues.amount))
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
            ) {
              const res = await pact.swapLocal(
                {
                  amount: fromValues.amount,
                  address: fromValues.address,
                  coin: fromValues.coin,
                },
                {
                  amount: toValues.amount,
                  address: toValues.address,
                  coin: toValues.coin,
                },
                fromNote === "(estimated)" ? false : true
              );
              console.log(res);
              if (res === -1) {
                setLoading(false);
                //error alert
                if (pact.localRes) pwError();
                return;
              } else {
                setShowTxModal(true);
                if (res?.result?.status === "success") {
                  setFromValues({
                    amount: "",
                    balance: "",
                    coin: "",
                    address: "",
                    precision: 0,
                  });
                  setToValues({
                    amount: "",
                    balance: "",
                    coin: "",
                    address: "",
                    precision: 0,
                  });
                }
                setLoading(false);
              }
            } else {
              const res = await pact.swapWallet(
                {
                  amount: fromValues.amount,
                  address: fromValues.address,
                  coin: fromValues.coin,
                },
                {
                  amount: toValues.amount,
                  address: toValues.address,
                  coin: toValues.coin,
                },
                fromNote === "(estimated)" ? false : true
              );

              if (!res) {
                pact.setIsWaitingForWalletAuth(true);
              } else {
                pact.setWalletError(null);
                setShowTxModal(true);
              }
              if (res?.result?.status === "success") {
                setFromValues({
                  amount: "",
                  balance: "",
                  coin: "",
                  address: "",
                  precision: 0,
                });
                setToValues({
                  amount: "",
                  balance: "",
                  coin: "",
                  address: "",
                  precision: 0,
                });
              }
              setLoading(false);
            }
          }}
        >
          {getButtonLabel()}
        </MyButton>
        </Button.Group>
      </ButtonContainer>
    </>
  );
};

export default SwapContainer;
