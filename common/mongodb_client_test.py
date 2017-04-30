import mongodb_client as client

def test_basic():
    db = client.get_db('test')
    db.testData.drop()
    assert db.testData.count() == 0
    db.testData.insert({'test':123})
    db.testData.insert({'test':223})
    assert db.testData.count() == 2
    '''
    db.demo.drop()
    assert db.demo.count() == 0
    '''
    print 'test_basic passed!'

if __name__ ==  "__main__":
    test_basic()
