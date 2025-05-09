import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { useEffect, useState } from 'react';
// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;
  const MAX = 12
  const MIN = 1

  const [width, setWidth] = useState(1000)
  const [img, setImg] = useState(Math.floor(Math.random() * (MAX - MIN + 1)) + MIN)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32,
                paddingLeft: "45px"
              }}
            >
              <img
                className='imagem-auth'
                alt=""
                src="/assets/logo_encanto_transparente.png"
                width={130}
                height={130}
              />
            </Box>
          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #3870c9 0%, #243785 100%)',
            color: 'white',
            display: `${width < 500 ? 'none' : 'flex'}`,
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{ p: 3 }}>
            {/* <Typography
              align="center"
              color="#fff"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1
              }}
              variant="h1"
            >
              Bem vindo a {'  '}
              <Box
                component="a"
                sx={{ color: '#de3163' }}
                target="_blank"
              >
                Cherry Social
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{ color: "#fff" }}
              variant="subtitle1"
            >
              Trabalhe conosco e comece a lucrar com os desafios!
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3, color: "#fff" }}
              variant="subtitle1"
            >
              Utilize um código ou link de indicação para começar ganhando
              <Box
                component="a"
                sx={{ color: '#de3163' }}
                target="_blank"
              >
                {'  '}R$ 1,00!
              </Box>
            </Typography> */}
            <img
              className='imagem-auth'
              alt=""
              style={{ marginTop: "-15px" }}
              src={`/assets/enc_painel_${img}.svg`}
              width={530}
              height={530}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

