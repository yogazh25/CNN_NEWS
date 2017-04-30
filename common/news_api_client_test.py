import news_api_client as client

def test():
    news = client.getNewsFromSource()
    print news
    assert len(news) > 0

    news = client.getNewsFromSource(sources=['bbc-news'])
    assert len(news)
    print 'test passed!'

if __name__ == "__main__":
    test()
