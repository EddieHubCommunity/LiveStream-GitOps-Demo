const express = require('express');
const {createLightship} = require('lightship')

const APPLICATION_PORT = process.env.port || 3000;
const LIGHTSHIP_PORT = process.env.health_port || 9000;

const app = express();

app.get('/', (req, res) => {
  const bgColor = process.env.BG || "#999";
  // WARNING - XSS dream lies below - this should only be used for demo purposes
  // language=HTML
  res.send(
    `<!doctype html>
   <html lang="en">
     <head>
       <title>Example node application</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
      <style>
        body {
          background-color: ${bgColor}
        }
      </style>
     </head>
     <body class="container-sm">
       <h1 class="py-4">Env vars</h1>
       <table class="table table-hover">
         <thead class="thead-dark">
           <th scope="col">Env var</th>
           <th scope="col">Value</th>
         </thead>
         <tbody>
         </tbody>
           ${Object.keys(process.env).map((key) => (
             `<tr>
               <th scope="row">${key}</th>
               <td>${process.env[key]}</td>
             </tr>`
    )).join("")}
       </table>
     </body>
   </html>
  `);
});

const server = app.listen(APPLICATION_PORT, () => {
  console.log(`Server started on port ${APPLICATION_PORT}`);
  console.log(`Health checks available on port ${LIGHTSHIP_PORT}`)
});

const lightship = createLightship({detectKubernetes: false, port: LIGHTSHIP_PORT});

lightship.registerShutdownHandler(() => {
  server.close();
});

// Lightship default state is "SERVER_IS_NOT_READY". Therefore, you must signal
// that the server is now ready to accept connections.
lightship.signalReady();
