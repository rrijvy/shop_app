"use client";

import { MouseEvent, useEffect, useState } from "react";
import { IProduct } from "@/models/IProduct";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { serialize } from "object-to-formdata";
import Checkbox from "@/components/ui/checkbox";
import Modal from "@/components/ui/modal";
import FormInput from "@/components/formInput";

const ProductsPage = () => {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [selectedProduct, selectProduct] = useState<IProduct>();
  const [showCreateDialog, setCreateDialogStatus] = useState<boolean>(false);
  useEffect(() => {
    fetch("http://localhost:3000/api/products", { method: "get" })
      .then((res) => res.json())
      .then((obj) => setProducts(obj));
  }, []);
  const openCreateItemDialog = (): void => {
    setCreateDialogStatus(true);
  };
  const createClickHandler = () => {
    selectProduct(undefined);
    openCreateItemDialog();
  };
  const updateItem = (product: IProduct) => {
    selectProduct(product);
    openCreateItemDialog();
  };
  const deleteItem = (productId?: string) => {
    if (!productId) return;
    fetch(`http://localhost:3000/api/product-categories/${productId}`, {
      method: "delete",
    }).then((res) => {
      if (res.ok) setProducts(products.filter((x) => x.productId !== productId));
    });
  };
  const submitForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedProduct?.productId) {
      const formData = serialize(selectedProduct, { indices: true, nullsAsUndefineds: true });
      fetch(`http://localhost:3000/api/products/${selectedProduct.productId}`, {
        method: "put",
        body: formData,
      })
        .then((res) => {
          if (res.ok) return res.text();
        })
        .then((text) => {
          if (text) {
            const updateCategory = JSON.parse(text) as unknown as IProduct;
            setCreateDialogStatus(false);
            setProducts(products.map((x) => (x.productId === updateCategory.productId ? updateCategory : x)));
            return updateCategory;
          }
        });
    } else {
      const formData = serialize(selectedProduct, { indices: true, nullsAsUndefineds: true });
      fetch("http://localhost:3000/api/products", {
        method: "post",
        body: formData,
      })
        .then((res) => {
          if (res.ok) return res.text();
        })
        .then((text) => {
          if (text) {
            const newProduct = JSON.parse(text) as unknown as IProduct;
            setCreateDialogStatus(false);
            setProducts([...products, newProduct]);
            return newProduct;
          }
        });
    }
  };
  return (
    <div className="container">
      <table className="table-auto border-separate border border-slate-500">
        <caption className="text-lg font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          <div className="py-2 flex items-center justify-between">
            <p>Product Categories</p>
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={createClickHandler}
            >
              Create
            </button>
          </div>
        </caption>
        <thead>
          <tr>
            <th className="border border-slate-600 px-2 py-1"></th>
            <th className="border border-slate-600 px-2 py-1">Id</th>
            <th className="border border-slate-600 px-2 py-1">Name</th>
            <th className="border border-slate-600 px-2 py-1">Product Code</th>
            <th className="border border-slate-600 px-2 py-1">Price</th>
            <th className="border border-slate-600 px-2 py-1">Image Src</th>
            <th className="border border-slate-600 px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td className="border border-slate-600 p-2">
                <div className="flex items-center">
                  <Checkbox />
                </div>
              </td>
              <td className="border border-slate-600 p-2">{product.productId}</td>
              <td className="border border-slate-600 p-2">{product.name}</td>
              <td className="border border-slate-600 p-2">{product.productCode}</td>
              <td className="border border-slate-600 p-2">{product.price}</td>
              <td className="border border-slate-600 p-2">{product.imageSrc}</td>
              <td className="border border-slate-600 p-2">
                <FontAwesomeIcon
                  className="inline-block cursor-pointer hover:text-blue-800"
                  icon={faPenToSquare}
                  width={40}
                  onClick={() => updateItem(product)}
                />
                <FontAwesomeIcon
                  className="inline-block cursor-pointer hover:text-blue-800"
                  icon={faTrashCan}
                  width={40}
                  onClick={() => deleteItem(product.productId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal key={selectedProduct?.productId} show={showCreateDialog} onClose={() => setCreateDialogStatus(false)} title="">
        <form className="max-w-md mx-auto">
          <FormInput
            label="Id"
            type="text"
            placeholder="Auto Generated"
            value={selectedProduct?.productId}
            onChange={() => {}}
            disabled
            readonly
          />
          <FormInput
            label="Name"
            type="text"
            placeholder="Name"
            value={selectedProduct?.name}
            onChange={(e) => selectProduct({ ...selectedProduct, name: e.target.value })}
          />
          <FormInput
            label="Product Code"
            type="text"
            placeholder="Product Code"
            value={selectedProduct?.productCode}
            onChange={(e) => selectProduct({ ...selectedProduct, productCode: e.target.value })}
          />
          <FormInput
            label="Price"
            type="text"
            placeholder="Price"
            value={selectedProduct?.price}
            onChange={(e) => selectProduct({ ...selectedProduct, price: e.target.value })}
          />
          <FormInput
            label="Image"
            type="file"
            placeholder="Image"
            onChange={(e) => selectProduct({ ...selectedProduct, image: e.target.files?.[0] })}
          />
          <div className="w-full px-3 mb-6">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={submitForm}
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductsPage;
