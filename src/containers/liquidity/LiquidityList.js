import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components/macro";
import {
  Message,
  Divider,
  Dimmer,
  Loader,
  Button,
  Header,
  Grid,
} from "semantic-ui-react";
import { Button as SUIButton } from "semantic-ui-react";
/* import ModalContainer from '../../components/shared/ModalContainer'; */
import Input from "../../components/shared/Input";
import InputToken from "../../components/shared/InputToken";
import ButtonDivider from "../../components/shared/ButtonDivider";
import MyButton from "../../components/shared/Button";
import cryptoCurrencies from "../../constants/tokens";
import TokenPair from "./TokenPair";
import { PactContext } from "../../contexts/PactContext";
import { reduceBalance } from "../../utils/reduceBalance";
import { WalletContext } from "../../contexts/WalletContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  
  /* margin-top: 30px; */
  overflow: auto;
`;

const TextContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: left;
  justify-content: flex-start;
  width: 100%;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: left;
  justify-content: flex-start;
  width: 100%;
`;

const LiquidityContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-start;
  textalign: left;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  width: 100%;
  @media (max-width: ${({ theme: { mediaQueries } }) =>
      `${mediaQueries.mobilePixel + 1}px`}) {
    flex-flow: column;
  }
`;

/* const SecondButtons = styled(SUIButton)`
  font-family: montserrat-bold !important;
  font-size: ${({ fontSize }) =>
    fontSize ? fontSize + " !important" : "16px !important"};
  
  background: "red !important";
  border: 6px solid #f70202;
  border-radius: 20px !important;
  opacity: 1 !important;
  :hover {
    opacity: ${({ hover }) => (hover ? 0.7 : 1.0) + " !important"};
    cursor: pointer;
  }
`; */

const RightContainer = styled.div`
  display: flex;
  align-items: center;

  & > *:first-child {
    margin-right: 13px;
  }

  & > *:not(:first-child):not(:last-child) {
    margin-right: 14px;
  }
  @media (min-width: ${({ theme: { mediaQueries } }) =>
      mediaQueries.mobileBreakpoint}) {
    & > *:not(:first-child):not(:last-child) {
      margin-right: 16px;
    }
  }
`;

/* const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  position: absolute;
  top: 200px;

  & > span:first-child {
    font-size: 14px;
    margin-bottom: 3px;
  }

  & > span:last-child {
    font-size: 12px;
    color: #b5b5b5;
  }
`;

const Label = styled.span`
  font-size: 13px;
  font-family: montserrat-bold;
  text-transform: capitalize;
  margin: 15px 0;
`; */
const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  padding: 20px 20px;
  margin-bottom: 15px;
  width: 100%;
  /* border-radius: 10px;
  background: #232323 0% 0% no-repeat padding-box; */
  border-radius: 10px;
  border: 2px solid #FFFFFF;
  box-shadow: 0 0 5px #FFFFFF;
  opacity: 1;
  background: transparent;
  @media (max-width: ${({ theme: { mediaQueries } }) =>
      `${mediaQueries.mobilePixel + 1}px`}) {
    flex-flow: column;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0px 32px;
  flex-flow: row;
  width: 100%;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column;
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

const LiquidityList = (props) => {
  const pact = useContext(PactContext);
  const wallet = useContext(WalletContext);

  useEffect(async () => {
    pact.getPairListAccountBalance(pact.account.account);
  }, [pact.account.account]);

  console.log("pact.account -->", pact);

  return (
    <Container>
      <TextContainer
        style={{
          marginBottom: 30,
          background: "transparent",
          color: "#FFFFFF",
        }}
      >
        <h1 style={{ fontSize: 24, textAlign: "left !important", fontFamily: "montserrat" }}>
          Liquidity provider rewards
        </h1>
        <p style={{ fontSize: 16 }}>
          Liquidity providers earn a 0.3% fee on all trades proportional to
          their share of the pool.
          <br />
          Fees are added to the pool, accrue in real time and can be claimed by
          withdrawing your liquidity.
        </p>
      </TextContainer>

      {pact.account.account !== null ? (
        <BottomContainer>
          <Header
            style={{ fontSize: 32, textAlign: "left ", color: "#FFFFFF", fontFamily: "montserrat-bold" }}
          >
            Your Liquidity
          </Header>

          <ButtonContainer style={{ marginBottom: "30px" }}>
            <Button.Group fluid>
              <MyButton
                disabled
                buttonStyle={{ marginRight: "5px", borderRadius: "20px" }}
                onClick={() => props.selectCreatePair()}
              >
                Create a pair
              </MyButton>
              <MyButton
                /* background="none" */
                buttonStyle={{ marginLeft: "5px", borderRadius: "20px" }}
                onClick={() => props.selectAddLiquidity()}
              >
                Add Liquidity
              </MyButton>
            </Button.Group>
          </ButtonContainer>

          {pact.account.account !== null ? (
            pact.pairListAccount[0] ? (
              Object.values(pact.pairListAccount).map((pair) => {
                console.log("pair", pair);
                return pair && pair.balance ? (
                  <FormContainer>
                    <TokenPair
                      key={pair.name}
                      pair={pair}
                      selectAddLiquidity={props.selectAddLiquidity}
                      selectRemoveLiquidity={props.selectRemoveLiquidity}
                      setTokenPair={props.setTokenPair}
                    />
                  </FormContainer>
                ) : (
                  <></>
                );
              })
            ) : (
              <FormContainer>
                <Loader active inline="centered" style={{ color: "#FFFFFF" }}>
                  Loading..
                </Loader>
              </FormContainer>
            )
          ) : (
            <></>
          )}
        </BottomContainer>
      ) : (
        <MyButton
          hover={true}
          buttonStyle={{ padding: "10px 16px", width: "214px", height: "40px" }}
          fontSize={14}
          onClick={() => wallet.setOpenConnectModal(true)}
        >
          Connect Wallet
        </MyButton>
      )}
    </Container>
  );
};

export default LiquidityList;
