import './App.css';
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon,Badge,Divider } from 'antd';
import { Router, Route,Link,NavLink,Switch} from 'react-router-dom';
import Company from './components/Set/Company'
import Head from './components/Header/Header'
import Newjob from './components/Job/New'
import Newsecond from './components/Job/Newsecond'
import Newthird from './components/Job/Newthird'
import Newtalent from './components/Talents/New'
import Batchtalent from './components/Talents/Batchtalent'
import Talentinformation from './components/Interview/Talentinformation'
import Candidatedetails from './components/Candidate/Candidatedetails'
import Jobdetails from './components/Job/Jobdetails'
import Talents from './components/Talents/Talents'
import TSearch from './components/Search/Search'
import Assignments from './components/Taskstate/Assignments'
import Examination from './components/Taskstate/Examination'
import Feedback from './components/Taskstate/Feedback'
import Calendar from './components/Calendar/Calendar'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
class Homepage extends Component {
  render() {
    
    return (

                <Layout>
                  <Head />
                  <Content style={{margin:'60px 0 0 0',zIndex:10,paddingTop:10}}>
                  <Switch>
                    <Route exact path="/home/jobs/newjob/:id?" component={Newjob}/>
                    {/* 新建职位 */}
                    <Route path="/home/set" component={Company}/>
                    {/* 设置 */}
                     <Route path="/home/jobs/newsecond" component={Newsecond}/>
                     {/* 新建职位的发布 */}
                    <Route path="/home/jobs/newthird" component={Newthird}/>
                     {/*新建职位的面试评价表  */}
                    <Route path="/home/talents/newtalent" component={Newtalent}/> 
                    {/* 新建候选人 */}
                    <Route path="/home/talents/batchtalent" component={Batchtalent}/>
                    {/* 批量新建候选人  */}
                    <Route path="/home/talents/information" component={Talentinformation}/>
                    {/* 人才库个人信息  */}
                    <Route path="/home/candidatedetails" component={Candidatedetails}/>
                    {/* 全部候选人信息  */}
                    <Route path="/home/jobs" component={Jobdetails}/>
                    {/* 职位信息  */}
                    <Route path="/home/talents" component={Talents}/>
                    {/* 人才库信息  */}
                    <Route exact path="/home/search/:v?" component={TSearch}/>
                    {/* 搜索  */}
                    <Route exact path="/home/taskstate/assignments" component={Assignments}/>
                    {/* 简历筛选  */}
                    <Route exact path="/home/taskstate/feedback" component={Feedback}/>
                    {/* 面试反馈  */}
                    <Route exact path="/home/taskstate/examination" component={Examination}/>
                    {/* Offer审批  */}
                    <Route  path="/home/calendar" component={Calendar}/>
                    {/* 日历  */}
                    
                  </Switch>
                  </Content>
                  <Footer style={{ textAlign: 'center',position:'fixed',bottom:0,zIndex:20,width:'100%'}}>
                            Ant Design ©2016 Created by Ant UED
                  </Footer>
                </Layout>
    );
  }
}

export default Homepage;
