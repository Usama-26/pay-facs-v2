import { login } from "@/services/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function useLogin() {
  const router = useRouter();

  const {
    mutate: loginUser,
    isLoading: isLoggingIn,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const isAdmin = data.data.role === "admin";
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", isAdmin);
      router.replace("/app");
    },
    onError: (error) => toast.error(error.message),
  });

  return { loginUser, isLoggingIn, error };
}
