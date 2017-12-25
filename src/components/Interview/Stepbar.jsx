import React, { Component } from 'react';
import {Select,Steps ,Menu, Dropdown, Button, Icon, message} from 'antd';
import {Router, Route,Link,NavLink} from 'react-router-dom';
const Option = Select.Option;
const Step = Steps.Step;
const menu = (
    <Menu >
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );
export default class Stepbar extends Component {
    
    render(){
        return (
            <div>
                <p>候选人已申请<span>3</span>个职位，当前查看的职位：</p>
                <Select defaultValue="" style={{ width:'100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled">Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <p style={{marginTop:20}}>
                <Steps current={1} size="small" direction="vertical"> 
                    <Step title="初筛" />
                    <Step title="用人部门筛选" />
                    <Step title="面试" />
                    <Step title="沟通Offer" />
                    <Step title="待入职" />
                    <Step title="已入职" />
                </Steps>
                </p>
               <p>
               <Dropdown.Button  overlay={menu}>
                    根据状态随时变
                </Dropdown.Button>
               </p>
                
            <Button style={{width:'100%'}} type="primary">转发给用人部门</Button>
            <hr/>
            <Button style={{width:'100%'}}>结束面试流程(归档)</Button>
            </div>
        )
    }
}