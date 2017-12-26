import React, { Component } from 'react';
import {Select,Button,Icon} from 'antd';
const Option = Select.Option;

export default class Interviewarrange extends Component {
    constructor(props){
        super(props)
        this.state={
            interviewtime:[],
            hiringManager:[],
            date:'上午 10:00',
            time:'30分钟',
            mode:'初试',
            interviewer:[]

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
      }
    render (){
        console.log(this.state)
        return (
            <div style={{marginTop:10}}>
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
                         onChange={this.changeselect.bind(this,"mode")} value={this.state.mode}
                        >
                                <Option value="初试">初试</Option>
                                <Option value="复试">复试</Option>
                                <Option value="终试">终试</Option>
                        </Select>
                    </div>
                    <div style={{width:'30%',display:'inline-block',marginRight:'2%'}}>
                    <Select
                         onChange={this.changeselect.bind(this,"interviewer")} value={this.state.interviewer}                    
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
                            <Button><Icon type="delete"/></Button>
                        </div>
                    </div>
        )
    }
}