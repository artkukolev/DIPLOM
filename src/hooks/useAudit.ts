import { useQuery } from "@tanstack/react-query";
import { api } from "../api/mockDb";
import type { AuditEntry } from "../types";

export const useAuditLog = () =>
  useQuery<AuditEntry[]>({
    queryKey: ["audit"],
    queryFn: api.getAudit,
  });
