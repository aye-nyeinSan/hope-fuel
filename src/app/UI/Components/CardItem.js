import { Typography, Card } from "@mui/material";

function CardItem({ date, amount, currency }) {
  return (
    <Card sx={{ width: 200, padding: 2 }}>
      <Typography>{date}</Typography>
      <Typography>
        {amount} {currency}
      </Typography>
    </Card>
  );
}

export default CardItem;
