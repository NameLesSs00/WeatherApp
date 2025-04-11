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

