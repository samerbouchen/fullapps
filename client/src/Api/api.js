import axios from "./axios";


export const  getUsers = async () => {
    return axios.get('/users');
}

export const  deleteUser = async (id) => {
    return axios.delete(`/user/${id}`);
}
