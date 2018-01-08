import React, { Component } from 'react';
import { Layout,Select,Input,Button,Modal,message} from 'antd';
import {withRouter} from 'react-router-dom';
import Workexpenience from './Workexperience';
import Projectexpenience from './Projectexperience';
import Educationexperience from './Educationexperience';
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
 class Edit extends Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible: false,
            sex:[],
            workingLife:[],
            education:[],
            channel:[],
            referee:[],
            refereeVisible:'inline-block',
            works:[],
            projects:[],
            educations:[],
            worksvalue:[],
            projectsvalue:[],
            educationsvalue:[],
            sname:'',
            saddress:'',
            ssex:'其他',
            sage:'',
            sphone:'',
            semail:'',
            sworkLife:'',
            seducation:'',
            schannel:'1e8accab6896417799db84bd42d01d06',
            sreferee:'',
            uid:'',
            created:'',
            updated:'',
            updstamp:'',
            deleteshow:false
        }
    }
    componentDidMount(){
       let uid=this.props.match.params.id;
       if(uid){
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/abilityPerson/'+uid,{mode: 'cors',method:'get'}).then(res => res.json()).then(res => {
            this.againReq(res.body)  
            this.setState({
                uid:res.body.uid,
                deleteshow:true
            })
            })
        }
        fetch('/Local/common/data.json').then(res => res.json()).then(res => {
            let { education,sex,workNature,workingLife} = res.data.basic
            this.setState({sex:sex})
            this.setState({workingLife:workingLife})
            this.setState({education:education})            
        })
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/public/getbas',{mode:'cors',method:'get'}).then(res => res.json()).then(res => {
        let {job,channel,referee} = res.body
            this.setState({job:job,
                channel:channel,
                referee:referee
            })
        })    
    }
    componentWillReceiveProps(nextProps){
       let objnull = Object.keys(nextProps.data);
       
       if(objnull.length == 0){
       }else{
        this.againReq(nextProps.data)
       }
        
    }
    againReq(data){
        let { created,updated,updstamp,abilityname,address,sex,age,phone,email,workLife,education,channeluid,refereeuid,personworks:ws,personprojects:ps,personeducations:es} = data
        if(channeluid===null||channeluid===""){
            
        }else{
            this.setState({schannel:channeluid})
        }
        this.setState({sname:abilityname})
        this.setState({saddress:address})
        this.setState({ssex:sex})
        this.setState({sage:age})
        this.setState({sphone:phone})
        this.setState({semail:email})
        this.setState({sworkLife:workLife})
        this.setState({seducation:education}) 
        this.setState({sreferee:refereeuid})
        this.setState({created:created})
        this.setState({updated:updated})
        this.setState({updstamp:updstamp})
        this.setState({worksvalue:ws},function(){
            let worklist=this.state.works;
            for( let w=0;w<this.state.worksvalue.length;w++){
                worklist.push(<Workexpenience key={this.state.works.length} work={this.state.worksvalue[w]} index={this.state.works.length} del={(n)=>this.deletework(n)} editwork={(arrindex,value,type)=>this.editwork(arrindex,value,type)} />)
                this.setState({works:worklist})
            }
        })
        this.setState({projectsvalue:ps},function(){
            let projectlist=this.state.projects;
            for( let p=0;p<this.state.projectsvalue.length;p++){
                    projectlist.push(<Projectexpenience key={this.state.projects.length} project={this.state.projectsvalue[p]} index={this.state.projects.length} del={(n)=>this.deleteproject(n)} editproject={(arrindex,value,type)=>this.editproject(arrindex,value,type)}/>)
                    this.setState({projects:projectlist}) 
            }
        })
        this.setState({educationsvalue:es},function(){
            let educationlist=this.state.educations;
            for( let e=0;e<this.state.educationsvalue.length;e++){
                educationlist.push(<Educationexperience key={this.state.educations.length} education={this.state.educationsvalue[e]} index={this.state.educations.length} del={(n)=>this.deleteeducation(n)} editeducations={(arrindex,value,type)=>this.editeducations(arrindex,value,type)}/> )
                this.setState({educations:educationlist})
            }
        })  

        if(this.state.schannel!="1e8accab6896417799db84bd42d01d06"){
            this.setState({refereeVisible:'none'})
        }else{
            this.setState({refereeVisible:'inline-block'})
        }  
    }
      setModalVisible(modalVisible) {
        let name=this.rname.input.value
        let email=this.remail.input.value
        if(name===""||email===""){
            message.warning("不能为空", [1])            
        }else{
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/referee',{mode:'cors',method:'post',
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    body:JSON.stringify({
                        "refereename":name,
                        "refereeEMail":email
                    }),
                    }).then(res => res.json()).then(res => {
                    message.success("保存成功", [1])
                    fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/public/getbas',{mode:'cors',method:'get'}).then(res => res.json()).then(res => {
                        let {referee} = res.body
                        this.setState({referee:referee})
                    })   
                    this.setState({ modalVisible });

                }).catch(()=>{
                    message.error("保存失败", [1])
        })   
        }
        
       
      } //显示添加推荐人弹窗
      newtalent(){
        let created=this.state.created;
        let updated=this.state.updated;
        let updstamp=this.state.updstamp;
            if(this.state.uid===''){
                let newtime=moment(new Date).format('YYYY-MM-DD HH:mm:ss')
                    created=newtime;
                    updated=newtime;
                    updstamp=newtime;
            }
          let [name,address,sex,age,phone,email,workLife,education,channel,referee]=[this.state.sname,this.state.saddress,this.state.ssex,this.state.sage,this.state.sphone,this.state.semail,this.state.sworkLife,this.state.seducation,this.state.schannel,this.state.sreferee];
          let works=this.state.worksvalue;
          let projects=this.state.projectsvalue;
          let educations=this.state.educationsvalue;
          let job=[];
          if(this.props.job==""){

          }else{
            job.push({jobuid:this.props.job})
          }
          
          this.trim(works)
          this.trim(projects)
          this.trim(educations)
          let obj={
            uid:this.state.uid,
            abilityname:name,
            address:address,
            sex:sex,
            age:age,
            phone:phone,
            email:email,
            workLife:workLife,
            education:education,
            channeluid:channel,
            refereeuid:referee,
            personworks:works,
            personprojects:projects,
            personeducations:educations,
            personapplyJobs:job,
            created:created,
            updated:updated,
            updstamp:updstamp
          }
          if(name===""){
            message.warning("姓名不能为空", [1])
          }else{
            if(channel!="1e8accab6896417799db84bd42d01d06"){
                referee=''
            }else{
                if(referee==""){
                    message.warning("推荐人不能为空", [1])
                    return 
                }          
            }
            fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/abilityPerson',{mode:'cors',method:'post',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body:JSON.stringify(obj),
            }).then(res => res.json()).then(res => {
                message.success("保存成功",[0.5])
                setTimeout(()=>{
                    this.props.history.push('/home/talents/information')
                },500)
            }).catch(()=>{
                message.error("保存失败", [1])
            })  
            
          }
            
         
      }//保存新建候选人
      trim(arr){
        for(let i = 0 ;i<arr.length;i++)  
        {  
           if(arr[i] == "" || typeof(arr[i]) == "undefined")  
           {  
            arr.splice(i,1);  
                    i= i-1;  
                 
           }  
             
        } 
        return arr 
      }//去除空数据
      channelchange(type,v){
        this.setState({
            [type]: v,
          });
        if(v!="1e8accab6896417799db84bd42d01d06"){
            this.setState({refereeVisible:'none'})
        }else{
            this.setState({refereeVisible:'inline-block'})
        }
      }//如果不是内推则隐藏推荐人
        addworkexpenience(){
            let worksvalue=this.state.worksvalue;
            worksvalue.push(
                {
                    datastart:'',
                    dataend:'',
                    isnow:'n',
                    cname:'',
                    jobname:'',
                    workcontent:''
                }
            )
            let worklist=this.state.works;
            worklist.push(<Workexpenience key={this.state.works.length} work={this.state.worksvalue} index={this.state.works.length} del={(n)=>this.deletework(n)} editwork={(arrindex,value,type)=>this.editwork(arrindex,value,type)} />)
            this.setState({works:worklist})
            
        }//添加工作经验
        editwork(arrindex,value,type){
            let worksvalue=this.state.worksvalue;
            worksvalue[arrindex][type]=value;
            this.setState({
                worksvalue:worksvalue
            })
        }//修改工作经验时候的处理
      deletework(n){
        this.state.works.splice(n, 1,"");
        this.setState({
            works:this.state.works
        })
        this.state.worksvalue.splice(n, 1,"");
        this.setState({
            worksvalue:this.state.worksvalue
        })
     
      }//删除工作经验
      addproject(){
        let projectsvalue=this.state.projectsvalue;
        projectsvalue.push(
            {
                datastart:'',
                dataend:'',
                isnow:'n',
                pname:'',
                crole:'',
                projectcontent:''
            }
        )
        let projectlist=this.state.projects;
        projectlist.push(<Projectexpenience key={this.state.projects.length} project={this.state.projectsvalue} index={this.state.projects.length} del={(n)=>this.deleteproject(n)} editproject={(arrindex,value,type)=>this.editproject(arrindex,value,type)}/>)
        this.setState({projects:projectlist})
        
      }//添加项目经验
      editproject(arrindex,value,type){
        let pvalue=this.state.projectsvalue;
        
        pvalue[arrindex][type]=value;
        this.setState({
            projectsvalue:pvalue
        })
      }//修改项目经验时候的处理
      deleteproject(n){
        this.state.projects.splice(n, 1,"");
        this.setState({
            projects:this.state.projects
        })
        this.state.projectsvalue.splice(n, 1,"");
        this.setState({
            projectsvalue:this.state.projectsvalue
        }) 
      }//删除项目经验
      addeducation(){
        let educationsvalue=this.state.educationsvalue;
        educationsvalue.push(
            {
                datastart:'',
                dataend:'',
                isnow:'n',
                eduname:'',
                education:'',
                major:''
            }
        )
        let educationlist=this.state.educations;
        educationlist.push(<Educationexperience key={this.state.educations.length} education={this.state.educationsvalue} index={this.state.educations.length} del={(n)=>this.deleteeducation(n)} editeducations={(arrindex,value,type)=>this.editeducations(arrindex,value,type)}/> )
        this.setState({educations:educationlist})
       
      }//添加教育经验
      editeducations(arrindex,value,type){
        let evalue=this.state.educationsvalue;
        evalue[arrindex][type]=value;
        this.setState({
            educationsvalue:evalue
        })
      }//修改教育背景时候的处理
      deleteeducation(n){
        this.state.educations.splice(n, 1,"");
        this.setState({
            educations:this.state.educations
        }) 
        this.state.educationsvalue.splice(n, 1,"");
        this.setState({
            educationsvalue:this.state.educationsvalue
        }) 
      }//删除教育经验
      inputchange(type,e){
          this.setState({
            [type]: e.target.value,
          });
      }//修改input框输入的值到状态里
      selectvalue(type,value){
        this.setState({
            [type]: value,
          });
      }
      delete(){
        fetch('http://10.125.4.32:8080/xiaoniuzp/api/xnzp/abilityPerson/'+this.state.uid,{mode: 'cors',method:'delete'}).then(res => res.json()).then(res => {
            message.success('删除成功', [0.5])            
            setTimeout(()=>{
                this.props.history.push('/home/talents')
            },500)
        }).catch(()=>{
            message.error("删除失败", [1])
        })            
      }
    render(){
        
        let sex= this.state.sex.map(function(item,key){
            return <Option key={key} value={item}>{item}</Option>
        })
        let workingLife=this.state.workingLife.map(function(item,key){
            return <Option key={key} value={item}>{item}</Option>
        })
        let education=this.state.education.map(function(item,key){
            return <Option key={key} value={item}>{item}</Option>
        })
        let channel=this.state.channel.map(function(item,key){
            return <Option key={key} value={item.uid}>{item.channelName}</Option>
        })
        let referee=this.state.referee.map((item,key)=>{
            return <Option value={item.uid} key={key}>{item.refereename}</Option>
        })
        let work=this.state.works.map((item,key)=>{
            return <div key={key}>{item}</div>
        })
        let project =this.state.projects.map((item,key)=>{
            return <div key={key}>{item}</div>
        })
        let educationbackground =this.state.educations.map((item,key)=>{
            return <div key={key}>{item}</div>
        })
        return(
            <div style={{position:'relative'}} >
            <a style={{position:'absolute',top:0,right:0,color:'red',display:this.state.deleteshow===true?'block':'none'}} onClick={this.delete.bind(this)} >删除</a>
            <h3>个人信息</h3>
            <div style={{marginBottom:20}}>
              <div>候选人姓名<span style={{color:'red'}}>*</span></div>  
                <Input onChange={this.inputchange.bind(this,"sname")} value={this.state.sname} ref={(input) => { this.inputfocus = input; }}/>
            </div>
            <div style={{marginBottom:20}}>
                <div style={{width:'30%',display:'inline-block',marginRight:'5%'}}>
                    <div>所在地</div>
                    <Input onChange={this.inputchange.bind(this,"saddress")} value={this.state.saddress}/>
                </div>
                <div style={{width:'30%',display:'inline-block',marginRight:'5%'}}>
                    <div>性别</div>
                    <Select style={{ width:'100%' }} onSelect={this.selectvalue.bind(this,"ssex")} value={this.state.ssex}>
                            {sex}
                    </Select>
                </div>
                <div style={{width:'30%',display:'inline-block'}}>
                    <div>年龄</div>
                    <Input onChange={this.inputchange.bind(this,"sage")} value={this.state.sage}/>
                </div>
                
            </div>
            <div style={{marginBottom:20}}>
            <div style={{width:'49%',display:'inline-block',marginRight:'2%'}}>
                    <div>手机号</div>
                    <Input onChange={this.inputchange.bind(this,"sphone")} value={this.state.sphone}/>
                </div>
            <div style={{width:'49%',display:'inline-block'}}>
                    <div>邮箱</div>
                    <Input onChange={this.inputchange.bind(this,"semail")} value={this.state.semail}/>
                </div>
            </div>
            <div style={{marginBottom:20}}>
            <div style={{width:'49%',display:'inline-block',marginRight:'2%'}}>
                    <div>工作年限</div>
                    <Select style={{ width:'100%' }} onSelect={this.selectvalue.bind(this,"sworkLife")} value={this.state.sworkLife}>
                          {workingLife}
                    </Select>
                </div>
            <div style={{width:'49%',display:'inline-block'}}>
                    <div>学历</div>
                    <Select defaultValue="其他" style={{ width:'100%' }} onSelect={this.selectvalue.bind(this,"seducation")} value={this.state.seducation}>
                            {education}
                    </Select>
                </div>
            </div>
            <div style={{marginBottom:20}}>
            <div style={{width:'49%',display:'inline-block',marginRight:'2%'}}>
                    <div>渠道<span style={{color:'red'}}>*</span></div>
                    <Select  style={{ width:'100%' }} onSelect={this.channelchange.bind(this,"schannel")} value={this.state.schannel}>
                          {channel}
                    </Select>
                </div>
            <div style={{width:'49%',display:this.state.refereeVisible}}>
                    <div style={{position:'relative'}}>
                        <span>推荐人<span style={{color:'red'}}>*</span></span> 
                        <a style={{position:'absolute',top:0,right:0}} onClick={() => this.setState({modalVisible:true})}>+新建推荐人</a>
                    </div>
                    <Select
                    showSearch
                    optionFilterProp="children"
                    onSelect={this.selectvalue.bind(this,"sreferee")}
                    value={this.state.sreferee}
                    style={{ width: '100%' }}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {referee}
                </Select>
                </div>
            </div>
            <hr/>
            <div>
                <h3>工作经历</h3>
                <div className="work">
               {work}
                </div>
                <Button style={{width:'100%'}} onClick={this.addworkexpenience.bind(this)} >+添加工作经历</Button> 
                <hr/> 
            </div>
            <div>
                <h3>项目经验</h3>
                <div className="project">
                    {project}
                </div>
                <Button style={{width:'100%'}} onClick={this.addproject.bind(this)}>+添加项目经验</Button> 
                <hr/> 
            </div>
            <div>
                <h3>教育背景</h3>
                <div className="education">
                    {educationbackground}
                </div>
                <Button style={{width:'100%'}} onClick={this.addeducation.bind(this)}>+添加教育背景</Button> 
                <hr/> 
            </div>
            <Button type="primary" onClick={this.newtalent.bind(this)}>保存候选人</Button>
            <Modal
                    title="新建推荐人"
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setState({modalVisible:false})}
                    okText="保存"
                    cancelText="取消"
                    >
                    <div>名字<span style={{color:'red'}}>*</span></div>
                    <Input ref={(input) => { this.rname = input; }}/>
                    <div>邮箱<span style={{color:'red'}}>*</span></div>
                    <Input ref={(input) => { this.remail = input; }}/>
                    </Modal>
                    </div>  
        )
    }
}
export default withRouter(Edit)