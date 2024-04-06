import ProductCategoryCollection from "@/libs/mongo/collections/productCategory";
import { ICategory } from "@/models/ICategory";
import { resolve } from "path";
import { writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

type Param = {
  params: { id: string };
};

export async function GET(request: Request, param: Param) {
  const categoryCollection = new ProductCategoryCollection();
  const productCategory = await categoryCollection.findOne(new ObjectId(param.params.id));
  return NextResponse.json(productCategory);
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
  const body: ICategory = {
    name: formData.get("name")?.toString(),
    imageUrl: `.${imagePath.split("public")[1]}`.replace(/\\/g, "/"),
  };
  const categoryCollection = new ProductCategoryCollection();
  const result = await categoryCollection.update(new ObjectId(param.params.id), body);
  if (result.modifiedCount > 0) {
    const productCategory = await categoryCollection.findOne(new ObjectId(param.params.id));
    return new NextResponse(JSON.stringify(productCategory), { status: 200 });
  }
  return new NextResponse(null, { status: 400 });
}

export async function DELETE(request: Request, param: Param) {
  const categoryCollection = new ProductCategoryCollection();
  const result = await categoryCollection.delete(new ObjectId(param.params.id));
  if (result.deletedCount > 0) {
    return new NextResponse(null, { status: 204 });
  }
  return new NextResponse(null, { status: 400 });
}
