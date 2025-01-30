import { HelpCircle, LogOut, MapPin, Settings, User, Wallet2Icon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { useSidebar } from '../ui/sidebar';

function SideBarFooter() {
    const {toggleSidebar} = useSidebar();
    const router = useRouter();
    const options=[
        {
            name:'Home',
            icon:Settings,
            path:'/'
        },
        {
            name:'Help Center',
            icon:HelpCircle,
            path:'/help'
        },  
        {
            name:'Profile',
            icon:User,
            path:'/profile'
        },  
        {
            name:'Sign Out',
            icon:LogOut,
            path:'/signout'
        },
    ]

    const onOptionsClick=(option)=>{
        router.push(option.path);
        toggleSidebar(false);
    }
  return (
    <div className='p-2 mb-10 '>
        {options.map((option,index)=>(
            <Button 
            variant='ghost'
            onClick={()=>onOptionsClick(option)}
            className="w-full flex justify-start my-3"
            key={index}>
                <option.icon/>
                {option.name}
            </Button>
        ))}
    </div>
  )
}

export default SideBarFooter