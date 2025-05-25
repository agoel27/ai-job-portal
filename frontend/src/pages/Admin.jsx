import { useEffect, useState } from "react";
import api from "../api";

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/users/");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">
        Hello Very Cool Admin Person
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full table-fixed border border-black">
          <thead>
            <tr>
              <th className="w-1/12 px-4 py-2 text-center font-bold border">
                ID
              </th>
              <th className="w-5/12 px-4 py-2 text-center font-bold border">
                Email
              </th>
              <th className="w-3/12 px-4 py-2 text-center font-bold border">
                Verified
              </th>
              <th className="w-3/12 px-4 py-2 text-center font-bold border">
                Staff
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  {user.verified ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2 border">
                  {user.is_staff ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;
