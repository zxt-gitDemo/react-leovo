import React, { Component } from 'react';
import { Layout, Menu, Icon,Divider,Input,Select,Button,DatePicker,InputNumber } from 'antd';
import Handlestate from './Handlestate'
import { withRouter, Router, Route,Link,NavLink,Switch} from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
export default class Feedback extends Component {
    render(){
        return (
            <Layout style={{height:530}}>
                <Sider width={300} style={{background:'#f3f3f3'}}>
                    <Handlestate TstateOne="未反馈" TstateTwo="已反馈"/>
                </Sider>
                <Content style={{height:530,background:'white'}}>
                <div style={{width:'100%',height:400,padding:20,overflow:'auto'}}>
                        <div style={{width:'100%',background:'#f3f3f3',height:60,padding:20,marginBottom:10}}>
                            <div style={{display:'inline-block',width:'16%'}}>候选人</div>
                            <div style={{display:'inline-block',width:'16%'}}>应聘职位</div>
                            <div style={{display:'inline-block',width:'16%'}}>面试时间</div>
                            <div style={{display:'inline-block',width:'20%'}}>面试轮次与形式</div>
                            <div style={{display:'inline-block',width:'16%'}}>面试官</div>
                            <div style={{display:'inline-block',width:'16%'}}>反馈</div>
                        </div>
                        <p style={{width:'100%',borderTop:'1px solid #f3f3f3',padding:'10px 20px'}}>
                            <div style={{display:'inline-block',width:'16%',verticalAlign:'top'}}>
                                <div>张三</div>
                            </div>
                            <div style={{display:'inline-block',width:'16%',verticalAlign:'top'}}>设计师</div>
                            <div style={{display:'inline-block',width:'16%',verticalAlign:'top'}}>
                            <div>2017-12-10</div>
                            <div>下午 13:45</div>
                            </div>
                            <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>
                            <div>初试</div>
                            <div>电话面试</div>
                            </div>
                            <div style={{display:'inline-block',width:'16%',verticalAlign:'top'}}>张三</div>
                            <div style={{display:'inline-block',width:'16%',verticalAlign:'top'}}>未反馈</div>
                        </p>
                        <p style={{width:'100%',borderTop:'1px solid #f3f3f3',padding:'10px 20px'}}>
                            <div style={{display:'inline-block',width:'16%',verticalAlign:'top'}}>
                                <div>张三</div>
                            </div>
                            <div style={{display:'inline-block',width:'16%',verticalAlign:'top'}}>设计师</div>
                            <div style={{display:'inline-block',width:'16%',verticalAlign:'top'}}>
                            <div>2017-12-10</div>
                            <div>下午 13:45</div>
                            </div>
                            <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>
                            <div>初试</div>
                            <div>电话面试</div>
                            </div>
                            <div style={{display:'inline-block',width:'16%',verticalAlign:'top'}}>张三</div>
                            <div style={{display:'inline-block',width:'16%',verticalAlign:'top'}}>未反馈</div>
                        </p>

                </div>
                </Content>
            </Layout>
        )
    }
}