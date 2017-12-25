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
        fetch('./job.json').then(res => res.json()).then(res => {
            let job=res.data.job
            this.setState({
                job:job
            })
        })     
    }
    onselect(value){
        this.props.changejob(value)
    }
    setJson=()=>{
        fetch('./candidate.json').then(res => res.json()).then(res => {
            this.setState({
                data:res.data
            },function(){
                this.props.userjson(this.state.data) 
            }
        )
            
        })
        
    }
    render(){
        let self=this
      
        const up = {
            name: 'file',
            multiple: true,
            action: '/#',
            onChange(info) {
              const status = info.file.status;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                return self.setJson()
              
              }
            }
          };
        //   console.log(self)
        return (
            <div>
                <Button onClick={()=>this.props.history.push('/home')}>取消</Button>
                <hr/>
                <div style={{margin:'10px 0'}}>
                <Dragger {...up}>
                    <div className="ant-upload-drag-icon" style={{marginBottom:20}}>
                    <Icon type="cloud-upload" />
                    </div>
                    <p className="ant-upload-text">请把文件拖拽到这里上传</p>
                   
                </Dragger>
                </div>
                <div style={{marginBottom:20}}>
                    <div>
                        选择职位
                    </div>
                    <Select defaultValue="请选择" style={{ width:'100%' }} onSelect={this.onselect.bind(this)}>
                            {this.state.job.map((item,key)=>{
                                return <Option value={item} key={key} >{item}</Option>                            
                            })}
                    </Select>
                </div>
            </div>
        )
    }
}
export default withRouter(Talupload)