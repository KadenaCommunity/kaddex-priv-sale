import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/macro";
import { Transition } from "react-spring/renderprops";
import ModalContainer from "../../components/shared/ModalContainer";
import Backdrop from "../../components/shared/Backdrop";
import MyButton from "../../components/shared/Button";
import Input from "../../components/shared/Input";
import { PactContext } from "../../contexts/PactContext";
import GetZelcoreAccountModal from "./GetZelcoreAccountModal";
import {Button} from "semantic-ui-react";

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
  z-index: 5;
`;

const Text = styled.span`
  font-size: 13px;
  font-family: montserrat-regular;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 32px;
`;

const ConnectWalletChainweaverModal = ({ show, onClose, onBack }) => {
  const pact = useContext(PactContext);
  const [accountId, setAccountId] = useState("");
  const [openGetZelcoreAccountModal, setOpenGetZelcoreAccountModal] = useState(
    false
  );

  const is_hexadecimal = (str) => {
    const regexp = /^[0-9a-fA-F]+$/;
    if (regexp.test(str)) return true;
    else return false;
  };

  const checkKey = (key) => {
    try {
      if (key.length !== 64) {
        return false;
      } else if (!is_hexadecimal(key)) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const resetValues = () => {
    setAccountId("");
  };

  const handleModalClose = () => {
    resetValues();
    onClose();
  };

  const handleModalBack = () => {
    resetValues();
    onBack();
  };

  const handleConnect = async () => {
    await pact.setVerifiedAccount(accountId);
    await pact.signingWallet();
    // if (response !== "success") {
    //   setError({ message: "Account does not exist!" });
    // } else {
    //   handleModalClose();
    // }

    handleModalClose();
  };

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
              <ModalContainer
                title="connect wallet"
                description="Chainweaver"
                containerStyle={{
                  height: "100%",
                  maxHeight: "80vh",
                  maxWidth: "90vw",
                }}
                onClose={() => handleModalClose()}
                onBack={() => handleModalBack()}
              >
                <ContentContainer>
                  <Text>
                  Please make sure the KDA account provided is controlled by
                  your Chainweaver wallet
                  </Text>
                  <Text>
                  When submitting a transaction, Chainweaver will show you a
                  preview within the wallet before signing
                  </Text>
                  <Input
                    topLeftLabel={"Account Name"}
                    placeholder="Insert your Account (from 'accounts' tab)"
                    value={accountId}
                    error={accountId !== ""}
                    onChange={async (e, { value }) => {
                      setAccountId(value);
                    }}
                  />
                  {/* {error && error.message ? <Text>{error.message}</Text> : null} */}
                 {/*  <Button
                    buttonStyle={{
                      border: "1px solid #424242",
                    }}
                    background="transparent"
                    onClick={() => setOpenGetZelcoreAccountModal(true)}
                  >
                    Get Zelcore Accounts
                  </Button> */}
                </ContentContainer>
                <ActionContainer>
                  <Button.Group fluid>
                  <MyButton
                    border="none"
                    boxShadow="none"
                    background="transparent"
                    onClick={() => {
                      resetValues();
                    }}
                  >
                    Cancel
                  </MyButton>
                  <MyButton
                    disabled={accountId === ""}
                    onClick={() => {
                      handleConnect();
                    }}
                  >
                      Connect
                  </MyButton>
                  </Button.Group>
                </ActionContainer>
              </ModalContainer>
            </Container>
          ))
        }
      </Transition>
      {/* {openGetZelcoreAccountModal ? (
        <GetZelcoreAccountModal
          show={openGetZelcoreAccountModal}
          onClose={() => {
            setOpenGetZelcoreAccountModal(false);
          }}
        />
      ) : (
        <></>
      )} */}
    </>
  );
};

export default ConnectWalletChainweaverModal;


/* import React, { useState, useContext } from "react";
import styled from "styled-components/macro";
import { Transition } from "react-spring/renderprops";
import ModalContainer from "../../components/shared/ModalContainer";
import Backdrop from "../../components/shared/Backdrop";
import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";
import { PactContext } from "../../contexts/PactContext";

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
  z-index: 5;
`;

const Text = styled.span`
  font-size: 13px;
  font-family: montserrat-regular;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 32px;
`;

const ConnectWalletChainweaverModal = ({ show, onClose, onBack }) => {
  const pact = useContext(PactContext);
  const [ppkValue, setPPKValue] = useState("");

  const is_hexadecimal = (str) => {
    const regexp = /^[0-9a-fA-F]+$/;
    if (regexp.test(str)) return true;
    else return false;
  };

  const checkKey = (key) => {
    try {
      if (key.length !== 64) {
        return false;
      } else if (!is_hexadecimal(key)) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const resetValues = () => {
    setPPKValue("");
  };

  const handleModalClose = () => {
    resetValues();
    onClose();
  };

  const handleModalBack = () => {
    resetValues();
    onBack();
  };

  const handleConnect = async () => {
    await pact.storePrivKey(ppkValue);
    handleModalClose();
  };

  return (
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
            <ModalContainer
              title="connect wallet"
              description="Plain Private Key (Unsafe)"
              containerStyle={{
                height: "100%",
                maxHeight: "80vh",
                maxWidth: "90vw",
              }}
              onClose={() => handleModalClose()}
              onBack={() => handleModalBack()}
            >
              <ContentContainer>
                <Text>
                  All your transactions will be automatically signed with these
                  keys.
                </Text>
                <Text>
                  Your private key will be saved in browser storage making
                  easily accessible to malicious actors.
                </Text>
                <Input
                  topLeftLabel={"Private Key"}
                  placeholder="Insert your Private Key"
                  value={ppkValue}
                  error={ppkValue !== "" ? !checkKey(ppkValue) : false}
                  onChange={async (e, { value }) => {
                    setPPKValue(value);
                  }}
                />
              </ContentContainer>
              <ActionContainer>
                <Button
                  buttonStyle={{
                    border: "1px solid #424242",
                  }}
                  background="transparent"
                  onClick={() => {
                    setPPKValue("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!checkKey(ppkValue)}
                  onClick={() => {
                    handleConnect();
                  }}
                >
                  Connect
                </Button>
              </ActionContainer>
            </ModalContainer>
          </Container>
        ))
      }
    </Transition>
  );
};

export default ConnectWalletChainweaverModal;
 */
