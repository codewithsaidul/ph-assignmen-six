import type { SidebarContextProps } from "@/types"
import { createContext } from "react"



export const SidebarContext = createContext<SidebarContextProps | null>(null)