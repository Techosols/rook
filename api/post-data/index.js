// eslint-disable-next-line no-undef
const fetch = require("node-fetch");

// eslint-disable-next-line no-undef
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a POST request.");

  // 1. Get the external API key from environment variables.
  // The name 'EXTERNAL_API_KEY' should match the Application setting name in Azure.
  // eslint-disable-next-line no-undef
  const externalApiKey = process.env.SERVER_API_KEY;
  if (!externalApiKey) {
    context.res = {
      status: 500,
      body: "External API key is not configured.",
    };
    return;
  }

  // 2. Check if the request method is POST.
  if (req.method !== "POST") {
    context.res = {
      status: 405,
      body: "Method not allowed. This endpoint only accepts POST requests.",
    };
    return;
  }

  // 3. Access the data sent from the React app via the request body.
  const reactData = req.body;
  if (!reactData) {
    context.res = {
      status: 400,
      body: "Please pass a request body for POST requests.",
    };
    return;
  }

  try {
    // 4. Define the URL for the external API.
    // eslint-disable-next-line no-undef
    const externalApiUrl = process.env.SERVER_API_URL; // Replace with your target API endpoint

    // 5. Set the headers, including the API key and Content-Type.
    const headers = {
      "x-api-key": externalApiKey, // Pass the key securely in a header
      "Content-Type": "application/json",
    };

    // 6. Make the POST request to the external API with the body from the React app.
    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(reactData),
    });

    // 7. Check if the request was successful.
    if (!response.ok) {
      const errorResponse = await response.text();
      context.res = {
        status: response.status,
        body: `External API request failed with status: ${response.status}. Response: ${errorResponse}`,
      };
      return;
    }

    // 8. Parse the external API's response and return it to the React app.
    const data = await response.json();
    context.res = {
      status: 200,
      body: data,
    };
  } catch (error) {
    context.log.error("An error occurred:", error);
    context.res = {
      status: 500,
      body: `An error occurred while posting data: ${error.message}`,
    };
  }
};



