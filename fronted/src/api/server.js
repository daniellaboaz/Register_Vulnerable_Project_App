// fronted/src/api/server
import axios from "axios";
const baseURL = "http://localhost:8081";

export const login = (values) => {
    return new Promise((resolve, reject) => {
      axios
        .post(baseURL + "/login", values)
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };


  export const changepass = (values) => {
    return new Promise((resolve, reject) => {
      axios
        .post(baseURL + "/changepass", values)
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };

 export const signup = (values) => {
    return new Promise((resolve, reject) => {
      axios
        .post(baseURL + "/signup", values)
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };
    
  export const continuresett = (values) => {
    return new Promise((resolve, reject) => {
      axios
        .post(baseURL + "/continu-reset", values)
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };

  export const showusers2 = (values) => {
    return new Promise((resolve, reject) => {
      axios
        .post(baseURL + "/showusers2", values)
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };

  