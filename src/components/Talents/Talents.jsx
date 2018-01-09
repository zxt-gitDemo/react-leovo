import React, { Component } from 'react';
import { Layout,Icon,Select,Progress } from 'antd';
import Screening from '../Candidate/Screening'
import Talentsdetails from './Talentsdetails'
import Talentinformation from '../Interview/Talentinformation'
const {  Content, Sider } = Layout;
const Option = Select.Option;
export default class Talents extends Component {
    constructor(props){
        super(props)
        this.state={
            job:[],
            search1:{},
            search2:{},
            slectjob:'',
            stage:'',
            lists:[],
            id:'',
            detailshow:false
        }
    }
    componentDidMount(){
        let uid=this.props.match.params.id;
        if(uid){
            this.setState({
                id:uid,
                detailshow:true
            })
        }
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/public/getbas',{mode:'cors',method:'get'}).then(res => res.json()).then(res => {
            let {job} = res.body
            this.setState({job:job})
        })  
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/abilityPerson/querylist?page=0&size=20&sort=created,desc',{mode: 'cors',method:'post'}).then(res => res.json()).then(res => {
            let lists=res.body;
            this.setState({
                lists:lists
              })  
        })
        // fetch('/Local/information/candidates.json').then(res => res.json()).then(res => {
        //     let list=res.data.list
        //     this.setState({lists:list})
        // })
    }
    // shouldComponentUpdate(nextProps, nextState){
    //     if( nextState.id===this.state.id){
    //         return false
    //     }
    //     return true
       
    // }
    req(condition1,condition2){
        console.log(condition1)
        console.log(condition2)
    }
    childsearch(obj){
        this.setState({
            search2:obj
        },()=>{
            this.req(this.state.search1,this.state.search2)
        })
    }
    changeselect(type,value){
        this.setState({
            [type]: value,
          });
          this.state.search1[type]=value            
            this.setState({
                search1:this.state.search1
            },function(){
                this.req(this.state.search1,this.state.search2)
            }) 
      }
    close(){
        this.setState({
            search1:{}
        },function(){
            this.setState({
                slectjob:'',
                stage:''
            },function(){
                this.req(this.state.search1,this.state.search2)            
            })
        })
    }
    personclick(id){
        this.setState({
            detailshow:true,
            id:id
            
        })
    }
    closemodel(){
        this.setState({
            
            detailshow:false
        })
    }
    render() {
        return (
            <div>
                 <div style={{display:this.state.detailshow===false?'none':'block',width:'100%'}} >
                    <Talentinformation uid={this.state.id} close={()=>this.closemodel()} />
                </div>
           
            <Layout style={{height:'520px',zIndex:5}}>
            
            <Sider width={300}
            style={{background:'#f3f3f3',padding:20,height:'500px',overflow:'auto'}}
            >
            <div style={{display:'flex',justifyContent:'space-between'}}>
                 <div>简历数</div><div>31/250</div>
                 
            </div>
            <div><Progress percent={30} showInfo={false} /></div>
            <div style={{paddingTop:20}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <h3>申请信息</h3><a onClick={this.close.bind(this)} ><Icon type="delete"/>请空筛选</a>
            </div>
            <div>
                <div>应聘职位</div>
                <Select defaultValue="请选择" style={{ width:'100%' }}
                onChange={this.changeselect.bind(this,"slectjob")}
                value={this.state.slectjob}
                >
                {
                    this.state.job.map((item,key)=>{
                           return  <Option value={item.uid} key={key}>{item.jobname}</Option> 
                    })
                }
                    
                </Select>
            </div>
            <div>
                <div>职位阶段</div>
                <Select defaultValue="请选择" style={{ width:'100%' }}
                onChange={this.changeselect.bind(this,"stage")}
                value={this.state.stage}
                >
                    <Option value="初筛">初筛</Option>
                    <Option value="用人部门筛选">用人部门筛选</Option>
                    <Option value="面试">面试</Option>
                    <Option value="沟通Offer">沟通Offer</Option>
                    <Option value="待入职">待入职</Option>
                    <Option value="已入职">已入职</Option>
                </Select>
            </div>
            </div>
            <hr/>
            <Screening childsearch={(obj)=>this.childsearch(obj)}/>
            </Sider>
            <Content style={{background:'white',padding:20,height:'500px',overflow:'auto'}}>
            <Talentsdetails lists={this.state.lists} personclick={(id)=>this.personclick(id)}   />
            </Content>
            </Layout>
            </div>
        )
    }
}