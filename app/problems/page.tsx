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
        <thead className="bg-gray-100">
          <tr className="text-gray-700 text-left">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Judge</th>
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
              <td className="px-4 py-2">{"code forces"}</td>
              <td className="px-4 py-2">
                <Link href={"problems/" + problem.id}>{problem.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <br /> <br />
      <div className="join">
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="1"
          checked
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="2"
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="3"
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="4"
        />
      </div> */}
    </div>
  );
};

export default Problems;
