import axios from "axios";

const instance=axios.create({
    baseURL:'https://myburger-react-9da4a-default-rtdb.firebaseio.com/'
});

export default instance;