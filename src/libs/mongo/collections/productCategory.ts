import BaseCollection from "../baseCollection";
import { ICategory } from "@/models/ICategory";
import { Filter, ObjectId, UpdateFilter } from "mongodb";

class ProductCategoryCollection extends BaseCollection<ICategory> {
  constructor() {
    super("ProductCategories");
  }

  all = async () => {
    const categories = await this.collection.find().toArray();
    return categories.map((x) => ({ ...x, categoryId: x._id.toHexString(), _id: undefined }));
  };

  findOne = async (id: ObjectId) => {
    const query: Filter<ICategory> = { _id: id };
    const category = await this.collection.findOne(query);
    if (category) return { ...category, categoryId: category._id.toHexString(), _id: undefined };
    else return undefined;
  };

  insert = async (item: ICategory) => {
    const result = await this.collection.insertOne(item);
    return result;
  };

  insertMany = async (items: Array<ICategory>) => {
    await this.collection.insertMany(items);
  };

  update = async (id: ObjectId, item: ICategory) => {
    const query: Filter<ICategory> = { _id: id };
    const updateQuery: UpdateFilter<ICategory> = { $set: { name: item.name, imageUrl: item.imageUrl } };
    const result = await this.collection.updateOne(query, updateQuery);
    return result;
  };

  delete = async (id: ObjectId) => {
    const query: Filter<ICategory> = { _id: id };
    const result = await this.collection.deleteOne(query);
    return result;
  };
}

export default ProductCategoryCollection;
