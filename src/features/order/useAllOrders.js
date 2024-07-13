import { getAllOrders } from "@/services/orders-api";
import { useQuery } from "@tanstack/react-query";

export default function useAllOrders() {
  const {
    data: ordersData,
    isLoading: isOrdersDataLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", "all"],
    queryFn: () => getAllOrders(),
  });

  return { ordersData, isOrdersDataLoading, isError, error };
}
