import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import './index.scss'
const Login = () => {
  const onFinish=(values)=>{
    console.log(values);
  }
    return (
      <div className="login">
        <Card className="login-container">
        <div className="title">登录</div>
          {/* 登录表单 */}
          <Form validateTrigger='onBlur' onFinish={onFinish}>
      <Form.Item name="mobile"
      rules={
        [
          {
          required:true,
          message:'请输入电话号码'
        },
        {
          pattern:/^1[3-9]\d{9}$/,
          message:"手机号格式错误"
        }
      ]
      }>
        <Input size="large" placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item name="code"
      rules={
        [{
          required:true,
          message:'请输入验证码'
        }]
      }>
        <Input size="large" placeholder="请输入验证码" />
      </Form.Item>
      <Form.Item>
        <Checkbox className="login-checkbox-label">
          我已阅读并同意「用户协议」和「隐私条款」
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          登录
        </Button>
      </Form.Item>
    </Form>
        </Card>
      </div>
    )
  }
export default Login