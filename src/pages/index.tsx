import { usersProgress } from "@/lib/data";
import { Flex, Table, Progress, Modal} from "antd";
const { Column } = Table

export default function Index() {
  return (
    <div className="min-h-screen p-12 bg-white flex flex-col">
      <Flex vertical>
        <h4>Adpharm Dashboard</h4>
        <h2>Dashboard</h2>
        <Table dataSource={usersProgress}>
          <Column title="UserID" dataIndex="user_id" key="user_id" />
          <Column title="Name" dataIndex="name" key="name" />
          
          <Column title="Course" dataIndex="course" key="course" />
          <Column
            title="Progress"
            dataIndex="progress"
            key="progress"
            render={(modules) => {
              let count:number = 0
              let answerProgress:number = 0
              Object.keys(modules).map((modulesNames)=>{
                {Object.keys(modules[modulesNames]).map((submoduleName) =>{
                  let questions: string[] = Object.keys(modules[modulesNames][submoduleName])
                  for(var x = 0; x < questions.length; x++){
                    count++
                    if(modules[modulesNames][submoduleName][questions[x]] != null){
                      answerProgress++
                    }
                  }
                })}
              })
              const progressPercentage = answerProgress / count
              return (
                <div onClick={()=>{console.log(modules)}}>
                  <Progress size={80}  type="circle" percent={Math.floor(progressPercentage*100)} />  
                </div>
                

              )
            }}
          />
        </Table>
      </Flex>
     

      
      <footer className="w-full max-w-7xl mx-auto px-4 flex items-start py-4 text-gray-500 text-sm">
        <div className="flex-1 text-center">
          <p>&copy; The Adpharm</p>
        </div>
      </footer>
    </div>
  );
}
