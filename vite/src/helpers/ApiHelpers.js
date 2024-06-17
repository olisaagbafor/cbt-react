import axios from "axios";
import { serialize } from "object-to-formdata";
import Swal from "sweetalert2";
import { getFromStorage } from "../assets";

const options = {
  indices: true,
  allowEmptyArrays: true,
};

const makePostAPICall = (endpoint, data, successCallback, failedCallback) => {
  axios({
    method: "POST",
    url: `${import.meta.env.NODE_ENV === "development" ? import.meta.env.REACT_APP_LOCAL_BASEURL : import.meta.env.REACT_APP_PROD_BASEURL}/${endpoint}`,
    data: serialize({ school_code: getFromStorage("school_code"), ...data }, options),
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Authorization": getFromStorage("studentToken"),
    },
  }).then((response) => {
    if (response.data.status === "invalid") {
      Swal.fire({
        position: "top-end",
        title: "Your session has expired please login again",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        localStorage.removeItem("studentToken");
        window.location.reload();
      });
    } else if (response.data.status === "success") {
      successCallback(response.data);
    } else {
      failedCallback(response.data);
    }
  });
};

const makeGetAPICall = (endpoint, params, successCallback, failedCallback) => {
  axios({
    method: "GET",
    url: `${import.meta.env.NODE_ENV === "development" ? import.meta.env.REACT_APP_LOCAL_BASEURL : import.meta.env.REACT_APP_PROD_BASEURL}/${endpoint}`,
    params: { school_code: getFromStorage("school_code"), ...params },
    headers: {
      "X-Authorization": getFromStorage("studentToken"),
    },
  }).then((response) => {
    if (response.data.status === "invalid") {
      Swal.fire({
        position: "top-end",
        title: "Your session has expired please login again",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        localStorage.removeItem("studentToken");
        window.location.reload();
      });
    } else if (response.data.status === "success") {
      successCallback(response.data);
    } else {
      failedCallback(response.data);
    }
  });
};

export { makePostAPICall, makeGetAPICall };
