import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkSpaceHist from "./WorkSpaceHist";
import SideBarFooter from "./SideBarFooter";

function SideBar() {
  return (
    <div>
      <Sidebar>
        <SidebarHeader className="p-5 ">
          <Image src={"/logo"} width={30} height={30} alt="logo" />
          <Button className="mt-5">
            <MessageCircleCode />
            Start New Chats
          </Button>
        </SidebarHeader>
        <SidebarContent className="p-5">
          <SidebarGroup>
            <WorkSpaceHist />
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
          <SideBarFooter />
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}

export default SideBar;
