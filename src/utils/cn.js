import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...classText) {
  return twMerge(clsx(...classText));
}

export default cn;
