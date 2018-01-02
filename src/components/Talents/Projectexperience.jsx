import React, { Component } from 'react';
import { Input,Checkbox,DatePicker,Icon } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { TextArea } = Input;
export default class Projectexperience extends Component {
    state = {
      startValue:this.props.project.datastart===undefined?null:moment(this.props.project.datastart, 'YYYY-MM'),
        endValue: this.props.project.dataend===undefined?null:moment(this.props.project.dataend, 'YYYY-MM'),
        endOpen: false,
        pname:this.props.project.pname,
        role:this.props.project.role,
        projectcontent:this.props.project.projectcontent,
        checked:this.props.project.now
      };
    
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
        this.props.editproject(arrindex,value,'datastart')
      }
    
      onEndChange = (value) => {
        this.onChange('endValue', value);
        let arrindex=this.keyid.getAttribute('data-key')
        this.props.editproject(arrindex,value,'dataend')
      }
    
      // handleStartOpenChange = (open) => {
      //   if (!open) {
      //     this.setState({ endOpen: true });
      //   }
      // }
    
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
        this.props.editproject(arrindex,e.target.value,type)
      }
      checkclick(){
        
        this.setState({
          checked:!this.state.checked
        })
        if(this.state.checked==false){
          let arrindex=this.keyid.getAttribute('data-key')
          let value=new Date()
          this.props.editproject(arrindex,value,'dataend')
        }else{
          this.onEndChange();
        }
       
      }
      
    render(){
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
                  format="YYYY-MM"
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
                  format="YYYY-MM"
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
                 <Checkbox checked={this.state.checked} onChange={this.checkclick.bind(this)} >至今</Checkbox> 
              </div>
              </div>
              <div style={{marginBottom:20}}>
                  <div style={{width:'49%',display:'inline-block',marginRight:'2%'}}>
                          <div>项目名称</div>
                          <Input onChange={this.childchange.bind(this,'pname')} value={this.state.pname}/>
                      </div>
                  <div style={{width:'49%',display:'inline-block'}}>
                          <div>角色</div>
                          <Input onChange={this.childchange.bind(this,'role')} value={this.state.role}/>
                      </div>
              </div>
              <div style={{marginBottom:20}}>
              <div>
              项目内容与职责
                  </div>
                  <TextArea rows={4} onChange={this.childchange.bind(this,'projectcontent')} value={this.state.projectcontent}/>
              </div>
              <a><Icon onClick={this.close.bind(this)} data-key={indexkey} type="delete" style={{position:'absolute',top:10,right:10}}/></a>
          </div>
            
        )
    }
}