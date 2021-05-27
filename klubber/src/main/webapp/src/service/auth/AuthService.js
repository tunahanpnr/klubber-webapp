import axios from "axios";


const signup = (newUser) => {
    return axios.post("/signup", newUser);
};


const login = (user) => {
    return axios
        .post("/signin", user)
        .then((response) => {
            console.log(user)
            console.log(response.data)
            localStorage.setItem("user", JSON.stringify(response.data));
            if (!(response.data === "")) {
                window.location.reload();
            }


            return response.data;
        });
};

const logout = (props) => {
    localStorage.removeItem("user");
    window.location.reload();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    signup,
    login,
    logout,
    getCurrentUser,
};