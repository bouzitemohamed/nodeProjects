// utils/sendJson.js
function sendJson(res, codeStatus, data) {
  let message;

  switch (codeStatus) {
    case 200:
      message = "Request successful";
      break;
    case 201:
      message = "Resource created successfully";
      break;
    case 204:
      message = "Resource deleted successfully";
      break;
    case 400:
      message = "Bad request";
      break;
    case 401:
      message = "Unauthorized access";
      break;
    case 404:
      message = "Resource not found";
      break;
    case 500:
      message = "Internal server error";
      break;
    default:
      message = "Unknown status";
      break;
  }

  // Set JSON header
  res.setHeader("Content-Type", "application/json");

  // 204 (No Content) should not include a body
  if (codeStatus === 204) {
    return res.status(codeStatus).end();
  }

  // Send response
  res.status(codeStatus).json({
    message,
    data,
  });
}

module.exports = sendJson;
