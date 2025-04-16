import connect from "@/database/db";
import { Staff, Student } from "@/lib/models";

export const fetchStudentsData = async (q) => {
  const regex = new RegExp(q || "", "i");

  try {
    await connect();
    const student = await Student.find({
      $or: [{ firstName: { $regex: regex } }, { matric_no: { $regex: regex } }],
    });

    return student;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch students data");
  }
};

export const fetchStaffData = async (q) => {
  const regex = new RegExp(q);

  try {
    await connect();
    const staff = await Staff.find({
      $or: [{ staffId: { $regex: regex }}, {unit: {$regex: regex}}]
    });
    return staff;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch staff data");
  }
};
