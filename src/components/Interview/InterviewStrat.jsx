import React, { Component } from 'react';
import {Select , Button} from 'antd';
import {Router, Route,Link,NavLink} from 'react-router-dom';
const Option = Select.Option;
export default class InterviewStrat extends Component {
    
    render(){
        return (
            <div>
            <p>候选人已申请<span>0</span>个职位，当前查看的职位：</p>
            <Select defaultValue="总览" style={{ width:'100%' }}>
            </Select>
            <hr/>
            <p>开启新的面试流程</p>
            <div>
                <Select defaultValue="总览" style={{ width:'80%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled">Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Button style={{width:'20%'}} type="primary">确定</Button>
            </div>
            
            </div>
        )
    }
}