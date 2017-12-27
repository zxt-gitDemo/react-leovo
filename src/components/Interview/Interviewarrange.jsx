import React, { Component } from 'react';
import {Select,Button,Icon} from 'antd';
const Option = Select.Option;

export default class Interviewarrange extends Component {
    constructor(props){
        super(props)
        this.state={
            interviewtime:[],
            hiringManager:[],
            date:this.props.list.date?this.props.list.date:'上午 10:00',
            time:this.props.list.time?this.props.list.time:'30分钟',
            name:this.props.list.name?this.props.list.name:'初试',
            Interviewer:this.props.list.Interviewer

        }
    }
    componentDidMount(){
        fetch('./job.json').then(res => res.json()).then(res => {
            let { hiringManager,time} = res.data 
            this.setState({
                interviewtime:time,
                hiringManager:hiringManager
            })     
        })
    }
    changeselect(type,value){
        this.setState({
            [type]: value,
          });
          let arrindex=this.keyid.getAttribute('data-key')
        this.props.editinterview(arrindex,value,type)
      }
      close(e){
        this.props.del(e.target.getAttribute('data-key')) 
      }
    render (){
        console.log(this.props.list.name)
        console.log(this.state.Interviewer)
        return (
            <div style={{marginTop:10}} data-key={this.props.index} ref={(div) => { this.keyid = div; }}>
                    <div style={{width:'18%',display:'inline-block',marginRight:'2%'}}>
                        <Select
                        onChange={this.changeselect.bind(this,"date")} value={this.state.date}
                        style={{ width:'100%' }}>
                        {this.state.interviewtime.map((item,key)=>{
                            return  <Option value={item} key={key} >{item}</Option>  
                          })}
                        </Select>
                    </div>
                    <div style={{width:'18%',display:'inline-block',marginRight:'2%'}}>
                        <Select style={{ width:'100%' }}
                         onChange={this.changeselect.bind(this,"time")} value={this.state.time}
                        >
                                <Option value="30分钟">30分钟</Option>
                                <Option value="1小时">1小时</Option>
                                <Option value="1小时30分钟">1小时30分钟</Option>
                        </Select>
                    </div>
                    <div style={{width:'18%',display:'inline-block',marginRight:'2%'}}>
                        <Select  style={{ width:'100%' }}
                         onChange={this.changeselect.bind(this,"name")} value={this.state.name}
                        >
                                <Option value="初试">初试</Option>
                                <Option value="复试">复试</Option>
                                <Option value="终试">终试</Option>
                        </Select>
                    </div>
                    <div style={{width:'30%',display:'inline-block',marginRight:'2%'}}>
                    <Select
                         onChange={this.changeselect.bind(this,"Interviewer")} value={this.state.Interviewer}                    
                            showSearch
                            optionFilterProp="children"
                            style={{ width: '100%' }}
                            mode="tags"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                           {this.state.hiringManager.map((item,key)=>{
                            return  <Option value={item} key={key} >{item}</Option>  
                          })}
                        </Select>
                    </div>
                        <div style={{width:'5%',display:'inline-block'}}>
                            <Button onClick={this.close.bind(this)} data-key={this.props.index}><Icon type="delete"/></Button>
                        </div>
                    </div>
        )
    }
}