import { GenAiCode } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req , resp ){
    const {prompt} = await req?.json();

    try {
        const result =await GenAiCode?.sendMessage(prompt);
        const resp= result?.response?.text();
        return NextResponse.json(JSON?.parse(resp));
    } catch (error) {
        return NextResponse.error({error:resp});
    }
}