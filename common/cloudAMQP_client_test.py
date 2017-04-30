from cloudAMQP_client import CloudAMQPClient

CLOUDAMQP_URL = "amqp://snrozhms:K5J4SewphOrQDvHzBpyh9LbvwoCoNiXu@crocodile.rmq.cloudamqp.com/snrozhms"
TEST_QUEUE_NAME = 'test'

def test_basic():
    client = CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)
    sentMsg = {'test': 'demo'}
    client.sendMessage(sentMsg)
    client.sleep(10)

    receivedMsg = client.getMessage()
    assert sentMsg == receivedMsg
    print 'Congraduation! success!'

if __name__ == "__main__":
    test_basic()
