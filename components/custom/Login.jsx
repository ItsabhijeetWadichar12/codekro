import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import uuid4 from 'uuid4';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UserDetails } from '@/context/UserDetails';


function Login({openDialog ,closeDialog }) {

  const CreateUser=useMutation(api?.users?.CreateUser);

  const convex=useConvex();

  const {userDetail, setUserDetail} = useContext(UserDetails);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer '+tokenResponse?.access_token } },
      );

      const user=userInfo?.data;
      // console.log(user);

      await CreateUser({
        email: user?.email,
        name: user?.name,
        picture: user?.picture,
        uid: uuid4()
      })
      if (typeof window!==undefined) {
        localStorage.setItem('user',JSON.stringify(user))
      }
      setUserDetail(user);
      closeDialog(false);
    },
    onError: errorResponse => console.log(errorResponse),
  });




  // console.log(userDetail);



  return (
    <div>
        <Dialog open={openDialog} onOpenChange={closeDialog}>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle> </DialogTitle>
            <DialogDescription >
              <div className="flex flex-col items-center justify-center gap-3"  suppressHydrationWarning={true}>
              <h2 className='font-bold text-2xl text-center text-white'  suppressHydrationWarning={true}>{Lookup.SIGNIN_HEADING}</h2>
              <p className='mt-2 text-center'  suppressHydrationWarning={true}>{Lookup.SIGNIN_SUBHEADING}</p>
              <Button className="bg-blue-500 mt-3 text-white hover:bg-blue-400" 
              onClick={googleLogin}
              >Sign In With Google </Button>
      
              <p className='mt-2 text-center'>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Login