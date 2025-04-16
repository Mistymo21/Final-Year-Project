"use client";

import { ColumnDef } from "@tanstack/react-table";
// import DateCell from "../../components/ui/dateCell"
import dayjs from "dayjs";

export type Student = {
  id: string;
  unit: string;
  status: "Cleared" | "Not cleared" | "Pending";
  reason: string;
  name: string;
  signature: string;
  date: string;
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "unit",
    header: "UNIT",
  },
  {
    accessorKey: "name",
    header: "NAME OF CLEARING OFFICER",
  },
  {
    accessorKey: "signature",
    header: "SIGNATURE",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ getValue }) => {
      const value = getValue();
      if (typeof value === "string") {
        return (
          <span
            className={`${
              value === "Cleared"
                ? "bg-green-200"
                : value === "Pending"
                ? "bg-yellow-200"
                : "bg-red-200"
            } py-1 px-2 rounded`}>
            {value}
          </span>
        );
      } else {
        return null;
      }
    },
  },

  {
    accessorKey: "reason",
    header: "REASON",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      const value = getValue();
      // Ensure the value is a string before passing it to dayjs
      const date = dayjs(value as string);
      const now = dayjs();
      const diff = now.diff(date, "day");
      if (diff === 0) {
        return "Today";
      } else if (diff === 1) {
        return "Yesterday";
      } else {
        return `${date.format("DD/MM/YYYY")} `;
      }
    },
  },
];
