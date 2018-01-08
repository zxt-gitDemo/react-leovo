import React, { Component } from 'react';
import {Select,Button,Upload, Icon, message,Layout,Input,Modal} from 'antd';
import {withRouter,Router, Route,Link,NavLink,Switch} from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
const Dragger = Upload.Dragger;

 class Batchtalent extends Component {
    state = {
        modalVisible: false,
        refereeVisible:'none',
        job:[],
        channel:[],
        referee:[],
        sjob:'',
        schannel:'',
        sreferee:'',
        fileid:["id1","id2","id3"]
      }
      componentDidMount(){
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/public/getbas',{mode:'cors',method:'get'}).then(res => res.json()).then(res => {
            let {job,channel,referee} = res.body
            this.setState({
                job:job,
                channel:channel,
                referee:referee
            })
        })  
      }
      setModalVisible(modalVisible) {
        let name=this.rname.input.value
        let email=this.remail.input.value
        if(name===""||email===""){
            message.warning("不能为空", [1])            
        }else{
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/referee',{mode:'cors',method:'post',
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    body:JSON.stringify({
                        "refereename":name,
                        "refereeEMail":email
                    }),
                    }).then(res => res.json()).then(res => {
                    message.success("保存成功", [1])
                    fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/public/getbas',{mode:'cors',method:'get'}).then(res => res.json()).then(res => {
                        let {referee} = res.body
                        this.setState({referee:referee})
                    })   
                    this.setState({ modalVisible });

                }).catch(()=>{
                    message.error("保存失败", [1])
        })   
        }
        
       
      } //显示添加推荐人弹窗
      channelchange(type,v){
         this.setState({
             [type]: v,
           },()=>{
            if(this.state.schannel!="1e8accab6896417799db84bd42d01d06"){
                this.setState({refereeVisible:'none'})
            }else{
                this.setState({refereeVisible:'block'})
            }
           });
        
      }//如果不是内推则隐藏推荐人
      addtalents(){
        console.log(this.state.sjob)
        console.log(this.state.schannel)
        console.log(this.state.sreferee)
        console.log(this.state.fileid)
      }
      setFileid(data){
          this.setState({
            fileid:data
          })

      }
    render(){
        let self=this;
        const props = {
            name: 'file',
            accept:'text/html,application/msword,application/pdf',
            multiple: true,
            action: 'http://10.125.4.32:8080/xiaoniuzp/api//base/attachment/upload',
            onChange(info) {
              const status = info.file.status;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                return self.setFileid()
              }
            },
          };
        return (
            <Layout style={{marginLeft:300}}>
                 <Content style={{background:'white',padding:20,height:'520px'}}>
                    <div style={{marginBottom:20}}>
                        <div>
                            职位
                        </div>
                        <Select
                        showSearch
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        onSelect={this.channelchange.bind(this,"sjob")}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {
                        this.state.job.map((item,key)=>{
                            return <Option value={item.uid} key={key}>{item.jobname}</Option>
                        })
                    }
                    </Select>
                    </div>
                    <div style={{marginBottom:20}}>
                        <div>
                            渠道 <span style={{color:'red'}}>*</span>
                        </div>
                        <Select
                        showSearch
                        onSelect={this.channelchange.bind(this)}
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        onSelect={this.channelchange.bind(this,"schannel")}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            this.state.channel.map((item,key)=>{
                                return <Option value={item.uid} key={key}>{item.channelName}</Option>
                            })
                        }
                    </Select>
                    </div>
                    <div style={{marginBottom:20,display:this.state.refereeVisible}}>
                        <div style={{position:'relative'}}>
                            推荐人 <span style={{color:'red'}}>*</span>
                            <a style={{position:'absolute',top:0,right:0}} onClick={() => this.setState({modalVisible:true})}>+新建推荐人</a>
                        </div>
                        <Select
                        showSearch
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        onSelect={this.channelchange.bind(this,"sreferee")}                        
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            this.state.referee.map((item,key)=>{
                                return <Option value={item.uid} key={key}>{item.refereename}</Option>
                            })
                        }
                    </Select>
                    </div>
                    <div style={{marginBottom:20}}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                            <Icon type="cloud-upload" />
                            </p>
                            <p className="ant-upload-text">点击或拖拽上传简历(html、pdf、doc)</p>
                        
                        </Dragger>
                        </div>
                        <Modal
                    title="新建推荐人"
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setState({modalVisible:false})}
                    okText="保存"
                    cancelText="取消"
                    >
                   <div>名字<span style={{color:'red'}}>*</span></div>
                   <Input ref={(input) => { this.rname = input; }}/>
                   <div>邮箱<span style={{color:'red'}}>*</span></div>
                   <Input ref={(input) => { this.remail = input; }}/>
                    </Modal>
                 </Content>
                 <Sider width={350} style={{background:'#F3F3F3',padding:10}}>
                   <Button size={'large'} style={{width:'48%',marginRight:'4%'}} onClick={()=>this.props.history.push('/home')}>取消</Button>
                   <Button type="primary" size={'large'} style={{width:'48%'}} onClick={this.addtalents.bind(this)}>保存候选人</Button>
                </Sider>
            </Layout>
        )
    }
}
export default withRouter(Batchtalent)