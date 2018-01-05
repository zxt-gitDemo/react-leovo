import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox} from 'antd';
import { Router, Route,Link,NavLink,Switch} from 'react-router-dom';
import Cookies from 'js-cookie'
const FormItem = Form.Item;
 class Login extends Component {
    
     login=()=>{
        let account=this.email.input.value;
        let pwd=this.pwd.input.value;
        let data={
            'username': 'admin',
            'password': 'admin'
          }
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/login',{mode:'cors',
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(data)
    }).then(res => res.json()).then(res => {
       if(res.message='登录成功'){
        //    localStorage.setItem('displayName',res.body.name)
            Cookies.set('id',res.body.id)
            Cookies.set('username',res.body.name)
           this.props.history.push('/home')
       }else{
        alert('登录失败')
       }
  
        }).catch(err =>{
            console.log(err)
        })
       
     }
    render() {

        return (
          
            <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'320px',margin:'150px auto'}}>
            <h1>登录</h1>
            <FormItem>
                <div>邮箱</div>
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="you@example.com" ref={(input) => { this.email = input; }}/>
              
            </FormItem>
            <FormItem>
            <div>密码</div>
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" ref={(input) => { this.pwd = input; }}/>
            </FormItem>
            <FormItem>
              <Checkbox>下次自动登录</Checkbox>
              <a style={{float:'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>

              <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}} onClick={this.login}>
                登录
              </Button>
            </FormItem>
          </Form>
        )
    }
}
export default Login