"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { DeliveryAgent } from "@/types";
import { deliveryAgents as initialAgents } from "@/data/mock";

interface DeliveryContextType {
  agents: DeliveryAgent[];
  currentAgent: DeliveryAgent | null;
  isOnline: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  toggleOnline: () => void;
  setReceivingOrders: (value: boolean) => void;
  updateAgent: (id: string, patch: Partial<DeliveryAgent>) => void;
  getAgent: (id: string) => DeliveryAgent | undefined;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

const AUTH_KEY = "sanad-driver-auth";
const ONLINE_KEY = "sanad-driver-online";

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<DeliveryAgent[]>(initialAgents);
  const [currentAgent, setCurrentAgent] = useState<DeliveryAgent | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) {
        const agent = initialAgents.find((a) => a.id === saved);
        if (agent) setCurrentAgent(agent);
      }
      const online = localStorage.getItem(ONLINE_KEY);
      if (online === "true") setIsOnline(true);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (currentAgent) {
      localStorage.setItem(AUTH_KEY, currentAgent.id);
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [currentAgent, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ONLINE_KEY, String(isOnline));
  }, [isOnline, hydrated]);

  const login = useCallback((username: string, password: string) => {
    const agent = initialAgents.find(
      (a) => a.username === username && a.password === password
    );
    if (agent) {
      setCurrentAgent(agent);
      setIsOnline(true);
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agent.id ? { ...a, isOnline: true, status: "available" } : a
        )
      );
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    if (currentAgent) {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === currentAgent.id
            ? { ...a, isOnline: false, status: "offline" }
            : a
        )
      );
    }
    setCurrentAgent(null);
    setIsOnline(false);
  }, [currentAgent]);

  const toggleOnline = useCallback(() => {
    setIsOnline((prev) => {
      const next = !prev;
      if (currentAgent) {
        setAgents((agents) =>
          agents.map((a) =>
            a.id === currentAgent.id
              ? {
                  ...a,
                  isOnline: next,
                  status: next ? "available" : "offline",
                }
              : a
          )
        );
      }
      return next;
    });
  }, [currentAgent]);

  const setReceivingOrders = useCallback(
    (value: boolean) => {
      setIsOnline(value);
      if (currentAgent) {
        setAgents((prev) =>
          prev.map((a) =>
            a.id === currentAgent.id
              ? {
                  ...a,
                  isOnline: value,
                  status: value ? "available" : "offline",
                }
              : a
          )
        );
      }
    },
    [currentAgent]
  );

  const updateAgent = useCallback((id: string, patch: Partial<DeliveryAgent>) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
    );
    setCurrentAgent((prev) =>
      prev && prev.id === id ? { ...prev, ...patch } : prev
    );
  }, []);

  const getAgent = useCallback(
    (id: string) => agents.find((a) => a.id === id),
    [agents]
  );

  return (
    <DeliveryContext.Provider
      value={{
        agents,
        currentAgent,
        isOnline,
        isAuthenticated: !!currentAgent,
        login,
        logout,
        toggleOnline,
        setReceivingOrders,
        updateAgent,
        getAgent,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const ctx = useContext(DeliveryContext);
  if (!ctx) throw new Error("useDelivery must be used within DeliveryProvider");
  return ctx;
}
