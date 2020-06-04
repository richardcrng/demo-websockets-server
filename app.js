const express = require("express");
const app = express();
const wsInstance = require("express-ws")(app);

const wss = wsInstance.getWss();

app.ws("/page-one", function(ws, req) {
  ws.on("open", function() {});

  ws.on("message", function(msg) {
    console.log("message via page one", msg);
    // const wss = wsInstance.getWss();
    wss.clients.forEach(function each(client) {
      if (client !== ws) {
        client.send(`sent via page one: ${msg}`);
      }
    });
  });
});

app.ws("/page-two", function(ws, req) {
  ws.on("open", function() {});

  ws.on("message", function(msg) {
    console.log("message via page two", msg);
    // const wss = wsInstance.getWss();
    wss.clients.forEach(function each(client) {
      if (client !== ws) {
        client.send(`sent via page two: ${msg}`);
      }
    });
  });
});

app.listen(3000, () => {
  console.log("running app");
});
