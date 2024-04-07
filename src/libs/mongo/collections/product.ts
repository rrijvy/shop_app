import BaseCollection from "../baseCollection";
import { IProduct } from "@/models/IProduct";
import { Filter, ObjectId, UpdateFilter } from "mongodb";

class ProductCollection extends BaseCollection<IProduct> {
  constructor() {
    super("Products");
  }

  all = async () => {
    const items = await this.collection.find().toArray();
    return items.map((x) => ({ ...x, categoryId: x._id.toHexString(), _id: undefined }));
  };

  findOne = async (id: ObjectId) => {
    const query: Filter<IProduct> = { _id: id };
    const item = await this.collection.findOne(query);
    if (item) return { ...item, categoryId: item._id.toHexString(), _id: undefined };
    else return undefined;
  };

  insert = async (item: IProduct) => {
    const result = await this.collection.insertOne(item);
    return result;
  };

  insertMany = async (items: Array<IProduct>) => {
    await this.collection.insertMany(items);
  };

  update = async (id: ObjectId, item: IProduct) => {
    const query: Filter<IProduct> = { _id: id };
    const updateQuery: UpdateFilter<IProduct> = {
      $set: {
        name: item.name,
        productCode: item.productCode,
        price: item.price,
        imageAlt: item.imageAlt,
        imageSrc: item.imageSrc,
        productId: item.productId,
        color: item.color,
        href: item.href,
      },
    };
    const result = await this.collection.updateOne(query, updateQuery);
    return result;
  };

  delete = async (id: ObjectId) => {
    const query: Filter<IProduct> = { _id: id };
    const result = await this.collection.deleteOne(query);
    return result;
  };
}

export default ProductCollection;
