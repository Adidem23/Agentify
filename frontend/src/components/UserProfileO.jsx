import { UserProfile } from "@clerk/clerk-react";

const  UserProfileO = () => {
  return (
    <>
    <div  className=" top-0 z-[0]  bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
 " style={{height:"100vh",width:"fit-content",margin:"auto"}}>  
    <UserProfile />
    </div> 
    </>
  )
}

export default UserProfileO