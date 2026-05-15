import { redirect } from "next/navigation";

/** /lab agora é a home — redireciona permanentemente. */
export default function LabRoute() {
  redirect("/");
}
