import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import './index.scss'
import { useState } from "react";
import { AddArticleAPI} from "@/apis/publish"; 
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select
  
  const Publish = () => {
    const{channelList} = useChannel()
    // 提交表单
    const onFinish=(formValue)=>{
        console.log(formValue)
        const {title,content,channel_id} = formValue
        const reqdata = {
            title:title,
            content:content,
            cover:{
                type:Type,
                images:imageList.map(item=> item.response.data.url)
            },
            channel_id:channel_id
        }
        AddArticleAPI(reqdata)
    }
    const [Type,setType]=useState(0)
    const onTypeChange=(e) =>{
        // console.log("切换类型",e.target)
        setType(e.target.value)
    }
    const [imageList,setimageList]=useState([])
    const onChange =(value) =>{
        console.log("loading")
        setimageList(value.fileList)
        // console.log(imageList)
    }
    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb separator=">"
                items={[
             {
            title: <a href="/home">首页</a>,
            },
            {
            title: '发布文章',
            },
    ]}>
            </Breadcrumb>
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 0 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {channelList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
            </Form.Item>
  
            <Form.Item label="封面">
              <Form.Item name="type">
                <Radio.Group onChange={onTypeChange}>
                  <Radio value={1}>单图</Radio>
                  <Radio value={3}>三图</Radio>
                  <Radio value={0}>无图</Radio>
                </Radio.Group>
              </Form.Item>
              {Type>0 && <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                action="http://geek.itheima.net/v1_0/upload"
                onChange={onChange}
                showUploadList
                maxCount={Type}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>}
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
            {/* 富文本编辑器 */}
            <ReactQuill
            className = "publish-quill"
            theme = "snow"
            placeholder="请输入文章内容"
            />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  发布文章
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish