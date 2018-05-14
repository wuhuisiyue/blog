import React, {Component} from 'react';
import './index.less'
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

const menu = [
  {
    path: '/',
    name: '首页',
    icon: 'shouye'
  },
  {
    path: '/category',
    name: '分类',
    icon: 'fenlei1'
  },
  {
    path: '/list',
    name: '归档',
    icon: 'guidangxiangmu'
  }
]


class Header extends Component {
  render() {
    let {dispatch} = this.props
    let match = this.props.location.pathname
    return (<div className="navMenu">
      <h2 className="title">Grewer</h2>
      <ul >
        {
          menu.map(i => {
            return (<li key={i.name}>
              <Link to={i.path} className={match === i.path ? 'active' : ''}>
                <svg className="icon" aria-hidden="true" >
                  <use xlinkHref={'#icon-' + i.icon}></use>
                </svg>
                {i.name}</Link>
            </li>)
          })
        }
      </ul>
      <svg className="icon ft-30 contents" aria-hidden="true" onClick={()=>{dispatch({type:'CHANGE'})}}>
        <use xlinkHref="#icon-mulu"></use>
      </svg>
    </div>);
  }
}

export default connect()(Header);
