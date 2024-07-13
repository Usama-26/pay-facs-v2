import { XMarkIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/Modal";
import InputField from "@/components/Forms/InputField";
import SelectInput from "@/components/ui/SelectInput";
import { Field, Form, Formik } from "formik";
import useSignup from "@/features/user/useSignup";
import toast from "react-hot-toast";
import { queryClient } from "@/pages/_app";
import SpinnerMini from "@/components/ui/SpinnerMini";

export default function AddUser({ isOpen, setIsOpen }) {
  const { signupUser, isSigningUp } = useSignup();

  const initialValues = {
    name: "",
    email: "",
    role: { value: "user" },
    api_key: "",
  };

  function closeModal() {
    setIsOpen(false);
  }

  const handleSignup = (values) => {
    const data = { ...values, role: values.role.value };

    signupUser(data, {
      onSuccess: () => {
        toast.success("New User Created Successfully");
        closeModal();
        queryClient.invalidateQueries({ queryKey: ["users", "all"] });
      },
    });
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Add New User</h3>
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        <Formik
          onSubmit={handleSignup}
          enableReinitialize={true}
          initialValues={initialValues}
        >
          <AddUserForm isSubmitting={isSigningUp} onCancel={closeModal} />
        </Formik>
      </div>
    </Modal>
  );
}

function AddUserForm({ onCancel, isSubmitting }) {
  return (
    <Form className="grid grid-cols-2 gap-x-4 gap-y-2">
      <Field id={"name"} name={"name"} label={"User Name"} as={InputField} />
      <Field
        id={"email"}
        name={"email"}
        label={"User Email Address"}
        as={InputField}
      />
      <Field
        id={"password"}
        name={"password"}
        label={"Password"}
        as={InputField}
        // type="password"
      />
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
      <div className="col-span-2">
        <Field
          id={"api_key"}
          name={"api_key"}
          label={"API Key"}
          as={InputField}
        />
      </div>
      <div className=" col-span-2 flex justify-end  gap-x-4 mt-4 text-end md:text-base text-xs font-medium ">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-300 w-24"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 disabled:cursor-not-allowed w-28 flex justify-center items-center"
        >
          {isSubmitting ? <SpinnerMini /> : "Add User"}
        </button>
      </div>
    </Form>
  );
}
