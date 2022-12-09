import { useRouter } from "next/router";
import { Button } from "../components/button";

export default function Home() {
  const router = useRouter();
  return (
    <Button text="Create Contract" onClick={() => router.push('/create')} />
  );
}
