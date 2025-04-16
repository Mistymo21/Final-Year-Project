"use client";
// import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StudentData = {
  id: string;
  name: string;
  matric_no: string;
  faculty: string;
  department: string;
};

export const columns: ColumnDef<StudentData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "matric_no",
    header: " Matric_no",
  },
  {
    accessorKey: "faculty",
    header: "Faculty",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
];
