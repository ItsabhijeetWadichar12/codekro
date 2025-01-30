"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import { MessgaesDetails } from "@/context/MessagesDetails";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { countToken } from "./ChatView";
import { UserDetails } from "@/context/UserDetails";
import CodePreview from "./CodePreview";
import { ActionConetext } from "@/context/ActionContext";

function CodeView() {
  const [activeTab, setActiveTab] = useState("code");
  const [file, setFile] = useState(Lookup?.DEFAULT_FILE);
  const { id } = useParams();

  const { messages, setMessages } = useContext(MessgaesDetails);
  const UpdateFiles = useMutation(api.workspace.UpdateCode);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);

  const UpdateToken=useMutation(api.users.Updatetoken);

  const {userDetail , setUserDetail} = useContext(UserDetails);
  const {click , setClick} = useContext(ActionConetext);
  
  
  useEffect(()=>{
    setActiveTab('preview')
  },[click])

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1]?.role;
      if (role == "user") {
        GenratAiCode();
      }
    }
  }, [messages]);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkSpaceData, {
      workspaceId: id,
    });
    const mergedFile = { ...Lookup.DEFAULT_FILE, ...result?.fileData };

    setFile(mergedFile);
    setLoading(false);
  };

  const GenratAiCode = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });
    // console.log(result?.data);
    const aiResponse = result?.data;

    const mergedFile = { ...Lookup.DEFAULT_FILE, ...aiResponse?.files };

    setFile(mergedFile);
    await UpdateFiles({
      workspaceId: id,
      files: aiResponse?.files,
    });

        setActiveTab('code');

    setLoading(false);
  };

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 justify-center bg-black p-1 w-[140px] gap-3 ">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${activeTab == "code" && "text-blue-600 bg-blue-600 bg-opacity-25 p-1 px-2 rounded-full"}`}
          >
            code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${activeTab == "preview" && "text-blue-600 bg-blue-600 bg-opacity-25 p-1 px-2 rounded-full"}`}
          >
            preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        files={file}
        template="react"
        theme={"dark"}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout>
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
            <CodePreview/>
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className="p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full items-center justify-center flex flex-col">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating your Files... </h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;
