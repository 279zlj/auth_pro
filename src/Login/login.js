import React, { Component } from 'react';
import './login.css';
import {Form, Button, Layout, Col, Icon, Input} from 'antd'
import 'antd/dist/antd.css'

const {Header, Content, Footer} = Layout

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    loginform = e => {
        e.preventDefault();
        let history = this.props.history;
        this.props.form.validateFieldsAndScroll((err,val)=>{
            if(!err){
                console.log(val)
                history.push('/Mgr')
            }
        })
    }
    render() {
        const {getFieldDecorator} =this.props.form
        return (
                <Layout style={{height:'100%'}}>
                    <Header>
                        <img src={require('../static/logo_ZXGL.png')} alt='' className='imgs' />
                        <img src={require('../static/character02-sbglpt.png')} alt='' />
                    </Header>
                    <Content style={{backgroundColor:'#111322',height:'100%'}}>
                        <Col span={12} style={{height:'100%',margin:'0 auto', position:'relative'}}>
                            <img src={require('../static/bg01.png')} alt='' style={{position:'absolute',width:'70%', top:'50%', left:'50%', transform: 'translate(-50%,-50%)'}}/>
                        </Col>
                        <Col span={6} offset={3} style={{border:'1px solid #1E8BC6',borderRadius:'.5rem',marginTop:'10%'}}>
                            <div style={{backgroundColor:'#191935',margin:'.5rem',borderRadius:'.5rem',padding:'2.5rem 2rem'}}>
                            <h2 style={{color:'white',textAlign:'center',marginBottom:'1rem'}}>欢迎登录</h2>
                            <Form onSubmit={this.loginform}>
                                <Form.Item label='' hasFeedback>
                                    {getFieldDecorator('username',{
                                        rules:[{required:true,message:'请输入账号',whitespace:true}]
                                    })(<Input prefix={<Icon type='user' />} autoFocus />)}
                                </Form.Item>
                                <Form.Item label='' hasFeedback>
                                    {getFieldDecorator('password',{
                                        rules:[{required:true,message:'请输入密码',whitespace:true}]
                                    })(<Input.Password prefix={<Icon type='lock' />} />)}
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit' style={{width:'100%'}}>登录</Button>
                                </Form.Item>
                            </Form>
                            </div>
                        </Col>
                    </Content>
                    <Footer style={{backgroundColor:'#191935'}}>
                        <div style={{position:'relative',textAlign:'center'}}>
                            <span className='footerfont'>浏览器推荐使用：谷歌(Chrome)、火狐(Firefox)、360(极速模式)、Microsoft Edge、IE10(以上)，大于1440*900分辨率!</span>
                            <span className='footerfont'>Copyright ® 2019 广州五舟科技股份有限公司. All rgihts reserved</span>
                        </div>
                    </Footer>
                </Layout>
        );
    }
}
const LoginForm = Form.create({name:'LoginForm'})(login)
export default LoginForm;