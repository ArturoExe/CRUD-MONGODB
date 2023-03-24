import { useRouter } from "next/router";

const Empty = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">No tasks to show</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Have an idea?
          </p>
          <p className="mb-8">Let's start by adding your first task</p>

          <button
            onClick={() => router.push("/tasks/new")}
            className="mt-5 rounded-md bg-black px-10 py-2 text-white hover:bg-white border-solid border-2 border-neutral-900 hover:text-black"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Empty;
