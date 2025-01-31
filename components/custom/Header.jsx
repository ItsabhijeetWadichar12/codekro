import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetails } from "@/context/UserDetails";
import { HardDriveUploadIcon, LogOutIcon, Save, SaveAllIcon } from "lucide-react";
import Login from "./Login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionConetext } from "@/context/ActionContext";

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetails);
  const { click, setClick } = useContext(ActionConetext);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const onCLick = (click) => {
    setClick({
      clickType: click,
      timeStamp: Date.now(),
    });
  };
  
        const logout = () => {
          if (typeof window !== "undefined") {
            localStorage.removeItem("user"); // Remove user data
          }
          setUserDetail(null); // Clear user state
          router.push('/')
        };

  const Navigate = () => {
    router.push(`/profile`);
  };
  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.jpg"}
            alt="logo"
            width={80}
            height={5}
            className="rounded-xl"
          />
        </Link>

        {!userDetail?.name ? (
          <div className="flex gap-5">
            <Button variant="Ghost" onClick={() => setOpenDialog(true)}>
              Sign In{" "}
            </Button>
            <Button
              className="text-white"
              style={{
                backgroundColor: Colors.BLUE,
              }}
              onClick={() => setOpenDialog(true)}
            >
              Get Started
            </Button>
          </div>
        ) : (
          <div className="flex gap-5">
            <Button variant="Ghost" onClick={() => onCLick("export")}>
              {" "}
              Save Code <SaveAllIcon />
            </Button>
            <Button
              className="text-white"
              onClick={() => onCLick("deploy")}
              style={{
                backgroundColor: Colors.BLUE,
              }}
            >
              Deploy <HardDriveUploadIcon />
            </Button>
            <Button variant="destructive"
              className="text-white"
            onClick={logout}
            >Logout <LogOutIcon/></Button>

            <Image
              onClick={Navigate}
              src={userDetail?.picture}
              alt="pic"
              width={35}
              height={30}
              className="border rounded-full cursor-pointer"
            />

            
          </div>
        )}
      </div>

      <Login
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(false)}
      />
    </>
  );
}

export default Header;
