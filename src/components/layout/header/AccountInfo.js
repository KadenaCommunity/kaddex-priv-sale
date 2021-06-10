import React from 'react';
import styled from 'styled-components/macro';
import { reduceBalance } from '../../../utils/reduceBalance';
import reduceToken from '../../../utils/reduceToken';

const Container = styled.div`
  display: flex;
  border-color: 'pink';
  :hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const BalanceContainer = styled.div`
  padding: 10px 21px;
  /* background: rgba(205, 205, 205, 0.5); */
  font-family: 'montserrat-bold';
  font-size: 14px;
  color: white;
  border-radius: 20px;
  border: 1px solid #FFFFFF;
  box-shadow: 0 0 5px #FFFFFF;
  opacity: 1;
  background: transparent;
`;

const AccountContainer = styled.div`
  padding: 10px 21px;
  background: transparent;
  font-family: 'montserrat-bold';
  font-size: 14px;
  color: white;
  border-radius: 4px;
  margin-left: -10px;
  z-index: 2;
`;

const CoinInfo = ({ account, balance, onClick }) => {
  return (
    <Container onClick={onClick}>
      <BalanceContainer>{balance}</BalanceContainer>
      <AccountContainer>{account}</AccountContainer>
    </Container>
  );
};

export default CoinInfo;
