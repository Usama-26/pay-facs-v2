import { getAllUsers } from "@/services/users-api";
import { useQuery } from "@tanstack/react-query";

export default function useAllUsers() {
  const {
    data: usersData,
    isLoading: isUsersDataLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", "all"],
    queryFn: () => getAllUsers(),
  });

  return { usersData, isUsersDataLoading, isError, error };
}
