import React, { Component } from 'react';
import { Layout,Select,Input,Button,Modal} from 'antd';
import {Switch} from 'react-router-dom';
import Talupload from './Talupload'
import Edit from './Edit'
const { Header, Content, Footer, Sider } = Layout;

export default class Newtalent extends Component {
    constructor(props){
        super(props);
        this.state={
            job:'',
            data:{}
        }
    }
   changejob(v){
    this.setState({
        job:v
    })
   
   }
   userjson(json){
        this.setState({
            data:json
        })
    }
    render(){
        return(
            <Layout style={{marginLeft:300}}>
            <Content style={{background:'white',padding:20,height:'500px'}}>
                <Edit job={this.state.job} data={this.state.data}/>
            </Content>
            <Sider width={350} style={{background:'#F3F3F3',padding:10}}>
            <Talupload changejob={(v)=>this.changejob(v)} userjson={(json)=>this.userjson(json)}/>
            </Sider>
                

            </Layout>
        )
    }
}