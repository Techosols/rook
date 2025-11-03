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

    if(!externalApiUrl) {
      context.res = {
        status: 500,
        body: "URL is not configured."
      };
      return;
    }

    if(!externalApiKey) {
      context.res = {
        status: 500,
        body: "API KEY is not configured."
      };
      return;
    }

    const headers = {
      "x-api-key": externalApiKey,
      "Content-Type": "application/json"
    };

    const endpoint = req.query.endpoint;
    
    if(!endpoint) {
      context.res = {
        status: 400,
        body: "Endpoint query parameter is required."
      };
      return;
    }

    const finalEndpoint = `${externalApiUrl}/V2/${endpoint}`;

    const exampleEndpoint = `${externalApiUrl}/v2/settings`;

    const response = await fetch(finalEndpoint, {
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
