import React, { Component } from 'react';
import {Layout,Input,Button,Table,Divider,Popconfirm,Form,Select} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;

const EditableCell = ({ editable, value, onChange}) => (  
  <div>
    {
    editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);
const EditableSelect = ({ editable, value, onChange}) => (
<div>
  {
  editable
    ? <Select style={{ margin: '-5px 0',width:'100%'}} value={value} onSelect={(value) => onChange(value)} >
    <Option value="管理员" key="1">管理员</Option>
    <Option value="面试官" key="2">面试官</Option>
    <Option value="HR" key="3">HR</Option>
    </Select>
    : value
  }
</div>
);
export default class Teammanagement extends Component {
    constructor(props) {
        super(props);
        this.state={
          team:[],
          inside:[],
          addteamshow:'none',
          addinsideshow:'none',
          addselect:'面试官'
        }
        this.columns = [{
          title: '姓名',
          dataIndex: 'name',
          width: '25%',
          render: (text, record) => this.renderColumns(text, record, 'name'),
        }, {

          title: '邮箱',
          dataIndex: 'email',
          width: '30%'
        },
        {
            title: '类别',
            dataIndex: 'category',
            width: '25%',
            render: (text, record) => this.renderColumns2(text, record, 'category'),
          },  {
          title: '操作',
          dataIndex: 'jurisdiction',
          render: (text, record) => {
            const { editable } = record;
            return (
              <div className="editable-row-operations">
                {
                  editable ?
                    <span>
                      <a onClick={() => this.save(record.key,this.state.team,"team")}>保存</a>
                      <Divider type="vertical" />
                      <a onClick={() => this.cancel(record.key,this.state.team,"team")}>取消</a>
                    </span>
                    : <div><a style={{color:'gray'}} onClick={() => this.disable(record.key,this.state.team,"team")}>{record.jurisdiction===true?'禁用':'恢复'}</a> 
                    <Divider type="vertical" />
                    <a onClick={() => this.edit(record.key,this.state.team,"team")}>编辑</a></div>
                }
              </div>
            );
          },
        }];
        this.columns2 = [{
        title: '姓名',
        dataIndex: 'name',
        width: '25%',
        render: (text, record) => this.renderColumns3(text, record, 'name'),
      }, {
        title: '邮箱',
        dataIndex: 'email',
        width: '50%',
        render: (text, record) => this.renderColumns3(text, record, 'email'),        
      },
      {
        title: '操作',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={() => this.save(record.key,this.state.inside,"inside")}>保存</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.cancel(record.key,this.state.inside,"inside")}>取消</a>
                  </span>
                  : <div>
                  <a onClick={() => this.edit(record.key,this.state.inside,"inside")}>编辑</a></div>
              }
            </div>
          );
        },
      }];
        this.cacheData = this.state.team.map(item => ({ ...item }));
      }
      componentDidMount(){
        fetch('./set/company.json').then(res => res.json()).then(res => {
          let {team,inside}=res.data          
          this.setState({team:team})          
          this.setState({inside:inside})          
        })
      }

      renderColumns(text, record, column) {
        return (
          <EditableCell
            editable={record.editable}
            value={text} 
            onChange={value => this.handleChange(value, record.key, column,this.state.team,"team")}
          />
        );
      }
      renderColumns2(text, record, column) {
        return (
          <EditableSelect
            editable={record.editable}
            value={text} 
            onChange={value => this.handleChange(value, record.key, column,this.state.team,"team")}
          />
        );
      }
      renderColumns3(text, record, column) {
        return (
          <EditableCell
            editable={record.editable}
            value={text} 
            onChange={value => this.handleChange(value, record.key, column,this.state.inside,"inside")}
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
      cancel(key,data,name) {
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.setState({ [name]: newData }); 
        }
      }
      disable(key,data,name){
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        target.jurisdiction=!target.jurisdiction
        if (target) {
          delete target.editable;
          this.setState({ [name]: newData });          
          this.cacheData = newData.map(item => ({ ...item }));
        }
      }
      show(name){
          this.setState({
            [name]:'block'
          })
      }
      hide(name){
        this.setState({
          [name]:'none'
        })
      }
      teamkeep(){
        let keyid=this.state.team.length+1;
        let teamname=this.teamname.input.value;
        let teamemail=this.teamemail.input.value;
        let teamrole=this.state.addselect
        let obj={key:keyid,name:teamname,email:teamemail,category:teamrole,jurisdiction:true}
       this.state.team.push(obj)
       this.setState({
         team:this.state.team
       })
       this.setState({
        addteamshow:"none"
      })
      }
      insidekeep(){
        let keyid=this.state.inside.length+1;
        let insidename=this.insidename.input.value;
        let insideemail=this.insideemail.input.value;
        let obj={key:keyid,name:insidename,email:insideemail}
       this.state.inside.push(obj)
       this.setState({
        inside:this.state.inside
       })
       this.setState({
        addinsideshow:"none"
      })
      }
    render(){
       
        return(
            <Layout style={{height:'520px'}}>
            <Layout style={{width:'700px',background:'white',padding: '20px'}}>
                    <div style={{margin:'0 auto',width:'550px',position:'relative'}}>
                    <div style={{}}>
                        <h3 style={{}}>团队成员</h3>
                        <span style={{position:'absolute',top:'0',right:'5px'}}>招聘者账号：1/1</span>
                    </div>
                    <Table  pagination={false} dataSource={this.state.team} columns={this.columns} />
                    <Form action="" layout="inline" style={{margin:'10px 0',display:this.state.addteamshow}}>
                    <Form.Item>
                        <div>姓名</div>
                    <Input ref={(input) => { this.teamname = input; }}/>
                    </Form.Item>
                    <Form.Item>
                    <div>工作邮箱</div>
                    <Input ref={(input) => { this.teamemail = input; }}/>
                    </Form.Item>
                    <Form.Item>
                    <div>角色</div>
                    <Select style={{ margin: '-5px 0',width:'100%'}} onSelect={(v)=>this.setState({addselect:v})} value={this.state.addselect}>
                      <Option value="管理员" key="1">管理员</Option>
                      <Option value="面试官" key="2">面试官</Option>
                      <Option value="HR" key="3">HR</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item>
                        <p style={{textAlign:'right',margin:'0'}}><span onClick={this.hide.bind(this,"addteamshow")}>取消</span></p>
                        <Button type="primary" onClick={this.teamkeep.bind(this)}>保存</Button>
                    </Form.Item>
                    </Form>
                    <Button style={{width:'100%'}} onClick={this.show.bind(this,"addteamshow")}>+添加</Button>
                    <hr style={{margin:'20px 0'}}/>
                    <h3 style={{}}>内推推荐人</h3>
                    <Table  pagination={false} dataSource={this.state.inside} columns={this.columns2} />
                    <Form action="" layout="inline" style={{margin:'10px 0',display:this.state.addinsideshow}}>
                    <Form.Item style={{width:'16%'}}>
                        <div>姓名</div>
                    <Input ref={(input) => { this.insidename = input; }}/>
                    </Form.Item>
                    <Form.Item style={{width:'60%'}}>
                    <div>工作邮箱</div>
                    <Input style={{width:'200%'}} ref={(input) => { this.insideemail = input; }}/>
                    </Form.Item>
                    <Form.Item style={{width:'14%'}}>
                        <p style={{textAlign:'right',margin:'0'}}><span onClick={this.hide.bind(this,"addinsideshow")}>取消</span></p>
                        <Button type="primary" onClick={this.insidekeep.bind(this)}>保存</Button>
                    </Form.Item>
                    </Form>
                    <Button style={{width:'100%',margin:{}}} onClick={this.show.bind(this,"addinsideshow")}>+添加</Button>  
                    </div>
            </Layout>
            <Sider style={{background:'#F3F3F3',padding:' 0 20px'}}  width={320}>
                <p>管理员</p>
                <p>拥有全部查看和操作权限，可管理团队成员，包括调整权限、禁用等。</p>
                <p>HR</p>
                <p>可查看并操作作为负责人或协作人的职位，以及与这些职位相关联的候选人。</p>
                <p>面试官</p>
                <p>可查看并操作负责筛选的候选人，可查看作为面试官的面试并给出反馈意见。</p>
            </Sider>

            </Layout>
        )
    }
}