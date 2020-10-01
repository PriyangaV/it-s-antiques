// helper function
import rootURL from './URL';

// flatten
export function flattenProduct(data) {
  return data.map((item) => {
    // cloudinary
    // let { image } = item;
    // const url = image && image.url;

    // let image = (item.image && item.image.url) || null; // another way of accessing
    const url = item.image && item.image.url;
    // local setup no deployment
    let image = `${rootURL}${url}`;
    return { ...item, image };
  });
}

// filter feautured products
export function featuredProducts(data) {
  return data.filter((item) => item.featured === true);
}

// paginate
export function paginate(products) {
  // our code goes here
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

  // splice - mutating original array of products
  // const newProducts = Array.from({ length: numberOfPages }, () => {
  //   return products.splice(0, itemsPerPage);
  // });

  // slice doesn't mutate the original array
  const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });
  return newProducts;
}
