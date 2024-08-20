import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { modoDashboard } from '../../util/util.set-mode-page';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/user-context';
import { useRouter } from 'next/router';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
});

export const Layout = (props) => {
  const { children } = props;
  const router = useRouter()
  const pathname = usePathname();
  const { mode, setMode, chat } = useContext(UserContext)
  const [openNav, setOpenNav] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );
  const handleSetMode = async () => {
    await modoDashboard(router, setMode)
  }
  useEffect(() => {
    handlePathnameChange()
    handleSetMode()
    setIsLoading(false)
  }, []);
  useEffect(() => {

  }, [chat])
  return (
    <>
      {isLoading
        ? <></>
        :
        <>
          {!chat ? <TopNav onNavOpen={() => setOpenNav(true)} /> : <></>}
          <SideNav
            onClose={() => setOpenNav(false)}
            open={openNav}
            mode={mode == undefined ? "USER" : mode}
          />
          <LayoutRoot>
            <LayoutContainer>
              {children}
            </LayoutContainer>
          </LayoutRoot>
        </>
      }
    </>
  );
};
