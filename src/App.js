import './App.css';
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon,Badge,Divider } from 'antd';
import { HashRouter as Router, Route,Link,NavLink,Switch} from 'react-router-dom';
import Login from './Login'
import First from './Firstpage'
import Home from './Homepage'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
class App extends Component {
  render() {
    
    return (
       <Router>

                <Layout>
                  <Switch>
                    <Route exact path="/" component={First}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}/>
                  </Switch>
                

                </Layout>
       </Router>
    );
  }
}

export default App;
