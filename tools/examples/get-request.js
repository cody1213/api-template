const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";

// get environment variables

const envFile = path.join(__dirname, "..", "..", `.env.${NODE_ENV}`);
dotenv.config({ path: envFile });

const host = "http://localhost:3000";
const params = {
  api_path: "acs/acs5",
  vintage: "2020",
  county_fips: "071",
  state_fips: "22",
};
const endpoint = "/";

const user = "test@example.com";
const key = "test";
const errorHandler = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error(error.response.status, error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error", error.message);
  }
  console.log("Error");
};

axios
  .get(host + "/auth/authenticate", {
    method: "GET",
    headers: { "X-User": user, "X-Key": key },
  })
  .catch(errorHandler)
  .then((auth) => {
    const token = auth?.data?.token;
    console.log(token);
    if (token !== undefined) {
      axios
        .options(host + endpoint, {
          method: "GET",
          params: params,
          headers: { authorization: "Bearer " + token },
        })
        .catch(errorHandler)
        .then((response) => {
          if (response && response.data) {
            const data = response.data;
            console.log(data);
          }
        });
    } else {
      console.error("No token");
    }
  });
