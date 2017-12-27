import React, { Component } from 'react';
import { Select,Input,Checkbox,DatePicker,Icon } from 'antd';
import { Link,NavLink,Switch} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
const { TextArea } = Input;
export default class Educationexperience extends Component {
  constructor(props){
    super(props);  
      this.state = {
        startValue: moment(this.props.education.datastart, 'YYYY-MM'),
        endValue: moment(this.props.education.dataend, 'YYYY-MM'),
            endOpen: false,
            educations:[],
            checked:false,
            eduname:this.props.education.eduname,
            major:this.props.education.major,
            education:this.props.education.education
          };
    }
      componentDidMount(){
        fetch('./data.json').then(res => res.json()).then(res => {
          let { channel,education,sex,workNature,workingLife } = res.data.basic

            this.setState({educations:education})            

            
        }) 
    }
      disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
      }
    
      disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
          return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
      }
    
      onChange = (field, value) => {
        this.setState({
          [field]: value,
        });
      }
    
      onStartChange = (value) => {
        this.onChange('startValue', value);
        let arrindex=this.keyid.getAttribute('data-key')
        this.props.editeducations(arrindex,value,'datastart')
      }
    
      onEndChange = (value) => {
        this.onChange('endValue', value);
        let arrindex=this.keyid.getAttribute('data-key')
        this.props.editeducations(arrindex,value,'dataend')
      }
    
      handleStartOpenChange = (open) => {
        if (!open) {
          this.setState({ endOpen: true });
        }
      }
    
      handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
      }
      close(e){
        this.props.del(e.target.getAttribute('data-key'))
      }
      childchange(type,e){
        let attr = type;
        let obj = {};
        obj[attr] = e.target.value;
        this.setState(
          obj
        )
        let arrindex=this.keyid.getAttribute('data-key')
        this.props.editeducations(arrindex,e.target.value,type)
      }
      selectchange(type,value){
        let attr = type;
        let obj = {};
        obj[attr] =value;
        this.setState(
          obj
        )
        let arrindex=this.keyid.getAttribute('data-key')
        this.props.editeducations(arrindex,value,type)
      }
      checkclick(){
        this.setState({
          checked:!this.state.checked
        })
        if(this.state.checked==false){
          let arrindex=this.keyid.getAttribute('data-key')
          let value=new Date()
          console.log(value)
          this.props.editeducations(arrindex,value,'dataend')
        }else{
          this.onEndChange();
        }
       
      }
    render(){
      console.log(this.state.eduname)
        const { startValue, endValue, endOpen } = this.state;
        let indexkey=this.props.index;
        return (
            <div style={{margin:'20px 0',position:'relative',background:'#ccc',padding:10}} data-key={indexkey} ref={(div) => { this.keyid = div; }}>
            <div style={{marginBottom:20}}>
                <div style={{width:'49%',display:'inline-block'}}>
                <div>开始日期</div>
                    <DatePicker
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD"
                    value={startValue}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                    style={{width:'100%'}}
                    />
                  
                </div>
                <span> ~ </span>
                <div style={{width:'35%',display:'inline-block'}}>
                <div>结束日期</div>
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    showTime
                    format="YYYY-MM-DD"
                    value={endValue}
                    placeholder="End"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                    style={{width:'100%'}}
                    disabled={this.state.checked}
                    />
                </div>
                <div style={{width:'10%',display:'inline-block',marginLeft:10}}>
                   <Checkbox onChange={this.checkclick.bind(this)} checked={this.state.checked}>至今</Checkbox> 
                </div>
                </div>
                <div style={{marginBottom:20}}>
                  <div>学校名称</div>
                  <Input onChange={this.childchange.bind(this,'eduname')} value={this.state.eduname}/>
                </div>
                <div style={{marginBottom:20}}>
                    <div style={{width:'49%',display:'inline-block',marginRight:'2%'}}>
                            <div>学历</div>
                            <Select style={{ width:'100%' }} onSelect={this.selectchange.bind(this,"education")} value={this.state.education}>
                            {
                              this.state.educations.map((item,index)=>{
                                return <Option value={item} key={index}>{item}</Option>
                              })
                            }
                      </Select>
                        </div>
                    <div style={{width:'49%',display:'inline-block'}}>
                            <div>专业</div>
                            <Input onChange={this.childchange.bind(this,'major')} value={this.state.major}/>
                        </div>
                </div>
                <a><Icon onClick={this.close.bind(this)} data-key={indexkey} type="delete" style={{position:'absolute',top:10,right:10}}/></a>
            </div>
        )
    }
}