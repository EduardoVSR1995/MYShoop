import { ApplicationError } from "@/protocols";

export function notmatch(): ApplicationError {
  return {
    name: "notmatch",
    message: "Desired combination did not happen",
  };
}
