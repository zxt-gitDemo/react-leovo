import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter, Router, Route,Link,NavLink,Switch} from 'react-router-dom';
const FormItem = Form.Item;
 class Login extends Component {
     login=()=>{
        this.props.history.push('/home')
     }
    render() {

        return (
          
            <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'320px',margin:'150px auto'}}>
            <h1>登录</h1>
            <FormItem>
                <div>邮箱</div>
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="you@example.com" />
              
            </FormItem>
            <FormItem>
            <div>密码</div>
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
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
export default withRouter(Login)