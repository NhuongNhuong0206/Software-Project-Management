import React from "react";
import APIs, { endpoints } from "./APIs";

export const login = async data => {
    const [user, setUser] = React.useState({});
    try {
        let res = await APIs.post(endpoints['login'], {
            ...user,
            'client_id': '6fJmhSsHGNeTl8SuqORDr1L5xkPVALNB50vJSkkU',
            'client_secret': 'VAt2PkQ3rxqvsJnO6zwVOlT5dodbe5Lnx6NgCaZlfKZLCnoboJHOb0DIYAJ0ig9DEQYq8k2UTuai08hBJQmXOv9ecVKKLn7urpeTBP84BvG806F4l0gpefajyP5LPWt7',
            'grant_type': 'password'
        })
        return res;
    } catch (error) {
        return error.response.data;
    }
};
// 5p50