import { BSON, Collection } from "mongodb";
import DBClient from ".";

abstract class BaseCollection<T extends BSON.Document> {
  constructor(collectionName: string) {
    this.collection = DBClient.collection(collectionName);
  }

  collection: Collection<T>;

  abstract all: () => Promise<Array<T>>;
}

export default BaseCollection;
