import React, { Component } from 'react';
import {Select,Button,Upload, Icon, message,Layout,Input,Modal} from 'antd';
import {withRouter,Router, Route,Link,NavLink,Switch} from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
const Dragger = Upload.Dragger;
const props = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
 class Batchtalent extends Component {
    state = {
        modalVisible: false,
        refereeVisible:'none',
        job:[],
        channel:[],
        referee:[],
        sjob:'',
        schannel:'',
        sreferee:''
      }
      componentDidMount(){
        // fetch('/Local/common/data.json').then(res => res.json()).then(res => {
        //     let { channel} = res.data.basic           
        //     this.setState({channel:channel})
        // })
        // fetch('./job.json').then(res => res.json()).then(res => {
        //     let {job,referee} = res.data           
        //     this.setState({job:job})
        //     this.setState({referee:referee})
        // })
      }
      setModalVisible(modalVisible) {
        this.setState({ modalVisible });
      }
      channelchange(type,v){
         this.setState({
             [type]: v,
           },()=>{
            if(this.state.schannel!="内推"){
                this.setState({refereeVisible:'none'})
            }else{
                this.setState({refereeVisible:'block'})
            }
           });
        
      }//如果不是内推则隐藏推荐人
      addtalents(){

      }
    render(){
        console.log(this.state)
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
                            return <Option value={item} key={key}>{item}</Option>
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
                                return <Option value={item} key={key}>{item}</Option>
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
                                return <Option value={item} key={key}>{item}</Option>
                            })
                        }
                    </Select>
                    </div>
                    <div style={{marginBottom:20}}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                            <Icon type="cloud-upload" />
                            </p>
                            <p className="ant-upload-text">点击或拖拽上传简历(html、pdf、doc、docx)</p>
                        
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
                    <Input/>
                    <div>邮箱<span style={{color:'red'}}>*</span></div>
                    <Input/>
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