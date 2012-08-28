# mapudp


A udp connector for [maptail](https://github.com/stagas/maptail), a realtime map view of GeoIP data. Push IP addresses to a maptail map using Node's built in [UDP / Datagrams](http://nodejs.org/api/dgram.html).

## Screenshot

![Screenshot](https://raw.github.com/bensheldon/mapudp/master/screenshot.png)

## Setup

1. Install packages: `npm install`
2. Start the server: `node server.js`
3. (optional) In another terminal, generate some dummy data: `node example/dummy-data.js`
4. Visit `http://localhost:3000`

## Pushing data

You can insert the following code into any other node process (like an edge router) to push UDP packets to the mapudp server.

```javascript
  var udpServer = require("dgram").createSocket("udp4");
  
  var msg = {
    ip: ip,
    info: "whatever you want!" 
  };
  var msgBuf = new Buffer(JSON.stringify(msg));    
  udpServer.send(msg, 0, msgBuf.length, UDP_PORT, UDP_ADDRESS);
```

Be sure to change the `UDP_PORT`, `UDP_ADDRESS` to reflect your local environment (default is `localhost:3001`);