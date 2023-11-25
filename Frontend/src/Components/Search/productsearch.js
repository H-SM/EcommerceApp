/*import { products } from "./allproducts";

function productsearch(searchquery) {
  let searchresultProduct = [];

  products.forEach((p) => {
    let word = p.name.toLowerCase().split(" ");
      const productName = p.name.toLowerCase();
    const searchTerms = searchquery.toLowerCase().split(" ");
    const allTermsPresent = searchTerms.every((term) => productName.includes(term));

    if (allTermsPresent) {
      searchresultProduct.push(p);
    }
    }
  );

  return searchresultProduct;
}

export { productsearch };*/

import { products } from "./allproducts";

function productsearch(searchquery) {
  const searchTerms = searchquery.toLowerCase().split(" ");
  
  const searchResultProducts = products.filter((product) => {
    const productNameWords = product.name.toLowerCase().split(" ");
    return searchTerms.every((term) => productNameWords.includes(term));
  });

  return searchResultProducts;
}

export { productsearch };

