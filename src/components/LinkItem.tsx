import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  link: string;
};

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 20px;
  background-color: black;
  padding-right: 30px;
  padding-left: 30px;
  border-radius: 5px;
`;

const LinkTitle = styled.h1`
  font-family: Old Standard TT;
  line-height: 0.9;
  color: white;
`;

export const LinkItem: React.FC<Props> = ({ link }) => (
  <StyledLink to={`/${link}`}>
    <LinkTitle>{link}</LinkTitle>
  </StyledLink>
);
