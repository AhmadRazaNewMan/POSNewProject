import { Button, Form, Input } from 'antd';
import {React,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });

      await axios.post('/api/users/register', values);

      message.success('Registered Successfully');
      navigate('/login');

      dispatch({
        type: 'HIDE_LOADING',
      });
    } catch (error) {
      message.error('Error');
      console.log(error);
    }
  };
  // Currently  login  User 
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
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="userId" label="User ID">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" />
          </Form.Item>

          <div className="d-flex justify-content-between">
            <p>
              Already Registered? Please <Link to="/login">Login Here!</Link>
            </p>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Register;
