import ContextMenu from "@/components/ContextMenu";

export default function OrderRow({ order, index, onDelete, onView }) {
  const { amount, api_key, _id } = order;

  return (
    <>
      <tr className="border-b bg-white">
        <td className="whitespace-nowrap p-3 text-center font-medium">
          {index + 1}
        </td>
        <td className="whitespace-nowrap p-3 w-full">{api_key}</td>
        <td className="whitespace-nowrap p-3 font-semibold">{`$ ${amount}`}</td>
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
