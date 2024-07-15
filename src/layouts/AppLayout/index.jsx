import { useEffect, useState } from "react";
import { TagIcon, UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import MobileSidebar from "@/components/Mobile/Sidebar";
import DesktopSidebar from "@/components/Desktop/Sidebar";
import Header from "@/components/Header";
import { useRouter } from "next/router";

let sidebarNavigation = [
  { name: "Orders", href: "orders", icon: TagIcon, current: false },
  { name: "Users", href: "users", icon: UsersIcon, current: false },
  { name: "Profile", href: "profile", icon: UserIcon, current: false },
];

const userNavigation = [{ name: "Sign out", href: "/" }];

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState(sidebarNavigation);
  const router = useRouter();
  const [client, setClient] = useState(false);

  useEffect(() => {
    const updatedNavigation = sidebarNavigation.map((navItem) => ({
      ...navItem,
      current: router.pathname.includes(navItem.href),
    }));
    setNavigation(updatedNavigation);
  }, [router]);

  useEffect(() => {
    const validNavigation = localStorage.getItem("admin")
      ? sidebarNavigation.filter((navItem) => navItem.href !== "users")
      : sidebarNavigation;

    setNavigation(validNavigation);
    setClient(true);
  }, []);

  if (!client) return null;

  return (
    <>
      <div>
        <MobileSidebar
          navigation={navigation}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        {/* Static sidebar for desktop */}
        <DesktopSidebar navigation={navigation} />

        <div className="lg:pl-72">
          <Header
            userNavigation={userNavigation}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
