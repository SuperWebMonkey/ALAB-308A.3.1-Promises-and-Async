import { central, db1, db2, db3, vault } from "./db.js";

async function getUserData(id) {
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

  const promise1 = await Promise.resolve()
    .then(() => strThenable)
    .then((val) => {
      return dbs[val];
    })
    .then((val) => {
      const obj = val(id);
      return obj;
      console.log(obj);
    })
    .then((val) => {
      console.log(val);
      return val;
    });

  console.log(promise1);

  const promise2 = await Promise.resolve()
    .then(() => vaultThenable)
    .then((val) => {
      return val;
    });

  console.log(promise2);

  const result = await Promise.all([promise1, promise2])
    .then(([result, result2]) => {
      console.log(result, result2);
      return [result, result2];
    })
    .then((val) => {
      console.log(...val);
      fullInfo = { ...val };
      let fullInfo2 = { ...fullInfo[0], ...fullInfo[1] };
      return fullInfo2;
    })
    .catch((error) => {
      console.log("caught an error", error);
    });

  console.log(result);

  return result;
}

// getUserData(0);
// getUserData(11);
// getUserData('chrono trigger')
const start = performance.now();

getUserData(5);

const end = performance.now();
const duration = end - start;
console.log("time is", duration);

// console.log(fullInfo);
