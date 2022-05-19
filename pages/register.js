import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Heading from '../components/heading/heading';
import Alert from "../components/alerts/alerts";
import { AuthWrapper } from '../styles/authStyle';
import { authService } from '../services';


export default () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    const { email, password } = form.getFieldsValue(true);
    return authService.register(email, password)
      .then(() => {
        router.push('/market');
      })
      .catch(error => {
        setError(error.message || error);
      });
  };


  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Register an account
          </Heading>
          <Form.Item
            name="email"
            rules={[{ message: 'Please input your Email!', required: true }]}
            initialValue="name@example.com"
            label="Email Address"
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" initialValue="123456" label="Password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              Register
            </Button>
          </Form.Item>
          {error && (
            <Alert
              message={error}
              type="error"
            />
          )}
        </Form>
      </div>
    </AuthWrapper>
  );
};
