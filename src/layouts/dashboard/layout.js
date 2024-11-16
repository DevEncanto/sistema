import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';

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
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  useLayoutEffect(() => {
    handleSetMode()

  }, [])

  useEffect(() => {
    handlePathnameChange()
  }, [])


  return (
    <>
      {isLoading
        ?
        <>
          <Stack
            sx={{
              width: "100vw",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/assets/loading.svg" width={80} height={80} />
          </Stack>
        </>
        :
        <>
          { <TopNav onNavOpen={() => setOpenNav(true)} /> }
          <SideNav
            onClose={() => setOpenNav(false)}
            open={openNav}
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
