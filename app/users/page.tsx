import Link from "next/link";

interface User {
  id: string;
  userName: string;
  cfHandle: string;
}

const Users = async () => {
  const BASE_URL = process.env.BASE_URL;
  const res = await fetch(BASE_URL + "/api/users", {
    cache: "no-store",
    credentials: "include",
  });
  const users: User[] = await res.json();

  return (
    <div className="flex flex-col justify-left items-center bg-white mx-10">
      <table className="border-none w-5/6 mx-auto border-collapse border my-10">
        <caption>
          <h1 className="text-2xl mb-4 font-bold">User List</h1>
        </caption>
        <thead className="bg-gray-100">
          <tr className="text-gray-700 text-left">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">username</th>
            <th className="px-4 py-2">cfhandle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              className={`text-gray-700 pb-3 hover:bg-blue-100 ${
                index % 2 === 1 ? "bg-gray-100" : "bg-white"
              }`}
              key={user.id}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <Link href={"users/" + user.id}>{user.userName}</Link>
              </td>
              <td className="px-4 py-2">{user.cfHandle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
