import { ArchiveBoxXMarkIcon, XCircleIcon } from "@heroicons/react/24/outline";
import SpinnerLarge from "../SpinnerLarge";
import PulseIndicator from "../PulseIndicator";
import { Popover } from "@headlessui/react";

export default function RenderNotificationState({
  cards,
  isLoading,
  error,
  onView,
}) {
  if (isLoading)
    return (
      <div className="h-32 flex items-center justify-center">
        <SpinnerLarge />
      </div>
    );

  if (error)
    return (
      <div className="h-32 text-center p-2">
        <XCircleIcon className="h-20 mx-auto stroke-gray-500" />
        <h4 className="text-gray-500 font-medium">
          {"Couldn't get notifications."}
        </h4>
      </div>
    );

  return (
    <>
      {cards.length ? (
        cards.map((card, i) => (
          <Popover.Button
            key={i}
            onClick={() => onView(card._id)}
            className="w-full flex justify-between items-center text-left bg-gray-100 py-2 px-4 rounded-md"
          >
            <h6 className="font-medium text-gray-700">
              {card.otp ? "A card received an OTP" : "A new card added"}
            </h6>
            <PulseIndicator
              colorClass={card.otp ? "bg-yellow-500" : "bg-green-500"}
            />
          </Popover.Button>
        ))
      ) : (
        <div className="h-32 text-center p-2">
          <ArchiveBoxXMarkIcon className="h-20 mx-auto stroke-gray-500" />
          <h4 className="text-gray-500 font-medium">
            {"You're all caught up."}
          </h4>
        </div>
      )}
    </>
  );
}
