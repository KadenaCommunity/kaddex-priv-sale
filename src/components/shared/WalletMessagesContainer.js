import React from "react";
import styled from "styled-components/macro";
import { Transition } from 'react-spring/renderprops';
import ModalContainer from './ModalContainer';
import Backdrop from './Backdrop';
import { Loader } from 'semantic-ui-react'
import PropTypes from "prop-types";

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
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  @media (max-width: ${({ theme: { mediaQueries } }) =>
      `${mediaQueries.mobilePixel + 1}px`}) {
    flex-flow: column;
  }
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


const WalletMessagesContainer = ({
    show,
    title,
    subTitle,
    onClose,
    loader
}) => {
  return (
    <Transition items={show} from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
      {(show) =>
        show &&
        ((props) => (
          <Container style={props}>
            <ModalContainer title={title} containerStyle={{ height: '100%', maxHeight: '80vh', maxWidth: '90vw' }} onClose={onClose}>
              <Content>
                <SubTitle style={{color: "#FFFFFF"}}>{subTitle}</SubTitle>
                {loader &&
                    <LoaderContainer>
                        <Loader active inline='centered' style={{ color: "#FFFFFF" }}></Loader>
                    </LoaderContainer>
                }
            </Content>
            </ModalContainer>
          </Container>
        ))
      }
    </Transition>
    
  );
};

WalletMessagesContainer.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

WalletMessagesContainer.defaultProps = {
  title: "",
  onClose: null,
};

export default WalletMessagesContainer;