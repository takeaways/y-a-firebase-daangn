import { fireStore, fireStorage, fireAuth } from ".";
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

export const uploadProduct = async (product: Product) => {
  return fireStore.collection("product").add(product);
};

export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const storageRef = fireStorage.ref();
    const path = storageRef.child(`image/${file.name}`);
    const uploadTask = path.put(file);

    uploadTask.on(
      "state_changed",
      () => {
        console.log("uploading...");
      },
      (error) => {
        rej(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(res);
      }
    );
  });
};

export const signUp = async (email: string, password: string) => {
  return fireAuth.createUserWithEmailAndPassword(email, password);
};

export const signIn = async (email: string, password: string) => {
  return fireAuth.signInWithEmailAndPassword(email, password);
};

export const logOut = async () => {
  return fireAuth.signOut();
};
