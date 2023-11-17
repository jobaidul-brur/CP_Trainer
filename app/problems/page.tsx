"use-client";
import Link from "next/link";
interface Problem {
  id: string;
  contestId: number;
  index: string;
  name: string;
}

const Problems = async () => {
  const BASE_URL = process.env.BASE_URL;
  const res = await fetch(BASE_URL + "/api/problems", {
    cache: "no-store",
    credentials: "include",
  });
  const problems: Problem[] = await res.json();

  return (
    <div className="overflow-x-auto">
      <table className="table table-pin-rows table-pin-col">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Judge</th>
            <th>Problem Title</th>
          </tr>
        </thead>
        <tbody>
          {/* body */}
          {problems.map((problem, index) => (
            <tr key={problem.id}>
              <td>{index + 1}</td>
              <td>{"code forces"}</td>
              <td>
                <Link href={"problems/" + problem.id}>{problem.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Problems;
