import React, { Component } from 'react';
import { Layout, Menu, Icon,Divider,Input,Select,Button,DatePicker } from 'antd';
const { Content, Sider } = Layout;
const Option = Select.Option;
const { RangePicker } = DatePicker;
export default class Candidatedetails extends Component {
    constructor(props){
        super(props)
        this.state={
            search1:'招聘中',
            search2:{},
            department:[],
            workAddress:[],
            hiringManager:[],
            jobName:'',
            selectdepartment:'',
            selectworkAddress:'',
            selecthiringManager:'',
            lists:[]
        }
    }
    componentDidMount(){
              
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/job/query?page=0&size=20&sort=created,desc',{mode: 'cors',method:'post'}).then(res => res.json()).then(res => {
            let lists=res.body.content;
            console.log(lists)
            this.setState({
                lists:lists
              })  
        })
        fetch('/Local/job/job.json').then(res => res.json()).then(res => {
            let { department,workAddress,hiringManager} = res.data
            this.setState({department:department})
            this.setState({workAddress:workAddress})
            this.setState({hiringManager:hiringManager})
        })
        // fetch('Local/job/jobdetails.json').then(res => res.json()).then(res => {
        //   let lists=res.data;
        //   this.setState({
        //     lists:lists
        //   })  
        // })

    }
    req(condition1,condition2){
        console.log(condition1)
        console.log(condition2)
    }


    onmenu(item){
        this.setState({
            search1:item.key
        },()=>{
            this.req(this.state.search1,this.state.search2)
        })
    }
    changeselect(type,value){
        this.setState({
            [type]: value,
          });
          this.state.search2[type]=value;
          this.setState({
            search2:this.state.search2
          },function(){
            this.req(this.state.search1,this.state.search2)
          })
          
      }
    inputchange(type,e){
        this.setState({
          [type]: e.target.value
        });
        this.state.search2[type]=e.target.value;
        this.setState({
          search2:this.state.search2
        },function(){
          this.req(this.state.search1,this.state.search2)
        })
    }
    close(){
        this.setState({
            search2:{},
            jobName:'',
            selectdepartment:'',
            selectworkAddress:'',
            selecthiringManager:''
        },function(){
          this.req(this.state.search1,this.state.search2)            
        })
    }
    edit(id){
        this.props.history.push('jobs/newjob/'+id)
    }
    render() {
        return (
            <Layout style={{height:'520px'}}>
            <Sider width={300}
            style={{background:'#f3f3f3',padding:20,height:'500px',overflow:'auto'}}
            >
            <Menu defaultOpenKeys={['招聘中']}
            style={{background:'#f3f3f3',border:'none'}}
            onClick={this.onmenu.bind(this)}
            >
                    <Menu.Item key='招聘中' style={{display:'flex',justifyContent:'space-between'}}><span>招聘中</span><span>4</span></Menu.Item>
                    <Menu.Item key='已结束' style={{display:'flex',justifyContent:'space-between'}}><span>已结束</span><span>4</span></Menu.Item>
            </Menu>
                    <hr/>
                    <div style={{paddingTop:20}}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h3>筛选</h3><a onClick={this.close.bind(this)} ><Icon type="delete"/>请空筛选</a>
                        </div>
                        <div style={{marginBottom:20}}>
                            <div>职位名称<span style={{color:'red'}}>*</span></div>
                            <Input placeholder="请输入" onChange={this.inputchange.bind(this,"jobName")} 
                            value={this.state.jobName}
                            />
                        </div>
                      
                        <div style={{marginBottom:20}}>
                            <div>部门<span style={{color:'red'}}>*</span></div>
                            <Select defaultValue="请选择" style={{ width:'100%' }}
                            onChange={this.changeselect.bind(this,"selectdepartment")} 
                            value={this.state.selectdepartment}
                            >
                            {
                                this.state.department.map((item,key)=>{
                                    return <Option value={item} key={key}>{item}</Option>
                                })
                            }
                            </Select>
                        </div>
                        <div  style={{marginBottom:20}}>
                            <div>工作地点<span style={{color:'red'}}>*</span></div>
                            <Select defaultValue="请选择" style={{ width:'100%' }}
                            onChange={this.changeselect.bind(this,"selectworkAddress")} 
                            value={this.state.selectworkAddress}
                            >
                            {
                                this.state.workAddress.map((item,key)=>{
                                    return <Option value={item} key={key}>{item}</Option>
                                })
                            }
                            </Select>
                        </div>
                        <div  style={{marginBottom:20}}>
                            <div>职位负责人<span style={{color:'red'}}>*</span></div>
                            <Select defaultValue="请选择" style={{ width:'100%' }}
                            onChange={this.changeselect.bind(this,"selecthiringManager")} 
                            value={this.state.selecthiringManager}
                            >
                            {
                                this.state.hiringManager.map((item,key)=>{
                                    return <Option value={item} key={key}>{item}</Option>
                                })
                            }
                            </Select>
                        </div>
                    </div>
            </Sider>
            <Content style={{background:'white',padding:20}}>
                <Button type="primary" style={{float:'right'}}>创建新职位</Button>
                <div style={{width:'100%',height:440,paddingTop:10,overflow:'auto'}}>
                       
                       {
                           this.state.lists.map((item,key)=>{
                               return  <div key={key} style={{width:'100%',borderTop:'1px solid #f3f3f3',padding:'10px 20px 0',margin:0}}>
                               <div style={{display:'inline-block',width:'50%'}}>
                                   <div style={{verticalAlign:'top',marginBottom:17}} ><span>{item.jobname}</span> <Divider type="vertical" /><span>{item.department}</span></div>
                                   <div>
                                   <Icon type="environment-o" style={{marginRight:20}}/> 
                                   <span style={{marginRight:20}} onClick={this.edit.bind(this,item.uid)} ><Icon type="edit"/> 编辑</span>
                                   <span><Icon type="share-alt"/> 分享</span>  
                                   </div>
                               </div>
                               <div style={{display:'inline-block',width:'30%',verticalAlign:'top'}}>
                                   <p><span>候选人 {item.talent}</span> &emsp; <span>入职 {item.entry}</span></p>
                                   <p>创建于 {item.created.split(' ')[0]}</p>
                               </div>
                               <div style={{display:'inline-block',width:'20%',verticalAlign:'top'}}>{item.founder}</div>
                           </div>
                           })
                       }
                       
                       
                       
                        
                </div>
            </Content>
            </Layout>
        )
    }
}