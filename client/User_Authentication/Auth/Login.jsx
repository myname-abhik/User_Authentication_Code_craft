import React from 'react'
import { Card,Flex,Form,Typography,Input, Button, Alert,Spin} from 'antd'
import { Link } from 'react-router-dom';
import UseLogin from '../hooks/useLogin.jsx';
const Login = () => {
  const {loading, error, loginUser} = UseLogin()
  const handleLogin = async (values)=>{
    await loginUser(values)
  }
  return (
    <Card className='form-container'>
    <Flex  gap="large" align='center'>
    {/* {form} */}
    <Flex vertical flex={1}>
        <Typography.Title level={3}  strong className='title'>Sign in</Typography.Title>
        <Typography.Text type='secondary' strong className='slogan'>
          Unlock your account
        </Typography.Text>
        <Form layout='vertical' onFinish={handleLogin} autoComplete='off' >
        <Form.Item label = "Email" name="email" rules={[{
        required: true,
        message: 'Please input your email address',
       },
       {
        type: 'email',
        message: 'The input is not a kind of email address',
       }]}>
        <Input size='large' placeholder='Enter Your Email'/>
        </Form.Item>
        <Form.Item label = "Password" name="password" rules={[{
        required: true,
        message: 'Please input your password',
       },
      ]}>
        <Input.Password size='large' placeholder='Enter Your Password'/>
        </Form.Item>
 

{error && (
  <Alert
  description ={error}
    message={error}
    type="error"
    showIcon
    closable
    className="alert"
  />
 
)}




      
        <Form.Item>
            <Button 
            type={`${loading ? '' : `primary` }`} 
            htmlType='submit' size='large' className='btn'>
              {loading ? <Spin/> : `Login`}
            </Button>
         
         
        
        </Form.Item>
        <Form.Item>
          <Link to="/">
            <Button type='primary' htmlType='submit' size='large' className='btn'>Create an Account</Button>
          </Link>
         
        
        </Form.Item>
        </Form>
    </Flex>
   
    <Flex>
    {/* <img src={registerImage} className='Auth-Image'></img> */}
    </Flex>
 </Flex>    
    
    
  </Card>
  )
}

export default Login