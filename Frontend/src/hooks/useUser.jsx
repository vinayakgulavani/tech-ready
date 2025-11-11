import { useState, useEffect } from "react";
import axios from "axios";

export default function useUser(userId) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const getUser = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API}/auth/user/${userId}`);
        setUser(data?.user);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userId]);

}
