/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const fetch = require("node-fetch");
require("dotenv").config({ path: "../.env" }); // ✅ load env from project root if needed

console.log("✅ Patch Data Function Loaded");

module.exports = async function (context, req) {
  context.log("🔹 Processing patch-data request...");

  try {
    const externalApiKey = process.env.SERVER_API_KEY;
    const externalApiUrl = process.env.SERVER_API_URL;

    if (!externalApiKey || !externalApiUrl) {
      context.res = {
        status: 500,
        body: "SERVER_API_KEY or SERVER_API_URL is not configured."
      };
      return;
    }

    if (req.method !== "PATCH") {
      context.res = {
        status: 405,
        body: "Method not allowed. This endpoint only accepts PATCH requests."
      };
      return;
    }

    const patchData = req.body;
    if (!patchData) {
      context.res = {
        status: 400,
        body: "Please provide data in the request body."
      };
      return;
    }

    // Example endpoint: update user profile
    const exampleEndpoint = `${externalApiUrl}/v2/profile`;

    const headers = {
      "x-api-key": externalApiKey,
      "Content-Type": "application/json"
    };

    const response = await fetch(exampleEndpoint, {
      method: "PATCH",
      headers,
      body: JSON.stringify(patchData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      context.res = {
        status: response.status,
        body: `Error patching data: ${response.statusText}\n${errorText}`
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
    context.log("❗Patch error:", error);
    context.res = {
      status: 500,
      body: error.message
    };
  }
};
