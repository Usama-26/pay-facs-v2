import SimpleTable from "@/components/Tables/Simple";
import SpinnerLarge from "@/components/SpinnerLarge";
import { useState } from "react";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";

import OrderRow from "./order-row";
import DeleteOrder from "@/components/Order/DeleteOrder";
import ViewOrder from "@/components/Order/ViewOrder";
import useClient from "@/hooks/useClient";
import useAllOrders from "./useAllOrders";

export default function OrdersTable() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
  const router = useRouter();
  const client = useClient();
  const { ordersData, isOrdersDataLoading } = useAllOrders();

  const handleSetQuery = (id) => {
    const { pathname, replace } = router;
    replace({ pathname, query: { orderId: id } });
  };

  const handleOnDelete = (id) => {
    handleSetQuery(id);
    setOpenDelete(true);
  };

  const handleOnView = (id) => {
    handleSetQuery(id);
    setOpenView(true);
  };

  if (isOrdersDataLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <SpinnerLarge />
      </div>
    );

  const orders = ordersData.data;

  return (
    <>
      <SimpleTable headers={["API Key", "Amount", "Actions"]}>
        {orders.map((order, Idx) => (
          <OrderRow
            key={Idx}
            order={order}
            index={1}
            onDelete={handleOnDelete}
            onView={handleOnView}
          />
        ))}
      </SimpleTable>
      {client &&
        createPortal(
          <DeleteOrder isOpen={openDelete} setIsOpen={setOpenDelete} />,
          document.body
        )}
      {client &&
        createPortal(
          <ViewOrder isOpen={openView} setIsOpen={setOpenView} />,
          document.body
        )}
    </>
  );
}
