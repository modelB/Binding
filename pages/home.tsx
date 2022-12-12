import { useRouter } from "next/router";
import { Button } from "../components/button";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-1">
    <Button text="Create Contract" onClick={() => router.push('/create')} />
    <Button text="Sign Contract" onClick={() => router.push('/sign')} />
    </div>
  );
}
