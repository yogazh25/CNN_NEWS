var jayson = require('jayson');

var client = jayson.client.http({
  port: 4040,
  hostname: 'localhost'
});

//Test PRC method
function add(a, b, callback) {
  client.request('add', [a, b], function(NetErr, error, response) {
    if (NetErr) throw NetErr;
    console.log(response);
    callback(response);
  });
}

module.exports = {
  add: add
}
