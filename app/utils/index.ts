import { twMerge } from "tw-merge";
import clsx, { type ClassValue } from "clsx";


export const classNameMerger = (...classes: ClassValue[]) => twMerge(clsx(...classes))