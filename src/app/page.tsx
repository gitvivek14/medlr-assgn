import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home(){
  return(
    <div className="flex items-center justify-center text-3xl font-bold">
      WELCOME TO MEDLR
      <div>
        <Link href="/home">
        <Button>
          Home
        </Button>
        </Link>
      </div>
    </div>
  )
}