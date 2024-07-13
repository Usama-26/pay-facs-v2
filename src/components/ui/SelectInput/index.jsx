import { useMemo } from "react";
import Selectbox from "../Selectbox";

export default function SelectInput({
  name,
  value,
  items,
  disabled,
  onChange,
  id,
  label,
  ...props
}) {
  const defaultIndex = useMemo(
    () =>
      items.findIndex(
        (item) => item.value.toLowerCase() === value?.value?.toLowerCase()
      ) || 0,
    [items, value]
  );
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <Selectbox
          name={name}
          id={id}
          {...props}
          defaultIndex={defaultIndex}
          items={items}
          disabled={disabled}
          onSelect={(selected) =>
            onChange({ target: { name: name, value: selected } })
          }
        />
      </div>
    </div>
  );
}
