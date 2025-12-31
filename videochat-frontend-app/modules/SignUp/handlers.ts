"use server"
import request from "../../shared/http/request";

type Todos = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const handleSignUp = async () => {
  console.log('Sign Up button clicked');
  const todos = await request<Todos[]>({
    method: "GET",
    url: "/todos",
  });
  
  console.log(todos);
};
