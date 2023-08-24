import React from "react";
import { AppFirebase } from "../types/type";
export const FirebaseContextProvider = React.createContext<AppFirebase | null>(null);