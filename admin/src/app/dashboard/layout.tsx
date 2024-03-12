import SideNavbar from "@/components/SideNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex min-h-screen w-full p-4">
        <SideNavbar />
        <div className="p-4 w-full">
        {children}
        </div>
      </div>
    </div>
  );
}
