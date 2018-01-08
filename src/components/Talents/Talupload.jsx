import React, { Component } from 'react';
import {Select,Button,Upload, Icon, message} from 'antd';
import {withRouter, Router, Route,Link,NavLink,Switch} from 'react-router-dom';
const Option = Select.Option;
const Dragger = Upload.Dragger;

 class Talupload extends Component {
    constructor(props){
        super(props);
        this.state={
            job:[],
            data:{}
        }
    }
    componentDidMount(){
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/public/getbas',{mode:'cors',method:'get'}).then(res => res.json()).then(res => {
            let {job} = res.body
            this.setState({job:job})
        })    
    }
    onselect(value){
        this.props.changejob(value)
    }
    setJson=(uid)=>{
            this.setState({
                data:uid
            },function(){
                this.props.userjson(this.state.data) 
            }
        )  
    }
   randomString(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
         var randomPoz = Math.floor(Math.random() * charSet.length);
         randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
      }
    render(){
        let self=this;
        const up = {
            name: 'file',
            accept:'text/html,application/msword,application/pdf',
            multiple: false,
            action: 'http://10.125.4.32:8080/xiaoniuzp/api/xnzp/public/upload',
            data:{
                attachmentId:self.randomString(32)
            },
            onChange(info) {
              const status = info.file.status;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {  
                message.success(`${info.file.name} file uploaded successfully.`);
                let data=info.file.response.body.data[0].entitymsg
                return self.setJson(data)
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            }
          };
        return (
            <div>
                <Button onClick={()=>this.props.history.push('/home')}>取消</Button>
                <hr/>
                <div style={{margin:'10px 0'}}>
                <Dragger {...up}>
                    <div className="ant-upload-drag-icon" style={{marginBottom:20}}>
                    <Icon type="cloud-upload" />
                    </div>
                    <p className="ant-upload-text">点击或拖拽上传简历(html、pdf、doc)</p>
                   
                </Dragger>
                </div>
                <div style={{marginBottom:20}}>
                    <div>
                        选择职位
                    </div>
                    <Select defaultValue="请选择" style={{ width:'100%' }} onSelect={this.onselect.bind(this)}>
                            {this.state.job.map((item,key)=>{
                                return <Option value={item.uid} key={key} >{item.jobname}</Option>                            
                            })}
                    </Select>
                </div>
            </div>
        )
    }
}
export default withRouter(Talupload)