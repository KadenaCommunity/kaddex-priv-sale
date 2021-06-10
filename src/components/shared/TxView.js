import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import { Transition } from 'react-spring/renderprops';
import { Message, Popup, Icon } from 'semantic-ui-react';
import ModalContainer from './ModalContainer';
import Search from './Search';
import Backdrop from './Backdrop';
import Button from './Button'
import { ReactComponent as SuccessfulIcon } from '../../assets/images/shared/successful-circle.svg';
import { ReactComponent as ErrorIcon } from '../../assets/images/shared/error-circle.svg';
import { PactContext } from '../../contexts/PactContext';
import { extractDecimal, reduceBalance, gasUnit } from '../../utils/reduceBalance';
import WalletMessagesContainer from './WalletMessagesContainer';

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 385px;
  width: 100%;
  z-index: 5;
`;

const Label = styled.span`
  font-family: montserrat-bold;
  font-size: 13px;
  color: #FFFFFF;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
`;

const Divider = styled.div`
  border: ${({ theme: { colors } }) => `1px solid ${colors.border}`};
  margin: 16px 0px;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-family: montserrat-bold;
  font-size: 24px;
  padding: 16px;
  color: color: #FFFFFF;
`;

const SubTitle = styled.div`
  font-family: montserrat-bold;
  font-size: 16px;
  color: color: #FFFFFF;
`;

const TransactionsDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 0px;
`;

const SpaceBetweenRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Value = styled.span`
  font-family: montserrat-regular;
  font-size: 13px;
  color: #FFFFFF;
`;


