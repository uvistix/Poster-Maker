// products.js
import { setProducts } from "./../store/slices/product-slice";
import { store } from "./../store/store";

const fetchProducts = (user, userData) => {
  try {
    // Check if user and userData are available
    if (user && userData) {
      // Retrieve productsData from userData
      const productsData = userData.productsData;

      // Check if productsData is an object
      if (typeof productsData === "object" && productsData !== null) {
        // Convert the object values to an array
        const productsArray = Object.values(productsData);

        // Format the products data
        const formattedProductsData = productsArray.map((product) => {
          // Check if product.createdAt is defined and is an object with toDate function
          const createdAt =
            product.createdAt && typeof product.createdAt.toDate === "function"
              ? product.createdAt.toDate().toLocaleString()
              : null;

          return {
            ...product,
            createdAt,
          };
        });

        // Update the Redux store with the formatted data
        store.dispatch(setProducts(formattedProductsData));
      } else {
        // If productsData is not an object, set products to null in the Redux store
        store.dispatch(setProducts(null));
      }
    } else {
      // Log an error if user or userData is not available
      console.error("User not authenticated.");
    }
  } catch (error) {
    // Log and rethrow the error for further handling
    console.error("Error in fetchProducts:", error);
    throw error;
  }
};

export default fetchProducts;


// // products.js
// import {auth, db } from "./../firebaseConfig/FirebaseConfig";
// import { setProducts } from "./../store/slices/product-slice";
// import { store } from "./../store/store";
// import { v4 as uuidv4 } from 'uuid';

// const fetchProducts = (callback) => {
//   const currentUser = auth.currentUser;
//   try {
//     const productsRef = db.collection('products');
//     const unsubscribe = productsRef.onSnapshot(async (querySnapshot) => {
//       const productsData = {};

//       await Promise.all(querySnapshot.docs.map(async (doc) => {
//         const product = doc.data();
//         const productId = uuidv4(); // Generate a new UUID for each product

//         // Convert Firestore Timestamp to JavaScript Date
//         productsData[productId] = {
//           ...product,
//           createdAt: product.createdAt.toDate().toLocaleString(),
//           id: productId,
//         };
//       }));

//       // Store all productsData in the users/currentUser.uid/ path
//       const userDocRef = db.collection('users').doc(currentUser.uid);
//       await userDocRef.update({
//         productsData: productsData,
//       });

//       // Dispatch the products to the store
//       store.dispatch(setProducts(Object.values(productsData)));

//       // Invoke the callback once the data is fetched
//       if (callback) {
//         callback(Object.values(productsData));
//       }
//     });

//     // Return the unsubscribe function
//     return unsubscribe;
//   } catch (error) {
//     console.error('Error fetching product data:', error);
//     throw error;
//   }
// };

// export default fetchProducts;
