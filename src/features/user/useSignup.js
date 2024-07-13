import { signup } from "@/services/auth-api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useSignup() {
  const {
    mutate: signupUser,
    isLoading: isSigningUp,
    error,
  } = useMutation({
    mutationFn: (userData) => signup(userData),
    onError: (error) => toast.error(error.message),
  });

  return { signupUser, isSigningUp, error };
}
