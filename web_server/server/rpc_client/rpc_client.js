var jayson = require('jayson');

var client = jayson.client.http({
  port: 4040,
  hostname: 'localhost'
});

//Test RPC method
function add(a, b, callback) {
  client.request('add', [a, b], function(NetErr, error, response) {
    if (NetErr) throw NetErr;
    console.log(response);
    callback(response);
  });
}

// Get news summaries for a user
function getNewsSummariesForUser(user_id, page_num, callback) {
    client.request('getNewsSummariesForUser', [user_id, page_num], function(err, error, response) {
        if (err) throw err;
        console.log(response);
        callback(response);
    });
}

module.exports = {
  add: add,
  getNewsSummariesForUser: getNewsSummariesForUser
}
