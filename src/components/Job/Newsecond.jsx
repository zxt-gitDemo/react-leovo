import React, { Component } from 'react';
import { Layout} from 'antd';
import {Router, Route,Link,NavLink,Switch} from 'react-router-dom';

export default class Newsecond extends Component {
    render(){
        return(
            <Layout style={{background:'white',margin:'0 auto',width:'700px'}}>
                <div style={{width:'100%',height:'60px',borderBottom:'1px solid #ccc',lineHeight:'60px'}}>
                    <Link to="/home/jobs/newjob" style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>01职位需求</Link>
                    <Link to="/home/jobs/newsecond"  style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>02招聘渠道</Link>
                    <Link to="/home/jobs/newthird" style={{width:'20%',textAlign:'center',display:'inline-block',borderRight:'1px solid #ccc'}}>03面试评价表</Link>
                </div>
                <div style={{padding:10,height:440,overflow:'auto'}}>
                    <h1>一键发布职位</h1>
                    <div style={{display:'flex',justifyContent:'space-between',flexFlow:'wrap',textAlign:'center'}}>
                        <div style={{width:'31%',height:'100px',overflow:'hidden',background:'#f3f3f3',marginTop:20,borderRadius:10}}>
                            <img src="" alt="图片" width="100%" height="60px" style={{background:'red',display:'block'}}/>
                            <div style={{marginTop:10}}>未发布</div>
                        </div>
                        <div style={{width:'31%',height:'100px',overflow:'hidden',background:'#f3f3f3',marginTop:20,borderRadius:10}}>
                            <img src="" alt="图片" width="100%" height="60px" style={{background:'red',display:'block'}}/>
                            <div style={{marginTop:10}}>未发布</div>
                        </div>
                        <div style={{width:'31%',height:'100px',overflow:'hidden',background:'#f3f3f3',marginTop:20,borderRadius:10}}>
                            <img src="" alt="图片" width="100%" height="60px" style={{background:'red',display:'block'}}/>
                            <div style={{marginTop:10}}>未发布</div>
                        </div>
                        <div style={{width:'32%',height:'100px',overflow:'hidden',background:'#f3f3f3',marginTop:20,borderRadius:10}}>
                            <img src="" alt="图片" width="100%" height="60px" style={{background:'red',display:'block'}}/>
                            <div style={{marginTop:10}}>未发布</div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}