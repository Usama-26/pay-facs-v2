import { deleteUserById } from "@/services/users-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function useDeleteUser() {
  const router = useRouter();
  const { userId } = router.query;
  const {
    mutate: deleteUser,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: () => deleteUserById(userId),
    onError: (error) => toast.error(error.message),
  });

  return { deleteUser, isDeleting, error };
}
