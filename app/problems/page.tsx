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
    <div className="flex flex-col justify-left items-center  bg-white  mx-10">
      <table className=" border-none w-5/6 mx-auto border-collapse border my-10">
        <caption>
          <h1 className="text-2xl mb-4 font-bold">Problem List</h1>
        </caption>
        <thead className="bg-gray-100">
          <tr className="text-gray-700 text-left">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Problem Id</th>
            <th className="px-4 py-2">Problem Title</th>
          </tr>
        </thead>
        <tbody>
          {/* body */}
          {problems.map((problem, index) => (
            <tr
              className={`text-gray-700 pb-3 hover:bg-blue-100 ${
                index % 2 === 1 ? "bg-gray-100" : "bg-white"
              }`}
              key={problem.id}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{`${problem.contestId}${problem.index}`}</td>
              <td className="px-4 py-2">
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
