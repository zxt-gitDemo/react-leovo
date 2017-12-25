import React, { Component } from 'react';
import { Layout, Menu,Button } from 'antd';
import { withRouter, Router, Route,Link,NavLink,Switch} from 'react-router-dom';

class Firstpage extends Component {
    render() {
      return (
        <Layout>
        <Menu
          mode="horizontal"
        >
        <Menu.Item >
          {/* <a href="/login">登录</a> */}
          <Link to="/login">登录</Link>
        </Menu.Item>
          </Menu>
            </Layout>
      )
    }
}
export default Firstpage