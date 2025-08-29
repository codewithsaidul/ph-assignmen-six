import { Outlet } from "react-router"
import CommonLayout from "./Layout/commonLayout/CommonLayout"


function App() {

  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  )
}

export default App
