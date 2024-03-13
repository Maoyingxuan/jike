// 高阶组件
// 有token 正常 无token 跳转登录页
import {getToken} from '@/utils'
import { Navigate } from 'react-router-dom' 
function AuthRoute ({ children }) {
    const isToken = getToken()
    if (isToken) {
      return <>{children}</>
    } else {
      return <Navigate to="/login" replace />
    }
  }
  
  // <AuthComponent> <Layout/> </AuthComponent>
  // 登录：<><Layout/></>
  // 非登录：<Navigate to="/login" replace />
  
  export { AuthRoute }