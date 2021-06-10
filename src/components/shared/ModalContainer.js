import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import { ReactComponent as CloseIcon } from "../../assets/images/shared/cross.svg";
import { ReactComponent as ArrowBack } from "../../assets/images/shared/arrow-back.svg";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  padding: 20px 20px;
  width: 100%;
  border-radius: 10px;
  border: 2px solid #FFFFFF;
  box-shadow: 0 0 5px #FFFFFF;
  opacity: 1;
  background: #240B2F 0% 0% no-repeat padding-box;
  color: #FFFFFF;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
`;

const Title = styled.span`
  font-family: montserrat-bold;
  font-size: 24px;
  text-transform: capitalize;
  color: "white";
`;

const Description = styled.span`
  font-family: montserrat-regular;
  font-size: 16px;
  margin-bottom: 24px;
`;

const ModalContainer = ({
  title,
  description,
  containerStyle,
  titleStyle,
  descriptionStyle,
  children,
  onBack,
  onClose,
}) => {
  return (
    <Container style={containerStyle}>
      <HeaderContainer>
        {onBack && (
          <ArrowBack
            style={{
              cursor: "pointer",
              color: "#FFFFFF 0% 0% no-repeat padding-box",
            }}
            onClick={onBack}
          />
        )}

        {title && <Title style={titleStyle}>{title}</Title>}

        {onClose && (
          <CloseIcon
            style={{
              cursor: "pointer",
              opacity: 1,
            }}
            onClick={onClose}
          />
        )}
      </HeaderContainer>

      {description && (
        <Description style={descriptionStyle}>{description}</Description>
      )}
      {children}
    </Container>
  );
};

ModalContainer.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

ModalContainer.defaultProps = {
  title: "",
  onClose: null,
};

export default ModalContainer;
