import ProductCategoryCollection from "@/libs/mongo/collections/productCategory";
import { ICategory } from "@/models/ICategory";
import { NextResponse } from "next/server";

export async function GET() {
  const categoryCollection = new ProductCategoryCollection();
  const productCategories = await categoryCollection.all();
  return NextResponse.json(productCategories);
}

export async function POST(request: Request) {
  const body = (await request.json()) as unknown as ICategory;
  const categoryCollection = new ProductCategoryCollection();
  const result = await categoryCollection.insert(body);
  const newCategory = await categoryCollection.findOne(result.insertedId);
  return new NextResponse(JSON.stringify(newCategory), { status: 201 });
}
