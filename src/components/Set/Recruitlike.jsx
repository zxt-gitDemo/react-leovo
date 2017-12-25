import React, { Component } from 'react';
import { Layout, Menu, Icon,Input,Table,Divider,Button,Select } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;
const dataSource = [{
    name: '胡彦斌',
    address: '西湖区湖底公园1号'
  }, {
    name: '胡彦祖',
    address: '西湖区湖底公园1号'
  }];
  
  const columns = [{
    title: '默认面试评价表',
    dataIndex: 'name',
  }, {
    title: '全公司',
    dataIndex: 'address',

  }, {
    title: '预览',
    render: (text, record) => (
        <span>
          <a href="#" style={{color:'red'}}>删除</a>
          <Divider type="vertical" />
          <a href="#">修改</a>
          <Divider type="vertical" />
          <a href="#" >预览</a>
        </span>
      )
   
  }];
  
export default class Company extends Component {
    render(){
        return (
            <Layout style={{height:'100%',width:'700px',background:'white',padding:'20px',overflow:'auto'}} >
                <div style={{width:'560px',margin:'0 auto'}}>
                    <h3>面试评价表模板</h3>
                    <Table pagination={false} dataSource={dataSource} columns={columns} />
                    <Button style={{width:'100%',margin:'10px 0'}}>+添加面试评价表</Button> 
                    <div>
                    <p>模板名称</p>
                    <Input/>
                    <p>适用范围</p>
                    <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    <p>适用部门</p>
                    <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={['a10', 'c12']}
                        >
                             <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                </div>
                <div style={{border:'1px solid lightgray',background:'#f3f3f3',position:'relative',padding:'10px',borderRadius:'5px',marginTop:'10px'}}>
                    <p>问题</p>
                    <Icon type="delete" style={{position:'absolute',right:10,top:15,color:'gray'}}/>
                    <div>问题名称</div>
                    <Input style={{background:'#f3f3f3'}}/>
                    <div>问题名称</div>
                    <TextArea autosize={{ minRows: 2, maxRows: 6 }} style={{background:'#f3f3f3'}}/>
                </div>
                <Button style={{width:'100%',margin:'10px 0'}}>+添加问题</Button> 
                <div style={{margin:'20px 0',float:'right'}}>
                <Button type="primary" style={{marginRight:10}}>保存</Button> 
                <Button>取消</Button>
                </div>
                 
                </div>
                
            </Layout>
        )
    }
}