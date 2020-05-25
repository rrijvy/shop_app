const INITIAL_STATE = {
  productCategories: [
    {
      id: 1,
      name: "SHIRT",
      imgUrl:
        "https://www.jeanswholesaler.in/1324-thickbox_default/royal-spider-men-s-full-sleeves-slim-fit-denim-casual-shirt.jpg",
    },
    {
      id: 2,
      name: "PUNJABI",
      imgUrl:
        "https://d2ij5zs3j57hmq.cloudfront.net/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/2/9/29543017_221965208546342_1005446740919957765_n.jpg",
    },
    {
      id: 3,
      name: "T-SHIRT",
      imgUrl:
        "https://www.printingforyourevent.com/images/tshirt_closelinelg.jpg",
    },
    {
      id: 4,
      name: "PANT",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrbaRaJwv78Sf1c_IDXa1PPnCkz4WKWt2GQfVIHndlWmt0UuzQ&usqp=CAU",
    },
  ],
};

const productCategory = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productCategory;
