import { useEffect } from "react";
import { useRouter } from "next/router";

export default function IndexRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/de"); // редирект на язык по умолчанию
  }, [router]);
  return null;
}
