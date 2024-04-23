import SideNavbar from "@/components/SideNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <SideNavbar >
          {children}
        </SideNavbar>
  );
}
