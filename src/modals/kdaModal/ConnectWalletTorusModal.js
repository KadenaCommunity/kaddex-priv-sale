import React, { useState, useEffect, useContext } from "react";
/* import "./App.css"; */
import TorusSdk from "@toruslabs/torus-direct-web-sdk";
import Button from "../../components/shared/Button";
import Pact from "pact-lang-api";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Transition } from "react-spring/renderprops";
import ModalContainer from "../../components/shared/ModalContainer";
import { PactContext } from "../../contexts/PactContext";
import { Loader } from "semantic-ui-react";

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  min-height: 200px;
  width: 100%;
  z-index: 5;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
  margin-top: 30px;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 32px;
`;

const Text = styled.span`
  font-size: 13px;
  font-family: montserrat-regular;
`;

const KeyContainer = styled.div`
  margin-top: 80px;
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  align: center;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align: center;
  padding-top: 16px;
  border: 2px solid 173ad21;
  border-radius: 25px;
  height: 100%;

  box-shadow: ${({ theme }) => theme.boxShadow};

  span:first-child {
    font-size: 12px;

    margin-left: 30px;
    text-transform: capitalize;
  }
`;

const kdaValue = 0.55;
const availableBalance = 12.9999999999999;

const GOOGLE = "google";

const AUTH_DOMAIN = "https://torus-test.auth0.com";

const verifierMap = {
  [GOOGLE]: {
    name: "Google",
    typeOfLogin: "google",
    verifier: process.env.REACT_APP_TORUS_VERIFIER,
    clientId: process.env.REACT_APP_TORUS_GOOGLE_CLIENT_ID,
  },
};

/* const createAPIHost = (network, chainId) => `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet02/chain/${chainId}/pact` */

function Login({ show, onClose, onBack }) {
  const pact = useContext(PactContext);
  const [selectedVerifier, setSelectedVerifier] = useState(GOOGLE);
  const [torusdirectsdk, setTorusdirectsdk] = useState(null);
  const [loginHint, setLoginHint] = useState("");
  const [consoleText, setConsoleText] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [userName, setUserName] = useState("");
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const history = useHistory();
  const [accountBalance, setAccountBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const torusdirectsdk = new TorusSdk({
          baseUrl: `${window.location.origin}/serviceworker`,
          enableLogging: true,
          redirectToOpener: true,
          network: process.env.REACT_APP_TORUS_NETWORK, // details for test net
        });

        await torusdirectsdk.init({ skipSw: true });

        setTorusdirectsdk(torusdirectsdk);
      } catch (error) {
        console.error(error, "mounted caught");
      }
    };
    init();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoginClicked(true);
    setLoading(true);
    /* const selectedVerifier = selectedVerifier;
    const { selectedVerifier, torusdirectsdk } = state; */

    try {
      const { typeOfLogin, clientId, verifier } = verifierMap[selectedVerifier];
      console.log(typeOfLogin, clientId, verifier);
      const loginDetails = await torusdirectsdk.triggerLogin({
        typeOfLogin,
        verifier,
        clientId,
      });
      console.log("logindetails", loginDetails);
      setConsoleText(
        typeof loginDetails === "object"
          ? JSON.stringify(loginDetails)
          : loginDetails
      );
      /* console.log("loginDetails", loginDetails); */
      setUserName(loginDetails?.userInfo?.name);

      const keyPair = Pact.crypto.restoreKeyPairFromSecretKey(
        loginDetails.privateKey
      );
      setPublicKey(keyPair.publicKey);
      setPrivateKey(keyPair.secretKey);
      await pact.setVerifiedAccount(keyPair.publicKey);
      await pact.storePrivKey(keyPair.secretKey);
      // const balance = await getBalance("coin", keyPair.publicKey);
      // setAccountBalance(balance[0]);
      // console.log("balance: ", balance);
      setDataRetrieved(true);
      setLoading(false);
      onClose();
    } catch (error) {
      console.error(error, "login caught");
      setLoginClicked(false);
      setLoading(false);
    }
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
                description="Torus Signing"
                containerStyle={{
                  height: "100%",
                  maxHeight: "80vh",
                  maxWidth: "90vw",
                  fontFamily: "montserrat-regular",
                }}
                onClose={() => onClose()}
                onBack={() => onBack()}
              >
                <ContentContainer>
                  <Text>
                    Please press 'Connect with Torus' in order to access your
                    wallet with Torus.
                  </Text>
                  <Text>
                    When submitting a transaction, you will sign it through
                    Torus.
                  </Text>
                </ContentContainer>
                <ButtonContainer>
                  <Button disabled={loading} onClick={login}>
                    Connect with Torus
                  </Button>
                </ButtonContainer>
                <ButtonContainer style={{ marginTop: "10px" }}>
                  <Button
                    disabled={loading}
                    border="none"
                    boxShadow="none"
                    background="transparent"
                    onClick={() => {
                      onBack();
                    }}
                  >
                    Cancel
                  </Button>
                </ButtonContainer>
                {loading && (
                  <LoaderContainer>
                    <Loader
                      active
                      inline="centered"
                      style={{ color: "#e0e0e0" }}
                    ></Loader>
                  </LoaderContainer>
                )}
              </ModalContainer>
            </Container>
          ))
        }
      </Transition>
    </>
  );
}

export default Login;
