import React, { Component } from 'react';
import { Layout, Icon,Input,Select,DatePicker,InputNumber } from 'antd';
import { Route,Link,NavLink,Switch} from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
const { RangePicker } = DatePicker;
export default class Screening extends Component {
    constructor(props){
        super(props)
        this.state={
            channel:[],
            education:[],
            workingLife:[],
            sex:[],
            saddress:'',
            companyname:'',
            schoolname:'',
            selectchannel:'',
            establishtime:'',
            selecteducation:[],
            selectworkingLife:[],
            selectsex:[],
            agemin:'',
            agemax:'',
            label:[],
            condition3:{}
        }
    }
    componentDidMount(){
        fetch('Local/common/data.json').then(res => res.json()).then(res => {
            let { channel,education,workingLife,sex} = res.data.basic
            let educations=education.map(v => ({ value: v, isActive: false }))
            let workingLifes=workingLife.map(v => ({ value: v, isActive: false }))
            let sexs=sex.map(v => ({ value: v, isActive: false }))
            this.setState({channel:channel})
            this.setState({education:educations})
            this.setState({workingLife:workingLifes})
            this.setState({sex:sexs})
        })
    }
    educationisActive(index,name){
        let isactive=this.state.education[index]['isActive'];
        if(isactive==false){
            this.state.selecteducation.push(name)
            this.setState({
                selecteducation:this.state.selecteducation
            },function(){
                this.state.condition3.selecteducation=this.state.selecteducation            
                this.setState({
                    condition3:this.state.condition3
                },function(){
                    this.props.childsearch(this.state.condition3)
                })
            })
        }else{
            let i=this.state.selecteducation.indexOf(name)
            if(i>-1){
                this.state.selecteducation.splice(i,1)
                this.setState({
                    selecteducation:this.state.selecteducation
                },function(){
                    this.state.condition3.selecteducation=this.state.selecteducation            
                    this.setState({
                        condition3:this.state.condition3
                    },function(){
                        this.props.childsearch(this.state.condition3)
                    })
                })
            }
        }
        this.state.education[index]['isActive'] =!this.state.education[index]['isActive']
        let isa=this.state.education;
        this.setState({
            education:isa
        })
    }
    workingLifeisActive(index,name){
        let isactive=this.state.workingLife[index]['isActive'];
        if(isactive==false){
            this.state.selectworkingLife.push(name)
            this.setState({
                selectworkingLife:this.state.selectworkingLife
            },function(){
                this.state.condition3.selectworkingLife=this.state.selectworkingLife            
                this.setState({
                    condition3:this.state.condition3
                },function(){
                    this.props.childsearch(this.state.condition3)
                })
            })
        }else{
            let i=this.state.selectworkingLife.indexOf(name)
            if(i>-1){
                this.state.selectworkingLife.splice(i,1)
                this.setState({
                    selectworkingLife:this.state.selectworkingLife
                },function(){
                    this.state.condition3.selectworkingLife=this.state.selectworkingLife            
                    this.setState({
                        condition3:this.state.condition3
                    },function(){
                        this.props.childsearch(this.state.condition3)
                    })
                })
            }
        }
        this.state.workingLife[index]['isActive'] =!this.state.workingLife[index]['isActive']
        let isa=this.state.workingLife;
        this.setState({
            workingLife:isa
        })
    }
    sexisActive(index,name){
        let isactive=this.state.sex[index]['isActive'];
        if(isactive==false){
            this.state.selectsex.push(name)
            this.setState({
                selectsex:this.state.selectsex
            },function(){
                this.state.condition3.selectsex=this.state.selectsex            
                this.setState({
                    condition3:this.state.condition3
                },function(){
                    this.props.childsearch(this.state.condition3)
                })
            })
            
        }else{
            let i=this.state.selectsex.indexOf(name)
            if(i>-1){
                this.state.selectsex.splice(i,1)
                this.setState({
                    selectsex:this.state.selectsex
                },function(){
                    this.state.condition3.selectsex=this.state.selectsex            
                    this.setState({
                        condition3:this.state.condition3
                    },function(){
                        this.props.childsearch(this.state.condition3)
                    })
                })
            }
        }
        this.state.sex[index]['isActive'] =!this.state.sex[index]['isActive']
        let isa=this.state.sex;
        this.setState({
            sex:isa
        })
    }
    changeselect(type,value){
        this.setState({
            [type]: value,
          });
          this.state.condition3[type]=value            
            this.setState({
                condition3:this.state.condition3
            },function(){
                this.props.childsearch(this.state.condition3)
            })
      }
    inputchange(type,e){
        this.setState({
          [type]: e.target.value
        });
            this.state.condition3[type]=e.target.value            
            this.setState({
                condition3:this.state.condition3
            },function(){
                this.props.childsearch(this.state.condition3)
            }) 
    }
    close(){
        this.state.education.map((item,key)=>{
            item.isActive=false
        })
        this.state.workingLife.map((item,key)=>{
            item.isActive=false
        })
        this.state.sex.map((item,key)=>{
            item.isActive=false
        })
        this.setState({
            condition3:{},
            saddress:'',
            companyname:'',
            schoolname:'',
            selectchannel:'',
            establishtime:'',
            selecteducation:[],
            selectworkingLife:[],
            selectsex:[],
            agemin:'',
            agemax:'',
            label:[]
        },function(){
            this.props.childsearch(this.state.condition3)
        })
    }
    render() {
        return (
            <div style={{paddingTop:20}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <h3>人才信息</h3><a onClick={this.close.bind(this)} ><Icon type="delete"/>请空筛选</a>
            </div>
            <div>
                <div>所在地</div>
                <Input placeholder="请输入" onChange={this.inputchange.bind(this,"saddress")} value={this.state.saddress}/>
            </div>
            <div>
                <div>公司名称</div>
                <Input placeholder="请输入" onChange={this.inputchange.bind(this,"companyname")} 
                value={this.state.companyname}/>
            </div>
            <div>
                <div>学校名称</div>
                <Input placeholder="请输入" onChange={this.inputchange.bind(this,"schoolname")} 
                value={this.state.schoolname}/>
            </div>
            <div>
                <div>筛选渠道</div>
                <Select defaultValue="请选择" style={{ width:'100%' }} onChange={this.changeselect.bind(this,"selectchannel")} 
                value={this.state.selectchannel}>
                {this.state.channel.map((item,key)=>{
                    return  <Option value={item} key={key}>{item}</Option>
                })} 
                </Select>
            </div>
            <div>
                <div>创建日期</div>
                <RangePicker
                    // showTime={{ format: 'HH:mm' }}
                onChange={this.changeselect.bind(this,"establishtime")} 
                value={this.state.establishtime}
                    format="YYYY-MM"
                    placeholder={['Start Time', 'End Time']}
                    />
            </div>
            <div>
                <div>学历</div>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                {this.state.education.map((item,key)=>{
                    return  <span key={key} onClick={this.educationisActive.bind(this,key,item.value)} style={{padding:5,display:'block',background:this.state.education[key]['isActive']==false?'#fafafa':'blue',margin:5,cursor:'pointer'}}>{item.value}</span>
                })}                                                                                               
                    
                </div>
            </div>
            <div>
                <div>工作经历</div>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                {this.state.workingLife.map((item,key)=>{
                    return  <span key={key} onClick={this.workingLifeisActive.bind(this,key,item.value)} style={{padding:5,display:'block',background:this.state.workingLife[key]['isActive']==false?'#fafafa':'blue',margin:5,cursor:'pointer'}}>{item.value}</span>
                })} 
                </div>
            </div>
            <div>
                <div>性别</div>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                {this.state.sex.map((item,key)=>{
                    return  <span key={key} onClick={this.sexisActive.bind(this,key,item.value)} style={{padding:5,display:'block',background:this.state.sex[key]['isActive']==false?'#fafafa':'blue',margin:5,cursor:'pointer'}}>{item.value}</span>
                })} 
                    
                </div>
            </div>
            <div>
                <div>年龄</div>
                <div>
                <InputNumber  onChange={this.changeselect.bind(this,"agemin")} 
                value={this.state.agemin}/>
                <span> ~ </span>
                <InputNumber onChange={this.changeselect.bind(this,"agemax")} 
                value={this.state.agemax}/>
                </div>
            </div>
            <div>
                <div>标签</div>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"                 
                onChange={this.changeselect.bind(this,"label")} 
                value={this.state.label}>
                    <Option value="jack">待定</Option>
                     <Option value="lucy">待定</Option>
                </Select>
            </div>
        </div>
        )
    }
}