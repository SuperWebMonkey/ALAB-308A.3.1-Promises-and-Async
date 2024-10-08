import { central, db1, db2, db3, vault } from "./db.js";

function getUserData(id) {
  let userObj = {};
  let userInfo = {};
  let fullInfo = {};

  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  // console.log(dbs["db1"]);
  const strThenable = {
    then: function (resolve, reject) {
      setTimeout(() => {
        const dbStr = central(id);
        // const fn = dbs[dbStr];
        resolve(dbStr);
      }, 0);
    },
  };

  const vaultThenable = {
    then: function (resolve, reject) {
      setTimeout(() => {
        const obj = vault(id);
        resolve(obj);
      }, 0);
    },
  };

  const promise1 = Promise.resolve()
    .then(() => strThenable)
    .then((val) => {
      return dbs[val];
    })
    .then((val) => {
      return val(id);
    });

  console.log(promise1);

  const promise2 = Promise.resolve().then(() => vaultThenable);

  console.log(promise2);

  Promise.any([promise1, promise2])
    .then((result) => {
      return result;
    })
    .then((val) => {
      fullInfo = { ...val };
      console.log(fullInfo);
      return fullInfo;
    });
}

const fullInfo = getUserData(5);
// console.log(fullInfo);
