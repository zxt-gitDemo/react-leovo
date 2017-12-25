import React, { Component } from 'react';
import { Layout} from 'antd';
import Handlestate from './Handlestate'
import Handlecontent from './Handlecontent'
import { withRouter, Router, Route,Link,NavLink,Switch} from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
export default class Assignments extends Component {
    render(){
        return (
            <Layout style={{height:530}}>
                <Sider width={300} style={{background:'#f3f3f3'}}>
                    <Handlestate TstateOne="未处理" TstateTwo="已处理或无需处理"/>
                </Sider>
                <Content style={{height:530,background:'white'}}>
                    <Handlecontent/>
                </Content>
            </Layout>
        )
    }
}