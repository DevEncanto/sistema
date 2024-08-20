import Head from 'next/head';
import { Box, Stack } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { AdBanner1, AdBanner2, LinkDireto } from '../components/banners/adsTerra';
import { useEffect } from 'react';

const Page = () => {

    const router = useRouter()
    const banners = [LinkDireto]

    useEffect(() => {

    }, [])


    return <>
        <Head>
            <title>
                Ads | Cherry Social
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                marginTop: "-60px"
            }}
        >
            <Stack
                spacing={20}
                direction={`row`}
            >

                <a href='https://www.profitablegatecpm.com/qkj60ip0?key=a5662dc2471697995dab99abf1f5e420'>Teste</a>

            </Stack>

        </Box>
    </>
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
