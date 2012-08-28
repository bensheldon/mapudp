/**
 * Script that tosses random IP addresses at our UDP listener
 * Adapted from example in maptail module
 */

var udpServer = require("dgram").createSocket("udp4"),
    UDP_PORT  = process.env.UDP_PORT || 3001,
    UDP_ADDRESS = process.env.UDP_ADDRESS || "localhost";


function rand256 () {
  return Math.floor(Math.random() * 256)
}

var all = [];
var paths = [ 'home', 'articles', 'img', 'js', 'css' ];
var subpaths = [ 'foo', 'bar', 'foobar' ];

for (var i = paths.length; i--;)
  for (var n = subpaths.length; n--;)
    for (var x = 3; x--;)
      all.push('/' + paths[i] + '/' + subpaths[n] + '/' + Math.floor(Math.random() * Date.now()).toString(36).substr(0, 4));

var ips = [];
for (var i = 10; i--;) {
  ips.push([0,0,0,0].map(rand256).join('.'));
}

var n = 0;
(function emitRandomIP () {
  if (Math.random() * 10 < 7) {
    ips.push([0,0,0,0].map(rand256).join('.'))
    if (ips.length > 500) ips.shift()    
    var ip = ips[Math.floor(Math.random() * (ips.length * 0.7))]
    for (var i = Math.floor(Math.random() * 10) + 1; i--;) {
      setTimeout(function () {

        /** Send the UDP datagram **/
        var msg = {
          ip: ip,
          info: "whatever you want!" 
        };
        var msgBuf = new Buffer(JSON.stringify(msg));    
        udpServer.send(msgBuf, 0, msgBuf.length, UDP_PORT, UDP_ADDRESS);
        /** Done! **/

      }, Math.floor(Math.random() * 500))
    }
  }
  setTimeout(emitRandomIP, Math.floor(Math.random() * 300) + 20)
}());
