import React, { Component } from 'react';
import { Layout} from 'antd';
import {Router, Route,Link,NavLink,Switch} from 'react-router-dom';
import Evaluation from '../Set/Recruitlike'
export default class Newthird extends Component {
    render(){
        return(
            <Layout style={{background:'white',margin:'0 auto',width:'700px'}}>
                <div style={{width:'100%',height:'60px',borderBottom:'1px solid #ccc',lineHeight:'60px'}}>
                    <Link to="/home/jobs/newjob" style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>01职位需求</Link>
                    <Link to="/home/jobs/newsecond"  style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>02招聘渠道</Link>
                    <Link to="/home/jobs/newthird" style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>03面试评价表</Link>
                </div>
                <div style={{height:460,overflow:'auto'}}>
                <Evaluation/>
                </div>
            </Layout>
        )
    }
}