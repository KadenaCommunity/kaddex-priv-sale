import React from "react";
import styled from "styled-components/macro";
import { Transition } from 'react-spring/renderprops';
import ModalContainer from './ModalContainer';
import Backdrop from './Backdrop';
import { Loader, Icon } from 'semantic-ui-react'
import Button from './Button'

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 385px;
  width: 100%;
  z-index: 5;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
`;


const SubTitle = styled.div`
  font-size: normal normal normal 12px/18px Montserrat;
  color: ${({ theme: { colors } }) => colors.primary};
`;


const WalletRequestView = ({ show, onClose, error}) => {
  return (
    <Transition items={show} from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
      {(show) =>
        show &&
        ((props) => (
          <Container style={props}>
            {error?.error ? (
              <ModalContainer title={error.title} containerStyle={{ height: '100%', maxHeight: '80vh', maxWidth: '90vw' }} onClose={onClose}>
                <Content style={{marginBottom: "30px"}}>
                  
                  <SubTitle style={{ color: "#FFFFFF" }}>{error.content}</SubTitle>
                </Content>
                <Button
                  onClick={() => {onClose()} }>
                  <Icon name='checkmark' /> Got it
                </Button>
              </ModalContainer>
            ) : (
              /* <Backdrop onClose={onClose} /> */
              <ModalContainer title="Please Sign" containerStyle={{ height: '100%', maxHeight: '80vh', maxWidth: '90vw' }} /* onClose={onClose} */>
                <Content>
              
                  <SubTitle style={{ color: "#FFFFFF" }}>Follow instructions in the wallet to preview and sign your transaction.</SubTitle>
                  <LoaderContainer>
                    <Loader active inline='centered' style={{ color: "#FFFFFF" }}></Loader>
                  </LoaderContainer>
                </Content>
              </ModalContainer>
            )}
          </Container>
        ))
      }
    </Transition>
    
  );
};

export default WalletRequestView;