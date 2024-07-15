import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import SpinnerLarge from "@/components/SpinnerLarge";
import Modal from "@/components/Modal";
import useOrderById from "@/features/order/useOrderById";
import SimpleTable from "@/components/Tables/Simple";

export default function ViewOrder({ isOpen, setIsOpen }) {
  const router = useRouter();
  const { orderData, isOrderDataLoading } = useOrderById();
  const handleResetQuery = () => {
    const { replace, pathname } = router;
    replace({ pathname, query: undefined });
  };

  function closeModal() {
    handleResetQuery();
    setIsOpen(false);
  }

  if (isOrderDataLoading)
    return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <div className="h-48 flex items-center justify-center">
            <SpinnerLarge />
          </div>
        </div>
      </Modal>
    );

  const order = orderData.data;
  const { items, amount } = order;
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Order Details</h3>
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        <div className="text-end">
          <h3 className="text-xl font-semibold">Total Amount: ${amount}</h3>
        </div>
        <div className="p-6">
          <SimpleTable headers={["Product Name", "Quantity"]}>
            {items.map((item, Idx) => (
              <tr key={Idx} className="border-b">
                <td className="whitespace-nowrap p-2 font-medium">{Idx + 1}</td>
                <td className="whitespace-nowrap p-2">{item.name}</td>
                <td className="whitespace-nowrap p-2">{item.quantity}</td>
              </tr>
            ))}
          </SimpleTable>
        </div>
      </div>
    </Modal>
  );
}
