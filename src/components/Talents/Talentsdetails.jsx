import React, { Component } from 'react';
import { Layout, Menu, Icon,Divider,Input,Select,Progress,Button,DatePicker,InputNumber } from 'antd';
import {BrowserRouter  as Router, Route,Link,NavLink,Switch} from 'react-router-dom';
import Screening from '../Candidate/Screening'
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
export default class Talentsdetails extends Component {
    render() {
        return (
           
            <div style={{width:'100%',height:400,overflow:'auto'}}>
                        <div style={{width:'100%',background:'#f3f3f3',height:60,padding:20,marginBottom:10}}>
                            <div style={{display:'inline-block',width:'50%'}}>基本信息</div>
                            <div style={{display:'inline-block',width:'30%'}}>入库时间</div>
                            <div style={{display:'inline-block',width:'20%'}}>渠道</div>
                        </div>
                        {this.props.lists.map((item,key)=>{
                            return <div key={key} style={{width:'100%',borderTop:'1px solid #f3f3f3',padding:'10px 20px'}}>
                            <div>
                                <div style={{display:'inline-block',width:'50%'}}>
                                    <div><span style={{marginRight:20}}>{item.name}</span> <span>{item.sex}</span> <Divider type="vertical" /><span>{item.workLife}</span></div>
                                    
                                    <div style={{color:'#ccc'}}>
                                    <div><Icon type="team"/> <span>{item.companyname}</span> <Divider type="vertical" /><span>{item.job}</span></div>
                                    <div><Icon type="home"/> <span>{item.education}</span> <Divider type="vertical" /><span>{item.major}</span><Divider type="vertical" /><span>{item.educationlevel}</span></div>
                                    </div>
                                </div>
                                <div style={{display:'inline-block',width:'30%',verticalAlign:'top'}}>{item.applicationtime}</div>
                                <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>{item.channel}</div>
                            </div>
                            {item.interview.map((item,key)=>{
                                return  <div key={key} style={{padding:10,borderTop:'1px solid #f3f3f3'}}>
                                <a style={{marginRight:20}}>{item.name}</a>
                                <span style={{marginRight:20}}><span style={{color:'#ccc'}}>阶段</span>&emsp;{item.stage}</span>
                                <span><span style={{color:'#ccc'}}>更新时间</span>&emsp;{item.time}</span>
                        </div>
                            })}
                        </div>
                        })}
                       
                        
                       
                    </div>
        )
    }
}