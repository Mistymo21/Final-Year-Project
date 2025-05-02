import connect from "@/database/db";
import { Staff, Student,  ClearanceSubmission } from "@/lib/models";


export const fetchStudentsData = async () => {
  const regex = new RegExp();

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



export const getClearanceSubmissions = async () => {
  await connect();
  try {
    const data = await  ClearanceSubmission.find({});
    return data;
    
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch clearance submissions");

    
  }
};