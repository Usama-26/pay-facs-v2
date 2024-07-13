import { updateOrderById } from "@/services/orders-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function useUpdateOrder() {
  const router = useRouter();
  const { orderId } = router.query;
  const {
    mutate: updateOrder,
    isLoading: isOrderUpating,
    error,
  } = useMutation({
    mutationFn: (userData) => updateOrderById(orderId, userData),
    onError: (error) => toast.error(error.message),
  });

  return { updateOrder, isOrderUpating, error };
}
