import React, { Component } from 'react';
import { Layout, Menu, Icon,Divider,Input,Select,Progress,Button,DatePicker,InputNumber } from 'antd';
import {withRouter,Router, Route,Link,NavLink,Switch} from 'react-router-dom';
import Screening from '../Candidate/Screening'
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
 class Talentsdetails extends Component {
    seeperson(uid){
        this.props.history.push('/home/talents/information/'+uid)
    }
    render() {
       let item=this.props.lists;
       console.log(item)
       let personwork=item.personwork;
       let cname=personwork===undefined?'':personwork.cname;
       let jobname=item.personwork===undefined?'':item.personwork.jobname;
       console.log(personwork)
       console.log(jobname)
        return (
           
            <div style={{width:'100%',height:400,overflow:'auto'}}  >
                        <div style={{width:'100%',background:'#f3f3f3',height:60,padding:20,marginBottom:10}}>
                            <div style={{display:'inline-block',width:'50%'}}>基本信息</div>
                            <div style={{display:'inline-block',width:'30%'}}>入库时间</div>
                            <div style={{display:'inline-block',width:'20%'}}>渠道</div>
                        </div>
                        {this.props.lists.map((item,key)=>{
                            return <div key={key} style={{width:'100%',borderTop:'1px solid #f3f3f3',padding:'10px 20px'}} onClick={this.seeperson.bind(this,item.uid)}>
                            <div>
                                <div style={{display:'inline-block',width:'50%'}}>
                                    <div><span style={{marginRight:20}}>{item.abilityname}</span> <span>{item.sex}</span> <Divider type="vertical" /><span>{item.workLife}</span></div>
                                    
                                    <div style={{color:'#ccc'}}>
                                    <div><Icon type="team"/> <span>{cname}</span> 
                                    <Divider type="vertical" />
                                    <span>{jobname}</span></div>
                                    <div><Icon type="home"/> 
                                    {/* <span>{item.personeducations[0].eduname===undefined?'':item.personeducations[0].eduname}</span> 
                                    <Divider type="vertical" />
                                    <span>{item.personeducations[0].major===undefined?'':item.personeducations[0].major}</span>
                                    <Divider type="vertical" />
                                    <span>{item.personeducations[0].education?'':item.personeducations[0].education}</span> */}
                                    </div>
                                    </div>
                                </div>
                                <div style={{display:'inline-block',width:'30%',verticalAlign:'top'}}>{item.created}</div>
                                <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>{item.channelName}</div>
                            </div>
                            {/* {item.personapplyJobs.map((item,key)=>{
                                return  <div key={key} style={{padding:10,borderTop:'1px solid #f3f3f3'}}>
                                <a style={{marginRight:20}}>{item.name}</a>
                                <span style={{marginRight:20}}><span style={{color:'#ccc'}}>阶段</span>&emsp;{item.stage}</span>
                                <span><span style={{color:'#ccc'}}>更新时间</span>&emsp;{item.time}</span>
                                </div>
                            })} */}
                        </div>
                        })}
                       
                        
                       
                    </div>
        )
    }
}
export default withRouter(Talentsdetails)