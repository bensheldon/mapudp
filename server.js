var express   = require('express'),
    udpServer = exports.udp = require("dgram").createSocket("udp4"),
    colors    = require('colors'),
    maptail   = require('maptail'),
    app       = exports.app = express.createServer(),
    PORT      = process.env.PORT || 3000,
    UDP_PORT  = process.env.UDP_PORT || 3001;

/** Express middleware from maptail **/
app.use(maptail.track());
app.use(maptail.static());

/** Configure maptail **/
maptail.config.onlyLookups = true;
maptail.config.bufferTime = 3000;
maptail.attach(app);

/** 
 * Bind Express
 */
app.listen(PORT, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

/**
 * Setup the UDP Listener
 */
 udpServer.on("listening", function () {
  console.log("UDP server listening on %s:%d", udpServer.address().address, udpServer.address().port);
});

/** When a UDP datagram is received **/
udpServer.on("message", function (msg, rinfo) {
  var message;
  try {
    message = JSON.parse(msg);
    maptail.emit('ip',
      message.ip,
      message.ip.white + " Info: ".blue + message.info.green // Format the message - uses Colors module
    )
  }
  catch(err) {
    console.log(err);
  }
}); 

udpServer.bind(UDP_PORT);