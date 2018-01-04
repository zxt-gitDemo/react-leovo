import React, { Component } from 'react';
import { Layout,Select,Input,InputNumber,Checkbox,Button,Switch,Modal,message } from 'antd';
import { Link} from 'react-router-dom';
import Cookies from 'js-cookie'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

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
            recruitswitch:true,
            uid:'',
            created:'',
            updated:'',
            updstamp:'',
            delete:false
          }
    }
      componentDidMount(){
        let uid=this.props.match.params.id
        if(uid){
            this.selectjob(uid)
        }
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/public/getbas',{mode:'cors',method:'get'}).then(res => res.json()).then(res => {
            let {job,person,dept,address} = res.body
            this.setState({job:job,
                hiringManager:person,
                department:dept,
                workAddress:address
            })
        })
        fetch('/Local/common/data.json').then(res => res.json()).then(res => {
            let {workingLife,education,workNature} = res.data.basic
            this.setState({workingLife:workingLife})
            this.setState({education:education})
            this.setState({workNature:workNature})
        })

      }
    keep(){
       let created=this.state.created;
       let updated=this.state.updated;
       let updstamp=this.state.updstamp;
        if(this.state.uid===''){
            let newtime=moment(new Date).format('YYYY-MM-DD HH:mm:ss')
                 created=newtime;
                 updated=newtime;
                 updstamp=newtime;
        }
        let obj={
            uid:this.state.uid,
            jobname:this.state.jobname,
            created:created,
            updated:updated,
            updstamp:updstamp,
            shiringManager:this.state.shiringManager,
            scollaborators:this.state.scollaborator,
            addressuid:this.state.sworkAddress,
            deptuid:this.state.sdepartment,
            sworkingLife:this.state.sworkingLife,
            seducation:this.state.seducation,
            paymin:this.state.paymin,
            paymax:this.state.paymax,
            paymonth:this.state.paymonth,
            sworkNature:this.state.sworkNature,
            recruitnum:this.state.recruitnum,
            jobintroduce:this.state.jobintroduce,
            recruitShow:this.state.recruitShow,
            recruitswitch:this.state.recruitswitch,
            createPid:Cookies.get('id')
        }
        
        if(this.state.jobname==""){
            message.warning("职位名称不能为空", [1])
        }else{
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/job',{mode:'cors',method:'post',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body:JSON.stringify(obj),
            }).then(res => res.json()).then(res => {
                this.props.history.push('/home/jobs/newsecond')
        }).catch(()=>{
            message.error("保存失败", [1])
        })            
           
        }
    }
    setModal1Visible(modal1Visible) {
        if(this.deptname.input.value===''){
            message.warning('名称不能为空', [1])
        }else{
            fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/dept',{mode:'cors',method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"deptname":this.deptname.input.value}),
            }).then(res => res.json()).then(res => {
                message.success(res.message, [0.5])
                setTimeout((modal1Visible)=>{
                    this.setState({ modal1Visible ,
                    sdepartment:res.body.uid
                });
                },500)
             
            }).then(res=>{
                fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/public/getbas',{mode:'cors',method:'get'}).then(res => res.json()).then(res => {
                     let dept = res.body.dept
                     this.setState({department:dept})
    
                 })
            }).catch(()=>{
                message.error("添加失败", [1])
            })     
        }
        

      }
      setModal2Visible(modal2Visible) {
        if(this.address.input.value===''){
            message.warning('地址不能为空', [1])
        }else{
            fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/address',{mode:'cors',method:'post',
            headers: {'Content-Type': 'application/json'},        
            body:JSON.stringify({
                city: this.city.input.value,
                address:this.address.input.value
              })
            }).then(res => res.json()).then(res => {
                message.success(res.message, [0.5])
                    setTimeout((modal2Visible)=>{
                        this.setState({ modal2Visible ,
                            sworkAddress:res.body.uid
                        });
                    },500)
            }) .then(res=>{
                fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/public/getbas',{mode:'cors',method:'get'}).then(res => res.json()).then(res => {
                     let address = res.body.address
                     this.setState({workAddress:address})
    
                 })
            }).catch(()=>{
                message.error("添加失败", [1])
            })    
        }
        
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
    checkedchange(type,e){
        this.setState({
            [type]: e.target.checked,
        });
    }
    selectjob(v){
          this.setState({
              uid:v,
              delete:true
          })
          fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/job/'+v,{mode: 'cors',method:'get'}).then(res => res.json()).then(res => {
          let {jobname,shiringManager,scollaborators,addressuid,deptuid,sworkingLife,seducation} = res.body
            let {paymin,paymax,paymonth,sworkNature,recruitnum,jobintroduce,recruitShow,recruitswitch,created,updated,updstamp}=res.body
            this.setState({jobname:jobname})
            this.setState({shiringManager:shiringManager})
            this.setState({scollaborator:scollaborators})
            this.setState({sworkAddress:addressuid})
            this.setState({sdepartment:deptuid})
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
            this.setState({created:created})
            this.setState({updated:updated})
            this.setState({updstamp:updstamp})

        })
      }
      changeswitch(){
          this.setState({
            recruitswitch:!this.state.recruitswitch
          })
      }
      delete(){
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/job/'+this.state.uid,{mode: 'cors',method:'delete'}).then(res => res.json()).then(res => {
            message.success('删除成功', [0.5])            
            setTimeout(()=>{
                this.props.history.push('/home/jobs')
            },500)
        }).catch(()=>{
            message.error("删除失败", [1])
        })            
      }
    render(){
        let uid=this.props.match.params.id
        return(
            <Layout style={{background:'white',margin:'0 auto',width:'700px'}}>
                <div style={{width:'100%',height:'60px',borderBottom:'1px solid #ccc',lineHeight:'60px'}}>
                <Link to={"/home/jobs/newjob/"+uid} style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>01职位需求</Link>
                <Link to={"/home/jobs/newsecond/"+uid}  style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>02招聘渠道</Link>
                <Link to={"/home/jobs/newthird/"+uid} style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>03面试评价表</Link>
                    <span style={{width:'20%',textAlign:'center',display:'inline-block'}}>招聘状态&emsp;<Switch checked={this.state.recruitswitch} onChange={this.changeswitch.bind(this)} checkedChildren="招聘中" unCheckedChildren="未招聘"/></span>
                </div>
                <div style={{padding:10,height:460,overflow:'auto'}}>
                    <Select defaultValue="从现有职位复制职位信息"
                    onSelect={this.selectjob.bind(this)} 
                    style={{ width:'100%' }}>
                    {this.state.job.map((item,key)=>{
                        return  <Option value={item.uid} key={key}>{item.jobname}</Option>
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
                                return  <Option value={item.uid} key={key}>{item.personname}</Option>
                            })}
                            </Select>
                        </div>
                        <div style={{display:'inline-block',width:'48%'}}>
                            <div>协作人</div>
                            <Select mode="tags"
                                    style={{ width: '100%' }}   
                                    onChange={this.changeselect.bind(this,"scollaborator")} 
                                    value={this.state.scollaborator}>
                                 {this.state.hiringManager.map((item,key)=>{
                                    return  <Option value={item.uid} key={key}>{item.personname}</Option>
                                })}
                                </Select>
                        </div>
                    </div>
                    <div style={{marginBottom:20}}>
                    <div style={{width:'48%',display:'inline-block',marginRight:'4%'}}>
                    <div style={{position:'relative'}}>
                        <span>部门</span> 
                        <a style={{position:'absolute',top:0,right:0}} onClick={() => this.setState({modal1Visible:true})}>+新建工作部门</a>
                    </div>
                    <Select
                        showSearch
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        onChange={this.changeselect.bind(this,"sdepartment")} 
                        value={this.state.sdepartment}>
                        {this.state.department.map((item,key)=>{
                            return  <Option value={item.uid} key={key}>{item.deptname}</Option>
                        })}
                    </Select>
                </div>
                <div style={{display:'inline-block',width:'48%'}}>
                    <div style={{position:'relative'}}>
                        <span>工作地点</span> 
                        <a style={{position:'absolute',top:0,right:0}} onClick={() => this.setState({modal2Visible:true})}>+新建工作地点</a>
                    </div>
                    <Select
                        showSearch
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        onChange={this.changeselect.bind(this,"sworkAddress")} 
                        value={this.state.sworkAddress}>
                        {this.state.workAddress.map((item,key)=>{
                            return  <Option value={item.uid} key={key}>{item.address}</Option>
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
                    <Checkbox checked={this.state.recruitShow} onChange={this.checkedchange.bind(this,'recruitShow')} >是否在招聘主页显示</Checkbox>
                    <div style={{marginBottom:20}}>
                        <a style={{color:'red',display:this.state.delete===true?'inline-block':'none'}} onClick={this.delete.bind(this)} >删除</a>
                        <Button type="primary" value="large" style={{float:'right'}} onClick={this.keep.bind(this)}>保存</Button>
                    </div>
                    
                </div>
                <Modal
                    title="新建部门"
                    style={{ top: 20 }}
                    visible={this.state.modal1Visible}
                    onOk={() => this.setModal1Visible(false)}
                    onCancel={() => this.setState({modal1Visible:false})}
                    okText="保存"
                    cancelText="取消"
                    >
                    <div>部门名称<span style={{color:'red'}}>*</span></div>
                    <Input ref={(input) => { this.deptname = input; }}/>
                    </Modal>
                
                    <Modal
                    title="新建工作地点"
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setState({modal2Visible:false})}
                    okText="保存"
                    cancelText="取消"
                    >
                    <div>城市</div>
                    <Input ref={(input) => { this.city = input; }}/>
                    <div>详情地址<span style={{color:'red'}}>*</span></div>
                    <Input ref={(input) => { this.address = input; }}/>
                    </Modal>
            </Layout>
        )
    }
}
