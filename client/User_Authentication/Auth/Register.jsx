import React from 'react'
import { Card,Flex,Form,Typography,Input, Button, Alert,Spin} from 'antd'
import { Link } from 'react-router-dom';
import registerImage from '../src/assets/num.jpeg';
import userSignup from '../hooks/userSignup';

const Register = () => {
       const {loading ,error, registerUser} = userSignup();
    const handleRegister = (values)=>{
      registerUser(values);
        // call your API here to register the user.
        // after registration, you can redirect to the login page.

    }
  return  (
  <Card className='form-container'>
    <Flex  gap="large" align='center'>
    {/* {form} */}
    <Flex vertical flex={1}>
        <Typography.Title level={3}  strong className='title'>Create an Account</Typography.Title>
        <Typography.Text type='secondary' strong className='slogan'>
            Join For exclusive Content
        </Typography.Text>
        <Form layout='vertical' onFinish={handleRegister} autoComplete='off'>
       <Form.Item label = "Full Name" name="name" rules={[{
        required: true,
        message: 'Please input your Full Name!',
       }]}>
        <Input size='large' placeholder='Enter Your Full Name'/>
        </Form.Item>
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
        <Form.Item label = "Passwordconfirm" name="passwordconfirm" rules={[{
        required: true,
        message: 'Please input your password Again',
       },
      ]}>
        <Input.Password size='large' placeholder='Re-enter your Password'/>
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
            {loading ? <Spin/> : `Create Account`}
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/login">
            <Button type='primary' htmlType='submit' size='large' className='btn'>Sign in</Button>
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

export default Register