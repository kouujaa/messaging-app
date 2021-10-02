import axios from "axios";

export default axios.create({
  baseURL: "http://34.122.252.114:3000/",
  headers: {
    "Content-type": "application/json"
  }
});