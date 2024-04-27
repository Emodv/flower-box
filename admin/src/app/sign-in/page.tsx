"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/schema/zod";
import { useSignInMutation } from "@/services/client/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormSchemaType = z.infer<typeof signInFormSchema>;

export default function LoginAccount() {
  const {
    mutation: { mutate: signInMutate },
    formStatus: { setFormLoading, isFormLoading },
  } = useSignInMutation();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    shouldFocusError: true,
  });

  const onSubmit = async (values: FormSchemaType) => {
    setFormLoading(true);
    signInMutate({
      ...values,
    });
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/1.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-screen w-screen items-center justify-center space-y-6"
          >
            <Card className="w-[350px] md:w-[400px]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-center text-2xl">Sign in.</CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password to login
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-md font-normal text-black dark:text-white">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="mt-2"
                          placeholder="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="mt-2 dark:text-red-800" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-md font-normal text-black dark:text-white">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="mt-2"
                          placeholder="password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="mt-2 dark:text-red-800" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  disabled={isFormLoading}
                  className="w-full text-white"
                >
                  {isFormLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
