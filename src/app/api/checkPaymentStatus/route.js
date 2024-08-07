import { NextResponse } from "next/server";
import db from "../../utilites/db";

async function checkPaymentStatus(status) {
  const query = `SELECT 
    c.Name,           
    c.Email,           
    sr.Region,          
    t.Amount,           
    t.Month,            
    n.Note,            
    t.Screenshot        
FROM 
    Transactions t
JOIN 
    Customer c ON t.CustomerID = c.CustomerID
JOIN 
    SupportRegion sr ON t.SupportRegionID = sr.SupportRegionID
JOIN 
    Note n ON t.NoteID = n.NoteID
WHERE 
    t.PaymentCheck = ${status};`;
  const values = [status];
  try {
    const result = await db(query, values);
    // console.log("Result: ", result);
    return result;
  } catch (error) {
    console.error("Error getting paymentStatus:", error);
    return NextResponse.json(
      { error: "Failed to get paymentStatus" },
      { status: 500 }
    );
  }
}
export async function GET(req) {
 try {
   const url = new URL(req.url);
   const status= url.searchParams.get("paymentCheckStatus");
   const data = await checkPaymentStatus(status);
     
   return NextResponse.json(data);
 } catch (error) {
   console.error("[Error] Cannot get payment status", error);
   return NextResponse.json(
     { error: "Cannot get payment status" },
     { status: 500 }
   );
 }
}