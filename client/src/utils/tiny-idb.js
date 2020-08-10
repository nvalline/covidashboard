const createDB = (name, version, stores) => {
    if (!("indexedDB" in window)) {
        throw new Error("IndexedDB is not supported in this browser!");
    }

    return new Promise((resolve, reject) => {
        let openDBRequest = indexedDB.open(name, version);

        openDBRequest.onupgradeneeded = (event) => {
            let db = event.target.result;

            if (stores) {
                stores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        db.createObjectStore(store.name, store.config);
                    }
                });
            }
        };

        openDBRequest.onsuccess = (event) => {
            let db = event.target.result;
            if (!(stores === [] || stores === undefined || stores == null)) {
                stores.forEach((store) => {
                    if (store.data !== undefined) {
                        let tx = db.transaction([store.name], "readwrite");

                        store.data.forEach((data) => {
                            let allData = tx.objectStore(store.name).getAll();
                            allData.onsuccess = (e) => {
                                let match = e.target.result.find(
                                    (matchedData) => matchedData.id === data.id
                                );

                                if (!match) {
                                    let tx = db.transaction(
                                        [store.name],
                                        "readwrite"
                                    );
                                    let addReq = tx
                                        .objectStore([store.name])
                                        .add(data);

                                    addReq.onsuccess = (e) => resolve(db);
                                }
                            };
                        });
                    }
                });
            }

            resolve(db);
        };

        openDBRequest.onerror = (event) => {
            let error = event.target.error;

            reject(error);
        };
    });
};

const openDB = (name, version) => {
    if (!("indexedDB" in window)) {
        throw new Error("IndexedDB is not supported in this browser!");
    }

    return new Promise((resolve, reject) => {
        let openDBRequest = indexedDB.open(name, version);

        openDBRequest.onsuccess = (event) => {
            let db = event.target.result;

            resolve(db);
        };

        openDBRequest.onerror = (event) => {
            let error = event.target.error;

            reject(error);
        };
    });
};

const transaction = (dbObject, stores, mode) => {
    return {
        tx: dbObject.transaction(stores, mode),
        getStore(name) {
            return new Promise((resolve, reject) => {
                const tx = dbObject.transaction(stores, mode);

                let store = tx.objectStore(name);

                resolve(store);

                tx.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        },
    };
};

const getObjectData = (store, objectKeyPath) => {
    return new Promise((resolve, reject) => {
        let dataRequest = store.get(objectKeyPath);

        dataRequest.onsuccess = (event) => {
            resolve(event.target.result);
        };

        dataRequest.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const getAllObjectData = (store) => {
    return new Promise((resolve, reject) => {
        let dataRequest = store.getAll();

        dataRequest.onsuccess = (event) => {
            resolve(event.target.result);
        };

        dataRequest.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const addObjectData = (store, dataBody) => {
    return new Promise((resolve, reject) => {
        let dataRequest = store.add(dataBody);

        dataRequest.onsuccess = (event) => {
            getAllObjectData(store).then((storeData) => resolve(storeData));
        };

        dataRequest.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const updateObjectData = (store, keyPath, key, newData) => {
    return new Promise((resolve, reject) => {
        getAllObjectData(store).then((allData) => {
            let target = allData.find((data) => data[keyPath] === key);

            if (target) {
                let cursorRequest = store.openCursor();

                cursorRequest.onsuccess = (event) => {
                    let cursor = event.target.result;

                    if (cursor && new RegExp(key).test(cursor[keyPath])) {
                        let updateRequest = cursor.update(newData);

                        updateRequest.onsuccess = (event) =>
                            getAllObjectData(store).then((storeData) =>
                                resolve(storeData)
                            );
                        updateRequest.onerror = (event) =>
                            reject(event.target.error);
                    } else {
                        cursor.continue();
                    }
                };
            } else {
                reject(
                    new Error(
                        `There's no object in the ${store.name} whose ${keyPath} matches ${key}.`
                    )
                );
            }
        });
    });
};

const deleteObjectData = (store, dataKey) => {
    function removeData(key) {
        return new Promise((res, rej) => {
            let obj;
            getObjectData(store, key).then((data) => {
                obj = data;
            });

            let deleteRequest = store.delete(key);

            deleteRequest.onsuccess = async (e) => {
                res([obj, await getAllObjectData(store)]);
            };
            deleteRequest.onerror = (e) => rej(e.target.error);
        });
    }

    return new Promise((resolve, reject) => {
        removeData(dataKey)
            .then((deleted) => resolve(deleted))
            .catch((error) => reject(error));
    });
};

const DB = {
    createDB,
    openDB,
    transaction,
    getObjectData,
    getAllObjectData,
    addObjectData,
    deleteObjectData,
    updateObjectData,
};

export default DB;
