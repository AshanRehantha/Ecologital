import Cookies from "js-cookie";

export const getRequestHeader = (method) => {
    return authHeader(method);
};

function authHeader(method) {
    if (method === "POST") {
        return {
            "Content-Type": "application/json",
            "XSRF-TOKEN": '3cJHEY9WLnStlbvmiDgRypVA'
        };
    } else if (method === "GET") {
        return {
            "Content-Type": "application/x-www-form-urlencoded",
        };
    } else {
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }
}
