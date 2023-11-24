import ShowProblem from "@/components/showProblem/ShowProblem";
import SubmitPage from "@/components/submitPage/SubmitPage";

interface Problem {
  id: string;
  contest_id: number;
  index: string;
  name: string;
  solvedCount: number;
  // tags: string[];
  rating: number;
  time_limit: string;
  memory_limit: string;
  problem_statement: string;
  input_specification: string;
  output_specification: string;
  sample_tests: string;
  note: string;
}
interface Props {
  params: {
    id: string;
  };
}

const RenderProblem = async ({ params: { id } }: Props) => {
  const res = await fetch(`${process.env.BASE_URL}/api/problems/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
  const problem: Problem = await res.json();

  return (
    <div className={"bg-white p-10 mx-10"}>
      <ShowProblem problem={problem} />
      <SubmitPage id={id} contestID="practice" />
    </div>
  );
};

export default RenderProblem;
