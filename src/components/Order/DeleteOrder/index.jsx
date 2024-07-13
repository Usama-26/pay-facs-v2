import SpinnerMini from "@/components/ui/SpinnerMini";
import useDeleteOrder from "@/features/order/useDeleteOrder";
import { queryClient } from "@/pages/_app";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Fragment } from "react";
import toast from "react-hot-toast";

export default function DeleteOrder({ isOpen, setIsOpen }) {
  const router = useRouter();
  const { deleteOrder, isOrderDeleting } = useDeleteOrder();

  const handleResetQuery = () => {
    const { pathname, replace } = router;
    replace({ pathname, query: undefined });
  };

  function closeModal() {
    handleResetQuery();
    setIsOpen(false);
  }

  const handleDelete = () => {
    deleteOrder(null, {
      onSuccess: () => {
        toast.success("Order Deleted Successfully");
        closeModal();
        queryClient.invalidateQueries({ queryKey: ["orders", "all"] });
      },
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                  <h3 className="md:text-lg font-semibold">Delete Order</h3>
                  <button type="button" onClick={closeModal}>
                    <XMarkIcon className="w-6 h-6 stroke-2" />
                  </button>
                </div>

                <h4 className="text-center mb-2 font-medium">
                  Are you sure want to delete this order?
                </h4>

                <div className=" flex justify-center  gap-x-4 mt-10 text-center md:text-base text-xs font-medium">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isOrderDeleting}
                    className="px-4 py-2 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isOrderDeleting}
                    className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-800 disabled:cursor-not-allowed"
                  >
                    {isOrderDeleting ? <SpinnerMini /> : "Delete"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
