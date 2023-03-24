import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CreateTask = () => {
  const { query, push } = useRouter();
  const [input, setInput] = useState({ title: "", description: "" });
  const [error, setError] = useState(false);

  async function handleTask() {
    if (!query.id) {
      await createTask();
    } else {
      await updateTask();
    }
  }

  async function updateTask() {
    try {
      await fetch("http://localhost:3000/api/tasks/" + query.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
    } catch (error) {
      console.log(error);
    }

    await push("/");
  }

  async function createTask(e) {
    await e?.preventDefault();
    try {
      await fetch("http://localhost:3000/api/tasks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
    } catch (error) {
      console.log(error);
    }

    await push("/");
  }

  function validateData() {
    if (input.title === "" || input.description === "") {
      setError(true);
    } else {
      setError(false);
    }
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function GetTask() {
    const res = await fetch("http://localhost:3000/api/tasks/" + query.id);
    const data = await res.json();

    setInput({
      title: data.title,
      description: data.description,
    });
    console.log(data);
  }

  useEffect(() => {
    if (query.id) GetTask();
  }, []);

  useEffect(() => {
    validateData();
  }, [input]);

  return (
    <div className=" min-h-screen items-center justify-start  bg-gray-100 flex-col p-10">
      <Link href="/">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="p-5 justify-self-end "
          size="xl"
        />
      </Link>

      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-4xl font-medium">
          {!query.id ? "Create A New Task" : "Edit Task"}
        </h1>
        {error ? <h1> All fields are required </h1> : <></>}
        <form className="mt-10" onSubmit={createTask}>
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative z-0">
              <input
                type="text"
                name="title"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                onChange={handleChange}
                value={input.title}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Title
              </label>
            </div>
            <div className="relative z-0 col-span-2">
              <textarea
                name="description"
                rows="5"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                onChange={handleChange}
                value={input.description}
              ></textarea>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Your message
              </label>
            </div>
          </div>
          <button
            disabled={error}
            type="submit"
            onClick={handleTask}
            className={
              error
                ? "mt-5 rounded-md bg-slate-300 px-10 py-2 text-white "
                : "mt-5 rounded-md bg-black px-10 py-2 text-white hover:bg-white border-solid border-2 border-neutral-900 hover:text-black"
            }
          >
            {query.id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
