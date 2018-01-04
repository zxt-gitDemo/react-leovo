import React, { Component } from 'react';
import { Select,Input,Checkbox,DatePicker,Icon } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
const { TextArea } = Input;
export default class Workexperience extends Component {
    state = {
        startValue:this.props.work.datastart===undefined?null:moment(this.props.work.datastart, 'YYYY-MM'),
        endValue: this.props.work.dataend===undefined?null:moment(this.props.work.dataend, 'YYYY-MM'),
        endOpen: false,
        cname:this.props.work.cname,
        jobname:this.props.work.jobname,
        workcontent:this.props.work.workcontent,
        checked:this.props.work.isnow
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
        let time=moment(value._d).format('YYYY-MM')
        this.onChange('startValue', value);
        let arrindex=this.keyid.getAttribute('data-key')
        this.props.editwork(arrindex,time,'datastart')
      }
    
      onEndChange = (value) => {
        let time=""
        if(value===undefined){
          
        }else{
          time=moment(value._d).format('YYYY-MM')
        }
        this.onChange('endValue', value);
        let arrindex=this.keyid.getAttribute('data-key')
        this.props.editwork(arrindex,time,'dataend')
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
        this.props.editwork(arrindex,e.target.value,type)
      }
      checkclick(){
        this.setState({
          checked:!this.state.checked
        })
        if(this.state.checked==false){
          let arrindex=this.keyid.getAttribute('data-key')
          let value=new Date()
          this.props.editwork(arrindex,value,'dataend')
        }else{
          this.onEndChange();
        }
       
      }
    render(){
        const { startValue, endValue, endOpen } = this.state;
        let indexkey=this.props.index;
        return (
            <div style={{margin:'20px 0',position:'relative',background:'#ccc',padding:10}} data-key={indexkey} ref={(div) => { this.keyid = div; }}>
            <div>
                <div style={{width:'49%',display:'inline-block'}}>
                <div>开始日期</div>
                    <DatePicker
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM "
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
                    format="YYYY-MM "
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
                   <Checkbox checked={this.state.checked} onChange={this.checkclick.bind(this)}>至今</Checkbox> 
                </div>
                </div>
                <div>
                    <div style={{width:'49%',display:'inline-block',marginRight:'2%'}}>
                            <div>公司名称</div>
                            <Input onChange={this.childchange.bind(this,'cname')} value={this.state.cname}/>
                        </div>
                    <div style={{width:'49%',display:'inline-block'}}>
                            <div >职位名称</div>
                            <Input onChange={this.childchange.bind(this,'jobname')} value={this.state.jobname}/>
                        </div>
                </div>
                <div>
                <div>
                    工作内容
                    </div>
                    <TextArea rows={4} onChange={this.childchange.bind(this,'workcontent')} value={this.state.workcontent}/>
                </div>
                <a><Icon onClick={this.close.bind(this)} data-key={indexkey}  type="delete" style={{position:'absolute',top:10,right:10}}/></a>
            </div>
        )
    }
}