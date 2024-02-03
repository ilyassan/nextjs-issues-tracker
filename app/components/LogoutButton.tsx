"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import { useState } from "react";

const LogoutButton = () => {
  const [error, setError] = useState(false);

  const logOut = () => {
    try {
      signOut();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" variant="soft" mt="2">
            Log out
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content className="m-3">
          <AlertDialog.Title>Confirm Logout</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to logout?
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={logOut} color="red">
                Log out
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Something wrong when trying to logout.
          </AlertDialog.Description>
          <Button
            onClick={() => setError(false)}
            color="gray"
            variant="soft"
            mt="2"
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default LogoutButton;
