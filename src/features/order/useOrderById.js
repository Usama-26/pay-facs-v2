import { getOrderById } from "@/services/orders-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useOrderById() {
  const router = useRouter();
  const { orderId } = router.query;
  const {
    data: orderData,
    isLoading: isOrderDataLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });

  return { orderData, isOrderDataLoading, isError, error };
}
