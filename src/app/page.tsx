import MenuItem from "@/components/menuItem";
import NavigatonBar from "@/components/navigatonBar";
import { ICategory } from "@/models/ICategory";

export default function Home() {
  const productCategories: Array<ICategory> = [
    { categoryId: "1", name: "Shirt" },
    { categoryId: "2", name: "Pant" },
    { categoryId: "3", name: "T-Shirt" },
    { categoryId: "4", name: "Panjabi" },
  ];

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
