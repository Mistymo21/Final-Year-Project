// "use client";
// import { useState } from "react";
// import Modal from "../../components/ui/modal";

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";


// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

// export function StudentDataTable<TData, TValue>({
//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   const [showApproveModal, setShowApproveModal] = useState(false);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file.size <= 10 * 1024 * 1024) {
//       // 10MB
//       setSelectedFile(file);
//     } else {
//       alert("File size exceeds 10MB");
//     }
//   };

//   const handleApprove = (file) => {
//     if (file) {
//       // Send the file to your server or perform any other action
//       console.log("File approved:", file);
//       alert("Uploaded successfully");
//       setShowApproveModal(false);
//     } else {
//       alert("Please select a file");
//     }
//   };

//   const formatFileSize = (size) => {
//     if (size < 1024) {
//       return `${size} bytes`;
//     } else if (size < 1024 * 1024) {
//       return `${(size / 1024).toFixed(2)} KB`;
//     } else {
//       return `${(size / (1024 * 1024)).toFixed(2)} MB`;
//     }
//   };

//   const handleApproveClick = () => {
//     setShowApproveModal(true);
//   };

//   const handleRejectClick = () => {
//     setShowRejectModal(true);
//   };

//   // const handleModalClose = () => {
//   //   setShowApproveModal(false);
//   //   setShowRejectModal(false);
//   // };

//   const handleRowClick = (row) => {
//     setSelectedRow(row);
//     setShowDetails(true);
//   };
//   const handleReject = (reason) => {
//     console.log("Rejected with reason:", reason);
//     // Add your rejection logic here
//     alert("Sent");
//     setShowRejectModal(false);
//   };

//   if (showDetails) {
//     return (
//       <div className="p-4">
//         <h2 className="text-lg font-bold mb-4">Student Details</h2>
//         <p className="text-sm text-gray-500 mb-4">
//           {" "}
//           Name: {selectedRow.getValue("name")}{" "}
//         </p>
//         <p className="text-sm text-gray-500 mb-4">
//           {" "}
//           Matric_no: {selectedRow.getValue("matric_no")}{" "}
//         </p>
//         <p className="text-sm text-gray-500 mb-4">
//           {" "}
//           Faculty: {selectedRow.getValue("faculty")}{" "}
//         </p>
//         <p className="text-sm text-gray-500 mb-4">
//           {" "}
//           Department: {selectedRow.getValue("department")}{" "}
//         </p>
//         <div className="flex justify-end mt-4">
//           <button
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
//             onClick={handleApproveClick}>
//             Approve
//           </button>
//           <span className="w-2"></span>
//           <button
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
//             onClick={handleRejectClick}>
//             Reject
//           </button>
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             onClick={() => setShowDetails(false)}>
//             Back to Table
//           </button>
//         </div>

//         {showApproveModal && (
//           <Modal
//             key={selectedFile ? selectedFile.name : ""}
//             isOpen={showApproveModal}
//             onClose={() => setShowApproveModal(false)}>
//             <h2 className="text-lg font-bold mb-4">Approve Student</h2>
//             <p className="text-sm text-gray-500 mb-4">
//               Please upload Signature to approve this student:
//             </p>
//             <input type="file" onChange={(e) => handleFileChange(e)} />
//             {selectedFile && (
//               <div className="relative">
//                 <p className="text-sm text-gray-500 mb-4">
//                   Selected file: {selectedFile.name} (
//                   {formatFileSize(selectedFile.size)})
//                 </p>
//                 {typeof window !== "undefined" && (
//                   <div className="relative">
//                     <button
//                       className="absolute top-0 right-[400] p-1 text-red-500 hover:text-red-700 z-10"
//                       onClick={() => setSelectedFile(null)}>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                         />
//                       </svg>
//                     </button>
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       alt="Uploaded Image"
//                       width="200"
//                       height="200"
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//             <button
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
//               onClick={() => handleApprove(selectedFile)}>
//               Approve
//             </button>
//           </Modal>
//         )}

//         {showRejectModal && (
//           <Modal
//             isOpen={showRejectModal}
//             onClose={() => setShowRejectModal(false)}>
//             <h2 className="text-lg font-bold mb-4">Reject Student</h2>
//             <p className="text-sm text-gray-500 mb-4">
//               Please provide a reason for rejection:
//             </p>
//             <textarea
//               className="w-full p-2 mb-4 border border-gray-300 rounded"
//               rows={5}
//               placeholder="Enter reason for rejection"
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//             />
//             <button
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//               onClick={() => handleReject(rejectReason)}>
//               Reject
//             </button>
//           </Modal>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//                 onClick={() => handleRowClick(row)}>
//                 {row.getVisibleCells().map((cell) => {
//                   return (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }








