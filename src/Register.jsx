import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
export default class First extends Component {
    render() {

        return (
            <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'320px',margin:'150px auto'}}>
            <h1>注册</h1>
            <FormItem>
                <div>请输入企业邮箱</div>
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="you@example.com" />
            </FormItem>
            <FormItem>

              <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
                验证邮箱
              </Button>
            </FormItem>
          </Form>
        )
    }
}