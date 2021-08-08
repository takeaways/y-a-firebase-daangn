import { fireStore } from ".";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  return new Promise(async (res, rej) => {
    const product: any = [];
    const snapshot = await fireStore.collection("product").get();
    snapshot.forEach((doc) => {
      product.push(doc.data());
    });
    res(product);
  });
};
