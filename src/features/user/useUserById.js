import { getUserById } from "@/services/users-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useUserById() {
  const router = useRouter();
  const { userId } = router.query;
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  return { userData, isUserDataLoading, isError, error };
}
