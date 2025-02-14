import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { sales, inventory } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity, unitPrice, customerInfo } = body;

    const totalAmount = (parseFloat(quantity) * parseFloat(unitPrice)).toString();

    const newSale = await db.insert(sales).values({
      productId: parseInt(productId),
      quantity: quantity.toString(),
      unitPrice: unitPrice.toString(),
      totalAmount,
      customerInfo,
      saleDate: new Date()
    }).returning();

 
    await db.transaction(async (tx) => {
      const product = await tx.select().from(inventory).where(eq(inventory.id, parseInt(productId)));
      if (product.length > 0) {
        const newQuantity = parseFloat(product[0].quantity.toString()) - parseFloat(quantity);
        await tx.update(inventory)
          .set({ quantity: newQuantity.toString() })
          .where(eq(inventory.id, parseInt(productId)));
      }
    });

    return NextResponse.json(newSale[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating sale record" },
      { status: 500 }
    );
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (productId) {
      const salesByProduct = await db.select()
        .from(sales)
        .where(eq(sales.productId, parseInt(productId)));
      return NextResponse.json(salesByProduct);
    }

    const allSales = await db.select().from(sales);
    return NextResponse.json(allSales);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching sales records" },
      { status: 500 }
    );
  }
}


