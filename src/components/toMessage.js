import React, {Component} from 'react';
import pureRender from "grewer-pure-render";
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

@pureRender
class ToMessage extends Component {
  render() {
    return (<div><Editor
      editorClassName="editor"
    />
      <div style={{textAlign:'right',marginTop:'20px'}}>
        <button className="btn">提交</button>
      </div></div>);
  }
}

export default ToMessage;
