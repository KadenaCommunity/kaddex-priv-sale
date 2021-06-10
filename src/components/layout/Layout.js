import React, { Fragment } from "react";
import styled from "styled-components/macro";
import Wrapper from "../shared/Container";
import CustomParticles from "./CustomParticles";
import Header from "./header/Header";
import { ReactComponent as Stripes } from "../../assets/images/shared/stripes.svg";

const MainContent = styled.div`
  margin-top: ${({ theme: { header } }) => `${header.height}px`};

  height: 100%;

  & > div:first-child {
    height: ${({ theme: { header } }) => `calc(100% - ${header.height}px)`};
    width: 100%;
  }
`;

const StripesContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  line-height: 0;
  @media (max-width: ${({ theme: { mediaQueries } }) =>
      `${mediaQueries.mobilePixel + 1}px`}) {
    display: none;
  }
`;

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Wrapper>
        <Header />
        <MainContent>{children}</MainContent>
      </Wrapper>
      <CustomParticles />
      <StripesContainer>
        <Stripes />
      </StripesContainer>
    </Fragment>
  );
};

export default Layout;
