import { cn } from "@/utils/generics";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DesktopSidebar({ navigation }) {
  const router = useRouter();
  const logout = () => {
    const { replace } = router;
    localStorage.removeItem("token");
    replace("/auth/login");
  };
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-center text-3xl">PayFacs</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/app/${item.href}`}
                      className={cn(
                        item.current
                          ? "bg-gray-50 text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={cn(
                          item.current
                            ? "text-indigo-600"
                            : "text-gray-400 group-hover:text-indigo-600",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="mt-auto">
              <button
                onClick={logout}
                className="w-full group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-red-500 hover:bg-red-100 hover:text-red-700"
              >
                <ArrowLeftEndOnRectangleIcon
                  className="h-6 w-6 shrink-0 text-red-400 group-hover:text-red-700"
                  aria-hidden="true"
                />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
