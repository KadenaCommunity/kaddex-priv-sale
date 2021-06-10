import React, { useState, useContext } from "react";
import styled from "styled-components/macro";
import { Transition } from "react-spring/renderprops";
import ModalContainer from "../../components/shared/ModalContainer";
import Backdrop from "../../components/shared/Backdrop";
import Button from "../../components/shared/Button";
import ConnectWalletChainweaverModal from "./ConnectWalletChainweaverModal";
import ConnectWalletZelcoreModal from "./ConnectWalletZelcoreModal";
import ConnectWalletTorusModal from "./ConnectWalletTorusModal";
import { PactContext } from "../../contexts/PactContext";
import reduceToken from "../../utils/reduceToken";
import { ReactComponent as ZelcoreLogo} from "../../assets/images/shared/zelcore-logo.svg";
import { ReactComponent as LockLogo } from "../../assets/images/shared/awesome-lock.svg";
import { ReactComponent as TorusLogo} from "../../assets/images/shared/torus-logo.svg";

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
  z-index: 5;
`;

const Label = styled.span`
  font-size: 13px;
  font-family: montserrat-bold;
  text-transform: capitalize;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
`;

const ConnectWalletModal = ({ show, onClose }) => {
  const pact = useContext(PactContext);
  const [
    openConnectWalletChainweaverModal,
    setOpenConnectWalletChainweaverModal,
  ] = useState(false);
  const [
    openConnectWalletZelcoreModal,
    setOpenConnectWalletZelcoreModal,
  ] = useState(false);
  const [
    openConnectWalletTorusModal,
    setOpenConnectWalletTorusModal,
  ] = useState(false);

  return (
    <>
      <Transition
        items={show}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {(show) =>
          show &&
          ((props) => (
            <Container style={props}>
              <Backdrop
                onClose={() => {
                  onClose();
                }}
              />
              <ModalContainer
                title={
                  pact.account?.account ? "wallet connected" : "connect wallet"
                }
                description={
                  pact.account?.account
                    ? `Account ID: ${pact.account.account}`
                    : "Connect a wallet using one of the methods below"
                }
                containerStyle={{
                  height: "100%",
                  maxHeight: "80vh",
                  maxWidth: "90vw",
                }}
                onClose={() => {
                  onClose();
                }}
              >
                {!pact.account?.account && (
                  <ContentContainer>
                    <Button
                      buttonStyle={{
                        border: "1px solid #424242",
                      }}
                      background="transparent"
                      onClick={() => setOpenConnectWalletZelcoreModal(true)}
                    >
                      <ZelcoreLogo style={{ marginRight: "10px"}}/>
                      Zelcore Signing
                    </Button>
                    <Button
                      buttonStyle={{
                        border: "1px solid #424242",
                      }}
                      background="transparent"
                      onClick={() => setOpenConnectWalletChainweaverModal(true)}
                    >
                      <LockLogo style={{ marginRight: "10px"}}/>
                      Chainweaver
                    </Button>
                    <div>
                    PLEASE ENSURE YOUR ACCOUNT HAS FUNDS ON CHAIN 0
                    </div>
                  </ContentContainer>

                )}
              </ModalContainer>
            </Container>
          ))
        }
      </Transition>
      {openConnectWalletChainweaverModal ? (
        <ConnectWalletChainweaverModal
          show={openConnectWalletChainweaverModal}
          onClose={() => {
            onClose();
            setOpenConnectWalletChainweaverModal(false);
          }}
          onBack={() => setOpenConnectWalletChainweaverModal(false)}
        />
      ) : (
        <></>
      )}

      {openConnectWalletZelcoreModal ? (
        <ConnectWalletZelcoreModal
          show={openConnectWalletZelcoreModal}
          onClose={() => {
            onClose();
            setOpenConnectWalletZelcoreModal(false);
          }}
          onBack={() => setOpenConnectWalletZelcoreModal(false)}
        />
      ) : (
        <></>
      )}

      {openConnectWalletTorusModal ? (
        <ConnectWalletTorusModal
          show={openConnectWalletTorusModal}
          onClose={() => {
            onClose();
            setOpenConnectWalletTorusModal(false);
          }}
          onBack={() => setOpenConnectWalletTorusModal(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ConnectWalletModal;
