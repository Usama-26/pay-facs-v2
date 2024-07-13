import SimpleTable from "@/components/Tables/Simple";
import SpinnerLarge from "@/components/SpinnerLarge";
import { useState } from "react";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import useAllUsers from "@/features/user/useAllUsers";
import useClient from "@/hooks/useClient";
import UserRow from "./user-row";
import ViewUser from "@/components/User/ViewUser";
import DeleteUser from "@/components/User/DeleteUser";

export default function UsersTable() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
  const router = useRouter();
  const client = useClient();
  const { usersData, isUsersDataLoading } = useAllUsers();

  const handleSetQuery = (id) => {
    const { pathname, replace } = router;
    replace({ pathname, query: { userId: id } });
  };

  const handleOnDelete = (id) => {
    handleSetQuery(id);
    setOpenDelete(true);
  };

  const handleOnView = (id) => {
    handleSetQuery(id);
    setOpenView(true);
  };

  if (isUsersDataLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <SpinnerLarge />
      </div>
    );

  const users = usersData.data;

  const filteredUsers = users.filter((user) => user.role !== "admin");

  return (
    <>
      <SimpleTable headers={["Name", "Email", "API Key", "Actions"]}>
        {filteredUsers.map((user, Idx) => (
          <UserRow
            key={user.email}
            user={user}
            index={Idx}
            onDelete={handleOnDelete}
            onView={handleOnView}
          />
        ))}
      </SimpleTable>
      {client &&
        createPortal(
          <DeleteUser isOpen={openDelete} setIsOpen={setOpenDelete} />,
          document.body
        )}
      {client &&
        createPortal(
          <ViewUser isOpen={openView} setIsOpen={setOpenView} />,
          document.body
        )}
    </>
  );
}
