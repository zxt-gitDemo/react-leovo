import React, { Component } from 'react';
import {Layout,Icon,Menu,Divider,Select,Tabs,Upload,Tooltip,Tag, message,Dropdown,Radio , Button,Modal,Input,DatePicker,Checkbox } from 'antd';
import {Router, Route,Link,NavLink} from 'react-router-dom';
import Experience from './Experience'
import Stepbar from './Stepbar'
import InterviewStrat from './InterviewStrat'
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
            visible: false,
            tags: [],
            inputVisible: false,
            inputValue: '',
            basic:{},
            work:[],
            project:[],
            edu:[]
          }
    }
   componentDidMount(){
    fetch('./information/resume.json').then(res => res.json()).then(res => {
        let basic = res.data.basic
        let work=res.data.basic.experrience.work;
        let project=res.data.basic.experrience.project;
        let edu=res.data.basic.experrience.edu;
        this.setState({basic:basic})
        this.setState({tags:res.data.basic.label})
        this.setState({work:work})
        this.setState({project:project})
        this.setState({edu:edu})        
     
    })
   }
      setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
      }
      setModal2Visible(modal2Visible) {
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
    
      saveInputRef = input => this.input = input
    render(){
   
        const menu = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1" ><div onClick={() => this.setModal1Visible(true)}>编辑</div> </Menu.Item>
              <Menu.Item key="2"><div onClick={() => this.setModal2Visible(true)}>通知候选人</div></Menu.Item>
            </Menu>
          );
          const { tags, inputVisible, inputValue } = this.state;
          let basic=this.state.basic
        return (
            <Layout style={{marginLeft:300}}>
            <Content style={{background:'white',padding:20,height:'500px'}}>
                <div style={{position:'relative'}}>
                    <h1 style={{display:'inline-block',marginRight:20}}>{basic.name}</h1><span>渠道：{basic.channel}</span>
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
                        <span>{basic.company}</span>
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
                <Tabs defaultActiveKey="1">
                    <TabPane tab="基本信息" key="1">
                    <div>
                        <div style={{display:'inline-block',width:'20%',textAlign:'center',verticalAlign:'top'}}>
                            工作经历
                        </div>
                        <div style={{display:'inline-block',width:'80%'}}>
                        {
                            this.state.work.map((item,key)=>{
                                return <Experience title={item.title} job={item.name} content={item.content} time={item.time}/>
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
                                return <Experience title={item.title} job={item.name} content={item.content} time={item.time}/>
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
                                return <Experience title={item.title} job={item.name} content={item.content} time={item.time}/>
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
                    <Button type="primary" size={'large'} onClick={() => this.setModal1Visible(true)}><Icon type="plus"/>新建面试</Button>
                    </div>
                    <p>
                        <h2 style={{color:'#33A8DF'}}>设计师</h2>
                        <p style={{position:'relative'}}>
                            <span style={{color:'lightgray'}}>12月13日 星期三 现场面试</span>
                            <span style={{position:'absolute',top:0,right:0}}>
                            <a >取消面试</a>
                            &emsp;&emsp;
                            <Dropdown overlay={menu}
                                    onVisibleChange={this.handleVisibleChange}
                                    visible={this.state.visible}
                                >
                                    <a className="ant-dropdown-link">
                                    更多操作 <Icon type="down" />
                                    </a>
                                </Dropdown>
                            </span>
                        </p>
                        <div style={{marginTop:30}}>
                            <div style={{background:'#F3F3F3',borderBottom:'1px solid #ccc',width:'100%',height:'50px',lineHeight:'50px',padding:'0 20px'}}>
                                <Button size={'small'}>初试</Button>
                                <span >中午 12：15</span>
                                <span style={{float:'right'}}>时长 <Icon type="time"/>2小时30分钟</span>
                            </div>
                            <div style={{clear:'both'}}></div>
                            <div style={{background:'#EAEAEA',width:'100%',height:'50px',lineHeight:'50px',padding:'0 20px'}}>
                            <Icon type="user" style={{color:'black'}}/> <span>123</span> 
                            <Button type="primary" style={{float:'right',marginTop:8}} onClick={() => this.setModal3Visible(true)}>反馈</Button>
                            </div> 
                        </div>
                        
                    </p>
                    </TabPane>
                    <TabPane tab="Offer" key="4">
                    <div  style={{textAlign:'center'}}>
                    <Button type="primary" size={'large'} onClick={() => this.setModal4Visible(true)}><Icon type="plus"/>新建Offer</Button>
                    </div>
                    <div style={{marginTop:30}}>
                        <p>
                            <span style={{marginRight:100}}>Offer职位</span><span>设计师</span>
                        </p>
                        <p>
                            <span style={{marginRight:100}}>入职日期</span><span>2017年12月19日 星期二</span>
                        </p>
                        <p>
                            <span style={{marginRight:100}}>薪资待遇</span><span>月薪 ¥ 20000 × 15 月</span>
                        </p>
                        <p>
                            <span style={{marginRight:100}}>工作地点</span><span>石河子</span>
                        </p>
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
                            <p style={{display:'flex',justifyContent:'pace-between'}}>
                                <span>123</span>
                                <span>设计师</span>
                            </p>
                            <p>123对2017年12月13日 星期三 上午 10:00的现场面试安排进行了修改</p>
                            <p style={{color:'lightgray'}}>2017-12-13 15:33</p>
                        </div>
                    </TabPane>
                </Tabs>
                </div>
            </Content>
            <Modal
                    title="新建面试"
                    style={{ top: 20}}
                    visible={this.state.modal1Visible}
                    onOk={() => this.setModal1Visible(false)}
                    onCancel={() => this.setModal1Visible(false)}
                    okText="保存"
                    cancelText="取消"
                    width="700px"
                    >
                    <p>
                    <div style={{width:'32%',display:'inline-block',marginRight:'2%'}}>
                        <div>基本信息</div>
                        <DatePicker
                                showTime
                                format="YYYY-MM-DD"
                                style={{width:'100%'}}
                                />
                    </div>
                    <div style={{width:'32%',display:'inline-block',marginRight:'2%'}}>

                        <Select defaultValue="其他" style={{ width:'100%' }}>
                                <Option value="jack">男</Option>
                                <Option value="lucy">女</Option>
                                <Option value="disabled">其他</Option>
                        </Select>
                    </div>
                    <div style={{width:'32%',display:'inline-block'}}>
                        <Select defaultValue="其他" style={{ width:'100%' }}>
                                <Option value="jack">男</Option>
                                <Option value="lucy">女</Option>
                                <Option value="disabled">其他</Option>
                        </Select>
                    </div>
                    
                </p>
                <p>
                    <div>时间与面试官</div>
                    <p>
                    <div style={{width:'18%',display:'inline-block',marginRight:'2%'}}>
                        <Select defaultValue="上午 10:00" style={{ width:'100%' }}>
                                <Option value="jack">男</Option>
                                <Option value="lucy">女</Option>
                                <Option value="disabled">其他</Option>
                        </Select>
                    </div>
                    <div style={{width:'18%',display:'inline-block',marginRight:'2%'}}>
                        <Select defaultValue="30分钟" style={{ width:'100%' }}>
                                <Option value="jack">男</Option>
                                <Option value="lucy">女</Option>
                                <Option value="disabled">其他</Option>
                        </Select>
                    </div>
                    <div style={{width:'18%',display:'inline-block',marginRight:'2%'}}>
                        <Select defaultValue="初试" style={{ width:'100%' }}>
                                <Option value="jack">男</Option>
                                <Option value="lucy">女</Option>
                                <Option value="disabled">其他</Option>
                        </Select>
                    </div>
                    <div style={{width:'30%',display:'inline-block',marginRight:'2%'}}>
                    <Select
                            showSearch
                            optionFilterProp="children"
                            style={{ width: '100%' }}
                            mode="tags"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </div>
                        <div style={{width:'5%',display:'inline-block'}}>
                            <Button><Icon type="delete"/></Button>
                        </div>
                    </p>
                    <Button style={{width:"100%"}}><Icon type="plus"/>添加面试</Button>
                </p>
                <p>
                <Checkbox >邮件通知候选人</Checkbox>
                </p>
            </Modal>
                    <Modal
                    title="通知候选人"
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                    okText="保存"
                    cancelText="取消"
                    >
                    <TextArea rows={4} value="aaasda"/>
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
                    <TextArea rows={4} value=""/>
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
                    <p>
                        <div>Offer职位</div>
                        <Input/>
                    </p>
                    <p>
                        <div>入职日期</div>
                        <DatePicker
                                showTime
                                format="YYYY-MM-DD"
                                style={{width:'100%'}}
                        />
                    </p>
                    <p>
                        <div>薪资待遇</div>
                        <Input addonAfter={'K/月'} defaultValue="" style={{width:'48%'}}/>
                        <span> ~ </span>
                        <Input addonAfter={'K/月'} defaultValue="" style={{width:'48%'}}/>
                    </p>
                    <p>
                        <div>其他福利</div>
                        <Input/>
                    </p>
                    <p>
                        <div>工作地点</div>
                        <Select defaultValue="" style={{ width:'100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled">Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                    </p>
                    <p><Checkbox >邮件通知候选人</Checkbox></p>
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
                  {/* <Stepbar/> */}
                  <InterviewStrat/>
            </Sider>
            </Layout>
        )
    }
}