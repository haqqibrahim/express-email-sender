const axios = require("axios");

async function sendText(user_name, email, message) {
  try {
    const response = await axios.post(
      "https://express-email-sender.onrender.com/send-email",
      {
        name: user_name,
        email,
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error(
      "Error sending text:",
      error.response ? error.response.data : error.message
    );
  }
}

// Example usage
sendText("John Doe", "john@gmail.com", "Hello, this is a test message!");