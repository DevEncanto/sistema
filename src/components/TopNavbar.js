import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../styles/index.module.css"
import Link from "next/link";
// Components

import LogoIcon from "../../public/assets/Logo";
import BurgerIcon from "../../public/assets/BurgerIcon";

export default function TopNavbar() {

  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {

  }, []);


  return (
    <>
      <Wrapper className="flexCenter animate whiteBg" style={{ height: "70px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="home" smooth={true}>
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              Cherry Social
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">

              <Link
                className="pointer flexNullCenter"
                to="/auth/login"
                smooth={true}
                style={{ padding: "10px 30px 10px 0" }}
              >
                Logar
              </Link>

            </li>
            <li className="semiBold font15 pointer flexCenter">
              <Link
                className="pointer flexNullCenter"
                to="/auth/register"
                smooth={true}
                sstyle={{ padding: "10px 15px" }}
              >
                Cadastrar
              </Link>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;


