"use client";
import { useEffect, useState } from "react";
import StudentTable from "@/components/ui/studentTable/studentTable";

const StaffPage = () => {
  const [staffUnit, setStaffUnit] = useState("");

  useEffect(() => {
    const staffData = localStorage.getItem("staff");
    if (staffData) {
      const staff = JSON.parse(staffData);
      setStaffUnit(staff.unit); // Example: "Faculty Officer"
    }
  }, []);

  return (
    <>
      {staffUnit && <StudentTable staffUnit={staffUnit} />}
    </>
  );
};

export default StaffPage;