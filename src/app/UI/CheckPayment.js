

// CheckPayment.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import PaymentInfoCard from "../../components/PaymentInfoCard";

// Sample data to populate the table
const paymentData = [
  {
    id: 1,
    name: "John Doe",
    email: "abc@gmail.com",
    supportRegion: "Yangon",
    amount: "$100",
    month: "2",
    note: "OK",
    screenshot: "https://your-bucket-name.s3.amazonaws.com/path/to/image.png",
  },
  {
    id: 2,
    name: "bb",
    email: "bb@gmail.com",
    supportRegion: "Yangon",
    amount: "$200",
    month: "2",
    note: "This payment is for the month of February",
    screenshot: [
      "https://your-bucket-name.s3.amazonaws.com/path/to/image1.png",
      "https://your-bucket-name.s3.amazonaws.com/path/to/image2.png",
    ],
  },
  // Add more data as needed
];

function CheckPayment({ onAccept, onReject }) {
  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="Payment Info Table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>SupportRegion</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Screenshot</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentData.map((payment) => (
            <PaymentInfoCard
              key={payment.id}
              payment={payment}
              onAccept={() => onAccept(payment.id)}
              onReject={() => onReject(payment.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CheckPayment;
