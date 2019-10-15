import React, { Component } from 'react';
import './mgr.css'
import {Button, Card, Input, Table, Icon, Col, Tooltip, Modal, Form, Radio, Select, Row, notification, message} from 'antd'
import 'antd/dist/antd.css'
import Highlighter from 'react-highlight-words'
import axios from 'axios'


const {Option} = Select
const {confirm} = Modal
const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1418139_m2haq8kj3le.js', 
  });

class revise extends Component {
    constructor(props){
        super(props);
        this.state = {
            fingerdata:[
                {value:'0',text:'0'},
                {value:'1',text:'1'},
                {value:'2',text:'2'},
                {value:'3',text:'3'},
                {value:'4',text:'4'},
                {value:'5',text:'5'},
                {value:'6',text:'6'},
                {value:'7',text:'7'},
                {value:'8',text:'8'},
                {value:'9',text:'9'},
            ],
            hadfinger:[
                {value:'0',text:'0'},
                {value:'1',text:'1'},
            ],
            hadchoose:[]
        }
    }
    delsome = () =>{
        console.log(this.state.hadchoose)
    }    
    modifysub = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
                console.log(values)
            }
        })
    }
    handleCancel = () => {
        this.props.form.resetFields()
    }
    render(){
        const ItemLayout={
            labelCol:{
                xs:{span:24},
                sm:{span:6}
            },
            wrapperCol:{
                xs:{span:24},
                sm:{span:16}
            }
        }
        const newLayouot = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 8,
                offset: 15,
              },
            },
          };
        const { getFieldDecorator } = this.props.form;   
        return(
            <Form {...ItemLayout} onSubmit={this.modifysub}>
                <Form.Item label='已有指纹' style={{color:'white'}}>
                    {getFieldDecorator('had')(<Select mode='multiple' onChange={(v) => this.setState({hadchoose:v})}>{this.state.hadfinger.map((v,i)=>{return(<Option key={"had"+i} value={v.value}>{v.text}</Option>)})}</Select>)}
                    <Button type='primary' onClick={this.delsome}>删除</Button>
                    <Button type='danger' className='btn'>一键清除</Button>
                </Form.Item>
                <Form.Item label='新指纹' >
                    <Row gutter={6}>
                    <Col span={18}>
                    {getFieldDecorator('finger')(<Select onChange={(v)=> this.setState({site:v})}>{this.state.fingerdata.map((item,i)=>{return(<Option key={"op"+i} value={item.value}>{item.text}</Option>)})}</Select>)}
                    <Button type='primary' style={{width:'100%'}} onClick={this.regis}>登记</Button>
                    </Col>
                    <Col span={6}>
                    <div style={{width:'5rem',height:'5rem',backgroundColor:'#393C4F', margin:'0 auto', position:'relative'}}>
                        <img src={require('../static/ic_fingerprint_normal.png')} alt='' style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%,-50%)'}}></img>
                    </div>
                    </Col>
                    </Row>
                </Form.Item>
                <Form.Item {...newLayouot}>
                    <Button onClick={this.handleCancel}>重置</Button>
                    <Button type='primary' htmlType='submit' className='btn'>确定</Button>
                </Form.Item>
            </Form>
        )
    }
}
const ReviseForm = Form.create({ name: 'ReviseForm' })(revise);

class pwdform extends Component {
    state = {  }
    pwdsub = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
                console.log(values)
            }
        })
    }
    handleCancel = () => {
        this.props.form.resetFields()
    }
    render() {
        const ItemLayout={
            labelCol:{
                xs:{span:24},
                sm:{span:6}
            },
            wrapperCol:{
                xs:{span:24},
                sm:{span:16}
            }
        }
        const newLayouot = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 8,
                offset: 15,
              },
            },
          };
        const { getFieldDecorator } = this.props.form;   
        return (
            <Form {...ItemLayout} onSubmit={this.pwdsub}>
                <Form.Item label='口令'>
                    {getFieldDecorator('pwd',{
                        rules:[{require:true,message:'请输入新的口令',whitespace:true}]
                    })(<Input placeholder={this.props.data[0].pwd} />)}
                </Form.Item>
                <Form.Item {...newLayouot}>
                    <Button onClick={this.handleCancel}>重置</Button>
                    <Button type='primary' htmlType='submit' className='btn'>确定</Button>
                </Form.Item>
            </Form>
        );
    }
}
const Pwdform = Form.create({name: 'Pwdform'})(pwdform)

