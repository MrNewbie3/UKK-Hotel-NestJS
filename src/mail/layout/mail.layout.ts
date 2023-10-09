export const layout = (uuid: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f8f8f8;
              padding: 20px;
              text-align: center;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              padding: 40px;
          }
  
          h1 {
              color: #007bff;
              margin-bottom: 20px;
          }
  
          p {
              color: #333333;
              font-size: 18px;
              margin-bottom: 30px;
          }
  
          .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              transition: background-color 0.3s;
          }
  
          .button:hover {
              background-color: #0056b3;
          }
  
          .copy {
              color: #777;
              font-size: 14px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Email Verification</h1>
          <p>Thank you for registering with us! Please click the button below to verify your email address.</p>
          <a href="http://localhost:3000/mail-verification/${uuid}" class="button" style="color:#ffffff;">Verify Email</a>
          <p class="copy">&copy; 2023 Your Company. All rights reserved.</p>
      </div>
  </body>
  </html>
  `;
};
