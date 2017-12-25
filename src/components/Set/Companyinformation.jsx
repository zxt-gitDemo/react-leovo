import React, { Component } from 'react';
import {Icon,Input,Button,Table,Divider,Popconfirm,Form,Select} from 'antd';
import './Set.css';
const Option = Select.Option;
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);
export default class Company extends Component {
    constructor(props) {
        super(props);
        this.state={
          industry:[],
          number:[],
          ourcompanyname:'',
          ourcompanyaddress:'',
          ourcompanyindustry:'',
          ourcompanynumber:'',
          ourcompantwebsite:'',
          workAddress:[],
          department:[],
          recruitmentwebsite:''
        }
        this.columns = [{
          title: '城市',
          dataIndex: 'name',
          width: '25%',
          render: (text, record) => this.renderColumns(text, record, 'name'),
        }, {
          title: '详情地址',
          dataIndex: 'address',
          width: '40%',
          render: (text, record) => this.renderColumns(text, record, 'address'),
        }, {
          title: '操作',
          dataIndex: '操作',
          render: (text, record) => {
            const { editable } = record;
            return (
              <div className="editable-row-operations">
                {
                  editable ?
                    <span>
                      <a onClick={() => this.save(record.key,this.state.workAddress,"workAddress")}>保存</a>
                      <Divider type="vertical" />
                      <a onClick={() => this.delete(record.key,this.state.workAddress,"workAddress")} style={{color:"red"}}>删除</a>
                      <Divider type="vertical" />
                      <a onClick={() => this.cancel(record.key,this.state.workAddress,"workAddress")}>取消</a>
                    </span>
                    : <a onClick={() => this.edit(record.key,this.state.workAddress,"workAddress")}>编辑</a>
                }
              </div>
            );
          },
        }];
        this.columns2 = [{
          title: '部门名称',
          dataIndex: 'name',
          width: '50%',
          render: (text, record) => this.renderColumns2(text, record, 'name'),
        }, {
          title: '操作',
          dataIndex: '操作',
          render: (text, record) => {
            const { editable } = record;
            return (
              <div className="editable-row-operations">
                {
                  editable ?
                    <span>
                      <a onClick={() => this.save(record.key,this.state.department,"department")}>保存</a>
                      <Divider type="vertical" />
                      <a onClick={() => this.delete(record.key,this.state.department,"department")} style={{color:"red"}}>删除</a>
                      <Divider type="vertical" />
                      <a onClick={() => this.cancel(record.key,this.state.department,"department")}>取消</a>
                    </span>
                    : <a onClick={() => this.edit(record.key,this.state.department,"department")}>编辑</a>
                }
              </div>
            );
          },
        }];
        
         this.cacheData = this.state.workAddress.map(item => ({ ...item })); 

      }
      componentDidMount(){
        fetch('./data.json').then(res => res.json()).then(res => {
          let {industry,number}=res.data.basic;
          this.setState({industry:industry})
          this.setState({number:number })
        })
        fetch('./set/company.json').then(res => res.json()).then(res => {
          let {name,address,industry,number,website}=res.data.basic
          let {workAddress,department,recruitmentwebsite}=res.data
          this.setState({ourcompanyname:name})
          this.setState({ourcompanyaddress:address})
          this.setState({ourcompanyindustry:industry})
          this.setState({ourcompanynumber:number})
          this.setState({ourcompantwebsite:website})      
          this.setState({workAddress:workAddress})          
          this.setState({department:department})          
          this.setState({recruitmentwebsite:recruitmentwebsite})          
        })
      }
      
      renderColumns(text, record, column) {
        return (
          <EditableCell
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.key, column,this.state.workAddress,"workAddress")}
          />
        );
      }
      renderColumns2(text, record, column) {
        return (
          <EditableCell
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.key, column,this.state.department,"department")}
          />
        );
      }
      handleChange(value, key, column,data,name) {
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.setState({ [name]: newData });
        }
      }
      edit(key,data,name) {
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target.editable = true;
          this.setState({ [name]: newData });
        }
      }
      save(key,data,name) {
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          delete target.editable;
          this.setState({ [name]: newData });
          this.cacheData = newData.map(item => ({ ...item }));
        }
      }
      delete(key,data,name){
        const newData = [...data];
        const target = newData.filter(item => item.key !== key);
        if (target) {
          delete target.editable;
          this.setState({ 
            [name]: target
          });
          this.cacheData = newData.map(item => ({ ...item }));
        }
      }
      cancel(key,data,name ) {
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.setState({ [name]: newData });
        }
      }
      changeselect(type,value){
        this.setState({
            [type]: value,
          });
      }
      inputchange(type,e){
        this.setState({
          [type]: e.target.value,
        });
      }
      updatecompany(){
        let ourcompanyname=this.state.ourcompanyname;
        let ourcompanyaddress=this.state.ourcompanyaddress;
        let ourcompanyindustry=this.state.ourcompanyindustry;
        let ourcompanynumber=this.state.ourcompanynumber;
        let ourcompantwebsite=this.state.ourcompantwebsite;
      }
    render(){
        return(
            <div style={{width:'560px',padding: '20px'}} >
            <Form>
                <p><span>公司名称</span><span style={{color:'red'}}>*</span></p>
                <Input onChange={this.inputchange.bind(this,"ourcompanyname")} value={this.state.ourcompanyname}/>
                <p><span>地址</span></p>
                <Input onChange={this.inputchange.bind(this,"ourcompanyaddress")} value={this.state.ourcompanyaddress}/>
                <p><span>行业</span><span style={{color:'red'}}>*</span></p>
                <Select  style={{ width:'100%'}}  onChange={this.changeselect.bind(this,"ourcompanyindustry")} value={this.state.ourcompanyindustry}>
                  {
                    this.state.industry.map(function(item,key){
                      return <Option key={key} value={item}>{item}</Option>
                    })
                  }
                </Select>
                <p><span>人数</span><span style={{color:'red'}}>*</span></p>
                <Select  style={{ width:'100%'}} onChange={this.changeselect.bind(this,"ourcompanynumber")} value={this.state.ourcompanynumber}>
                {
                    this.state.number.map(function(item,key){
                      return <Option key={key} value={item}>{item}</Option>
                    })
                  }
                </Select>
                <p><span>网址</span><span style={{color:'red'}}>*</span></p>
                <Input onChange={this.inputchange.bind(this,"ourcompantwebsite")} value={this.state.ourcompantwebsite}/>
                <Button type="primary" style={{marginTop:'10px'}} onClick={this.updatecompany.bind(this)}>更新公司</Button>
            </Form>
            <hr/>
                <h3>工作地点</h3>
                <Table  pagination={false} dataSource={this.state.workAddress} columns={this.columns} />
                <Form action="" layout="inline" style={{margin:'10px 0'}}>
                    <Form.Item>
                    <Input placeholder="城市"/>
                    </Form.Item>
                    <Form.Item>
                    <Input placeholder="详细地点"/>
                    </Form.Item>
                    <Form.Item><Button type="primary" >新建工作地点</Button>
                    </Form.Item>
                </Form>
                <h3>部门</h3>
                <Table  pagination={false} dataSource={this.state.department} columns={this.columns2} />
                <Form action="" layout="inline" style={{margin:'10px 0'}}>
                    <Form.Item>
                    <Input/>
                    </Form.Item>
                    <Form.Item><Button type="primary" >新建部门</Button>
                    </Form.Item>
                </Form>
                <h3>招聘官网</h3>
                <p><Icon type="link"/><a href="#/home" target="black">{this.state.recruitmentwebsite}</a></p>
            </div>
            
        )
    }
}