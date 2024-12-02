import db from "./db.js";

export default async function maxHopeFuelID() {
  const maxHopeFuelIdQuery = `SELECT MAX(HopeFuelID) AS maxHopeFuelID FROM Transactions`;
  const result = await db(maxHopeFuelIdQuery);

  console.log(result);
  return result[0].maxHopeFuelID;
}
