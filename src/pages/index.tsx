import { useState } from 'react';
import { usersProgress } from "@/lib/data";
import { Flex, Table, Progress, Modal, Collapse} from "antd";
const { Column } = Table

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleUsersProgress, setSingleUserProgress] = useState([]);
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
                <div className="w-fit rounded-full cursor-pointer p-1 hover:bg-violet-200" onClick={()=>{setIsModalOpen(true); setSingleUserProgress(modules)}}>
                  <Progress size={50} strokeColor="#625CEB" trailColor="#C2C0DC" type="dashboard" percent={Math.floor(progressPercentage*100)} />  
                </div>
              )
            }}
          />
        </Table>

        <Modal title="Basic Modal" open={isModalOpen} onOk={()=> setIsModalOpen(false)} onCancel={()=> setIsModalOpen(false)}>
          {Object.keys(singleUsersProgress).map((modulesNames:string, index:number)=>{
                return(
                  <>
                    <h1 key={index}>{modulesNames}</h1>
                    {Object.keys(singleUsersProgress[modulesNames]).map((submoduleName) =>{
                      return (
                      <>
                        <Collapse 
                          items={submoduleName} 
                          collapsible="header"
                          defaultActiveKey={['1']}
                          items={[
                            {
                              label: submoduleName,
                              children:<>
                                {Object.keys(singleUsersProgress[modulesNames][submoduleName]).map((questrion) =>{
                                  return <div className='flex py-2'>
                                  <h1>{questrion}</h1>
                                  <h1>{singleUsersProgress[modulesNames][submoduleName][questrion]}</h1>
                                  </div>
                                })}
                              </>
                            }
                          ]} />
                      </>
                    )
                    })} 
                  </>
                )
              })}
        </Modal>
      </Flex>
     

      
      <footer className="w-full max-w-7xl mx-auto px-4 flex items-start py-4 text-gray-500 text-sm">
        <div className="flex-1 text-center">
          <p>&copy; The Adpharm</p>
        </div>
      </footer>
    </div>
  );
}
