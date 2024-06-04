
import AdminDashboardNavigations from '@/components/custom/adminUI/AdminDashboardNavigations'

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        {/* <AdminDashBoardNavigation/> */}
        <AdminDashboardNavigations/>
          {children}
        </>
       
    );
  }
  




















