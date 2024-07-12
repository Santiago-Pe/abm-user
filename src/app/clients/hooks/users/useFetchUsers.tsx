"use client";
import { User } from "../../../types";
import { useState, useEffect, useCallback } from "react";
import UseFetchUsersResult from "./useFetchUsers.types";

const useFetchUsers = (
  initialData: User[] = [],
  initialPage: number = 1
): UseFetchUsersResult => {
  const [users, setUsers] = useState<User[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (page: number = initialPage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://staging.duxsoftware.com.ar/api/personal?sector=2222&_limit=${5}&_page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      // @ts-ignore
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(initialPage);
  }, [fetchUsers, initialPage]);

  return { users, loading, error, fetchUsers };
};

export default useFetchUsers;
