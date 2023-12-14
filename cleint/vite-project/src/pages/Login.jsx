import { Button, Form ,Input} from 'antd'
import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { message } from 'antd'


function Login() {

  const dispatch = useDispatch()
  const navigate= useNavigate()
  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
  
      const res = await axios.post("/api/users/login",  value);
  
      message.success("User Login Successfully");
  
      localStorage.setItem('auth',JSON.stringify(res.data))
      // You may want to handle the response here, e.g., store user information or token
  
      navigate("/");
  
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      message.error("Error");
      console.log(error.message);
  
      dispatch({
        type: "HIDE_LOADING",
      });
    }
  };
  useEffect(()=>{
    if(  localStorage.getItem('auth')){
    localStorage.getItem('auth')
    navigate("/")}
  },[navigate])
  return (
  <>
  <div className="register">
    <h1>POS APP</h1>
    <h3>Register page</h3>
    <Form layout='vertical'  onFinish={handleSubmit}>
         
          <Form.Item name="userId" label="User ID">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type='password' />
          </Form.Item>
         
          <div className="d-flex justify-content-between">
            <p>Not A User <Link to="/register">Register Here !</Link></p>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
          </div>
        </Form>
  </div>
  </>
  )
}

export default Login