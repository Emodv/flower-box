import { interaction } from "@/services/productService/productService";
import { useState, useEffect } from "react";

function useInteraction(id: string) {
  useEffect(() => {
    const timer = setTimeout(() => {
      interaction(id);
    }, 7000);
    return () => clearTimeout(timer);
  }, [id]);
}

export default useInteraction;
