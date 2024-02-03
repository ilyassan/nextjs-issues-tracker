"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm as UseForm, Controller } from "react-hook-form";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter as UseRouter } from "next/navigation";
import { useState as UseState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchIssueSchema } from "@/app/validationSchemas";
import z from "zod";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof patchIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = UseRouter();
  const [error, setError] = UseState("");
  const [isSubmitting, setSubmitting] = UseState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = UseForm<IssueFormData>({
    resolver: zodResolver(patchIssueSchema),
  });

  const submit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      data.title = data.title!.charAt(0).toUpperCase() + data.title!.slice(1);

      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);

      router.push("/issues/list");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occured.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={submit}>
        <TextField.Root className="px-1.5">
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
