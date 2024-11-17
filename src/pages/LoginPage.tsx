import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Button, Input } from "@/components/common";
import { useLogin } from "@/hooks/useLogin";
import { LoginSchema } from "@/types/LoginType";

const LoginPage = () => {
  const loginMutation = useLogin();

  const form = useForm<FieldValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form.getValues();
    loginMutation.mutate({ email, password });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex h-full flex-col items-center justify-center gap-[2rem] p-[2rem]">
        <div className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input type="email" required isButton={false} {...field} className="cursor-text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" required isButton={false} {...field} className="cursor-text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={!form.formState.isValid || !form.watch("email") || !form.watch("password")}>
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginPage;
