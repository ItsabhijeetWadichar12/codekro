"use client";
import { MessgaesDetails } from "@/context/MessagesDetails";
import { UserDetails } from "@/context/UserDetails";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { UpdateToken } from "@/convex/users";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessgaesDetails) || { messages: [] };
  const { userDetail, setUserDetail } = useContext(UserDetails);
  const [userInput, setUserInput] = useState();

  const UpdateWorkSpace = useMutation(api.workspace.UpdateWorkSpace);

  const [loading, setLoading] = useState(false);
  const {toggleSidebar}=useSidebar();

  const UpdateToken = useMutation(api.users.Updatetoken);

  useEffect(() => {
    if(id)
      GetWorkSpaceData();
  }, [id]);

  const GetWorkSpaceData = async () => {
    const result = await convex.query(api?.workspace?.GetWorkSpaceData, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    // console.log(result);
  };

  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    console.log(result?.data?.result);
    const aiResponse = {
      role: "ai",
      content: result?.data?.result,
    };
    setMessages((prev) => [...prev, aiResponse]);
    
    await UpdateWorkSpace({
      messages: [...messages, aiResponse],
      workspaceId: id,
    });

    setLoading(false);
  };

  

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1]?.role;
      if (role == "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const onGenerate = (userInput) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userInput,
      },
    ]);
    setUserInput("");
  };

  

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide pl-5">
        {Array.isArray(messages)&&messages?.map((msg, index) => (
          <div
            key={index}
            className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            {msg?.role == "user" && (
              <Image
                src={userDetail?.picture}
                alt="userImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}

            <ReactMarkdown className="flex flex-col">
              {msg?.content}
            </ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-start"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating Response.... </h2>
          </div>
        )}
      </div>

      {/* Input Sections */}

      <div className="flex gap-2 items-end">
        {userDetail&&<Image src={userDetail?.picture} alt="userImage" width={35} height={35} className="rounded-full cursor-pointer" 
        onClick={toggleSidebar}
        />}
      <div
        className="p-5 border rounded-xl max-w-2xl w-full mt-3 "
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="flex gap-2">
          <textarea
            value={userInput}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
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
      </div>
    </div>
  );
}

export default ChatView;
