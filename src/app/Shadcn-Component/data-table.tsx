// "use client";
// import { useState } from "react";
// import Modal from "../../components/ui/modal";

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/table";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   const [showApproveModalBtn, setShowApproveModalBtn] = useState(false);
//   // const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);

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
//       setShowApproveModalBtn(false);
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
//     setShowApproveModalBtn(true);
//   };

//   const handleRowClick = (row) => {
//     setSelectedRow(row);
//     setShowDetails(true);
//   };

//   if (showDetails) {
//     return (
//       <div className="p-4">
//         <h2 className="text-lg font-bold mb-4">Student Details</h2>
//         <p className="text-sm text-gray-500 mb-4">
//           {" "}
//           UNIT: {selectedRow.getValue("unit")}{" "}
//         </p>
//         <p className="text-sm text-gray-500 mb-4">
//           {" "}
//           STATUS: {selectedRow.getValue("status")}{" "}
//         </p>
//         <p className="text-sm text-gray-500 mb-4">
//           {" "}
//           REASON: {selectedRow.getValue("reason")}{" "}
//         </p>
//         <p className="text-sm text-gray-500 mb-4">
//           {" "}
//           NAME OF CLEARING OFFICER: {selectedRow.getValue("name")}{" "}
//         </p>
//         <p className="text-sm text-gray-500 mb-4">
//           {" "}
//           DATE:{" "}
//           {new Date(selectedRow.getValue("date")).toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//           })}{" "}
//         </p>

//         <div className="flex justify-end mt-4">
//           {selectedRow.getValue("status") !== "Cleared" && (
//             <>
//               <button
//                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
//                 onClick={handleApproveClick}>
//                 {" "}
//                 Upload Doc{" "}
//               </button>
//               <span className="w-2"></span>
//               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
//                 {" "}
//                 Submit{" "}
//               </button>
//             </>
//           )}
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             onClick={() => setShowDetails(false)}>
//             {" "}
//             Back to Table{" "}
//           </button>
//         </div>

//         {showApproveModalBtn && (
//           <Modal
//             key={selectedFile ? selectedFile.name : ""}
//             isOpen={showApproveModalBtn}
//             onClose={() => setShowApproveModalBtn(false)}>
//             <h2 className="text-lg font-bold mb-4">Upload Image</h2>
//             <p className="text-sm text-gray-500 mb-4">
//               Please upload the required image:
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
//              Submit
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
