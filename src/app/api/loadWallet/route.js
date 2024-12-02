// currency: [
//     {
//         id: "..",
//         name: "..."
//     }
// ]

export async function GET(request) {
  console.log(process.env.AIRTABLE_TOKEN);

  // get the wallet data base

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.AIRTABLE_TOKEN}`);
  // myHeaders.append("Cookie", "brw=brwb8tzTqMzSEOnxJ; AWSALB=9ZYiIiD0R1y3BfmkYAiHW3+nOoVCGqeDgFqmGShD1QeRLL3+wePNKkQdW0i2lKZDW+nBA28yxhXkzgZc2tIx+KJkdMEko/25dX+PH982RFbwXOaJCWaPd6d0l4bF; AWSALBCORS=9ZYiIiD0R1y3BfmkYAiHW3+nOoVCGqeDgFqmGShD1QeRLL3+wePNKkQdW0i2lKZDW+nBA28yxhXkzgZc2tIx+KJkdMEko/25dX+PH982RFbwXOaJCWaPd6d0l4bF");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "https://api.airtable.com/v0/appp80DDZ7FHxqCc1/tblzSjCNMeKe3OleA",
    requestOptions,
  );
  const json = await response.json();
  const { records } = json;
  const answer = {};
  for (let record = 0; record < records.length; record++) {
    const currency = records[record].fields.Currency;
    const wallet = records[record].fields.wallet_name;
    const { id } = records[record];

    // if this key is not, create one
    !Array.isArray(answer[currency]) && (answer[currency] = new Array());

    // push concering wallet to currency
    answer[currency].push({
      id,
      name: wallet,
    });
  }

  return Response.json(answer);
}
