import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';



const Page = () => {
  const router = useRouter()

  useEffect(() => {
    
  }, [])
  return <h2></h2>
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
