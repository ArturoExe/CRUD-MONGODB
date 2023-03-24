import Empty from "@/components/Empty";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

export default function Home({ data }) {
  const router = useRouter();

  return (
    <div className="bg-gray-100">
      <div className="flex-row flex h-screen justify-between">
        <div className="flex  w-full flex-wrap">
          {data.length === 0 ? (
            <Empty />
          ) : (
            data.map((task, index) => (
              <div
                key={index}
                className="m-2 h-fit  w-1/4 p-6 bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700"
              >
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight">
                    {task.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {task.description}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-right">
                  {task.updatedAt.slice(0, 10)}
                </p>

                <div className="space-x-2 ">
                  <a
                    onClick={() => {
                      router.push(`/tasks/${task._id}/edit`);
                    }}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit
                  </a>
                  <Link
                    href={`/tasks/${task._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-row-reverse p-10">
          <FontAwesomeIcon
            icon={faSquarePlus}
            style={{ height: "40px" }}
            className="p-3 bg-gray-100"
            onClick={() => router.push("/tasks/new")}
          />
        </div>
      </div>
    </div>
  );
}

//To communicate with backend
export const getServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/tasks/");
  const data = await res.json();
  return { props: { data } };
};
