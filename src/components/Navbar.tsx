import * as React from "react";
import styled from "styled-components";
import { LinkItem } from "./LinkItem";

const NavbarLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Navbar: React.FC = ({}) => {
  const links = ["home", "about", "titans", "visualizations", "form"];
  const linkItems = links.map(link => <LinkItem link={link} />);
  return <NavbarLinks>{linkItems}</NavbarLinks>;
};
