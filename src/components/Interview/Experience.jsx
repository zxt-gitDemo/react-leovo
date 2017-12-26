import React, { Component } from 'react';
import {Divider } from 'antd';
export default class Experience extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:this.props.title,
            job:this.props.job,
            content:this.props.content,
            timestart:this.props.timestart,
            timeend:this.props.timeend
        };
    }
    render(){
        return (
            <div>
            <h3>{this.state.title}</h3>
            <p>{this.state.job}</p>
            <p>
                {this.state.content}
            </p>
            <p>{this.state.timestart}~{this.state.timeend===''?'至今':this.state.timeend}</p>
            <Divider/>
            </div>
        )
    }
}