import ProductCategoryCollection from "@/libs/mongo/collections/productCategory";
import { ICategory } from "@/models/ICategory";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { resolve } from "path";

export async function GET() {
  const collection = new ProductCategoryCollection();
  const productCategories = await collection.all();
  return NextResponse.json(productCategories);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const imageFile = formData.get("image") as unknown as File;
  let imagePath = "";
  if (imageFile) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    imagePath = resolve(process.cwd(), "public", "images", imageFile.name);
    await writeFile(imagePath, buffer);
  }
  const body: ICategory = {
    name: formData.get("name")?.toString(),
    imageUrl: `.${imagePath.split("public")[1]}`.replace(/\\/g, "/"),
  };
  const categoryCollection = new ProductCategoryCollection();
  const result = await categoryCollection.insert(body);
  const newCategory = await categoryCollection.findOne(result.insertedId);
  return new NextResponse(JSON.stringify(newCategory), { status: 201 });
}
