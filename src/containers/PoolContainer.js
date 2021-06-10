import React, { useState, useContext } from "react";
import styled from "styled-components/macro";
import ModalContainer from "../components/shared/ModalContainer";
import Input from "../components/shared/Input";
import InputToken from "../components/shared/InputToken";
import ButtonDivider from "../components/shared/ButtonDivider";
import Button from "../components/shared/Button";
import cryptoCurrencies from "../constants/tokens";
import TokenSelector from "../components/shared/TokenSelector";
import LiquidityContainer from "./liquidity/LiquidityContainer";
import RemoveLiquidityContainer from "./liquidity/RemoveLiquidityContainer";
import LiquidityList from "./liquidity/LiquidityList";
import PreviewContainer from "./liquidity/PreviewContainer";
import { PactContext } from "../contexts/PactContext";
import RemoveLiqContainer from "./liquidity/RemoveLiqContainer";

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

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
`;

const PoolContainer = () => {
  const [selectedView, setSelectedView] = useState(false);
  const [pair, setPair] = useState(null);
  const pact = useContext(PactContext);

  return (
    <>
      {selectedView === "Remove Liquidity" ? (
        <RemoveLiqContainer
          closeLiquidity={() => setSelectedView(false)}
          selectedView={selectedView}
          pair={pair}
        />
      ) : selectedView ? (
        <LiquidityContainer
          closeLiquidity={() => setSelectedView(false)}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          pair={pair}
        />
      ) : (
        <LiquidityList
          selectCreatePair={() => setSelectedView("Create A Pair")}
          selectAddLiquidity={() => setSelectedView("Add Liquidity")}
          selectRemoveLiquidity={() => setSelectedView("Remove Liquidity")}
          selectPreviewLiquidity={() => setSelectedView("Preview Liquidity")}
          setTokenPair={(pair) => setPair(pair)}
        />
      )}
    </>
  );
};

export default PoolContainer;
