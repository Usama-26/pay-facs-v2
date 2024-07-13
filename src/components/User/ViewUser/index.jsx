import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import SpinnerLarge from "@/components/SpinnerLarge";
import Modal from "@/components/Modal";
import InputField from "@/components/Forms/InputField";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SelectInput from "@/components/ui/SelectInput";
import { Field, Form, Formik } from "formik";
import useUserById from "@/features/user/useUserById";
import useUpdateUser from "@/features/user/useUpdateUser";
import { queryClient } from "@/pages/_app";
import toast from "react-hot-toast";

export default function ViewUser({ isOpen, setIsOpen }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { userData, isUserDataLoading } = useUserById();
  const { updateUser, isUpdating } = useUpdateUser();
  const handleResetQuery = () => {
    const { replace, pathname } = router;
    replace({ pathname, query: undefined });
  };

  function closeModal() {
    handleResetQuery();
    setIsOpen(false);
  }

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  const handleUpdateUser = (values) => {
    delete values.role;
    updateUser(values, {
      onSuccess: () => {
        toast.success("User Data Updated Successfully");
        queryClient.invalidateQueries({ queryKey: ["users", "all"] });
        closeModal();
        toggleEdit();
      },
    });
  };

  if (isUserDataLoading)
    return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <div className="h-48 flex items-center justify-center">
            <SpinnerLarge />
          </div>
        </div>
      </Modal>
    );

  const user = userData.data;
  const initialValues = user
    ? {
        name: user.name,
        email: user.email,
        role: { value: user.role },
        api_key: user.api_key,
      }
    : {};

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">User Details</h3>
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        <div className="text-end">
          <button
            type="button"
            onClick={toggleEdit}
            className="hover:text-indigo-600 hover:bg-gray-100 p-2 rounded-full "
          >
            <PencilSquareIcon className="w-5 h-5" />
          </button>
        </div>
        <Formik
          onSubmit={handleUpdateUser}
          enableReinitialize={true}
          initialValues={initialValues}
        >
          <EditUser
            isSubmitting={isUpdating}
            isDisabled={!isEditing}
            onCancel={closeModal}
          />
        </Formik>
      </div>
    </Modal>
  );
}

function EditUser({ isSubmitting, isDisabled, onCancel }) {
  return (
    <Form className="grid grid-cols-2 gap-x-4 gap-y-2">
      <Field
        id={"name"}
        name={"name"}
        label={"User Name"}
        as={InputField}
        disabled={isDisabled}
      />
      <Field
        id={"email"}
        name={"email"}
        label={"User Email Address"}
        as={InputField}
        disabled={isDisabled}
      />
      <div className="col-span-2">
        <Field
          label={"Select Role"}
          items={[
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ]}
          as={SelectInput}
          id={"role"}
          name={"role"}
          disabled={true}
        />
      </div>
      <div className="col-span-2">
        <Field
          id={"api_key"}
          name={"api_key"}
          label={"API Key"}
          as={InputField}
          disabled={isDisabled}
        />
      </div>
      {!isDisabled && (
        <div className=" col-span-2 flex justify-end  gap-x-4 mt-4 text-end md:text-base text-xs font-medium ">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      )}
    </Form>
  );
}
