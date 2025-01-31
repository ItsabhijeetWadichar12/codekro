"use client";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link, Loader2Icon, Sidebar } from "lucide-react";
import React, { useContext, useState } from "react";
import Login from "./Login";
import { MessgaesDetails } from "@/context/MessagesDetails";
import { UserDetails } from "@/context/UserDetails";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import Image from "next/image";
import Footer from "./Footer";

function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessgaesDetails);
  const [openDialog, setOpenDialog] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetails);
   const [loading, setLoading] = useState(false);
  const CreateWorkspace = useMutation(api?.workspace?.CreateWorkSpace);
  const router = useRouter();
    const {toggleSidebar}=useSidebar();
  

  const onGenerate = async (input) => {
    
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    setLoading(true);
    const msg = {
      role: "user",
      content: input,
    };
    setMessages(msg);

    
    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });

    // console.log(workspaceId);
    router.push(`/workspace/${workspaceId}`);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center  mt-36 xl:mt-52 gap-2 w-full">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>

      <div
        className="p-5 border rounded-xl max-w-2xl w-full mt-3 "
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event?.target?.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize"
          />

          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-600 p-2 h-10 w-10 rounded-md cursor-pointer "
            />
          )}
        </div>

        <div>
          <Link className="h-5 w-5 " />
        </div>
      </div>

      <div className="flex flex-wrap max-w-2xl items-center justify-center gap-3 ">
        {Lookup?.SUGGSTIONS.map((suggestions, index) => (
          <h2
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
            onClick={() => onGenerate(suggestions)}
            key={index}
          >
            {suggestions}
          </h2>
        ))}
      </div>

    

      <div>
        {userDetail && (
          <div className="flex gap-1 items-end text-center justify-start cursor-pointer  text-gray-600 border rounded-md border-gray-500 hover:border-white"
          onClick={toggleSidebar}
          >
            <Sidebar/>
          <h1 className="font-bold text-md text-white">SideBar</h1>
        </div>
        )}
        </div>
        <div >
         <Footer/>
      </div>

      {loading && (
        <div className="p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full items-center justify-center flex flex-col">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating your Files... </h2>
        </div>
      )}
      

     

      <Login
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(false)}
      />

     
    </div>
  );
}

export default Hero;
