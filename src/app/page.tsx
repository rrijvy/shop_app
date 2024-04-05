import MenuItem from "@/components/menuItem";
import NavigatonBar from "@/components/navigatonBar";
import ProductCategoryCollection from "@/libs/mongo/collections/productCategory";

export default async function Home() {
  const categoryCollection = new ProductCategoryCollection();
  const productCategories = await categoryCollection.all();

  return (
    <>
      <NavigatonBar />
      <div className="homepage">
        <div className="directory-menu">
          {productCategories.map((category) => (
            <MenuItem key={category.categoryId} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}
