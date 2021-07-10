import axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:5000/api",
});

export const getSetting = (url) =>{
    return instance.get(url);
}

export const getAPI = (url, params = {}) =>{
    return instance.get(url, params);
};
export const loginToken = (url) =>{
    return instance.get(url);
}
export const RegisterAPI = (url, data) =>{
    return instance.post(url, data);
}
export const postAPI = (url, data) =>{
    return instance.post(url, data);
};

export const Actived = (url, data) =>{
    return instance.post(url, data);
}
export const Posts = (url) =>{
    return instance.get(url);
}
export const Comments = (url) =>{
    return instance.get(url);
}
export const addPost = (url, data) =>{
    return instance.post(url, data);
}
export const addComment = (url, data) =>{
    return instance.post(url, data);
}
export const getCount = (url) =>{
    return instance.get(url);
}
export const getSearch = (url) =>{
    return instance.get(url);
}
export const getStatistical = (url) =>{
    return instance.get(url);
}
export const getListUser = (url) =>{
    return instance.get(url);
}
export const getEditActived = (url, data) =>{
    return instance.post(url, data);
}
export const getEditUser = (url, data) =>{
    return instance.post(url, data);
}
export const getRemoveUser = (url) =>{
    return instance.delete(url);
}
export const getRemoveUserTemp = (url) =>{
    return instance.delete(url);
}
export const editPost = (url, data) =>{
    return instance.post(url, data);
}
export const editStatus = (url, data) =>{
    return instance.post(url, data);
}
export const editSettingStatus = (url, data) =>{
    return instance.post(url, data);
}
export const editSettingTime = (url, data) =>{
    return instance.post(url, data);
}