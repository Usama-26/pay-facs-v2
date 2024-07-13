import { deleteOrderById } from "@/services/orders-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function useDeleteOrder() {
  const router = useRouter();
  const { orderId } = router.query;
  const {
    mutate: deleteOrder,
    isLoading: isOrderDeleting,
    error,
  } = useMutation({
    mutationFn: () => deleteOrderById(orderId),
    onError: (error) => toast.error(error.message),
  });

  return { deleteOrder, isOrderDeleting, error };
}
