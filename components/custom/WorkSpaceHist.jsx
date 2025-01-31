
"use client";
import { UserDetails } from '@/context/UserDetails';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';

import React, { useContext, useEffect, useState } from 'react'
import { useSidebar } from '../ui/sidebar';
import Link from 'next/link';

function WorkSpaceHist() {

    const {userDetail , setUserDetail} = useContext(UserDetails);
    const convex = useConvex();
    const [workSpace, setWorkSpace] = useState();
    const {toggleSidebar} = useSidebar();

    useEffect(()=>{
        userDetail&&GetAllWorkSpace();
    },[userDetail]);

    const GetAllWorkSpace=async()=>{
        const result = await convex.query(api.workspace.GetAllWorkSpace,{
            userId:userDetail?._id
        });
        setWorkSpace(result);
        console.log(result);
    }

    const logout = () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("user"); // Remove user data
        }
        setUserDetail(null); // Clear user state
      };
  return (
    <div>
        <h2 className='font-medium text-lg'>Your Chats</h2>

        <div>
            {workSpace?.map((workspace,index)=>(
                <Link href={`/workspace/${workspace?._id}`} key={index}>
                <h2 
                onClick={toggleSidebar}
                className='text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer'>
                    {workspace?.messages[0]?.content}
                </h2>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default WorkSpaceHist