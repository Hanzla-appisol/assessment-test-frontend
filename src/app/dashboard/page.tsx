import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FilesDashboard from "@/component/FilesDashboard";

export default async function ProtectedFilesPage() {
  const cookieStore = await cookies(); // No await needed
  const authToken = cookieStore.get("authToken");

  if (!authToken) {
    redirect("/login");
  }

  return <FilesDashboard />;
}
