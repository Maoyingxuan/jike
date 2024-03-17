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
import { useEffect, useState } from "react";
import { AddArticleAPI} from "@/apis/publish"; 
import { useChannel } from "@/hooks/useChannel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getArticleDetailAPI,updateArticleAPI } from "@/apis/publish";
const { Option } = Select
  
  const Publish = () => {
    const{channelList} = useChannel()
    const navigate = useNavigate()
    // 提交表单
    const onFinish=(formValue)=>{
        console.log(formValue)
        const {title,content,channel_id} = formValue
        const reqdata = {
            title:title,
            content:content,
            cover:{
                type:Type,
                // 新增逻辑
                // images:imageList.map(item=> item.response.data.url)
                // 完整逻辑
                images:imageList.map(item=>{
                  if(item.response) return item.response.data.url
                  else return item.url
                  })
            },
            channel_id:channel_id
        }
        if(articleId)
        updateArticleAPI(reqdata)
        else
        AddArticleAPI(reqdata)
        navigate('/article')
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
    // 编辑功能回填数据
        // 获取id
          const [searchParams] = useSearchParams()
          const articleId = searchParams.get('id')
          const [form] = Form.useForm()
    useEffect(()=>{
        // 通过id获取
        const getArticleDetail = async() =>{
          const res = await getArticleDetailAPI(articleId)         
          form.setFieldsValue({
            ...res.data.data,
            type:res.data.data.cover.type
          })
          setType(res.data.data.cover.type)
          setimageList(res.data.data.cover.images.map(url=>{
            return {url}
          }))
          // console.log(res.data.data)
        }
        if(articleId)getArticleDetail()
    },[articleId,form])
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
            title:  `${articleId?'编辑':'新增'}文章`
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
            form = {form}
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
                fileList = {imageList}
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
                  {articleId?'更新文章':'发布文章'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish