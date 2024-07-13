import AddUser from "@/components/User/AddUser";
import UsersTable from "@/features/user/user-table";
import useClient from "@/hooks/useClient";
import AppLayout from "@/layouts/AppLayout";
import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function Users() {
  const client = useClient();
  const [addUserOpen, setAddUserOpen] = useState(false);

  const openAddUser = () => {
    setAddUserOpen(true);
  };

  return (
    <AppLayout>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Users</h1>
          <button
            type="button"
            onClick={openAddUser}
            className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 disabled:cursor-not-allowed font-medium"
          >
            Add New user
          </button>
        </div>

        <UsersTable />
        {client &&
          createPortal(
            <AddUser isOpen={addUserOpen} setIsOpen={setAddUserOpen} />,
            document.body
          )}
      </section>
    </AppLayout>
  );
}
