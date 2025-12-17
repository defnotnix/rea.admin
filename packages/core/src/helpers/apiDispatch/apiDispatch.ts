"use client";

import axios from "axios";
import { triggerNotification } from "@vframework/ui";

async function handleTokenExpiry() {
  const res = await axios
    .post(
      "/authenticate/refresh/token/",
      {},
      {
        headers: {
          Authorization: "DuqbarAzemn " + sessionStorage.getItem("kcatoken"),
        },
      }
    )
    .then((e) => {
      console.log(e);
      sessionStorage.setItem("kcatoken", e?.headers?.xauthorization);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  console.log("Token Expired, Calling Refresh Token");

  return res;
}

function triggerLogout(res: any) {
  triggerNotification.auth.isTokenExpired({
    onClose: () => {
      window.location.href = "/";
    },
  });
}

export async function get({
  endpoint = "",
  params = {},
}: {
  endpoint: string;
  params?: any;
}) {
  try {
    const response = await axios.get(endpoint, {
      params,

      headers: {
        Authorization: "DuqbarAzemn " + sessionStorage.getItem("kcatoken"),
      },
    });

    return {
      err: false,
      data: response.data,
    };
  } catch (error: any) {
    let err: any = new Error("Error");

    if (error?.response?.data?.message == "Token Expired") {
      const res = await handleTokenExpiry();

      if (res) {
        return await get({ endpoint, params });
      } else {
        triggerLogout(res);
        throw err;
      }
    } else {
      if (error?.code == "ERR_NETWORK") {
        console.log("Server Offline");
      } else {
        err.object = error;
        throw err;
      }
    }
  }
}

export async function post({
  endpoint = "",
  body,
  headers,
}: {
  endpoint: string;
  body: any;
  headers?: any;
}) {
  try {
    const response = await axios.post(endpoint, body, {
      headers: {
        ...headers,
        Authorization: "DuqbarAzemn " + sessionStorage.getItem("kcatoken"),
      },
    });
    console.log(response);

    return {
      err: false,
      data: response.data,
    };
  } catch (error: any) {
    let err: any = new Error("Error");

    if (error?.response?.data?.message == "Token Expired") {
      const res = await handleTokenExpiry();

      if (res) {
        return await post({ endpoint, body, headers });
      } else {
        triggerLogout(res);
        throw err;
      }
    } else {
      err.object = error;
      throw err;
    }
  }
}

export async function patch({
  endpoint = "",
  body,
  headers,
}: {
  endpoint: string;
  body: any;
  headers?: any;
}) {
  try {
    const response = await axios.patch(endpoint, body, {
      headers: {
        ...headers,
        Authorization: "DuqbarAzemn " + sessionStorage.getItem("kcatoken"),
      },
    });
    return {
      err: false,
      data: response.data,
    };
  } catch (error: any) {
    let err: any = new Error("Error");

    if (error?.response?.data?.message == "Token Expired") {
      const res = await handleTokenExpiry();

      if (res) {
        return await patch({ endpoint, body, headers });
      } else {
        triggerLogout(res);
        throw err;
      }
    } else {
      err.object = error;
      throw err;
    }
  }
}

export async function del({
  endpoint = "",
  id,
  headers,
}: {
  endpoint: string;
  headers?: any;
  id: string;
}) {
  try {
    const response = await axios.delete(endpoint + id + "/", {
      headers: {
        ...headers,
        Authorization: "DuqbarAzemn " + sessionStorage.getItem("kcatoken"),
      },
    });
    return {
      err: false,
      data: response.data,
    };
  } catch (error: any) {
    let err: any = new Error("Error");

    if (error?.response?.data?.message == "Token Expired") {
      const res = await handleTokenExpiry();

      if (res) {
        return await del({ endpoint, id, headers });
      } else {
        triggerLogout(res);
        throw err;
      }
    } else {
      err.object = error;
      throw err;
    }
  }
}

export async function login({
  endpoint = "",
  body,
}: {
  endpoint: string;
  body: any;
}) {
  return post({
    endpoint,
    body,
    headers: {
      withCredentials: true,
    },
  });
}
