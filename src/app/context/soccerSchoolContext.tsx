"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Group } from "../interfaces";

interface SoccerSchoolContextType {
  groups: Group[];
  fetchGroups: () => void;
}

const SoccerSchoolContext = createContext<SoccerSchoolContextType | undefined>(
  undefined
);

export const SoccerSchoolProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const fetchGroups = () => {
    fetch("/api/groups", {
      method: "GET",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => {
        setGroups(res);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <SoccerSchoolContext.Provider value={{ groups, fetchGroups }}>
      {children}
    </SoccerSchoolContext.Provider>
  );
};

export const useSoccerSchoolContext = (): SoccerSchoolContextType => {
  const context = useContext(SoccerSchoolContext);
  if (!context) {
    throw new Error("useSeating must be used within a SoccerSchoolContext");
  }
  return context;
};
