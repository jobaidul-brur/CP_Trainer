export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto px-4 py-8" id="index-intro">
        <h1 className="text-4xl font-bold mb-4" id="index-title">
          Welcome to Marjia Judge
        </h1>
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12">
            <h2 className="text-3xl underline ">So you Have chosen Death ?</h2>
            <div id="ojs" className="card bg-gray-200 p-4 mb-8"></div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="social"></div>
            <div className="social"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
