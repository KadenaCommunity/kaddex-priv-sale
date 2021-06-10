import React from "react";
import styled from "styled-components/macro";
import ModalContainer from "../components/shared/ModalContainer";
import { ReactComponent as KadenaLogo } from "../assets/images/crypto/kadena-logo.svg";
import { Dimmer, Loader, Table, Menu, Label } from "semantic-ui-react";
import { PactContext } from "../contexts/PactContext";
import { reduceBalance, extractDecimal } from "../utils/reduceBalance";
import reduceToken from "../utils/reduceToken";
import { ReactComponent as CloseIcon } from "../assets/images/shared/cross.svg";

const TitlesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: montserrat-bold;
  font-size: 14px;
  margin-bottom: 14px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #ecebec;
  min-height: 44px;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 21px;
  width: 80px;
  svg:first-child {
    z-index: 2;
  }
  div:last-child {
    margin-left: 5px;
  }
`;

const StatsContainer = ({ data }) => {
  const pact = React.useContext(PactContext);

  React.useEffect(async () => {
    await pact.getPairList();
  }, []);

  React.useEffect(async () => {
    await pact.getReservations();
  }, []);

  return (
    <>
      <ModalContainer title="reservation stats" containerStyle={{ maxWidth: 650, maxHeight: window.innerHeight - 200, overflowX: "scroll" }}>
        <Table celled basic="very" style={{ color: "#FFFFFF" }}>
          <Table.Header>
            <Table.Row style={{ fontFamily: "montserrat-bold" }}>
              <Table.HeaderCell textAlign="center" style={{ color: "#FFFFFF" }}>
                Account
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" style={{ color: "#FFFFFF" }}>
                Amount KDA
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" style={{ color: "#FFFFFF" }}>
                Status
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {pact.reservations ? (
            Object.values(pact.reservations).map((r, i) =>
              r ? (
                <Table.Body>
                  <Table.Row key={i}>
                    <Table.Cell textAlign="center">{reduceToken(r.account)}</Table.Cell>
                    <Table.Cell textAlign="center">{r["amount-kda"]}</Table.Cell>
                    <Table.Cell textAlign="center">{r.status}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ) : (
                ""
              )
            )
          ) : (
            <Dimmer active inverted>
              <Loader>Loading</Loader>
            </Dimmer>
          )}
          {pact.reservations ? (
            <Table.Body>
              <Table.Row key={999999}>
                <Table.Cell textAlign="center">TOTAL</Table.Cell>
                <Table.Cell textAlign="center">
                  {Object.values(pact.reservations).reduce((t, r) => t + parseFloat(r["amount-kda"]), 0)} KDA
                </Table.Cell>
                <Table.Cell textAlign="center">OPEN</Table.Cell>
              </Table.Row>
            </Table.Body>
          ) : (
            ""
          )}
        </Table>
      </ModalContainer>
    </>
  );
};

export default StatsContainer;
