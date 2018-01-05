import React, { Component } from 'react';
import {Layout,Icon,Menu,Divider,Select,Tabs,Upload,Tooltip,Tag, message,Dropdown,Radio , Button,Modal,Input,DatePicker,Checkbox } from 'antd';
import {Router, Route,Link,NavLink} from 'react-router-dom';
import Experience from './Experience'
import Interviewarrange from './Interviewarrange'
import Stepbar from './Stepbar'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(){
        alert('a')
    }
  };

export default class Talentinformation extends Component {
    constructor(props){
        super(props)
        this.state = {
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
            modal4Visible: false,  
            modal5Visible: false, 
            stepbarVisble:'none',               
            visible: false,
            tags: [],
            inputVisible: false,
            inputValue: '',
            basic:{},
            work:[],
            project:[],
            edu:[],
            jobs:[],
            startStepbar:'',
            applyJobs:[],
            selectjob:'总览',
            interview:[],
            newtime:new Date,
            workAddress:[],
            interviewarranges:[],
            arranges:[],
            date:'',
            mode:'',
            list:[],
            email:false,
            iaddress:'',
            notice:'',//通知候选人
            tabkey:'1',
       
        }
    }
   componentDidMount(){
    fetch('/Local/import/candidate.json').then(res => res.json()).then(res => {
        let basic = res.data
        let work=res.data.works;
        let project=res.data.projects;
        let edu=res.data.educations;
        this.setState({
            basic:basic,
            tags:res.data.label,
            work:work,
            project:project,
            edu:edu,
            applyJobs:res.data.applyJobs
            
        })      
    })
    fetch('/Local/job/job.json').then(res => res.json()).then(res => {
        let { job,workAddress} = res.data 
        this.setState({
            jobs:job,
            workAddress:workAddress,

        })     
    })
    fetch('/Local/interview/Interviewtime.json').then(res => res.json()).then(res => {
        let {interview} = res.data 
        this.setState({
            interview:interview
        })     
    })

   }
      setModal1Visible(modal1Visible,id) {
        this.setState({ modal1Visible });
        this.setState({
            interviewarranges:[],
            arranges:[]
        })
        console.log(id)
        fetch('./Interviewtime.json').then(res => res.json()).then(res => {
            let {date,mode,list,email,iaddress} = res.data.interview[0]
            this.setState({
                date:date,
                mode:mode,
                list:list,
                email:email,
                iaddress:iaddress
            },function(){
                this.setState({interviewarranges:this.state.list},function(){
                    let list=this.state.arranges;
                    for( let w=0;w<this.state.interviewarranges.length;w++){
                        list.push(<Interviewarrange key={this.state.arranges.length} list={this.state.interviewarranges[w]} index={this.state.arranges.length} del={(n)=>this.deleteinterview(n)} editinterview={(arrindex,value,type)=>this.editinterview(arrindex,value,type)} />)
                        this.setState({arranges:list})
                    }
                })
            })     
        })
      }
      setModal2Visible(modal2Visible,id) {
        this.setState({
            notice:''
        })
        this.setState({ modal2Visible });
      }
      setModal3Visible(modal3Visible) {
        this.setState({ modal3Visible });
      }
      setModal4Visible(modal4Visible) {
        this.setState({ modal4Visible });
      }
      setModal5Visible(modal5Visible) {
        this.setState({ modal5Visible });
      }
      handleMenuClick = (e) => {
        if (e.key === '3') {
          this.setState({ visible: false });
        }
      }
      handleVisibleChange = (flag) => {
        this.setState({ visible: flag });
      }
      handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
      }
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      }
    
      handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
      }
    
      handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
      }
      start(value){
          this.setState({
            startStepbar:value,

          })
      }
      firmjob(){
        setTimeout(()=>{
            this.setState({
                stepbarVisble:'block'
              })
          },800)
      }
      viewjob(value){
        this.setState({
            selectjob:value,

          })
          setTimeout(()=>{
            this.setState({
                stepbarVisble:'block'
              })
          },800)
      }

      addinterview(){
        let interviewarranges=this.state.interviewarranges;
        interviewarranges.push(
            {
                name:'',
                date:'',
                time:'',
                Interviewer:[],
                Inisfeed:[]

            }
        )
        let arranges=this.state.arranges;
        arranges.push(<Interviewarrange key={this.state.arranges.length} list={this.state.interviewarranges} index={this.state.arranges.length} del={(n)=>this.deleteinterview(n)} editinterview={(arrindex,value,type)=>this.editinterview(arrindex,value,type)} />)
        this.setState({arranges:arranges})
        
    }
    editinterview(arrindex,value,type){
        let interviewarranges=this.state.interviewarranges;    
        if(type==="Interviewer"){
            interviewarranges[arrindex][type]=value;
            interviewarranges[arrindex]['Inisfeed']=[]
            interviewarranges[arrindex][type].map((item,index)=>{
                let obj={name:item,isfeedback:false}
                let isfeedback= interviewarranges[arrindex]['Inisfeed']
                isfeedback.push(obj)
            })
            
        }else{
            interviewarranges[arrindex][type]=value;
        }
        this.setState({
            interviewarranges:interviewarranges
        })
    }
  deleteinterview(n){
    this.state.arranges.splice(n, 1,"");
    this.setState({
        arranges:this.state.arranges
    })
    this.state.interviewarranges.splice(n, 1,"");
    this.setState({
        interviewarranges:this.state.interviewarranges
    })
 
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

  }
  clicktab(key){
      this.setState({
        tabkey:key
      })
  }
      saveInputRef = input => this.input = input
    render(){
          const { tags, inputVisible, inputValue } = this.state;
          let basic=this.state.basic
        return (
            <Layout style={{marginLeft:300}}>
            <Content style={{background:'white',padding:20,height:'520px'}}>
                <div style={{position:'relative'}}>
                    <h1 style={{display:'inline-block',marginRight:20}}>{basic.candidate}</h1><span>渠道：{basic.channel}</span>
                    <a style={{position:'absolute',top:15,right:0}}><Icon type="edit"/>编辑</a>
                </div>
                <div style={{marginBottom:20}}>
                    <div style={{display:'inline-block',width:'50%'}}>
                        <span>{basic.job}</span>
                        <Divider type="vertical" />
                        <span>{basic.company}</span>
                    </div>
                    <div style={{display:'inline-block',width:'50%'}}>
                        <Icon type="mail"/> <span>{basic.email}</span>
                    </div>
                </div>
                <div style={{marginBottom:20}}>
                    <div style={{display:'inline-block',width:'50%'}}>
                        <span>{basic.address}</span>
                        <Divider type="vertical" />
                        <span>{basic.sex}</span>
                        <Divider type="vertical" />
                        <span>{basic.age}岁</span>       
                        <Divider type="vertical" />
                        <span>{basic.education}</span>                                         
                    </div>
                    <div style={{display:'inline-block',width:'50%'}}>
                        <Icon type="phone"/> <span>{basic.phone}</span>
                    </div>
                </div>
                <div>
                <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
                </div>
                <div>
                <Tabs activeKey={this.state.tabkey} onChange={this.clicktab.bind(this)}>
                    <TabPane tab="基本信息" key="1">
                    <div>
                        <div style={{display:'inline-block',width:'20%',textAlign:'center',verticalAlign:'top'}}>
                            工作经历
                        </div>
                        <div style={{display:'inline-block',width:'80%'}}>
                        {
                            this.state.work.map((item,key)=>{
                                return <Experience key={key} title={item.cname} job={item.jobname} content={item.workcontent} timestart={item.datastart} timeend={item.dataend}/>
                            })
                        }
                           
                        </div>
                        <hr/>
                    </div>
                    <div>
                        <div style={{display:'inline-block',width:'20%',textAlign:'center',verticalAlign:'top'}}>
                            项目经验
                        </div>
                        <div style={{display:'inline-block',width:'80%'}}>
                        {
                            this.state.project.map((item,key)=>{
                                return <Experience key={key} title={item.pname} job={item.role} content={item.projectcontent} timestart={item.datastart} timeend={item.dataend}/>
                            })
                        }
                        </div>
                        <hr/>
                    </div>
                    <div>
                        <div style={{display:'inline-block',width:'20%',textAlign:'center',verticalAlign:'top'}}>
                            教育背景
                        </div>
                        <div style={{display:'inline-block',width:'80%'}}>
                        {
                            this.state.edu.map((item,key)=>{
                                return <Experience key={key} title={item.eduname} job={item.education} content={item.major} timestart={item.datastart} timeend={item.dataend}/>
                            })
                        }
                        </div>
                        <hr/>
                    </div>
                    </TabPane>
                    <TabPane tab="原始简历" key="2" >
                    <div>
                        <Upload {...props} 
                        >
                            <Button style={{width:'700px',background:'#ccc'}}>
                            <Icon type="plus" /> 添加附件
                            </Button>
                        </Upload>
                    </div>
                    </TabPane>
                    <TabPane tab="面试" key="3">
                    <div  style={{textAlign:'center'}}>
                    <Button type="primary" size={'large'} onClick={() => this.setState({modal1Visible:true,date:'',mode:'',list:[],email:'',iaddress:''})}><Icon type="plus"/>新建面试</Button>
                    </div>
                    {this.state.interview.map((item,key)=>{
                        return <div key={key} style={{marginTop:20}}>
                        <h2 style={{color:'#33A8DF'}}>{item.jobname}</h2>
                        <div style={{position:'relative'}}>
                            <span style={{color:'lightgray'}}>{item.date} {item.week} {item.mode}</span>
                            <span style={{position:'absolute',top:0,right:0}}>
                            <a >取消面试</a>
                            &emsp;&emsp;
                            <Dropdown overlay={<Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1" ><div onClick={() => this.setModal1Visible(true,item.jobname)}>编辑</div></Menu.Item>
              <Menu.Item key="2"><div onClick={() => this.setModal2Visible(true,item.jobname)}>通知候选人</div></Menu.Item>
            </Menu>}
                                    onVisibleChange={this.handleVisibleChange}
                                    visible={this.state.visible}
                                >
                                    <a className="ant-dropdown-link">
                                    更多操作 <Icon type="down" />
                                    </a>
                                </Dropdown>
                            </span>
                        </div>
                        {item.list.map((item,key)=>{
                            return <div style={{marginTop:30}} key={key}>
                            <div style={{background:'#F3F3F3',borderBottom:'1px solid #ccc',width:'100%',height:'50px',lineHeight:'50px',padding:'0 20px'}}>
                                <Button size={'small'}>{item.name}</Button>
                                <span >{item.date}</span>
                                <span style={{float:'right'}}>时长 <Icon type="time"/>{item.time}</span>
                            </div>
                            <div style={{clear:'both'}}></div>
                            {item.Interviewer.map((item,key)=>{
                                return <div key={key} style={{background:'#EAEAEA',width:'100%',height:'50px',lineHeight:'50px',padding:'0 20px',borderBottom:'1px solid black'}}>
                                <Icon type="user" style={{color:'black'}}/> <span>{item}</span> 
                                <Button type="primary" style={{float:'right',marginTop:8}} onClick={() => this.setModal3Visible(true)}>反馈</Button>
                                </div> 
                            })}
                            
                        </div>
                        })}
                        
                    </div>
                    })}
                    
                    </TabPane>
                    <TabPane tab="Offer" key="4">
                    <div  style={{textAlign:'center'}}>
                    <Button type="primary" size={'large'} onClick={() => this.setModal4Visible(true)}><Icon type="plus"/>新建Offer</Button>
                    </div>
                    <div style={{marginTop:30}}>
                        <div>
                            <span style={{marginRight:100}}>Offer职位</span><span>设计师</span>
                        </div>
                        <div>
                            <span style={{marginRight:100}}>入职日期</span><span>2017年12月19日 星期二</span>
                        </div>
                        <div>
                            <span style={{marginRight:100}}>薪资待遇</span><span>月薪 ¥ 20000 × 15 月</span>
                        </div>
                        <div>
                            <span style={{marginRight:100}}>工作地点</span><span>石河子</span>
                        </div>
                        <hr/>
                        <div style={{display:'flex',justifyContent:'space-around'}}>
                            <Button onClick={() => this.setModal5Visible(true)}>发起审批</Button>
                            <Button onClick={() => this.setModal2Visible(true)}>通知候选人</Button>
                            <Button onClick={() => this.setModal4Visible(true)}>编辑offer</Button>
                            <Button><Icon type="delete"/></Button>
                        </div>
                        
                    </div>
                    </TabPane>
                    <TabPane tab="备注" key="5">
                    <TextArea rows={4} value="" placeholder="添加备注"/>
                    <Button type="primary" style={{marginTop:10}} >保存</Button>
                    
                    </TabPane>
                    <TabPane tab="历史记录" key="6">
                        <div style={{marginTop:30,padding:20,background:'#f3f3f3'}}>
                            <div style={{display:'flex',justifyContent:'pace-between'}}>
                                <span>123</span>
                                <span>设计师</span>
                            </div>
                            <div>123对2017年12月13日 星期三 上午 10:00的现场面试安排进行了修改</div>
                            <div style={{color:'lightgray'}}>2017-12-13 15:33</div>
                        </div>
                    </TabPane>
                </Tabs>
                </div>
            </Content>
            <Modal
                    title="面试"
                    style={{ top: 20}}
                    visible={this.state.modal1Visible}
                    onOk={() => this.setModal1Visible(false)}
                    onCancel={() => this.setState({modal1Visible:false})}
                    okText="保存"
                    cancelText="取消"
                    width="700px"
                    >
                    <div>
                    <div style={{width:'32%',display:'inline-block',marginRight:'2%'}}>
                        <div>基本信息</div>
                        <DatePicker
                                value={moment(this.state.date?this.state.date:this.state.newtime, 'MM-DD')}
                                showTime
                                format="YYYY-MM-DD"
                                style={{width:'100%'}}
                                />
                    </div>
                    <div style={{width:'32%',display:'inline-block',marginRight:'2%'}}>

                        <Select style={{ width:'100%' }}
                        onChange={(value)=>this.setState({mode:value})}
                        value={this.state.mode?this.state.mode:'现场面试'}
                        >
                                <Option value="现场面试">现场面试</Option>
                                <Option value="电话面试">电话面试</Option>
                                <Option value="视频面试">视频面试</Option>
                        </Select>
                    </div>

                    <div style={{width:'32%',display:'inline-block'}}>
                        <Select defaultValue="其他" style={{ width:'100%' }}>
                            {this.state.workAddress.map((item,key)=>{
                              return  <Option value={item} key={key} >{item}</Option>  
                            })}
                        </Select>
                    </div>
                    
                </div>
                <div>
                    <div>时间与面试官</div>
                {this.state.arranges.map((item,key)=>{
                    return <div key={key}>{item}</div>
                })}
                    <Button style={{width:"100%",margin:'10px 0'}} onClick={this.addinterview.bind(this)} ><Icon type="plus"/>添加面试</Button>
                </div>
                <div>
                <Checkbox checked={this.state.email} >邮件通知候选人</Checkbox>
                </div>
            </Modal>
                    <Modal
                    title="通知候选人"
                    visible={this.state.modal2Visible}
                    onOk={() => this.setState({modal2Visible:false})}
                    onCancel={() => this.setState({modal2Visible:false})}
                    okText="保存"
                    cancelText="取消"
                    >
                    <TextArea rows={4} value={this.state.notice} onChange={(e)=>this.setState({notice:e.target.value})} />
                    </Modal>  
                    <Modal
                    title="面试反馈"
                    visible={this.state.modal3Visible}
                    onOk={() => this.setModal3Visible(false)}
                    onCancel={() => this.setModal3Visible(false)}
                    okText="保存"
                    cancelText="取消"
                    >
                    <div>综合评价</div>
                    <TextArea rows={4} onChange={this.inputchange.bind(this,"notice")} value={this.state.notice}  />
                    <div style={{marginTop:30}}>
                    <RadioGroup defaultValue="a" size="large">
                        <RadioButton value="a">非常合适</RadioButton>
                        <RadioButton value="b">合适</RadioButton>
                        <RadioButton value="c">不合适</RadioButton>
                        <RadioButton value="d">非常不合适</RadioButton>
                    </RadioGroup>
                    </div>
                    </Modal>
                    <Modal
                    title="新建Offer"
                    visible={this.state.modal4Visible}
                    onOk={() => this.setModal4Visible(false)}
                    onCancel={() => this.setModal4Visible(false)}
                    okText="保存"
                    cancelText="取消"
                    width="700px"
                    >
                    <div>
                        <div>Offer职位</div>
                        <Input/>
                    </div>
                    <div>
                        <div>入职日期</div>
                        <DatePicker
                                showTime
                                format="YYYY-MM-DD"
                                style={{width:'100%'}}
                        />
                    </div>
                    <div>
                        <div>薪资待遇</div>
                        <Input addonAfter={'K/月'} defaultValue="" style={{width:'48%'}}/>
                        <span> ~ </span>
                        <Input addonAfter={'K/月'} defaultValue="" style={{width:'48%'}}/>
                    </div>
                    <div>
                        <div>其他福利</div>
                        <Input/>
                    </div>
                    <div>
                        <div>工作地点</div>
                        <Select defaultValue="" style={{ width:'100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled">Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                    </div>
                    <div><Checkbox >邮件通知候选人</Checkbox></div>
                    </Modal>
                    <Modal
                    title="发起审批"
                    visible={this.state.modal5Visible}
                    onOk={() => this.setModal5Visible(false)}
                    onCancel={() => this.setModal5Visible(false)}
                    okText="保存"
                    cancelText="取消"
                    >
                    <div>审批人<span style={{color:'red'}}>*</span></div>
                    <Select
                    showSearch
                    optionFilterProp="children"
                    style={{ width: '100%' }}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
                   <div>备注</div>
                    <TextArea rows={4} value=""/>
                    </Modal>
                   
                   
            <Sider width={350} style={{background:'#F3F3F3',padding:10}}>
            <div>
            <div>候选人已申请<span>{this.state.applyJobs.length}</span>个职位，当前查看的职位：</div>
            <Select style={{ width:'100%' }} onSelect={this.viewjob.bind(this)} value={this.state.selectjob}>
                {
                    this.state.applyJobs.map((item,key)=>{
                        return <Option value={item} key={key}>{item}</Option>                        
                    })
                }     
            </Select>
            <hr/>
            <div style={{display:this.state.stepbarVisble==='block'?'none':'block'}}>
            <div>开启新的面试流程</div>
            <div>
                <Select style={{ width:'80%' }} onSelect={this.start.bind(this)} value={this.state.startStepbar}>
                {
                    this.state.jobs.map((item,key)=>{
                        return <Option value={item} key={key}>{item}</Option>                        
                    })
                }
                </Select>
                <Button style={{width:'20%'}} type="primary" onClick={this.firmjob.bind(this)} >确定</Button>
            </div>
            </div>
            </div>
            <div style={{display:this.state.stepbarVisble}}>
                <Stepbar/>
            </div>
                  
            </Sider>
            </Layout>
        )
    }
}