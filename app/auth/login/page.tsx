"use client";

import { Box, Button, Callout, Flex } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Image from "next/image";
import googleLogo from "@/public/images/google.svg";
import { useState } from "react";
import Spinner from "@/app/components/Spinner";

const LoginPage = ({
  searchParams: { callbackUrl = "/" },
}: {
  searchParams: { callbackUrl: string };
}) => {
  const [error, setError] = useState("");
  const [isLogging, setLogging] = useState(false);

  const onSignin = async () => {
    try {
      setLogging(true);
      await signIn("google", { callbackUrl });
    } catch (err) {
      setError("An unexpected error occured.");
    }
  };

  return (
    <Flex className="m-auto w-fit" direction="column" gap="4">
      <Box className=" mt-20 p-6 bg-gray-300 rounded-xl">
        <Box className="flex justify-center items-center gap-9 bg-white p-3 rounded-xl">
          <Image src={googleLogo} width={50} height={50} alt="Google" />
          <Button onClick={onSignin} disabled={isLogging}>
            Sign in with Google {isLogging && <Spinner />}
          </Button>
        </Box>
      </Box>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </Flex>
  );
};

export default LoginPage;
