import React, { Component } from 'react';
import { Layout, Menu, Icon,Divider } from 'antd';
import Screening from './Screening'
const {  Content, Sider } = Layout;

export default class Candidatedetails extends Component {
    constructor(props){
        super(props)
        this.state={
            list:[],
            total:'',
            job:[],
            recruit:[],
            search1:'全部职位',
            search2:'初筛',
            search3:{},
            index:"0",
            
        }
    }
    componentDidMount(){
        
        fetch('/Local/information/candidates.json').then(res => res.json()).then(res => {
            let { list,recruit} = res.data
            let total=recruit.total;
            let job=recruit.list;
            let recruitlist=recruit.lists;
            this.setState({list:list})
            this.setState({total:total})
            this.setState({job:job})
            this.setState({recruit:recruitlist})

         
        })
    }
    req(condition1,condition2,condition3){
        console.log(condition1)
        console.log(condition2)
        console.log(condition3)
    }
    childsearch(obj){
        this.setState({
            search3:obj
        },()=>{
            console.log(this.state.search3)
            this.req(this.state.search1,this.state.search2,this.state.search3)
        })
    }
    onmenu(item){
        this.setState({
            search1:item.key
        },()=>{
            this.req(this.state.search1,this.state.search2,this.state.search3)
        })
    }
    active(inx,name){
        this.setState({
            index:inx
        })
        this.setState({
            search2:name
        },()=>{
            this.req(this.state.search1,this.state.search2,this.state.search3)
        })
    }
    render() {
        return (
            <Layout style={{height:'520px'}}>
                <Sider width={300}
                style={{background:'#f3f3f3',padding:20,height:'500px',overflow:'auto'}}
                >
                    <h3>招聘中职位</h3>
                    <Menu 
                        style={{background:'#f3f3f3',border:'none'}}
                        onClick={this.onmenu.bind(this)}
                    >
                    <Menu.Item key='全部职位' style={{display:'flex',justifyContent:'space-between'}}><span>全部职位</span><span>{this.state.total}</span></Menu.Item>
                    {
                        this.state.job.map((item,key)=>{
                    return <Menu.Item key={item.name} style={{display:'flex',justifyContent:'space-between'}}><span>{item.name}</span><span>{item.number}</span></Menu.Item>
                        })
                    }
                    </Menu>
                    <hr/>
                    <Screening childsearch={(obj)=>this.childsearch(obj)}/>
                </Sider>
                <Content style={{background:'white'}}>
                    <div style={{display:'flex',borderBottom:'1px solid lightgray',cursor:'pointer'}}>
                      
                        {this.state.recruit.map((item,key)=>{
                            return <div key={key} style={{width:'15%',borderRight:'1px solid lightgray',paddingTop:20,paddingLeft:20}} onClick={this.active.bind(this,key,item.name)}>
                            <h2 style={{color:this.state.index==key?'blue':'black'}}>{item.number}</h2>
                            <p>{item.name}</p>
                        </div>
                        })}
                    </div>
                    <div style={{width:'100%',height:400,padding:20,overflow:'auto'}}>
                        <div style={{width:'100%',background:'#f3f3f3',height:60,padding:20,marginBottom:10}}>
                            <div style={{display:'inline-block',width:'40%'}}>基本信息</div>
                            <div style={{display:'inline-block',width:'20%'}}>申请时间</div>
                            <div style={{display:'inline-block',width:'20%'}}>应聘职位</div>
                            <div style={{display:'inline-block',width:'20%'}}>渠道</div>
                        </div>
                        {
                            this.state.list.map((item,key)=>{
                                return (<div style={{width:'100%',borderTop:'1px solid #f3f3f3',padding:'10px 20px'}} key={key}>
                                <div style={{display:'inline-block',width:'40%'}}>
                                    <div><span style={{marginRight:20}}>{item.name}</span> <span>{item.sex}</span> <Divider type="vertical" /><span>{item.workLife}</span></div>
                                    
                                    <div style={{color:'#ccc'}}>
                                    <div><Icon type="team"/> <span>{item.companyname}</span> <Divider type="vertical" /><span>{item.job}</span></div>
                                    <div><Icon type="home"/> <span>{item.education}</span> <Divider type="vertical" /><span>{item.major}</span>
                                    <Divider type="vertical" /><span>{item.educationlevel}</span></div>
                                    </div>
                                </div>
                                <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>{item.applicationtime}</div>
                                <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>{item.applicationjob}</div>
                                <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>{item.channel}</div>
                            </div>)
                            })
                        }
                        
                       
                    </div>
                </Content>
            </Layout>
        )
    }
}