import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Route,NavLink,Switch} from 'react-router-dom';
import Companyinformmation from './Companyinformation';
import Teammanagement from './Teammanagement';
import Recruitlike from './Recruitlike';
import Channelmanagement from './Channelmanagement';
import Resumereceiving from './Resumereceiving';
import Personal from './Personal';
import Assistant from './Assistant';
const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;
export default class Company extends Component {

    render(){
        return(
            <Layout>
            <Sider width={300} style={{ background: '#EAEAEA',padding:'20px 0'}}>
                <h1 style={{padding:'0 0  0 24px',fontSize:'20px'}}>公司设置</h1>
              <Menu
                mode="inline"
                style={{ background: '#EAEAEA',border:'none',color:'black'}}
              >

                  <Menu.Item key="1"><NavLink to="/home/set">公司信息</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to="/home/set/Teammanagement">团队管理</NavLink></Menu.Item>
                  <Menu.Item key="3"><NavLink to="/home/set/Recruitlike">招聘偏好设置</NavLink></Menu.Item>
                  <Menu.Item key="4"><NavLink to="/home/set/Channelmanagement">渠道管理</NavLink></Menu.Item>
                  <Menu.Item key="5"><NavLink to="/home/set/Resumereceiving">简历接收</NavLink></Menu.Item>
                  {/* <h1 style={{padding:'0 0  0 24px',fontSize:'20px',margin:'24px 0'}}>个人设置</h1>  */}
                  <Menu.Item key="6"><NavLink to="/home/set/Personal">个人信息</NavLink></Menu.Item>
                  <Menu.Item key="7"><NavLink to="/home/set/Assistant">招聘助手插件</NavLink></Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{background:'#F3F3F3',height:'520px'}}>
            <Switch>
                    <Route exact path="/home/set" component={Companyinformmation}/>
                    <Route exact path="/home/set/Teammanagement" component={Teammanagement}/>
                    <Route exact path="/home/set/Recruitlike" component={Recruitlike}/>
                    <Route exact path="/home/set/Channelmanagement" component={Channelmanagement}/>
                    {/* <Route exact path="/home/set/Resumereceiving" component={Resumereceiving}/> */}
                    <Route exact path="/home/set/Personal" component={Personal}/>
                    {/* <Route exact path="/home/set/Assistant" component={Assistant}/> */}
            </Switch>
            </Layout>
          </Layout>
        )
    }

}
