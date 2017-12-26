import React, { Component } from 'react';
import { Input } from 'antd';
import { Link,NavLink,Switch} from 'react-router-dom';
import Talentsdetails from '../Talents/Talentsdetails'
const Search = Input.Search;
export default class TSearch extends Component {
    constructor(props){
        super(props)
        this.state={
            lists:[]
        }
    }
    componentDidMount(){
        let a=this.props.match.params.v;
        fetch('./information/talents.json').then(res => res.json()).then(res => {
            let list=res.data.list
            this.setState({lists:list})
        })
    }
    render() {
        
        
        return (
            <div style={{background:'white'}}>

            
            <div style={{width:'100%',height:95}}>
                <div style={{paddingTop:30,textAlign:'center'}}>"<span>张三</span>"找到1个结果</div>
                <div style={{width:500,margin:'0 auto',borderRadius:'4px',overflow:'hidden'}}>
                <Search
                  placeholder="搜索候选人"
                  onSearch={value =>console.log(value)}
                  style={{ width: '100%' }}
                  enterButton="搜索"
                />
                </div>
                
            </div>
            <div style={{width:800,margin:'0 auto',height:400,overflow:'hidden'}}>
            <Talentsdetails lists={this.state.lists} />
            </div>
            
            </div>
        )
    }
}