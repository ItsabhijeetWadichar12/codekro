import { ActionConetext } from "@/context/ActionContext";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";

function CodePreview() {
    const previewRef = useRef();
    const {sandpack} = useSandpack();
    const {click , setClick} = useContext(ActionConetext);

    const GetSandPackUser =async ()=>{
        const user = previewRef.current?.getClient();
        if(user){
            console.log(user);
            const result = await user.getCodeSandboxURL();
            if(click?.clickType=='export'){
              window.open(result?.editorUrl)
            }else if(click?.clickType=='deploy'){
              window.open('https://'+result?.sandboxId+'.csb.app/')
            }
        }
    }

    useEffect(()=>{
      console.log(click)
        GetSandPackUser();
    },[sandpack&&click])
  return (
      <SandpackPreview style={{ height: "80vh" }} showNavigator={true}
      ref={previewRef}
      />
  );
}

export default CodePreview;
