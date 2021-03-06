import React, {Component} from 'react';
import {connect} from "react-redux";
import Comment from '../../components/comment'
import './index.less'
import ToMessage from "../../components/toMessage";
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, RectShape, TextRow} from 'react-placeholder/lib/placeholders';

function MyComponent(data) {
  const result = data.data
  return (
    <div className="aPage">
      <p>{result.title}</p>
      <div className="content">
        {result.content}
      </div>
      {
        result.time ? (<span title="发布时间"><svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-shijian"></use>
                  </svg>
          {result.time}</span>) : null
      }
      <div className="category">
        {
          result.label.map((i, index) => {
            return <span key={index}>{i}</span>
          })
        }
      </div>
      <div className="post_next_prev">
        <div className="prev">上一篇: <span>{result.prev.name}</span></div>
        <div className="next">下一篇: <span>{result.next.name}</span></div>
      </div>
      <Comment comment={result.comments}/>
      <ToMessage></ToMessage>
    </div>
  )

}


const awesomePlaceholder = (
  <div className='my-awesome-placeholder'>
    <RectShape color='#eee' style={{width: '30%', height: 30, marginBottom: 20, marginTop: 50}}/>
    <TextBlock rows={10} color='#eee'/>
  </div>
);


class Article extends Component {
  render() {
    const {id} = this.props.match.params
    let result = this.props.cacheArticle[id] || {}
    return (
      <ReactPlaceholder customPlaceholder={awesomePlaceholder} ready={!!result.content}>
        <MyComponent data={result}/>
      </ReactPlaceholder>)

  }

  componentWillMount() {
    const {id} = this.props.match.params
    let result = this.props.cacheArticle[id]
    if (!result) {
      this.props.dispatch({type: 'GETONE', data: id})
    }
    // TODO 后期 给评论添加 hold 分开评论和文章接口  检测滚动 若滚动到评论上方200px 则再加载评论
  }
}

function showData(state) {
  return {
    cacheArticle: state.cacheArticle,
    loadingStatus: state.ArticleLoading
  }
}

export default connect(showData)(Article);