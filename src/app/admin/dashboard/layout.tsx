
import AdminDashBoardNavigation from '@/components/custom/adminUI/AdminDashBoardNavigation'

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <AdminDashBoardNavigation/>
          {children}
        </>
       
    );
  }
  




















