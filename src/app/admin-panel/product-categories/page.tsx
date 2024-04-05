"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICategory } from "@/models/ICategory";
import Modal from "@/components/ui/modal";

const ProductCategoriesPage = () => {
  const [productCategories, setProductCategories] = useState<Array<ICategory>>([]);
  const [selectedProductCategory, selectProductCategory] = useState<ICategory>();
  const [showCreateDialog, setCreateDialogStatus] = useState<boolean>(false);
  useEffect(() => {
    fetch("http://localhost:3000/api/product-categories", { method: "get" })
      .then((res) => res.json())
      .then((obj) => setProductCategories(obj));
  }, []);
  const openCreateProductCategoryDialog = (): void => {
    setCreateDialogStatus(true);
  };
  const createProductCategoryClickHandler = () => {
    selectProductCategory(undefined);
    openCreateProductCategoryDialog();
  };
  const updateProductCategory = (category: ICategory) => {
    selectProductCategory(category);
    openCreateProductCategoryDialog();
  };
  const submitProductCategoryForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedProductCategory) return;
    if (selectedProductCategory.categoryId) {
      fetch(`http://localhost:3000/api/product-categories/${selectedProductCategory.categoryId}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedProductCategory),
      })
        .then((res) => {
          if (res.ok) return res.text();
        })
        .then((text) => {
          if (text) {
            const updateCategory = JSON.parse(text) as unknown as ICategory;
            setCreateDialogStatus(false);
            setProductCategories(productCategories.map((x) => (x.categoryId === updateCategory.categoryId ? updateCategory : x)));
            return updateCategory;
          }
        });
    } else {
      fetch("http://localhost:3000/api/product-categories", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedProductCategory),
      })
        .then((res) => {
          if (res.ok) return res.text();
        })
        .then((text) => {
          if (text) {
            const newCategory = JSON.parse(text) as unknown as ICategory;
            setCreateDialogStatus(false);
            setProductCategories([...productCategories, newCategory]);
            return newCategory;
          }
        });
    }
  };
  const deleteProductCategory = (categoryId?: string) => {
    if (!categoryId) return;
    fetch(`http://localhost:3000/api/product-categories/${categoryId}`, {
      method: "delete",
    }).then((res) => {
      if (res.ok) setProductCategories(productCategories.filter((x) => x.categoryId !== categoryId));
    });
  };
  return (
    <div className="container">
      <table className="table-auto border-separate border border-slate-500">
        <caption className="text-lg font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          <div className="py-2 flex items-center justify-between">
            <p>Product Categories</p>
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={createProductCategoryClickHandler}
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
            <th className="border border-slate-600 px-2 py-1">Image Url</th>
            <th className="border border-slate-600 px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productCategories.map((category) => (
            <tr key={category.categoryId}>
              <td className="border border-slate-600 p-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-800 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={true}
                  />
                </div>
              </td>
              <td className="border border-slate-600 p-2">{category.categoryId}</td>
              <td className="border border-slate-600 p-2">{category.name}</td>
              <td className="border border-slate-600 p-2">{category.imageUrl}</td>
              <td className="border border-slate-600 p-2">
                <FontAwesomeIcon
                  className="inline-block cursor-pointer hover:text-blue-800"
                  icon={faPenToSquare}
                  width={40}
                  onClick={() => updateProductCategory(category)}
                />
                <FontAwesomeIcon
                  className="inline-block cursor-pointer hover:text-blue-800"
                  icon={faTrashCan}
                  width={40}
                  onClick={() => deleteProductCategory(category.categoryId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal key={selectedProductCategory?.categoryId} show={showCreateDialog} onClose={() => setCreateDialogStatus(false)} title="">
        <form className="max-w-md mx-auto">
          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Id</label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Auto Generated"
              value={selectedProductCategory?.categoryId}
              disabled
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Name</label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Name"
              value={selectedProductCategory?.name}
              onChange={(e) => selectProductCategory({ ...selectedProductCategory, name: e.target.value })}
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Image</label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
              type="file"
              placeholder="Image"
            />
          </div>
          <div className="w-full px-3 mb-6">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={submitProductCategoryForm}
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductCategoriesPage;
