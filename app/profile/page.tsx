"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { userSchema } from "./schema";
import { onSubmit } from "./actions";
import ErrorMessage from "@/components/ErrorMessage";
import { redirect } from "next/navigation";

export type UserFormData = z.infer<typeof userSchema>;

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });
  return (
    <div>
      <h1 className="text-center text-4xl">New Contest</h1>
      <form
        onSubmit={handleSubmit(async (data: UserFormData) => {
          const res = await onSubmit(JSON.stringify(data));
          if (res.ok) {
            alert("Profile updated successfully");
            redirect("/");
          } else {
            alert("Error updating profile");
          }
        })}
      >
        <div className="flex flex-col items-center">
          <div className="flex flex-col w-1/2">
            <label htmlFor="title">CF Handle</label>
            <input
              type="text"
              id="title"
              className="border-2 text-black"
              {...register("cfHandle")}
            />
            <ErrorMessage>{errors.cfHandle?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="endTime">Full Name</label>
            <input
              type="text"
              id="endTime"
              className="border-2 text-black"
              {...register("fullName")}
            />
            <ErrorMessage>{errors.fullName?.message}</ErrorMessage>
          </div>
          <button type="submit" className="border-2" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
