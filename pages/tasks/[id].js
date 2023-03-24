import React, { useEffect, useState } from "react";
import { GetQuote } from "@/utils/APiQuote.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Alert from "@/components/Alert";
import { useRouter } from "next/router";

const TaskDetails = ({ data }) => {
  const [quote, setQuote] = useState();
  const [alert, setAlert] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    try {
      await fetch(`http://localhost:3000/api/tasks/${data._id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }

    setAlert(true);

    setTimeout(() => router.push("/"), 2000);
  }

  useEffect(() => {
    let item = GetQuote().then((data) => {
      setQuote(data);
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 p-12  flex-col">
      <div className="justify-between flex p-5">
        <Link href="/" className="hover:text-blue-400 ">
          <FontAwesomeIcon icon={faArrowLeft} size="xl" />
        </Link>

        <button className="hover:text-red-500 " onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} size="xl" />
        </button>
      </div>
      <h1 className="font-bold text-3xl mt-2">{data.title}</h1>
      <h3 className="font-bold text-xl mt-8"> Description </h3>
      <p className="font-light">{data.description}</p>
      <div className="my-44">
        <div className="ml-40 p-10 float-right">
          <h2 className="text-zinc-700">Quote of today</h2>
          <p className="text-zinc-500 p-2">{quote?.content}</p>
          <h4 className="text-zinc-600 text-right">{quote?.author}</h4>
        </div>
      </div>

      {alert && <Alert />}
    </div>
  );
};

export default TaskDetails;

//To communicate with backend
export const getServerSideProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status === 200) {
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  } else {
    return {
      props: { response: res.status(400) },
    };
  }
};
