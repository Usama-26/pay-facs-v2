import { useRouter } from "next/router";

export default function useLogout() {
  const router = useRouter();
  const logout = () => {
    const { replace } = router;
    localStorage.removeItem("token");
    replace("/auth/login");
  };

  return logout;
}
