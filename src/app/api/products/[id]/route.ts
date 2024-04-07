import { resolve } from "path";
import { writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import ProductCollection from "@/libs/mongo/collections/product";
import { IProduct } from "@/models/IProduct";

type Param = {
  params: { id: string };
};

export async function GET(request: Request, param: Param) {
  const collection = new ProductCollection();
  const products = await collection.findOne(new ObjectId(param.params.id));
  return NextResponse.json(products);
}

export async function PUT(request: Request, param: Param) {
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
  const result = await collection.update(new ObjectId(param.params.id), body);
  if (result.modifiedCount > 0) {
    const product = await collection.findOne(new ObjectId(param.params.id));
    return new NextResponse(JSON.stringify(product), { status: 200 });
  }
  return new NextResponse(null, { status: 400 });
}

export async function DELETE(request: Request, param: Param) {
  const collection = new ProductCollection();
  const result = await collection.delete(new ObjectId(param.params.id));
  if (result.deletedCount > 0) {
    return new NextResponse(null, { status: 204 });
  }
  return new NextResponse(null, { status: 400 });
}
