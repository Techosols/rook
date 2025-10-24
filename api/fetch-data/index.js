/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
const fetch = require("node-fetch");
// eslint-disable-next-line no-undef
require("dotenv").config();
// eslint-disable-next-line no-undef


console.log("✅ Fetch Data Function Loaded");

// eslint-disable-next-line no-undef
module.exports = async function (context, req) {
  context.log("🔹 Processing fetch-data request...");

  try {
    // eslint-disable-next-line no-undef
    const externalApiKey = process.env.SERVER_API_KEY;
    // eslint-disable-next-line no-undef
    const externalApiUrl = process.env.SERVER_API_URL;

    if (!externalApiKey || !externalApiUrl) {
      context.res = {
        status: 500,
        body: "SERVER_API_KEY or SERVER_API_URL is not configured."
      };
      return;
    }

    const headers = {
      "x-api-key": externalApiKey,
      "Content-Type": "application/json"
    };


    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers
    });

    if (!response.ok) {
      context.res = {
        status: response.status,
        body: `Error fetching data from external API: ${response.statusText}`
      };
      return;
    }

    const data = await response.json();

    context.res = {
      status: 200,
      body: data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  } catch (error) {
    context.log("❗Fetch error:", error);
    context.res = {
      status: 500,
      body: error.message
    };
  }
};
