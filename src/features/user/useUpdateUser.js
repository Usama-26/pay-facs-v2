import { updateUserById } from "@/services/users-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const router = useRouter();
  const { userId } = router.query;
  const {
    mutate: updateUser,
    isLoading: isUpdating,
    error,
  } = useMutation({
    mutationFn: (userData) => updateUserById(userId, userData),
    onError: (error) => toast.error(error.message),
  });

  return { updateUser, isUpdating, error };
}
