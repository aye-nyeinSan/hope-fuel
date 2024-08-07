
import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";

function PaymentInfoCard({ payment, onAccept, onReject }) {
  return (
    <TableRow>
      <TableCell>{payment.id}</TableCell>
      <TableCell>{payment.name}</TableCell>
      <TableCell>{payment.email}</TableCell>
      <TableCell>{payment.supportRegion}</TableCell>
      <TableCell>{payment.amount}</TableCell>
      <TableCell>{payment.month}</TableCell>
      <TableCell>{payment.note}</TableCell>
      <TableCell>
        <a href={payment.screenshot} target="_blank" rel="noopener noreferrer">
          {" "}
          {payment.screenshot}
        </a>
      </TableCell>

      <TableCell>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={onAccept}
          sx={{ mr: 1, mb:1 }}
        >
          Accept
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={onReject}
        >
          Reject
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default PaymentInfoCard;
