import React, { Component } from 'react';
import {Select,Steps ,Menu, Dropdown, Button, Icon, message} from 'antd';
import {Router, Route,Link,NavLink} from 'react-router-dom';
const Option = Select.Option;
const Step = Steps.Step;
const menu = (
    <Menu >
      <Menu.Item key="1">初筛</Menu.Item>
      <Menu.Item key="2">用人部门筛选</Menu.Item>
      <Menu.Item key="3">面试</Menu.Item>
      <Menu.Item key="4">沟通Offer</Menu.Item>
      <Menu.Item key="5">待入职</Menu.Item>
      <Menu.Item key="6">已入职</Menu.Item>
    </Menu>
  );
export default class Stepbar extends Component {
    
    render(){
        return (
            <div>
                <div style={{marginTop:20}}>
                <Steps current={0} size="small" direction="vertical"> 
                    <Step title="初筛" />
                    <Step title="用人部门筛选" />
                    <Step title="面试" />
                    <Step title="沟通Offer" />
                    <Step title="待入职" />
                    <Step title="已入职" />
                </Steps>
                </div>
               <div style={{marginBottom:20}}>
               <Dropdown.Button  overlay={menu}>
                    根据状态随时变
                </Dropdown.Button>
               </div>
                
            <Button style={{width:'100%'}} type="primary">转发给用人部门</Button>
            <hr/>
            <Button style={{width:'100%'}}>结束面试流程(归档)</Button>
            </div>
        )
    }
}