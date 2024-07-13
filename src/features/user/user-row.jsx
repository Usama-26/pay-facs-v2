import ContextMenu from "@/components/ContextMenu";

export default function UserRow({ user, index, onDelete, onView }) {
  const { _id, email, name, api_key } = user;

  return (
    <>
      <tr className="border-b bg-white">
        <td className="whitespace-nowrap p-3 text-center font-semibold">
          {index + 1}
        </td>
        <td className="whitespace-nowrap p-3">{name}</td>
        <td className="whitespace-nowrap p-3">{email}</td>
        <td className="whitespace-nowrap p-3">{api_key}</td>
        <td className="whitespace-nowrap p-3">
          <div className="inline-flex items-center gap-x-2">
            <ContextMenu
              onDelete={() => onDelete(_id)}
              onView={() => onView(_id)}
            />
          </div>
        </td>
      </tr>
    </>
  );
}
