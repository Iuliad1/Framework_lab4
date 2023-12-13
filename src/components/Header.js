// Header.js
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const StyledHeader = styled.header`
  background-color: pink;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  color : black;
`;

const NavLinks = styled.nav`
  margin-top: 15px;

  a {
    margin: 0 10px;
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <Title>My mini aplication</Title>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/saved">Favorites</Link>
        <Link to="/create-task">Create Task</Link>
      </NavLinks>
    </StyledHeader>
  );
};

export default Header;

