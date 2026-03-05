import { useCallback, useEffect, useState } from "react";
import type { Student } from "../backend.d";
import { useActor } from "./useActor";

const STORAGE_KEY = "pss_student";

function readFromStorage(): Student | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Restore bigint id (JSON serializes bigints as strings)
    if (parsed && typeof parsed.id === "string") {
      parsed.id = BigInt(parsed.id);
    }
    return parsed as Student;
  } catch {
    return null;
  }
}

function writeToStorage(student: Student | null): void {
  if (student === null) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    // bigint is not natively JSON-serializable — convert to string
    const serializable = { ...student, id: student.id.toString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  }
}

export function useStudentAuth() {
  const { actor } = useActor();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const stored = readFromStorage();
    setStudent(stored);
    setIsLoading(false);
  }, []);

  const register = useCallback(
    async (
      name: string,
      email: string,
      phone: string,
      pincode: string,
      school: string,
    ): Promise<void> => {
      if (!actor) throw new Error("Backend not available. Please try again.");
      await actor.registerStudent(name, email, phone, pincode, school);
      // After registration, log the student in to fetch full profile
      const profile = await actor.loginStudent(phone);
      if (profile) {
        writeToStorage(profile);
        setStudent(profile);
      }
    },
    [actor],
  );

  const login = useCallback(
    async (phone: string): Promise<Student | null> => {
      if (!actor) throw new Error("Backend not available. Please try again.");
      const profile = await actor.loginStudent(phone);
      if (profile) {
        writeToStorage(profile);
        setStudent(profile);
      }
      return profile ?? null;
    },
    [actor],
  );

  const logout = useCallback((): void => {
    writeToStorage(null);
    setStudent(null);
  }, []);

  return { student, isLoading, register, login, logout };
}