class manager extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchText:'',
            func:'',
            site:'',
            devices:[],
            rowdata:[],
            rankcloumns: [
                {title: '设备ID', dataIndex: 'device', key: 'device', width: '30%', ...this.getColumnSearchProps('device')},
                {title: '部门ID', dataIndex: 'deparment', key: 'deparment'},
                {title: '用户ID', dataIndex: 'user', key: 'user'},
                {title: '指纹数', dataIndex: 'num', key: 'num'},
                {title: '口令', dataIndex: 'pwd', key: 'pwd'}
            ],
            rankdata: [
                {key:'1',device:'dasdasdasdasadas',deparment:'0001',user:'adsdsa',num:'10',pwd:'dajshasdgajs'}
            ],
            addvisiable:false,
            modifyvisi:false,
            pwdvisiable:false,
            fingerdata:[
                {value:'0',text:'0'},
                {value:'1',text:'1'},
                {value:'2',text:'2'},
                {value:'3',text:'3'},
                {value:'4',text:'4'},
                {value:'5',text:'5'},
                {value:'6',text:'6'},
                {value:'7',text:'7'},
                {value:'8',text:'8'},
                {value:'9',text:'9'},
            ],
         };
    }

    componentDidMount(){
        const _this=this
        axios.get('http://192.168.5.6:8000/network').then(res=>{
            console.log(res.data)
            _this.setState({
                rankdata:[
                    {key:'1',device:'dasdasdasdasadas',deparment:'0001',user:'adsdsa',num:'10',pwd:'dajshasdgajs'},
                    {key:'2',device:'asd23112312312',deparment:'0002',user:'asd',num:'10',pwd:'dajshasdgajs'}
                ]   
            })         
        }).catch(error=>{
            console.log(error)
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys,selectedKeys,confirm,clearFilters}) => (
            <div style={{ padding: 8 }}>
                <Input
                ref={node => {
                    this.searchInput = node;
                }}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                style={{ width: 188, marginBottom: 8, display: 'block'}}
                className='inpcolor'
                />
                <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm)}
                icon="search"
                size="small"
                style={{ width: 90, marginRight: 8 }}
                >
                Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }} >
                <span className='inpcolor'>Reset</span>
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
        record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
        if (visible) {
            setTimeout(() => this.searchInput.select());
        }
        },
        render: text => (
        <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
        />
        ),
    });
    handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
    };
    
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
                devices:selectedRowKeys,
                rowdata:selectedRows
            })
        },
        getCheckboxProps: record => ({
            disabled: record.device === 'Disabled Divece',
            device: record.device
    
        })
    }

    showadd = () => {
        this.setState({
            addvisiable: true
        })
    }

    showmodify = () => {
        if(this.state.devices.length === 1)
            this.setState({
                modifyvisi: true
            })
        else
            notification['error']({
                message:'请选择其中一项进行修改'
            })
    }

    showpwd = () => {
        if(this.state.devices.length === 1)
            this.setState({
                pwdvisiable: true
            })
        else
            notification['error']({
                message:'请选择其中一项进行修改'
            })
    }

    delrank = () => {
        if(this.state.devices.length !== 0)
        confirm({
            title:`删除当前：${this.state.devices}`,
            content:'删除后该ID将无法使用',
            okText:'确定',
            okType:'danger',
            cancelText:'取消',
            onOk(){

            },
            onCancel(){}
        })
        else
            notification['error']({
                message:'请选择删除项'
            })
    }

    
    regis = () => {
        message.success('登记成功')
    }

    handleCancel = () => {
        this.setState({
            addvisiable: false,
            modifyvisi: false,
            pwdvisiable: false,
            func:''
        })
        this.props.form.resetFields()
    }

    formreset = () => {
        this.props.form.resetFields()
    }

    addsub = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
                console.log('asd',values)
            }
        })
    }

    funcSelect = e => {
        this.setState({
            func:e.target.value
        })
    }

    render() {
        const ItemLayout={
            labelCol:{
                xs:{span:24},
                sm:{span:6}
            },
            wrapperCol:{
                xs:{span:24},
                sm:{span:16}
            }
        }
        const newLayouot = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 8,
                offset: 15,
              },
            },
          };
        const funcoption = [{label:'指纹', value:'figer'},{label:'口令', value:'pwd'}]
        const { getFieldDecorator } = this.props.form;   
        let block;
        if(this.state.func === 'figer'){
            block = (
                <Form.Item label='指位' >
                    <Row gutter={6}>
                    <Col span={18}>
                    {getFieldDecorator('finger', {
                        rules: [{required:true, message:'请选择指位', whitespace:true}]
                    })(<Select onChange={(v)=> this.setState({site:v})}>{this.state.fingerdata.map((item,i)=>{return(<Option key={"op"+i} value={item.value}>{item.text}</Option>)})}</Select>)}
                    <Button type='primary' style={{width:'100%'}} onClick={this.regis}>登记</Button>
                    </Col>
                    <Col span={6}>
                    <div style={{width:'5rem',height:'5rem',backgroundColor:'#393C4F', margin:'0 auto', position:'relative'}}>
                        <img src={require('../static/ic_fingerprint_normal.png')} alt='' style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%,-50%)'}}></img>
                    </div>
                    </Col>
                    </Row>
                </Form.Item>
            )
        }     
        else if(this.state.func === 'pwd'){
            block = (
                <Form.Item label='口令' hasFeedback>
                    {getFieldDecorator('pwd', {
                        rules: [{required:true, message:'请输入口令', whitespace: true}]
                    })(<Input />)}
                </Form.Item>
            )
        }
        return (
                <div style={{margin:'1rem'}} >
                <Card size='small' title='权限管理' bordered={false} style={{backgroundColor:'#1B2143'}}>
                    <Tooltip placement='bottom' title='新增权限'>
                        <Button type='primary' onClick={this.showadd}><MyIcon type='icon-tianjiashebei'></MyIcon></Button>
                    </Tooltip>
                    <Tooltip placement='bottom' title='修改指纹'>
                        <Button type='primary' className='btn' onClick={this.showmodify}><MyIcon type='icon-huabanfuben'></MyIcon></Button>
                    </Tooltip>
                    <Tooltip placement='bottom' title='修改口令'>
                        <Button type='primary' className='btn' onClick={this.showpwd}><MyIcon type='icon-xiugairenzhengkouling'></MyIcon></Button>
                    </Tooltip>
                    <Tooltip placement='bottom' title='删除权限'>
                        <Button type='danger' className='btn' onClick={this.delrank}><MyIcon type='icon-shanchu'></MyIcon></Button>
                    </Tooltip>
                    <Table columns={this.state.rankcloumns} dataSource={this.state.rankdata} rowSelection={this.rowSelection} size="middle" style={{backgroundColor:'#1B2143',marginTop:'1rem'}}></Table>
                </Card>
                <Modal title='新增权限' visible={this.state.addvisiable} footer={null}  onCancel={this.handleCancel}>
                    <Form {...ItemLayout} onSubmit={this.addsub}>
                        <Form.Item label='用户ID' hasFeedback>
                            {getFieldDecorator('userrid', {
                                rules:[{required:true,message:'请输入用户ID', whitespace:true}]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label='登记方式'>
                            {getFieldDecorator('register',{
                                rules: [{required:true,message:'请选择注册方式', whitespace:true}]
                            })(<Radio.Group options={funcoption} onChange={this.funcSelect} />)}
                        </Form.Item>
                        { block }
                        <Form.Item {...newLayouot}>
                            <Button onClick={this.formreset}>重置</Button>
                            <Button type='primary' htmlType='submit' className='btn'>确定</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title='修改指纹' visible={this.state.modifyvisi} onCancel={this.handleCancel} footer={null}>
                    <ReviseForm></ReviseForm>
                </Modal>
                <Modal title='修改口令' visible={this.state.pwdvisiable} onCancel={this.handleCancel} footer={null}>
                    <Pwdform data={this.state.rowdata}></Pwdform>
                </Modal>
                </div>
        );
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(manager);
export default WrappedRegistrationForm;