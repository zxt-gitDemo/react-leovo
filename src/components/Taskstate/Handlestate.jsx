import React, { Component } from 'react';
import { Layout,Menu,Select} from 'antd';
import { withRouter, Router, Route,Link,NavLink,Switch} from 'react-router-dom';
const Option = Select.Option;
export default class Handlestate extends Component {
    render(){
        let TstateOne=this.props.TstateOne;
        let TstateTwo=this.props.TstateTwo;        
        return (
            <div style={{padding:20}}>
                <h3>处理状态</h3>
                <Menu style={{background:'#f3f3f3',border:'none'}}>
                    <Menu.Item >
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span>{TstateOne}</span> <span>0</span>
                    </div>
                    </Menu.Item>
                    <Menu.Item>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span>{TstateTwo}</span> <span>0</span>
                    </div>
                    </Menu.Item>
                </Menu>
                <hr/>
                <h3>职位</h3>
                <Select defaultValue="全部" style={{ width:'100%' }}>
                            <Option value="jack">男</Option>
                            <Option value="lucy">女</Option>
                            <Option value="disabled">其他</Option>
                </Select>
            </div>
        )
    }
}