import React, {Component} from 'react';
import pureRender from "grewer-pure-render";
import fetch from "../../redux/ajax-config";
import './index.less'
import ReactPlaceholder from 'react-placeholder';
import {TextBlock,  RectShape} from 'react-placeholder/lib/placeholders';

function MyComponent({data}) {
  return (<ul>
    {data.map(i => (<li key={i.time}>
        <h3>{i.time}</h3>
        <ul className="dateList">
          {i.list.map((j, _index) => {
            return (
             <li key={_index} onClick={()=>{
               // router to article/id
             }}>
                <div className="ellipsis">{j.title}</div>
                <div className="date">{j.time}</div>
              </li>
            )
          })}
        </ul>
      </li>)
    )}</ul>)
}

const awesomePlaceholder = (
  <div className='my-awesome-placeholder'>
    <RectShape color='#eee' style={{width: '30%',height:30,marginBottom:20}}/>
    <TextBlock rows={7} color='#eee'/>
  </div>
);

@pureRender
class Archives extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: ''
    }
  }

  render() {
    return (
      <ReactPlaceholder customPlaceholder={awesomePlaceholder} ready={!!this.state.list}>
        <MyComponent data={this.state.list}/>
      </ReactPlaceholder>)
  }

  componentWillMount() {
    if (this.state.list.length === 0) {
      fetch.post('http://api.cn/getArchives').then(data => {
        console.log(data)
        this.setState({list: data.data})
      }).catch(err => {})
    }
  }
}

export default Archives;
