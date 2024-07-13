import useGetCards from "@/features/cards/useGetCards";
import { cn } from "@/utils/generics";
import { Popover, Transition } from "@headlessui/react";
import { BellAlertIcon } from "@heroicons/react/24/outline";

import { useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import io from "socket.io-client";
import { createPortal } from "react-dom";
import ViewCard from "../ViewCard";
import { useRouter } from "next/router";
import RenderNotificationState from "./RenderNotificationsState";

const socket = io("https://payment-method-124e612a1e85.herokuapp.com");

export default function Notifications() {
  const { cards, isLoading, error } = useGetCards();
  const [openView, setOpenView] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSetQuery = (id) => {
    const { pathname, replace } = router;
    replace({ pathname, query: { id } });
  };

  const handleOpenView = (id) => {
    handleSetQuery(id);
    setOpenView(true);
  };

  useEffect(() => {
    socket.on("cardCreated", () => {
      queryClient.invalidateQueries(["cards"]);
    });

    socket.on("cardUpdateded", () => {
      queryClient.invalidateQueries(["cards"]);
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const newCards = cards
    ? cards.filter((card) => card.is_viewed === false)
    : [];

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${
                  open
                    ? "text-white bg-indigo-500 hover:bg-indigo-500"
                    : "text-white/90 hover:bg-gray-200"
                }
                group inline-flex items-center hover:text-indigo-500 p-2 rounded-full text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              {({ open }) => (
                <BellAlertIcon
                  className={cn(
                    "w-6 h-6",
                    open ? "stroke-white" : "stroke-gray-500"
                  )}
                />
              )}
            </Popover.Button>
            {newCards.length ? (
              <span
                className="inline-block absolute top-0 right-0 h-4 px-1
               rounded-full bg-indigo-600 text-xs text-center leading-tight text-white"
              >
                {newCards.length}
              </span>
            ) : null}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm h-80 overflow-y-auto -translate-x-1/2 transform px-4 sm:px-0 ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 p-2 bg-white space-y-2">
                  <RenderNotificationState
                    isLoading={isLoading}
                    error={error}
                    cards={newCards}
                    onView={handleOpenView}
                  />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      {isClient
        ? createPortal(
            <ViewCard isOpen={openView} setIsOpen={setOpenView} />,
            document.body
          )
        : null}
    </>
  );
}