const TxView = ({ show, view, selectedToken, onTokenClick, onClose, token0, token1, createTokenPair}) => {
  const pact = useContext(PactContext);

  const [loading, setLoading] = useState(false)

  const showTicker = (ticker) => {
    if (ticker === 'coin') return 'KDA'
    else return ticker.toUpperCase()
  }

  const successView = () => {
    return (
      <Content>
        <SuccessfulIcon />
        <Title>Preview Successful!</Title>
        <SubTitle>Transaction Details</SubTitle>
        <TransactionsDetails>
          <SpaceBetweenRow>
            <Label>Send</Label>
            <Value>
              {`${pact.localRes.result.data[0].amount} ${showTicker(pact.localRes.result.data[0].token)}`}
            </Value>
          </SpaceBetweenRow>
          <SpaceBetweenRow style={{ padding: '16px 0px' }}>
            <Label>Receive</Label>
            <Value>
              {`${pact.localRes.result.data[1].amount} ${showTicker(pact.localRes.result.data[1].token)}`}
            </Value>
          </SpaceBetweenRow>
          <SpaceBetweenRow>
            <Label>Gas Cost</Label>
            <Value>
              <s>{`${gasUnit(pact.GAS_PRICE * pact.localRes.gas)} KDA`}</s>
              <span style={{marginLeft: 5, color: 'green'}}>FREE!</span>
              <Popup
                trigger={
                  <Icon
                  onClick={() => {
                    window.open(
                      'https://medium.com/kadena-io/the-first-crypto-gas-station-is-now-on-kadenas-blockchain-6dc43b4b3836',
                      "_blank",
                      'noopener,noreferrer'
                    );
                  }}
                  name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>Why is Gas free?</Popup.Header>
                <Popup.Content>
                  Kadena has a novel concept called gas stations that allows smart contracts to pay for users' gas. This means you do not need to hold KDA to trade any token pair!
                  </Popup.Content>
              </Popup>
            </Value>
          </SpaceBetweenRow>
        </TransactionsDetails>
        <Button
          buttonStyle={{ width: '100%' }}
          onClick={async () => {
            setLoading(true)
            pact.swapSend();
            onClose()
            setLoading(false)
          }}
          loading={loading}
        >
          Send Transaction
        </Button>
      </Content>
    )
  }

  const successRemoveView = () => {
    return (
      <Content>
        <SuccessfulIcon />
        <Title>Preview Successful!</Title>
        <SubTitle>Transaction Details</SubTitle>
        <TransactionsDetails>
          <SpaceBetweenRow>
            <Label>Remove</Label>
            <Value>
              {`${extractDecimal(pact.localRes.result.data.amount0)} `}
              {showTicker(token0)}
            </Value>
          </SpaceBetweenRow>
          <SpaceBetweenRow style={{ padding: '16px 0px' }}>
            <Label>Remove</Label>
            <Value>
              {`${extractDecimal(pact.localRes.result.data.amount1)} `}
              {showTicker(token1)}
            </Value>
          </SpaceBetweenRow>
          <SpaceBetweenRow>
            <Label>Gas Cost</Label>
            <Value>
              <s>{`${gasUnit(pact.GAS_PRICE * pact.localRes.gas)} KDA`}</s>
              <span style={{marginLeft: 5, color: 'green'}}>FREE!</span>
              <Popup
                trigger={
                  <Icon
                  onClick={() => {
                    window.open(
                      'https://medium.com/kadena-io/the-first-crypto-gas-station-is-now-on-kadenas-blockchain-6dc43b4b3836',
                      "_blank",
                      'noopener,noreferrer'
                    );
                  }}
                  name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>Why is Gas free?</Popup.Header>
                <Popup.Content>
                  Kadena has a novel concept called gas stations that allows smart contracts to pay for users' gas. This means you do not need to hold KDA to trade any token pair!
                  </Popup.Content>
              </Popup>
            </Value>
          </SpaceBetweenRow>
        </TransactionsDetails>
        <Button
          buttonStyle={{ width: '100%' }}
          onClick={async () => {
            setLoading(true)
            pact.swapSend();
            onClose()
            setLoading(false)
          }}
          loading={loading}
        >
          Send Transaction
        </Button>
      </Content>
    );
  }

  const successAddView = () => {
    return (
      <Content>
        <SuccessfulIcon />
        <Title>Preview Successful!</Title>
        <SubTitle>Transaction Details</SubTitle>
        <TransactionsDetails>
          <SpaceBetweenRow>
            <Label>Add</Label>
            <Value>
              {`${
                extractDecimal(pact.localRes.result.data.amount0)
              }`} {showTicker(token0)}
            </Value>
          </SpaceBetweenRow>
          <SpaceBetweenRow style={{ padding: '16px 0px' }}>
            <Label>Add</Label>
            <Value>
              {`${
                extractDecimal(pact.localRes.result.data.amount1)
              }`} {showTicker(token1)}
            </Value>
          </SpaceBetweenRow>
          <SpaceBetweenRow>
            <Label>Gas Cost</Label>
            <Value>
              <s>{`${gasUnit(pact.GAS_PRICE * pact.localRes.gas)} KDA`}</s>
              <span style={{marginLeft: 5, color: 'green'}}>FREE!</span>
              <Popup
                trigger={
                  <Icon
                  onClick={() => {
                    window.open(
                      'https://medium.com/kadena-io/the-first-crypto-gas-station-is-now-on-kadenas-blockchain-6dc43b4b3836',
                      "_blank",
                      'noopener,noreferrer'
                    );
                  }}
                  name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
                <Popup.Header>Why is Gas free?</Popup.Header>
                <Popup.Content>
                  Kadena has a novel concept called gas stations that allows smart contracts to pay for users' gas. This means you do not need to hold KDA to trade any token pair!
                  </Popup.Content>
              </Popup>
            </Value>
          </SpaceBetweenRow>
        </TransactionsDetails>
        <Button
          buttonStyle={{ width: '100%' }}
          onClick={async () => {
            setLoading(true)
            if (view === "Add Liquidity") {
              pact.swapSend();
              onClose();
            } else {
              await createTokenPair();
              await pact.swapSend();
              onClose();
            }
            setLoading(false)
          }}
          loading={loading}
        >
          Send Transaction
        </Button>
      </Content>
    )
  }

  const failView = () => {
    return (
      <Content>
        <ErrorIcon />
        <Title>Preview Failed!</Title>
        <SubTitle>Error Message</SubTitle>
        <TransactionsDetails>
          <Message color='red' style={{wordBreak: "break-all", backgroundColor:"#424242"}}>
            <RowContainer>
              <span style={{wordBreak: "break-all"}}>
                {pact.localRes.result.error.message}
              </span>
            </RowContainer>
          </Message>
          {pact.localRes.result.error.message.includes('insufficient')
          ?
            <span style={{wordBreak: "break-all"}}>
              TIP: Try setting a higher slippage amount
            </span>
          : <></>}
        </TransactionsDetails>
        <Button
          onClick={() => {
            onClose()
          }}
        >
          Retry
        </Button>
      </Content>
    )
  }

  const localError = () => {
    return (
      <Content>
        <ErrorIcon />
        <Title>Transaction Error!</Title>
        <SubTitle>Error Message</SubTitle>
        <TransactionsDetails>
          <Message color='red' style={{wordBreak: "break-all", backgroundColor:"#424242"}}>
            <RowContainer>
              <span style={{wordBreak: "break-all"}}>
                {pact.localRes}
              </span>
            </RowContainer>
          </Message>
        </TransactionsDetails>
        <Button
          onClick={() => {
            onClose()
          }}
        >
          Retry
        </Button>
      </Content>
    )
  }
 
  const renderSwitch = () => {
    if (pact.localRes && pact.localRes.result && pact.localRes.result.status === 'success') { 
      switch (view) {
        case "Remove Liquidity":
          return successRemoveView();
        case "Add Liquidity":
          return successAddView();
        case undefined:
          return successView();
      }
    }
    else return failView();
  }
  // console.log(pact)
  return (
    <Transition items={show} from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
      {(show) =>
        show &&
        ((props) => (
          <Container style={props}>
            <Backdrop onClose={onClose} />
            <ModalContainer title="transaction details" containerStyle={{ height: '100%', maxHeight: '80vh', maxWidth: '90vw' }} onClose={onClose}>
              {
                typeof pact.localRes === 'string'
                ?
                  localError() : renderSwitch()
                  }
              
            </ModalContainer>
          </Container>
        ))
      }
    </Transition>
  );
};

export default TxView;

{/* {(typeof pact.localRes === 'string'
                ?
                  localError()
                :
                  (pact.localRes.result.status === 'success'
                  ?
                    !view
                    ? successView()
                    : view==="Remove Liquidity"
                      ? successRemoveView()
                      : successAddView()
                  :
                    failView()
                  )
                )} */}

                
        