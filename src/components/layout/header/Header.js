import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Modal, Message, Popup } from "semantic-ui-react";
import Button from "../../shared/Button";
import styled from "styled-components/macro";
import reduceToken from "../../../utils/reduceToken";
import { reduceBalance } from "../../../utils/reduceBalance";
import { PactContext } from "../../../contexts/PactContext";
import {
  ROUTE_INDEX,
  ROUTE_POOL,
  ROUTE_SWAP,
  ROUTE_WRAP,
  ROUTE_STATS,
} from "../../../router/routes";
import { ReactComponent as KDALogo } from "../../../assets/images/header/kadena-logo.svg";
import { ReactComponent as KaddexLogo } from "../../../assets/images/header/KADDEX-logo.svg";
import { ReactComponent as PowerIcon } from "../../../assets/images/header/power.svg";
import { ReactComponent as CogIcon } from "../../../assets/images/header/cog.svg";
import { ReactComponent as HamburgerIcon } from "../../../assets/images/header/hamburger.svg";
import { ReactComponent as AboutIcon } from "../../../assets/images/header/about.svg";
import { ReactComponent as CodeIcon } from "../../../assets/images/header/code.svg";
import { ReactComponent as DiscordIcon } from "../../../assets/images/header/discord.svg";
import Input from "../../shared/Input";
import SlippagePopupContent from "./SlippagePopupContent";
import AccountInfo from "../header/AccountInfo";
import theme from "../../../styles/theme";
import { WalletContext } from "../../../contexts/WalletContext";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 18px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  min-height: ${({ theme: { header } }) => `${header.height}px`};
  width: calc(100% - 3em);
  @media (min-width: ${({ theme: { mediaQueries } }) =>
      mediaQueries.mobileBreakpoint}) {
    width: inherit;
    left: unset;
  }
  @media (max-width: ${({ theme: { mediaQueries } }) =>
      `${mediaQueries.mobilePixel + 1}px`}) {
    flex-flow: column;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
  & > *:not(:last-child) {
    margin-right: 25px;
  }
`;

const Label = styled.span`
  font-size: 13px;
  font-family: montserrat-bold;
  text-transform: capitalize;
`;

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

const Item = styled(NavLink)`
  color: #FFFFFF;
  font-size: 14px;
  text-decoration: none;
  text-transform: capitalize;
  background: transparent;
  &.active {
    font-family: montserrat-bold;
  }
  &:hover {
    color: white;
    opacity: 0.7;
    cursor: pointer;
  }
`;

const HamburgerListContainer = styled.div`
  border-radius: 4px;
  background: #240B2F 0% 0% no-repeat padding-box;
`;

const HamburgerItem = styled(NavLink)`
  display: flex;
  align-items: center;
  font-family: montserrat-regular;
  font-size: 16px;
  background: #240B2F 0% 0% no-repeat padding-box;
  color: #FFFFFF;
  &:hover {
    color: #FFFFFF;
    text-shadow: 0 0 5px #FFFFFF;
    & svg {
      margin-right: 10px;
      & path {
        fill: #FFFFFF;
      }
    }
  }
  & svg {
    margin-right: 10px;
  }
`;

const Header = () => {
  const [showEthModal, setShowEthModal] = useState(false);
  const [showPactModal, setShowPactModal] = useState(false);
  const history = useHistory();
  const pact = useContext(PactContext);
  const wallet = useContext(WalletContext);

  return (
    <Container>
      <LeftContainer>
        <KaddexLogo
          style={{ cursor: "pointer" }}
          onClick={() => history.push(ROUTE_INDEX)}
        />
        <Item to={ROUTE_INDEX}>reserve</Item>
        <Item to={ROUTE_STATS}>stats</Item>
      </LeftContainer>
      <RightContainer>
        <Item className="mobile-none" to="#">
          <Label style={{ padding: "10px 16px", color: "white", fontSize: 16 }}>
            TESTNET (DEMO)
          </Label>
        </Item>
        {pact.account.account ? (
          <Item className="mobile-none" to="#">
            <AccountInfo
              onClick={() => wallet.setOpenConnectModal(true)}
              account={
                pact?.account.account
                  ? `${reduceToken(pact.account.account)}`
                  : "KDA"
              }
              balance={
                pact?.account.account
                  ? `${reduceBalance(pact?.account.balance)} KDA`
                  : ""
              }
              ></AccountInfo>
            </Item>
        ) : (
          <></>
        )}
        {!pact?.account.account && (
          <>
            <Item className="mobile-none" to="#">
              <Button
                hover={true}
                buttonStyle={{ padding: "10px 16px" }}
                fontSize={14}
                onClick={() => wallet.setOpenConnectModal(true)}
              >
                Connect Wallet
              </Button>
            </Item>
          </>
        )}
        {pact?.account.account && (
          <Item to="#" onClick={pact.logout}>
            <PowerIcon></PowerIcon>
          </Item>
        )}
        <Item to="#">
          <Popup
            basic
            trigger={<CogIcon />}
            on="click"
            offset={[10, 10]}
            position="bottom right"
            style={{ padding: 13, background: "#240B2F 0% 0% no-repeat padding-box", border: "2px solid #FFFFFF", boxShadow: "0 0 5px #FFFFFF" }}
          >
            <SlippagePopupContent />
          </Popup>
        </Item>
        <Item to="#">
          <Popup
            basic
            trigger={<HamburgerIcon />}
            on="click"
            offset={[10, 10]}
            position="bottom right"
            style={{ padding: 13, background: "#240B2F 0% 0% no-repeat padding-box", border: "2px solid #FFFFFF", boxShadow: "0 0 5px #FFFFFF"}}
          >

            <HamburgerListContainer>
              <HamburgerItem
                to="/"
                onClick={() =>
                  window.open(
                    `https://kaddex.com`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <AboutIcon />
                About
              </HamburgerItem>
              <HamburgerItem
                to="/"
                style={{ paddingTop: 9, paddingBottom: 9 }}
                onClick={() =>
                  window.open(
                    `https://github.com`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <CodeIcon />
                Code
              </HamburgerItem>
              <HamburgerItem
                to="/"
                onClick={() =>
                  window.open(
                    `https://discord.io/`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <DiscordIcon />
                Discord
              </HamburgerItem>
            </HamburgerListContainer>
          </Popup>
        </Item>
      </RightContainer>
    </Container>
  );
};

export default Header;
