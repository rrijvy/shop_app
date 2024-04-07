"use client";

import { MouseEvent, useEffect, useState } from "react";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICategory } from "@/models/ICategory";
import { serialize } from "object-to-formdata";
import Modal from "@/components/ui/modal";
import Checkbox from "@/components/ui/checkbox";
import FormInput from "@/components/formInput";

const ProductCategoriesPage = () => {
  const [productCategories, setProductCategories] = useState<Array<ICategory>>([]);
  const [selectedProductCategory, selectProductCategory] = useState<ICategory>();
  const [showCreateDialog, setCreateDialogStatus] = useState<boolean>(false);
  useEffect(() => {
    fetch("http://localhost:3000/api/product-categories", { method: "get" })
      .then((res) => res.json())
      .then((obj) => setProductCategories(obj));
  }, []);
  const openCreateItemDialog = (): void => {
    setCreateDialogStatus(true);
  };
  const createClickHandler = () => {
    selectProductCategory(undefined);
    openCreateItemDialog();
  };
  const updateItem = (category: ICategory) => {
    selectProductCategory(category);
    openCreateItemDialog();
  };
  const deleteItem = (categoryId?: string) => {
    if (!categoryId) return;
    fetch(`http://localhost:3000/api/product-categories/${categoryId}`, {
      method: "delete",
    }).then((res) => {
      if (res.ok) setProductCategories(productCategories.filter((x) => x.categoryId !== categoryId));
    });
  };
  const submitForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedProductCategory?.categoryId) {
      const formData = serialize(selectedProductCategory, { indices: true, nullsAsUndefineds: true });
      fetch(`http://localhost:3000/api/product-categories/${selectedProductCategory.categoryId}`, {
        method: "put",
        body: formData,
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
      const formData = serialize(selectedProductCategory, { indices: true, nullsAsUndefineds: true });
      fetch("http://localhost:3000/api/product-categories", {
        method: "post",
        body: formData,
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
            <th className="border border-slate-600 px-2 py-1">Image Url</th>
            <th className="border border-slate-600 px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productCategories.map((category) => (
            <tr key={category.categoryId}>
              <td className="border border-slate-600 p-2">
                <div className="flex items-center">
                  <Checkbox />
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
                  onClick={() => updateItem(category)}
                />
                <FontAwesomeIcon
                  className="inline-block cursor-pointer hover:text-blue-800"
                  icon={faTrashCan}
                  width={40}
                  onClick={() => deleteItem(category.categoryId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal key={selectedProductCategory?.categoryId} show={showCreateDialog} onClose={() => setCreateDialogStatus(false)} title="">
        <form className="max-w-md mx-auto">
          <FormInput
            label="Id"
            type="text"
            placeholder="Auto Generated"
            value={selectedProductCategory?.categoryId}
            onChange={() => {}}
            disabled
            readonly
          />
          <FormInput
            label="Name"
            type="text"
            placeholder="Name"
            value={selectedProductCategory?.name}
            onChange={(e) => selectProductCategory({ ...selectedProductCategory, name: e.target.value })}
          />
          <FormInput
            label="Image"
            type="file"
            placeholder="Image"
            onChange={(e) => selectProductCategory({ ...selectedProductCategory, image: e.target.files?.[0] })}
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

export default ProductCategoriesPage;
