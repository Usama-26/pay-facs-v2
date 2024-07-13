import { cn } from "@/utils/generics";
import styles from "./table.module.css";
export default function SimpleTable({ headers, children }) {
  return (
    <div className=" flow-root">
      <div
        className={cn(
          "-mx-2 sm:-mx-4 lg:-mx-6 min-h-96 table-scrollbar overflow-auto border rounded-md",
          styles["table-height"]
        )}
      >
        <table className="min-w-full divide-gray-300">
          <thead className="sticky top-0 shadow-sm shadow-gray-300 font-medium bg-gray-100 z-30">
            <tr className="py-2">
              <th scope="col" className="whitespace-nowrap py-3.5 px-3 ">
                #
              </th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="whitespace-nowrap py-3.5 px-3 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
