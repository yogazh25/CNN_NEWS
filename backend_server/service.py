#Extract all the operate method to operations.py
import operations
import pyjsonrpc
#import json
#import os
#import sys

#   Mongodb us bson -->
#from bson.json_util import dumps
#   import common package in parent directory
#sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
#import mongodb_client

SERVER_HOST='localhost'
SERVER_PORT = 4040

class RequestHandler(pyjsonrpc.HttpRequestHandler):
    """test method for pyjsonrpc."""
    @pyjsonrpc.rpcmethod
    def add(self, a, b):
        print "Add %d and %d" % (a, b)
        return a + b

    """ get news summaries for a user """
    @pyjsonrpc.rpcmethod
    def getNewsSummariesForUser(self, user_id, page_num):
        return operations.getNewsSummariesForUser(user_id, page_num)

    """ log users news click event """
    @pyjsonrpc.rpcmethod
    def logNewsClickForUser(self, user_id, news_id):
        return operations.logNewsClickForUser(user_id, news_id)

#Threading HTTP Server
http_server = pyjsonrpc.ThreadingHttpServer(
    server_address = (SERVER_HOST, SERVER_PORT),
    RequestHandlerClass = RequestHandler
)

print "Starting HTTP server on %s:%d" % (SERVER_HOST, SERVER_PORT)

http_server.serve_forever()
