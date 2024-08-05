import React, { useEffect, useRef , useState} from 'react'
import {useAuth} from '../context/AuthContext.jsx'
import {Button,Card,Flex } from 'antd'
import image from '../src/assets/default.jpg'


const Dashboard = () => {
  const { userData , logout} = useAuth()
  const formRef = useRef()
  console.log(userData)
  const [first, setfirst] = useState(userData.photo)
    const handlelogout = async () => {
    await  logout();
    }
    const handleupload = async (e) => {
      let input = document.getElementById('fileupload')
        const file = input.files[0];
        const fileurl = URL.createObjectURL(file);
        setfirst(fileurl)
        var formdata = new FormData();
    formdata.append("photo", file);
 formdata.append("email",userData.email);
        console.log(formdata);
    
        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
          };
        // console.log("hello world!")
    fetch('http://localhost:3000/api/auth/image/upload',requestOptions)
     .then(response => response.text())
      .then(result => alert("Image Upload Successfuly"))
      .catch(error => console.log('error', error));
    
      

    }
    useEffect(() => {
      window.addEventListener('load', async ()=>{
       // fetch user data from server here
       // const userData = await fetchUserData(userId)
       // setUserData(userData)
       var formdata = new FormData();
       formdata.append("email",userData.email)
       console.log("hello world!")
       const requestOptions = {
         method: 'POST',
         body: formdata,
         redirect: 'follow'
       };
       fetch('http://localhost:3000/api/auth/image/upload1', requestOptions)
      .then(response => response.json())
      .then(result => {
        setfirst(result.photo)
        console.log(result)
       })
      .catch(error => console.log('error', error));

     })
    }, [userData]);
  return (
    <>
     <Card className='form-container'>
      <Flex gap="large" className='dashboard'>
      <Flex className='image' onClick={()=>document.getElementById('fileupload').click()}><div className='chooseimage'>choose image</div><img src={!first ? image : first }></img></Flex>
      <input type='file' placeholder='Select_photo' ref={formRef} onChange={handleupload} id='fileupload' />
        <Flex gap="large" vertical flex={1}>
          <h1>Welcome, {userData.name}</h1>
          <p>Your Email: {userData.email}</p>
          <p>Your Id: {userData._id}</p>
          <p>Your Role: {userData.role}</p>
          
           
          
          <Button onClick={handlelogout}>Logout</Button>
        </Flex>
       
      </Flex>
     </Card>
    </>
  )
}

export default Dashboard