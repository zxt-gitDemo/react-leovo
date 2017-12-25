import React, { Component } from 'react';
import { Layout,Input,Form,Button,message} from 'antd';
export default class Company extends Component {
    constructor(props){
        super(props)
        this.state={
            edituser:false,
            editphone:false,
            editjob:false,
            username:'张三',
            userphone:'18760292643',
            userjob:'HR',
            oldpwd:'',
            newpwd:'',
            confirmnewpwd:''
        }
    }
    show(type){
        this.setState({
            [type]:true
        })
    }
    hide(type){
        this.setState({
            [type]:false
        })
    }
    changeinput(type,e){
        this.setState({
            [type]:e.target.value
        }) 
    }
    keep(type,name){
        this.setState({
            [type]:false
        })

    }
    keeppwd(){
        let oldpwd=this.state.oldpwd;
        let newpwd=this.state.newpwd;
        let confirmnewpwd=this.state.confirmnewpwd;
        if(newpwd!==confirmnewpwd){
            message.warning('两次输入的密码不一样',[1])
        }
        else{
            message.success('修改成功',[1])
        }
    }
    render(){
        return(
            <Layout style={{height:'100%',width:'700px',background:'white',padding:'20px',overflow:'auto'}}>
                <Layout style={{margin:'0 auto',width:'550px',background:'white'}}>
                <h1>个人设置</h1>
                <div style={{borderBottom:'1px solid lightgray'}}>
                    <div>
                    <h3>用户名</h3>
                    <div style={{display:this.state.edituser===false?'block':'none'}}>
                    <p style={{display:'flex',justifyContent:'space-between'}}>
                        <span>{this.state.username}</span>
                        <a onClick={this.show.bind(this,"edituser")} >修改</a>
                    </p>
                    </div>
                    </div>
                    <div style={{display:this.state.edituser===false?'none':'block'}}>
                    <p style={{display:'flex',justifyContent:'space-between'}}>
                        <span>修改用户名</span>
                        <a onClick={this.hide.bind(this,"edituser")}>取消</a>
                    </p>
                    <Form action="" layout="inline" style={{margin:'10px 0'}}>
                    <Form.Item>
                    <Input value={this.state.username} onChange={this.changeinput.bind(this,"username")} />
                    </Form.Item>
                    <Form.Item><Button type="primary" onClick={this.keep.bind(this,"edituser","username")} >保存</Button>
                    </Form.Item>
                    </Form>
                    </div>
                </div>
                <hr/>
                <div style={{borderBottom:'1px solid lightgray'}}>
                    <div>
                    <h3>手机</h3>
                    <div style={{display:this.state.editphone===false?'block':'none'}}>
                    <p style={{display:'flex',justifyContent:'space-between'}}>
                        <span>{this.state.userphone}</span>
                        <a onClick={this.show.bind(this,"editphone")}>修改</a>
                    </p>
                    </div>
                    </div>
                    <div style={{display:this.state.editphone===false?'none':'block'}}>
                    <p style={{display:'flex',justifyContent:'space-between'}}>
                        <span>修改手机号</span>
                        <a onClick={this.hide.bind(this,"editphone")}>取消</a>
                    </p>
                    <Form action="" layout="inline" style={{margin:'10px 0'}}>
                    <Form.Item>
                    <Input value={this.state.userphone} onChange={this.changeinput.bind(this,"userphone")}/>
                    </Form.Item>
                    <Form.Item><Button type="primary" onClick={this.keep.bind(this,"editphone","userphone")}>保存</Button>
                    </Form.Item>
                    </Form>
                    </div>
                </div>
                <hr/>
                <div style={{borderBottom:'1px solid lightgray'}}>
                    <div>
                    <h3>职位</h3>
                    <div style={{display:this.state.editjob===false?'block':'none'}}>
                    <p style={{display:'flex',justifyContent:'space-between'}}>
                        <span>{this.state.userjob}</span>
                        <a onClick={this.show.bind(this,"editjob")}>修改</a>
                    </p>
                         
                    </div>
                    </div>
                    <div style={{display:this.state.editjob===false?'none':'block'}}>
                    <p style={{display:'flex',justifyContent:'space-between'}}>
                        <span>修改职位</span>
                        <a onClick={this.hide.bind(this,"editjob")}>取消</a>
                    </p>
                    <Form action="" layout="inline" style={{margin:'10px 0'}}>
                    <Form.Item>
                    <Input value={this.state.userjob} onChange={this.changeinput.bind(this,"userjob")}/>                   
                    </Form.Item>
                    <Form.Item><Button type="primary" onClick={this.keep.bind(this,"editjob","userjob")}>保存</Button>
                    </Form.Item>
                    </Form>
                    </div>
                </div>
                <hr/>
                <div>
                    <h3>修改密码</h3>
                    <Form action=""  style={{margin:'10px 0'}}>
                    <Form.Item>
                    <div>当前密码</div>
                    <Input type="password" value={this.state.oldpwd} onChange={this.changeinput.bind(this,"oldpwd")}/>
                    </Form.Item>
                    <Form.Item>
                    <div>输入新密码</div>
                    <Input type="password" value={this.state.newpwd} onChange={this.changeinput.bind(this,"newpwd")}/>       
                    </Form.Item>
                    <Form.Item>
                    <div>确认新密码</div>
                    <Input type="password" value={this.state.confirmnewpwd} onChange={this.changeinput.bind(this,"confirmnewpwd")}/>               
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.keeppwd.bind(this)} >保存</Button>
                    </Form.Item>
                    </Form>
                </div>
            </Layout>
            </Layout>
        )
    }
}