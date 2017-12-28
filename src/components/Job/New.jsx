import React, { Component } from 'react';
import { Layout,Select,Input,InputNumber,Checkbox,Button,Switch,Modal,message} from 'antd';
import {Router, Route,Link,NavLink} from 'react-router-dom';
const Option = Select.Option;
const { TextArea } = Input;

export default class Newjob extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal1Visible: false,
            modal2Visible: false,
            job:[],
            hiringManager:[],
            collaborator:[],
            department:[],
            workAddress:[],
            workingLife:[],
            education:[],
            workNature:[],
            jobname:'',
            shiringManager:'',
            scollaborator:[],
            sworkAddress:'',
            sdepartment:'',
            sworkingLife:'',
            seducation:'',
            paymin:'',
            paymax:'',
            paymonth:'',
            sworkNature:'',
            recruitnum:'',
            jobintroduce:'',
            recruitShow:true,
            recruitswitch:true
          }
    }
      componentDidMount(){
        fetch('Local/job/job.json').then(res => res.json()).then(res => {
            let {job,hiringManager,collaborator,department,workAddress} = res.data
            this.setState({job:job})
            this.setState({hiringManager:hiringManager})
            this.setState({collaborator:collaborator})
            this.setState({department:department})
            this.setState({workAddress:workAddress})
        })
        fetch('Local/common/data.json').then(res => res.json()).then(res => {
            let {workingLife,education,workNature} = res.data.basic
            this.setState({workingLife:workingLife})
            this.setState({education:education})
            this.setState({workNature:workNature})
        })
      }
    keep(){
        let jobname=this.state.jobname;
        let shiringManager=this.state.shiringManager;
        let scollaborator=this.state.scollaborator;
        let sworkAddress=this.state.sworkAddress;
        let sdepartment=this.state.sdepartment;
        let sworkingLife=this.state.sworkingLife;
        let seducation=this.state.seducation;
        let paymin=this.state.paymin;
        let paymax=this.state.paymax;
        let paymonth=this.state.paymonth;
        let sworkNature=this.state.sworkNature;
        let recruitnum=this.state.recruitnum;
        let jobintroduce=this.state.jobintroduce;
        let recruitShow=this.state.recruitShow;
        let recruitswitch=this.state.recruitswitch;
        if(jobname==""){
            message.warning("职位名称不能为空", [1])
        }else{
            console.log(this.state)
            // this.props.history.push('/home/jobs/newsecond')
        }
        
        
    }
    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
      }
      setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
      }
      
      changeselect(type,value){
        this.setState({
            [type]: value,
          });
      }
      inputchange(type,e){
        this.setState({
          [type]: e.target.value,
        });
    }//修改input框输入的值到状态里
      selectjob(v){
          //传入参数请求
        fetch('Local/job/selectjob.json').then(res => res.json()).then(res => {
            let {jobname,shiringManager,scollaborator:scollaborator,sworkAddress,sdepartment,sworkingLife,seducation} = res.data
            let {paymin,paymax,paymonth,sworkNature,recruitnum,jobintroduce,recruitShow,recruitswitch}=res.data
            this.setState({jobname:jobname})
            this.setState({shiringManager:shiringManager})
            this.setState({scollaborator:scollaborator})
            this.setState({sworkAddress:sworkAddress})
            this.setState({sdepartment:sdepartment})
            this.setState({sworkingLife:sworkingLife})
            this.setState({seducation:seducation})
            this.setState({paymin:paymin})
            this.setState({paymax:paymax})
            this.setState({paymonth:paymonth})
            this.setState({sworkNature:sworkNature})
            this.setState({recruitnum:recruitnum})
            this.setState({jobintroduce:jobintroduce})
            this.setState({recruitShow:recruitShow})
            this.setState({recruitswitch:recruitswitch})
        })
      }
      changeswitch(){
          this.setState({
            recruitswitch:!this.state.recruitswitch
          })
      }
    render(){
        return(
            <Layout style={{background:'white',margin:'0 auto',width:'700px'}}>
                <div style={{width:'100%',height:'60px',borderBottom:'1px solid #ccc',lineHeight:'60px'}}>
                <Link to="/home/jobs/newjob" style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>01职位需求</Link>
                <Link to="/home/jobs/newsecond"  style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>02招聘渠道</Link>
                <Link to="/home/jobs/newthird" style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>03面试评价表</Link>
                    <span style={{width:'20%',textAlign:'center',display:'inline-block'}}>招聘状态&emsp;<Switch checked={this.state.recruitswitch} onChange={this.changeswitch.bind(this)} checkedChildren="招聘中" unCheckedChildren="未招聘"/></span>
                </div>
                <div style={{padding:10,height:460,overflow:'auto'}}>
                    <Select defaultValue="从现有职位复制职位信息"
                    onSelect={this.selectjob.bind(this)} 
                    style={{ width:'100%' }}>
                    {this.state.job.map((item,key)=>{
                        return  <Option value={item} key={key}>{item}</Option>
                    })}
                    </Select>
                    <hr/>
                    <div style={{marginBottom:20}}>
                    <div>职位名称<span style={{color:'red'}}>*</span></div>
                    <Input onChange={this.inputchange.bind(this,"jobname")} value={this.state.jobname}/>
                    </div>
                   
                    
                    <div  style={{marginBottom:20}}>
                        <div style={{width:'48%',display:'inline-block',marginRight:'4%'}}>
                            <div>招聘负责人</div>
                            <Select defaultValue="" style={{ width:'100%' }}
                            onChange={this.changeselect.bind(this,"shiringManager")} 
                            value={this.state.shiringManager}>
                            {this.state.hiringManager.map((item,key)=>{
                                return  <Option value={item} key={key}>{item}</Option>
                            })}
                            </Select>
                        </div>
                        <div style={{display:'inline-block',width:'48%'}}>
                            <div>协作人</div>
                            <Select mode="tags"
                                    style={{ width: '100%' }}   
                                    onChange={this.changeselect.bind(this,"scollaborator")} 
                                    value={this.state.scollaborator}>
                                 {this.state.collaborator.map((item,key)=>{
                                    return  <Option value={item} key={key}>{item}</Option>
                                })}
                                </Select>
                        </div>
                    </div>
                    <div style={{marginBottom:20}}>
                    <div style={{width:'48%',display:'inline-block',marginRight:'4%'}}>
                    <div style={{position:'relative'}}>
                        <span>部门</span> 
                        <a style={{position:'absolute',top:0,right:0}} onClick={() => this.setModal1Visible(true)}>+新建工作部门</a>
                    </div>
                    <Select
                        showSearch
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        onChange={this.changeselect.bind(this,"sdepartment")} 
                        value={this.state.sdepartment}>
                        {this.state.department.map((item,key)=>{
                            return  <Option value={item} key={key}>{item}</Option>
                        })}
                    </Select>
                </div>
                <div style={{display:'inline-block',width:'48%'}}>
                    <div style={{position:'relative'}}>
                        <span>工作地点</span> 
                        <a style={{position:'absolute',top:0,right:0}} onClick={() => this.setModal2Visible(true)}>+新建工作地点</a>
                    </div>
                    <Select
                        showSearch
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        onChange={this.changeselect.bind(this,"sworkAddress")} 
                        value={this.state.sworkAddress}>
                        {this.state.workAddress.map((item,key)=>{
                            return  <Option value={item} key={key}>{item}</Option>
                        })}
                    </Select>
                </div>
                    </div>
                     <div style={{marginBottom:20}}>
                        <div style={{width:'48%',display:'inline-block',marginRight:'4%'}}>
                            <div>工作经验</div>
                            <Select defaultValue="" style={{ width:'100%' }}
                            onChange={this.changeselect.bind(this,"sworkingLife")} 
                            value={this.state.sworkingLife}>
                            {this.state.workingLife.map((item,key)=>{
                            return  <Option value={item} key={key}>{item}</Option>
                        })}
                            </Select>
                        </div>
                        <div style={{display:'inline-block',width:'48%'}}>
                            <div>学历要求</div>
                            <Select defaultValue="" style={{ width:'100%' }}
                             onChange={this.changeselect.bind(this,"seducation")} 
                             value={this.state.seducation}>
                            {this.state.education.map((item,key)=>{
                                return  <Option value={item} key={key}>{item}</Option>
                            })}
                    </Select>
                        </div>
                    </div>
                    <div style={{marginBottom:20}}>
                    <div>
                    薪资范围
                    </div>
                    
                    <Input addonAfter={'K/月'} defaultValue="" style={{width:'32%'}}
                    onChange={this.inputchange.bind(this,"paymin")} value={this.state.paymin}/>
                    <span> ~ </span>
                    <Input addonAfter={'K/月'} defaultValue="" style={{width:'30%'}}
                    onChange={this.inputchange.bind(this,"paymax")} value={this.state.paymax}/>
                    <span> * </span><Input addonAfter={'K/月'} defaultValue="" style={{width:'32%'}}
                    onChange={this.inputchange.bind(this,"paymonth")} value={this.state.paymonth}/>
                    </div>
                    <div style={{marginBottom:20}}>
                        <div style={{width:'48%',display:'inline-block',marginRight:'4%'}}>
                            <div>工作性质</div>
                            <Select defaultValue="请选择" style={{ width:'100%' }}
                            onChange={this.changeselect.bind(this,"sworkNature")} 
                            value={this.state.sworkNature}>
                            {this.state.workNature.map((item,key)=>{
                                return  <Option value={item} key={key}>{item}</Option>
                            })}
                            </Select>
                        </div>
                        <div style={{display:'inline-block',width:'48%'}}>
                            <div>招聘人数</div>
                            <InputNumber style={{width:'100%'}} onChange={this.changeselect.bind(this,"recruitnum")} value={this.state.recruitnum}/>
                        </div>
                    </div>
                    <div style={{marginBottom:20}}>
                        <div>
                            职位介绍
                        </div>
                        <TextArea rows={4} onChange={this.inputchange.bind(this,"jobintroduce")} value={this.state.jobintroduce}/>
                    </div>
                    <Checkbox checked={this.state.recruitShow}>是否在招聘主页显示</Checkbox>
                    <div style={{marginBottom:20}}>
                        <a style={{color:'red',display:'none'}}>删除</a>
                        <Button type="primary" value="large" style={{float:'right'}} onClick={this.keep.bind(this)}>保存</Button>
                    </div>
                    
                </div>
                <Modal
                    title="新建部门"
                    style={{ top: 20 }}
                    visible={this.state.modal1Visible}
                    onOk={() => this.setModal1Visible(false)}
                    onCancel={() => this.setModal1Visible(false)}
                    okText="保存"
                    cancelText="取消"
                    >
                    <div>部门名称<span style={{color:'red'}}>*</span></div>
                    <Input/>
                    </Modal>
                
                    <Modal
                    title="新建工作地点"
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                    okText="保存"
                    cancelText="取消"
                    >
                    <div>城市</div>
                    <Input/>
                    <div>详情地址<span style={{color:'red'}}>*</span></div>
                    <Input/>
                    </Modal>
            </Layout>
        )
    }
}
