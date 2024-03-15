// import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Popconfirm } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/404.png'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '@/apis/article'
import { delArticleAPI } from '@/apis/article'
import { useNavigate } from 'react-router-dom'
const { Option } = Select
const { RangePicker } = DatePicker
const Article = () => {
  const navigate=useNavigate()
  const [articleList,setArticleList] = useState([])
  const [count,setCount] = useState(0)
    // 准备参数
    const [reqData,setReqData] = useState({
      status:'',
      channel_id:'',
      begin_pubdate:'',
      end_pubdate:'',
      page:1,
      per_page:4
    })
  useEffect(()=>{
    async function getList(){
      const res = await getArticleListAPI(reqData)
      console.log(res.data.data.results)
      setArticleList(res.data.data.results)
      setCount(res.data.data.total_count)
    }
    getList()
  },[reqData])
  // 筛选功能
  // 获取表单数据
  const Onfinish = (formValue) =>{
    // console.log(formValue)
    setReqData({
      ...reqData,
      channel_id:formValue.channel_id,
      status:formValue.status,
      begin_pubdate:formValue.date[0].format('YYYY-MM-DD'),
      end_pubdate:formValue.date[1].format('YYYY-MM-DD'),
    })
  }
  const pageChange =(page) =>{
    // console.log(page)
    setReqData({
      ...reqData,
      page:page
    })
  }
  const DelArticle = async(data) =>{
    await delArticleAPI(data)
    setReqData({
      ...reqData
    })
  }
    const {channelList}=useChannel()
    const columns = [
        {
          title: '封面',
          dataIndex: 'cover',
          width:120,
          // console.log(cover)
          render: cover => {
            // console.log(cover.images)
            return <img src={cover.images || img404} width={80} height={60} alt="" />
          }
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: 220
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: data =>data===2 ? <Tag color="green">审核通过</Tag> : <Tag color="warning">待审核</Tag>
        },
        {
          title: '发布时间',
          dataIndex: 'pubdate'
        },
        {
          title: '阅读数',
          dataIndex: 'read_count'
        },
        {
          title: '评论数',
          dataIndex: 'comment_count'
        },
        {
          title: '点赞数',
          dataIndex: 'like_count'
        },
        {
          title: '操作',
          render: data => {
            return (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>navigate(`/publish?id=${data.id}`)} />
                <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => DelArticle(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
              </Space>
            )
          }
        }
      ]   
     
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">"
                items={[
             {
            title: <a href="/home">首页</a>,
            },
            {
            title: '内容管理',
            },
    ]}>
            </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={Onfinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select

              placeholder="请选择文章频道"
              initialvalues="lucy"
              style={{ width: 120 }}
            >
           {channelList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}

            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
          total: count,
          pageSize:reqData.per_page,
          onChange:pageChange
        }
          
        } />
      </Card>
    </div>
  )
}

export default Article