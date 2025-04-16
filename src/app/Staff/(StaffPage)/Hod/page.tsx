
import StudentTable from "@/components/ui/studentTable/studentTable";
import React from "react";

const data = [
  {
    id: 1,
    firstName: "sakib",
    lastName: "khan",
    email: "sakib@gmail.com",
    department: "cse",
    faculty: "cse",
  },
];
const page = () => {
  return (
    <div>
      <StudentTable data={data} />
    </div>
  );
};

export default page;
