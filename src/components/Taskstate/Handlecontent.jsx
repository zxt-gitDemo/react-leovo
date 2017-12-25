import React, { Component } from 'react';
import { Layout, Menu, Icon,Divider,Input,Select,Button,DatePicker,InputNumber } from 'antd';
import { withRouter, Router, Route,Link,NavLink,Switch} from 'react-router-dom';
export default class Handlecontent extends Component {
    render(){
        return (
            <div>
                <div style={{width:'100%',height:400,padding:20,overflow:'auto'}}>
                        <div style={{width:'100%',background:'#f3f3f3',height:60,padding:20,marginBottom:10}}>
                            <div style={{display:'inline-block',width:'40%'}}>基本信息</div>
                            <div style={{display:'inline-block',width:'20%'}}>应聘职位</div>
                            <div style={{display:'inline-block',width:'20%'}}>转发时间</div>
                            <div style={{display:'inline-block',width:'20%'}}>处理结果</div>
                        </div>
                        <p style={{width:'100%',borderTop:'1px solid #f3f3f3',padding:'10px 20px'}}>
                            <div style={{display:'inline-block',width:'40%'}}>
                                <div><span style={{marginRight:20}}>张三</span> <span>其他</span> <Divider type="vertical" /><span>1~3年</span></div>
                                
                                <div style={{color:'#ccc'}}>
                                <div><Icon type="team"/> <span>企鹅网络科技有限公司</span> <Divider type="vertical" /><span>设计师</span></div>
                                <div><Icon type="home"/> <span>Vertapple TAFE</span> <Divider type="vertical" /><span>考古学</span><Divider type="vertical" /><span>高中</span></div>
                                </div>
                            </div>
                            <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>软件工程师</div>
                            <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>
                            <div>2017-12-10</div>
                            <div>由 <span>张三</span> 转发</div>
                            </div>
                            <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>已处理</div>
                        </p>
                        <p style={{width:'100%',borderTop:'1px solid #f3f3f3',padding:'10px 20px'}}>
                            <div style={{display:'inline-block',width:'40%'}}>
                                <div><span style={{marginRight:20}}>张三</span> <span>其他</span> <Divider type="vertical" /><span>1~3年</span></div>
                                
                                <div style={{color:'#ccc'}}>
                                <div><Icon type="team"/> <span>企鹅网络科技有限公司</span> <Divider type="vertical" /><span>设计师</span></div>
                                <div><Icon type="home"/> <span>Vertapple TAFE</span> <Divider type="vertical" /><span>考古学</span><Divider type="vertical" /><span>高中</span></div>
                                </div>
                            </div>
                            <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>软件工程师</div>
                            <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>
                            <div>2017-12-10</div>
                            <div>由 <span>张三</span> 转发</div>
                            </div>
                            <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>已处理</div>
                        </p>
                </div>

            </div>
        )
    }
}