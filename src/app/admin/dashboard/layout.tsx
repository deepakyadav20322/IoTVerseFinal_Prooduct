
import AdminDashBoardNavigation from '@/components/custom/adminUI/adminDashBoardNavigation'

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
  




















