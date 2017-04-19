import './NewsPanel.css';
import _ from 'lodash'; // _ :特定用法

import React from 'react';

import NewsCard from '../NewsCard/NewsCard'

class NewsPanel extends React.Component{
  constructor() {
    super();
    this.state = {news:null};
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.loadMoreNews();
    this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);//去抖动，1s钟内出现的request都视为1个，避免scroll过于灵敏
    window.addEventListener('scroll', this.handleScroll);//callback
  }
  //scrollY:鼠标滚过的长度；innerHeight:静止时窗口的高度
  //当两者高度之和大于文件长度：说明需要加载新的newsCards
  handleScroll() {

    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      console.log('Loading more news');
      this.loadMoreNews();
    }
  }

  loadMoreNews(e) {
    let request = new Request('http://localhost:3000/news', {
      method: 'GET',
      cache: false
    });
    fetch(request)
      .then((res)=>res.json())
      .then((news)=>{
        this.setState({
          //如果news不为空，就接到当前newslist的下面
          news: this.state.news?this.state.news.concat(news):news,
        });
      });
  }
  //key={news.digest}在内存中维护一个虚拟的DOM，找到前后变化最小的节点，不用刷新整个页面
  renderNews() {
    let news_list = this.state.news.map(function(news) {
      return(
        <a className='list-group-item' href="#">
          <NewsCard news={news} />
        </a>
      );
    });
    return(
      <div className="container-fluid">
        <div className='list-group'>
          {news_list}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.news) {
        return(
          <div>
            {this.renderNews()}
          </div>
        );
    } else {
      return(
        <div>
          <div id='msg-app-loading'>
            Loading
          </div>
        </div>
      );
    }
  }
}

export default NewsPanel;
