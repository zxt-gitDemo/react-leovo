import React, { Component } from 'react';
import { Layout, Menu, Icon,Badge,Dropdown,Button,Input ,Tooltip} from 'antd';
import { withRouter, Router, Route,Link,NavLink,Switch} from 'react-router-dom';
const { Header} = Layout;
const Search = Input.Search;
const Task = (
  <Menu>
    <Menu.Item>
      <Link  to="/home/taskstate/assignments">简历筛选</Link>
    </Menu.Item>
    <Menu.Item>
    <Link  to="/home/taskstate/feedback">面试反馈</Link>
    </Menu.Item>
    <Menu.Item>
    <Link  to="/home/taskstate/examination">Offer审批</Link>
    </Menu.Item>
  </Menu>
)
const New = (
  <Menu>
    <Menu.Item>
      <Link  to="/home/talents/newtalent">新建候选人</Link>
    </Menu.Item>
    <Menu.Item>
    <Link  to="/home/talents/batchtalent">批量新建候选人</Link>
    </Menu.Item>
    <Menu.Item>
    <Link  to="/home/jobs/newjob">新建职位</Link>
    </Menu.Item>
  </Menu>
)

 class Head extends Component {
   
  out(){
    this.props.history.push('/')
  }
    render(){
        let activeStyle={color:'#999',border:'none'}
        const Out = (
          <Menu>
            <Menu.Item onClick={this.out}>
              <div onClick={this.out.bind(this)}>退出</div>
            </Menu.Item>
          </Menu>
        )
        return(
            <Header className="header" style={{background: 'white',boxShadow:' 0 0 10px #ccc',overflow: 'hidden',zIndex:20,position: 'fixed',display:'flex',justifyContent:'space-between',top:'0',left: '0',width:'100%'}}>
            <div>
            <div className="logo" />
            <Menu
              mode="horizontal"
            //   defaultSelectedKeys={['1']}
              style={{ lineHeight: '63px',color:'#999'}}
            >
              <Menu.Item key="1">
              <NavLink exact activeStyle={activeStyle} to="/first">
              新手上路
              <Badge count={5} style={{margin:'-15px 5px 0 0'}}>
              <span className="head-example" />
            </Badge>
              </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
              <NavLink exact activeStyle={activeStyle} to="/home/a">仪表盘</NavLink>
              </Menu.Item>
              <Menu.Item key="3">
              <NavLink exact activeStyle={activeStyle} to="/home/candidatedetails">候选人</NavLink>
              </Menu.Item>
              <Menu.Item key="4">
              <NavLink exact activeStyle={activeStyle} to="/home/jobs">职位</NavLink>
              </Menu.Item>
              <Menu.Item key="5">
              <NavLink exact activeStyle={activeStyle} to="/home/talents">人才库</NavLink>
              </Menu.Item>
              <Menu.Item key="6">
              <NavLink exact activeStyle={activeStyle} to="/home/b4">报表</NavLink>
              </Menu.Item>
            </Menu>
            </div>
            <div>
            <Menu
              mode="horizontal"
              style={{ lineHeight: '63px',float:'right'}}
            >
              <Menu.Item>
              <Dropdown overlay={Task} trigger={['click']}>
              <Tooltip placement="left" title="任务">
              <NavLink exact to="#"><Icon type="check-circle-o" style={{ fontSize: 20, color: '#999' }}/></NavLink>
              </Tooltip>
              </Dropdown>
              </Menu.Item>
              <Menu.Item>
              <Tooltip placement="top" title="面试日历">
              <NavLink exact to="/home/calendar"><Icon type="calendar" style={{ fontSize: 20, color: '#999' }}/></NavLink>
              </Tooltip>
              </Menu.Item>
              <Menu.Item>
              <Tooltip placement="top" title="设置">                
              <NavLink exact to="/home/set"><Icon type="setting" style={{ fontSize: 20, color: '#999' }}/></NavLink>
              </Tooltip>              
              </Menu.Item>
              <Menu.Item>
              <Tooltip placement="top" title="添加"> 
              <Dropdown overlay={New} trigger={['click']}>
              <NavLink exact to="#"><Button type="primary"><Icon type="plus" style={{ fontSize: 20, color: 'white',margin:0}}/></Button></NavLink>
              </Dropdown>
              </Tooltip>
              </Menu.Item>
              <Menu.Item>
              <Search
            placeholder="搜索候选人"
            onSearch={value=>this.props.history.push('/home/search/'+value)}
            style={{ width: 200 }}
            enterButton
          />
              
             
              </Menu.Item>
              <Menu.Item>
              <Tooltip placement="right" title={'张三'}> 
              <Dropdown overlay={Out} trigger={['click']}>
            
              <div style={{borderRadius:'50%',width:40,height:40,background:'lightblue',margin:'11.5px 0',display:'flex',justifyContent:'center'}}>
               <Icon type="user" style={{color:'blue',fontSize:20,alignSelf:'center',margin:0}}/>
                </div>
                {/* <Avatar size="large" icon="user" /> */}
               
              </Dropdown>
              </Tooltip>              
              </Menu.Item>
            </Menu>
            </div>
          </Header>
        )
    }
}
export default withRouter(Head)