import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        uid:v.string()
    },
    handler:async(ctx,args)=>{
        const user=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args?.email)).collect();
        console.log(user)

        if (user?.length==0) {
            const result = await ctx.db.insert('users',{
                name:args?.name,
                email:args?.email,
                picture:args?.picture,
                uid:args?.uid,
                
            });
            console.log(result);
        }
    }
})

export const GetUser=query({
    args:{
        email:v.string()
    },
    handler:async(ctx,args)=>{
        const user=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect();
        return user[0];
    }
})


export const UpdateUser = mutation({
    args: {
      userId: v.id("users"), // Ensure "users" is your database collection name
      email: v.string(),
      name: v.string(),
    },
    handler: async (ctx, args) => {
      try {
        await ctx.db.patch(args.userId, {
          email: args.email,
          name: args.name,
        });
  
        return { success: true, message: "User updated successfully!" };
      } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, message: "Failed to update user." };
      }
    },
  });