import OrdersTable from "@/features/order/order-table";
import AppLayout from "@/layouts/AppLayout";
import React from "react";

export default function Orders() {
  return (
    <AppLayout>
      <section>
        <div className="mb-4">
          <h1 className="text-xl font-bold">Orders</h1>
        </div>

        <OrdersTable />
      </section>
    </AppLayout>
  );
}
