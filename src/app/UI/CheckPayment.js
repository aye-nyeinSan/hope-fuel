import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PaymentInfoCard from "../../components/PaymentInfoCard";

function CheckPayment({checkStatus}) {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/checkPaymentStatus?paymentCheckStatus=${checkStatus}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const transformedData = data.map((transaction) => ({
          id: 1, // Use the correct ID field
          name: transaction.Name,
          email: transaction.Email,
          supportRegion: transaction.Region,
          amount: transaction.Amount,
          month: transaction.Month,
          note: transaction.Note,
          screenshot: transaction.Screenshot
            ? transaction.Screenshot.split(",")
            : [],
        }));

        setPaymentData(transformedData);
      } catch (error) {
        console.error("Error fetching payment check status", error);
      }
    };

    fetchData();
  }, [checkStatus]);

  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="Payment Info Table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Support Region</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Screenshot</TableCell>
            <TableCell>Actions</TableCell>
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
