import axios from "axios";
import cheerio from "cheerio";

const ScrapProblem = async (link: string) => {
  const { data } = await axios.get(link);
  const $ = cheerio.load(data);

  const time_limit = $(".time-limit").contents().last().text().trim();
  const memory_limit = $(".memory-limit").contents().last().text().trim();

  const problem_statement = $(
    "div.problem-statement > div:nth-child(2)"
  ).html();
  let input_specification = $(".problem-statement .input-specification").html();
  if (input_specification) {
    input_specification = input_specification.replace(
      '<div class="section-title">Input</div>',
      ""
    );
  }
  let output_specification = $(
    ".problem-statement .output-specification"
  ).html();
  if (output_specification) {
    output_specification = output_specification.replace(
      '<div class="section-title">Output</div>',
      ""
    );
  }
  let sample_tests = $(".problem-statement .sample-test").html();
  if (sample_tests) {
    sample_tests = sample_tests.replaceAll('class="input"', 'class="1nput"\'');
  }
  let note = $(".problem-statement .note").html();
  if (note) {
    note = note.replace('<div class="section-title">Note</div>', "");
  }
  return {
    time_limit,
    memory_limit,
    problem_statement,
    input_specification,
    output_specification,
    sample_tests,
    note,
  };
};
export default ScrapProblem;
