import { NextResponse } from "next/server";
import db from "../../utilites/db";

async function InsertCustomer(
  customerName,
  customerEmail,
  agentId,
  manyChatId,
  contactLink
) {
  const query = `
    INSERT INTO Customer (Name, Email, AgentID, ManyChatID, ContactLink ) VALUES (?, ?, ?, ?, ?)
    `;
  const values = [
    customerName,
    customerEmail,
    agentId,
    manyChatId,
    contactLink,
  ];
  try {
    const result = await db(query, values);
    // console.log("Result: ", result);
    return result.insertId; // Retrieve the inserted customer ID
  } catch (error) {
    console.error("Error inserting customer:", error);
    return NextResponse.json(
      { error: "Failed to insert customer" },
      { status: 500 }
    );
  }
}
async function createNote(note, agentID) {
  const query = `insert into Note (Note, Date, AgentID) values ( ?, ?, ?)`;
  const values = [note, new Date(), agentID];
  try {
    const result = await db(query, values);
    // console.log("Result: ", result);
    return result.insertId;
  } catch (error) {
    console.error("Error inserting customer:", error);
    return NextResponse.json(
      { error: "Failed to insert customer" },
      { status: 500 }
    );
  }
}

async function createScreenShot(screenShot,transactionsID) {
  console.log(transactionsID +  "  " + screenShot)

  let screenShotLink = await screenShot.map(async (item) => {
    const query = `insert into ScreenShot (TransactionID , ScreenShotLink) values ( ?, ?)`;
    
    const path = String(item.url).substring(0,String(item.url).indexOf('?'))
    const values = [transactionsID, path];

    try {
      const result = await db(query, values);
      console.log("result " + result)
      // console.log("Result: ", result);
      return result.insertId;
    } catch (error) {
      console.error("Error inserting ScreenShot:", error);
      return 
    }
  })
  return screenShotLink
  // return screenShotLink;
}
export async function POST(req) {
  try {
    let json = await req.json();

    const {
      customerName,
      customerEmail,
      agentId,
      supportRegionId,
      manyChatId,
      contactLink,
      amount,
      month,
      note,
      walletId,
      screenShot,
    } = json;

    if (!screenShot) {
      return NextResponse.json(
        { error: "You need to provide a screenshot" },
        { status: 400 }
      );
    }
    const customerId = await InsertCustomer(
      customerName,
      customerEmail,
      agentId,
      manyChatId,
      contactLink
    );
    console.log("customerId: ", customerId);

    const noteId = await createNote(note, agentId);
    console.log("noteId: ", noteId);

    const query = `
     INSERT INTO Transactions   
    (CustomerID, Amount, AgentID, SupportRegionID, WalletID, TransactionDate, NoteID, Month) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)

    `;
    const values = [
      customerId,
      amount,
      agentId,
      supportRegionId,
      walletId,
      new Date(),
      noteId,
      month,
    ];
    const result = await db(query, values);

    const transactionId = result.insertId;
    console.log("Transaction ID " + transactionId)

    const screenShotIds = await createScreenShot(screenShot, transactionId)
    // console.log("Screenshot ids are: " + screenShotIds)
    // console.log("Result: ", result);
    return Response.json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
}