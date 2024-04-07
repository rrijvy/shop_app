import ProductCollection from "@/libs/mongo/collections/product";
import { IProduct } from "@/models/IProduct";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { resolve } from "path";

export async function GET() {
  const collection = new ProductCollection();
  const products = await collection.all();
  return NextResponse.json(products);
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
  const body: IProduct = {
    name: formData.get("name")?.toString(),
    productId: formData.get("productId")?.toString(),
    productCode: formData.get("productCode")?.toString(),
    price: formData.get("price")?.toString(),
    imageAlt: formData.get("imageAlt")?.toString(),
    imageSrc: `.${imagePath.split("public")[1]}`.replace(/\\/g, "/"),
    color: formData.get("color")?.toString(),
    href: formData.get("href")?.toString(),
  };
  const collection = new ProductCollection();
  const result = await collection.insert(body);
  const newProduct = await collection.findOne(result.insertedId);
  return new NextResponse(JSON.stringify(newProduct), { status: 201 });
}
