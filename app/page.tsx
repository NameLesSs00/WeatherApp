"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleOnClick() {
    setLoading(true);

    // Optional: simulate delay or fetch trigger
    setTimeout(() => {
      router.push("/get-locatoin");
    }, 1000);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <motion.h1
        className="text-2xl font-semibold"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Would you like to know the weather today?
      </motion.h1>
      <Button
        variant="outline"
        size="icon"
        onClick={handleOnClick}
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin" /> : <ChevronRight />}
      </Button>
    </div>
  );
}

{/*
  okay buddy we are almost done with the task one you have been working for around what 3 hours now thats a great job buddy now you have an hour to undrsatdn teh code as much as possible then go to the bathroom or restroom then you are done with task one 
  
  next you gotta solve the problem from yestayday and then its time to study a new algo and solve on it 
  dont worry that would be so nice and easy 

  the real challange now is to undrsatdn the code as much as you can and change it if needed also you are doing a great job so far but this project would be even nicer if you know what everything do and this is why you are an engineer you should 

  you also should put this on linkedin this im happy how this project came out and i think it would be nice first project to post about it 

  also add an iesster egg and say el asyi thdoes yall good luck 


  dont forget to delete that 
  
  
  
  
  
  
  
  
  
*/}