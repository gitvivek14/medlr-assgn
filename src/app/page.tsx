import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home(){
  return(
    <div className="flex flex-col items-center justify-center text-3xl font-bold w-full h-full">
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