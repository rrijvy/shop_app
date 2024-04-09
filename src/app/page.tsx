import MenuItem from "@/components/menuItem";
import NavigatonBar from "@/components/navigatonBar";
import { HttpClient } from "@/libs/utils/httpClient";
import { ICategory } from "@/models/ICategory";

export default async function Home() {
  const productCategoriesReponse = await HttpClient.get<Array<ICategory>>("http://localhost:3000/api/product-categories", {
    method: "get",
  });
  return (
    <>
      <NavigatonBar />
      <div className="homepage">
        <div className="directory-menu">
          {productCategoriesReponse.response?.map((category) => (
            <MenuItem key={category.categoryId} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}
