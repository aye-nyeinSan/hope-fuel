import { NextResponse } from "next/server";

import moment from "moment-timezone";
import db from "../../utilites/db";
import calculateExpireDate from "../../utilites/calculateExpireDate";
// Insert Into Customer Table
async function InsertCustomer(
  customerName,
  customerEmail,
  agentId,
  manyChatId,
  contactLink,
  month,
) {
  const currentDay = new Date();
  const nextExpireDate = calculateExpireDate(currentDay, month, true);
  const query = `
    INSERT INTO Customer (Name, Email, AgentID, ManyChatID, ContactLink, ExpireDate ) VALUES (?, ?, ?, ?, ?, ?)
    `;
  const values = [
    customerName,
    customerEmail,
    agentId,
    manyChatId,
    contactLink,
    nextExpireDate,
  ];
  try {
    const result = await db(query, values);
    // console.log("Result: ", result);
    return result.insertId; // Retrieve the inserted customer ID
  } catch (error) {
    console.error("Error inserting customer:", error);
    return NextResponse.json(
      { error: "Failed to insert customer" },
      { status: 500 },
    );
  }
}

// Insert Into Note Table
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
      { status: 500 },
    );
  }
}

// Insert Into ScreenShot Table
async function createScreenShot(screenShot, transactionsID) {
  if (!screenShot || screenShot.length === 0) {
    throw new Error("You need to provide a screenshot");
  }

  console.log(
    `From createScreenshotDB: with TransactionID${
      transactionsID
    } and  screenshot${screenShot}`,
  );

  const screenShotLink = screenShot.map(async (item) => {
    const query = `insert into ScreenShot (TransactionID , ScreenShotLink) values ( ?, ?)`;

    const path = String(item.url).substring(0, String(item.url).indexOf("?"));
    const values = [transactionsID, path];

    try {
      const result = await db(query, values);

      return result.insertId;
    } catch (error) {
      console.error("Error inserting screenshot:", error);
      throw new Error("Failed to insert screenshot");
    }
  });
  return screenShotLink;
}

// Insert Into TransactionAgent Table
async function InsertTransactionLog(transactionId, agentId) {
  const query = `INSERT INTO TransactionAgent(TransactionID, AgentID, LogDate) VALUES (?, ?, ?)`;
  const values = [transactionId, agentId, new Date()];
  try {
    const result = await db(query, values);
    console.log(`result ${result}`);
    return result.insertId;
  } catch (error) {
    console.error("Error inserting log", error);
  }
}
async function InsertFormStatus(transactionId) {
  const query = `INSERT INTO FormStatus (TransactionID, TransactionStatusID) VALUES (?, ?)`;
  const values = [transactionId, 1];
  try {
    const result = await db(query, values);
    console.log(`result ${result}`);
    return result.insertId;
  } catch (error) {
    console.error("Error inserting log", error);
  }
}

async function maxHopeFuelID() {
  const maxHopeFuelIdQuery = `SELECT MAX(HopeFuelID) AS maxHopeFuelID FROM Transactions`;
  const result = await db(maxHopeFuelIdQuery);

  console.log(result);
  return result[0].maxHopeFuelID;
}

export async function POST(req) {
  try {
    if (!req.body) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 },
      );
    }
    const json = await req.json();
    console.log(json);

    let {
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

    month = parseInt(month);

    if (!screenShot || screenShot.length === 0) {
      return NextResponse.json(
        { error: "You need to provide a screenshot" },
        { status: 400 },
      );
    }

    if (contactLink.trim() === "") {
      contactLink = null;
    }

    let noteId = null;
    if (note && note !== "") {
      noteId = await createNote(note, agentId);
      console.log("noteId: ", noteId);
    }

    const customerId = await InsertCustomer(
      customerName,
      customerEmail,
      agentId,
      manyChatId,
      contactLink,
      month,
    );

    let nextHopeFuelID = await maxHopeFuelID();
    console.log("nextHopeFuelID", nextHopeFuelID);

    if (nextHopeFuelID === null) {
      nextHopeFuelID = 0;
    }
    nextHopeFuelID++;
    console.log("Incremented maxHopeFuelID:", nextHopeFuelID);
    const timeZone = "Asia/Bangkok";
    const transactionDateWithThailandTimeZone = moment()
      .tz(timeZone)
      .format("YYYY-MM-DD HH:mm:ss");

    // insert into transaction table
    const query = `
     INSERT INTO Transactions   
    (CustomerID, Amount,  SupportRegionID, WalletID, TransactionDate, NoteID, Month,HopeFuelID) 
      VALUES (?, ?, ?, ?,  ? , ?, ?, ?)

    `;
    const values = [
      customerId,
      amount,
      supportRegionId,
      walletId,
      transactionDateWithThailandTimeZone,
      noteId,
      month,
      nextHopeFuelID,
    ];
    const result = await db(query, values);

    const transactionId = result.insertId;
    // console.log("Transaction ID " + transactionId);
    const formStatusId = await InsertFormStatus(transactionId);

    const screenShotIds = await createScreenShot(screenShot, transactionId);
    const logId = await InsertTransactionLog(transactionId, agentId);
    // console.log("Screenshot ids are: " + screenShotIds)
    console.log("Transaction Result: ", result);
    return NextResponse.json({
      status: "success",
      transactionId,
      screenShotIds,
      formStatusId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
