import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useGetOneCard from "@/features/cards/useGetOneCard";
import useUpdateCard from "@/features/cards/useUpdateCard";
import SpinnerLarge from "../SpinnerLarge";
import { decryptData } from "@/utils/cryptoHelpers";
import Modal from "../Modal";

export default function ViewCard({ isOpen, setIsOpen }) {
  const { card, isCardDataLoading, isCardDataLoaded } = useGetOneCard();
  const { updateCard } = useUpdateCard();
  const router = useRouter();

  const handleResetQuery = () => {
    const { replace, pathname } = router;
    replace({ pathname, query: undefined });
  };

  function closeModal() {
    handleResetQuery();
    setIsOpen(false);
  }

  useEffect(() => {
    const { id } = router.query;
    if (isCardDataLoaded) updateCard({ id, data: { is_viewed: true } });
  }, [router.query, isCardDataLoaded, updateCard]);

  if (isCardDataLoading)
    return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <div className="h-48 flex items-center justify-center">
            <SpinnerLarge />
          </div>
        </div>
      </Modal>
    );

  const {
    card_holder,
    card_number,
    expiration_date,
    cvv,
    price,
    otp = "",
  } = card || {};

  const decryptedData = decryptData({
    card_holder,
    card_number,
    expiration_date,
    cvv,
  });

  const validCardData = { ...decryptedData, price, otp };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Card Details</h3>
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <dl className="gap-y-2">
            <dt className="font-medium text-gray-500">Card Holder Name</dt>
            <dd className="text-sm font-medium">{validCardData.card_holder}</dd>
          </dl>
          <dl className="gap-y-2">
            <dt className="font-medium text-gray-500">Card Number</dt>
            <dd className="text-sm font-medium">{validCardData.card_number}</dd>
          </dl>
          <dl className="gap-y-2">
            <dt className="font-medium text-gray-500">Expiry Date</dt>
            <dd className="text-sm font-medium">
              {validCardData.expiration_date}
            </dd>
          </dl>
          <dl className="gap-y-2">
            <dt className="font-medium text-gray-500">CVV</dt>
            <dd className="text-sm font-medium">{validCardData.cvv}</dd>
          </dl>
          <dl className="gap-y-2">
            <dt className="font-medium text-gray-500">Price</dt>
            <dd className="text-sm font-medium">${validCardData.price}</dd>
          </dl>
          {validCardData.otp ? (
            <dl className="gap-y-2">
              <dt className="font-medium text-gray-500">OTP</dt>
              <dd className="text-sm font-medium">{validCardData.otp}</dd>
            </dl>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
