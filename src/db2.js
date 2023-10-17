import app from "firebase";
// import firebaseConfig from "./config";


  createAccount = (email, password) =>
    app.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) =>
    app.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () =>
    app.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

  signInWithFacebook = () =>
    app.auth.signInWithPopup(new app.auth.FacebookAuthProvider());

  signInWithGithub = () =>
    app.auth.signInWithPopup(new app.auth.GithubAuthProvider());

  signOut = () => app.auth.signOut();

  passwordReset = (email) => app.auth.sendPasswordResetEmail(email);

  addUser = (id, user) => app.db.collection("users").doc(id).set(user);

  getUser = (id) => app.db.collection("users").doc(id).get();

  passwordUpdate = (password) => app.auth.currentUser.updatePassword(password);

  changePassword = (currentPassword, newPassword) =>
    new Promise((resolve, reject) => {
      app.reauthenticate(currentPassword)
        .then(() => {
          const user = app.auth.currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              resolve("Password updated successfully!");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  reauthenticate = (currentPassword) => {
    const user = app.auth.currentUser;
    const cred = app.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    return user.reauthenticateWithCredential(cred);
  };

  updateEmail = (currentPassword, newEmail) =>
    new Promise((resolve, reject) => {
      app.reauthenticate(currentPassword)
        .then(() => {
          const user = app.auth.currentUser;
          user
            .updateEmail(newEmail)
            .then(() => {
              resolve("Email Successfully updated");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  updateProfile = (id, updates) =>
    app.db.collection("users").doc(id).update(updates);

  onAuthStateChanged = () =>
    new Promise((resolve, reject) => {
      app.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Auth State Changed failed"));
        }
      });
    });

  saveBasketItems = (items, userId) => {
    app.db.collection("users").doc(userId).update({ basket: items });
  }

  saveShopProducts = (items, shopId) => {
    app.db.collection("shops").doc(shopId).update({ products: items });
  }

  setAuthPersistence = () =>
    app.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

  // // PRODUCT ACTIONS --------------

  getSingleProduct = (id) => app.db.collection("products").doc(id).get();

  getProducts = (lastRefKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const query = app.db
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .startAfter(lastRefKey)
              .limit(12);

            const snapshot = await query.get();
            const products = [];
            snapshot.forEach((doc) =>
              products.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ products, lastKey });
          } catch (e) {
            reject(e?.message || ":( Failed to fetch products.");
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error("Request timeout, please try again"));
          }, 15000);

          try {
            const totalQuery = await app.db.collection("products").get();
            const total = totalQuery.docs.length;
            const query = app.db
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .limit(12);
            const snapshot = await query.get();

            clearTimeout(timeout);
            if (!didTimeout) {
              const products = [];
              snapshot.forEach((doc) =>
                products.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ products, lastKey, total });
            }
          } catch (e) {
            if (didTimeout) return;
            reject(e?.message || ":( Failed to fetch products.");
          }
        }
      })();
    });
  };

  searchProducts = (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const productsRef = app.db.collection("products");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const searchedNameRef = productsRef
            .orderBy("name_lower")
            .where("name_lower", ">=", searchKey)
            .where("name_lower", "<=", `${searchKey}\uf8ff`)
            .limit(12);
          const searchedKeywordsRef = productsRef
            .orderBy("dateAdded", "desc")
            .where("keywords", "array-contains-any", searchKey.split(" "))
            .limit(12);

          // const totalResult = await totalQueryRef.get();
          const nameSnaps = await searchedNameRef.get();
          const keywordsSnaps = await searchedKeywordsRef.get();
          // const total = totalResult.docs.length;

          clearTimeout(timeout);
          if (!didTimeout) {
            const searchedNameProducts = [];
            const searchedKeywordsProducts = [];
            let lastKey = null;

            if (!nameSnaps.empty) {
              nameSnaps.forEach((doc) => {
                searchedNameProducts.push({ id: doc.id, ...doc.data() });
              });
              lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
            }

            if (!keywordsSnaps.empty) {
              keywordsSnaps.forEach((doc) => {
                searchedKeywordsProducts.push({ id: doc.id, ...doc.data() });
              });
            }

            // MERGE PRODUCTS
            const mergedProducts = [
              ...searchedNameProducts,
              ...searchedKeywordsProducts,
            ];
            const hash = {};

            mergedProducts.forEach((product) => {
              hash[product.id] = product;
            });

            resolve({ products: Object.values(hash), lastKey });
          }
        } catch (e) {
          if (didTimeout) return;
          reject(e);
        }
      })();
    });
  };

  getFeaturedProducts = (itemsCount = 12) =>
    app.db
      .collection("products")
      .where("isFeatured", "==", true)
      .limit(itemsCount)
      .get();

  getRecommendedProducts = (itemsCount = 12) =>
    app.db
      .collection("products")
      .where("isRecommended", "==", true)
      .limit(itemsCount)
      .get();

  getWarehouseProducts = (warehouseId, itemsCount = 100) =>
    app.db
      .collection("products")
      .where("warehouseId", "==", warehouseId)
      .limit(itemsCount)
      .get();

  addProduct = (id, product) =>
    app.db.collection("products").doc(id).set(product);

  generateKey = () => app.db.collection("products").doc().id;

  storeImage = async (id, folder, imageFile) => {
    // const snapshot = await app.storage.ref(folder).child(id).put(imageFile);

    // const preSnapshot = app.storage.ref(folder).child(id);
    // // console.log("pass")
    // const snapshot = await preSnapshot.put(imageFile, metadata);
    // const downloadURL = await snapshot.ref.getDownloadURL();

    return "downloadURL";
  };

  deleteImage = (id) => app.storage.ref("products").child(id).delete();

  editProduct = (id, updates) =>
    app.db.collection("products").doc(id).update(updates);

  removeProduct = (id) => app.db.collection("products").doc(id).delete();
  
  addRequest = (product, user, shop) => {
    app.db.collection("sellProductRequest").doc(user.id).update({ basket: items });
  }

  // addUser = (id, user) => app.db.collection("users").doc(id).set(user);
  // addProduct = (id, product) =>
  //   app.db.collection("products").doc(id).set(product);
  getVendorRequests = (userId, itemsCount = 100) => {
    const res = app.db.collection("sellProductRequest")
      .where("vendorId", "==", userId)
      .limit(itemsCount)
      .get()
    return res
  }
  

  getPartnerRequests = (userId, itemsCount = 100) => {
    const res = app.db.collection("sellProductRequest")
      .where("partnerId", "==", userId)
      .limit(itemsCount)
      .get()
    return res
  }

  // getReferenceProduct = (path) => {
  //   app.db.ref(pro)
  // }
  // const ref = db.ref('server/saving-data/fireblog/posts');

  // // Get the data on a post that has been removed
  // ref.on('child_removed', (snapshot) => {
  //   const deletedPost = snapshot.val();
  //   console.log('The blog post titled \'' + deletedPost.title + '\' has been deleted');
  // });

  // shop
  generateShopKey = () => app.db.collection("shops").doc().id;

  createShop = (id, shop) =>
    app.db.collection("users").doc(id).set(shop);

  saveSellerShopProducts = (items, shopId) => 
    app.db.collection("shops").doc(shopId).update({ products: items });

  getUserShop = (shopId) => 
    app.db.collection("shops").doc(shopId).get();

  // order
  generateOrderKey = () => app.db.collection("orders").doc().id;
  
  createOrder = (id, order) => {
    console.log(order)
    app.db.collection("orders").doc(id).set(order)
  }

  getUserOrders = (userId, itemsCount) => 
    app.db.collection("orders").where("userId", "==", userId).
      limit(itemsCount).
      get()

// const firebaseInstance = new Firebase();

// export default firebaseInstance;
