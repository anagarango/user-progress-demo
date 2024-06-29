import { useState } from 'react';
import { usersProgress, UserProgress } from "@/lib/data";
import { Flex, Table, Progress, Modal, Collapse} from "antd";
const { Column } = Table

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleUsersProgress, setSingleUserProgress] = useState<UserProgress>();

  const calculatePercentage = (array) => {
    let count:number = 0
    let answerProgress:number = 0
    {Object.keys(array).map((questions:string) =>{
      if(array[questions] != null) answerProgress++
      count++
      
    })}
    return {answerProgress, count}
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: object) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ',  selectedRows);
    }
  };


  return (
    <div className='bg-white flex justify-center w-screen'>
      <div className="min-h-screen flex flex-col w-full max-w-[1000px] p-4">
        <Flex vertical>
          <h4>Adpharm Dashboard</h4>
          <h2 className='text-2xl font-semibold pb-6'>Team Module Progress</h2>
          <div className='flex justify-between p-8 mb-3 bg-[#E7E5FF] rounded-3xl'>
            <div className='flex flex-col items-center w-1/3 text-center px-5'><span className='text-2xl font-extrabold'>1</span>Admin</div>
            <div className='flex flex-col items-center border-x-2 border-gray-300 w-1/3 text-center px-5'><span className='text-2xl font-extrabold'>{usersProgress.length}</span>Team Members</div>
            <div className='flex flex-col items-center w-1/3 text-center px-5'><span className='text-2xl font-extrabold'>100%</span>Happy</div>
          </div>
          <div className='flex justify-between py-3'>
            <input placeholder='Enter a name or user id' className='border-[#C2C0DC] border-2 w-fit py-2 px-4 text-white rounded-2xl text-sm'></input>
            <button className='bg-[#625CEB] w-fit py-2 px-4 text-white rounded-2xl text-sm'>Upload Data</button>
          </div>
          
          <Table size="small" pagination={false} rowHoverable={false} dataSource={usersProgress} rowSelection={rowSelection} rowClassName="tableColor">
            <Column title="UserID" dataIndex="user_id" key="user_id" />
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Course" dataIndex="course" key="course" />
            <Column
              title="Progress"
              dataIndex="progress"
              key="progress"
              render={(modules, record:UserProgress) => {
                let totalAnswerProgress:number = 0
                let totalCount:number = 0

                Object.keys(modules).map((modulesNames:string)=>{
                  Object.keys(modules[modulesNames]).map((submoduleName) => {
                    const {count, answerProgress} = calculatePercentage(modules[modulesNames][submoduleName])
                    totalAnswerProgress += answerProgress;
                    totalCount += count;
                  })
                })

                const progressPercentage = totalAnswerProgress / totalCount

                return (
                  <div onClick={()=>{setIsModalOpen(true); setSingleUserProgress(record)}}>
                    <Progress className="w-fit rounded-full cursor-pointer p-1 hover:bg-violet-200" size={50} strokeColor="#625CEB" trailColor="#C2C0DC" type="dashboard" percent={Math.floor(progressPercentage*100)} />
                  </div> 
                )
              }}
            />
          </Table>

          {singleUsersProgress && 
            <Modal title={`${singleUsersProgress.name} | ${singleUsersProgress?.user_id}`} open={isModalOpen} onOk={()=> setIsModalOpen(false)} onCancel={()=> setIsModalOpen(false)} footer={<></>}>
              {Object.keys(singleUsersProgress.progress).map((modulesNames:string, index:number)=>{
                return(
                  <>
                    <h1 className='font-semibold mt-8 mb-2' key={index}>{modulesNames}</h1>
                    {Object.keys(singleUsersProgress.progress[modulesNames]).map((submoduleName:string, index:number) =>{
                      let totalCount:number = 0
                      let totalAnswerProgress:number = 0
                      const {count, answerProgress} = calculatePercentage(singleUsersProgress.progress[modulesNames][submoduleName])
                      totalAnswerProgress += answerProgress;
                      totalCount += count;
                      const progressPercentage = totalAnswerProgress / totalCount
                      return (
                        <div key={index} className='flex items-center justify-between bg-[#F4F4F4] rounded-lg mb-2'>
                        <Collapse
                          items={submoduleName} 
                          collapsible="header"
                          bordered={false}
                          items={[{
                            label: submoduleName,
                            children:
                              <Table size='small' rowHoverable={false} rowClassName="tableColor" dataSource={Object.keys(singleUsersProgress.progress[modulesNames][submoduleName]).map(question =>
                              ({question, answer: singleUsersProgress.progress[modulesNames][submoduleName][question]}))} pagination={false}>
                                <Column
                                  title="Questions"
                                  key="questions"
                                  render={(qa) => (
                                    <> {qa.question} </>
                                  )}/>
                                <Column
                                  title="Answers"
                                  key="answers"
                                  render={(qa) => (
                                    <> {qa.answer} </>
                                  )}/>
                              </Table>
                          }]}
                        />
                        <Progress className="w-fit rounded-full cursor-pointer p-1 mr-2" size={35} strokeColor="#625CEB" trailColor="#C2C0DC" type="dashboard" percent={Math.floor(progressPercentage*100)} />
                        </div>
                      )
                    })} 
                  </>
                )
              })}
            </Modal>
          }
        </Flex>
        <footer className="w-full max-w-7xl mx-auto px-4 flex items-start py-4 text-gray-500 text-sm">
          <div className="flex-1 text-center">
            <p>&copy; The Adpharm</p>
          </div>
        </footer>
      </div>
    </div>
  );
}