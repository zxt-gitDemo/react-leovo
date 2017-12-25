import React, { Component } from 'react';
import { Layout,List,Input,Form,Button} from 'antd';

const data=[{
    name:'内推',
    type:'默认',
    operation:''
},{
    name:'内推',
    type:'默认',
    operation:''
},{
    name:'内推',
    type:'默认',
    operation:''
}]
export default class Channelmanagement extends Component {
    constructor(props){
        super(props)
        this.state={
            channel:[],

        }
    }
    componentDidMount(){
        fetch('./set/company.json').then(res => res.json()).then(res => {
            let channel=res.data.channel;
            this.setState({channel:channel})
          })
    }
    newchannel(){
        let channelname=this.channelname.input.value;
        let obj={name:channelname,type:"默认",operation:""}
        this.state.channel.push(obj)
        this.setState({
            channel:this.state.channel
        })
    }
    render(){
        return (
            <Layout style={{padding:20,width:560}}>
            <h2>渠道</h2>
            <List
                dataSource={this.state.channel}
                header={<div style={{display:'flex'}}><div style={{width:'50%'}}>名称</div><div style={{width:'30%'}}>类型</div><div>操作</div></div>}
                renderItem={item => (
                <List.Item >
                    <div style={{width:'50%'}}>{item.name}</div>
                    <div style={{width:'30%'}}>{item.type}</div>
                    <div>{item.operation}</div>
                   
                </List.Item>
                )}
            />
            <Form action="" layout="inline" style={{margin:'10px 0'}}>
                    <Form.Item>
                    <Input placeholder="名称" ref={(input) => { this.channelname = input; }}/>
                    </Form.Item>
                    <Form.Item><Button type="primary" onClick={()=>this.newchannel()} >新建渠道</Button>
                    </Form.Item>
                </Form>
            </Layout>
        )
    }
}