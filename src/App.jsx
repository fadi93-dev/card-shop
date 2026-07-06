import { useEffect, useState } from "react";
import "./App.css";
import { CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { supabase } from "./supabase";
import { Search, Webhook } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
function App() {
  const [todos, setTodos] = useState([]);
  const [id, setid] = useState(0);
  const [name, setname] = useState("");
  const [selectedcard, setselectedcard] = useState([]);
  const [detail, setdetail] = useState([]);
  const [loadingcard, setloadingcard] = useState(false);
  const [loadingselectedcard, setloadingselectedcard] = useState(false);
  const [loadingproduct, setloadingproduct] = useState(false);

  useEffect(() => {
    async function getTodosdetail() {
      setloadingproduct(true);
      const { data: detail } = await supabase
        .from("product")
        .select("*")
        .eq("card_id", id);
      if (detail) {
        setdetail(detail);
      }
      setloadingproduct(false);
    }
    getTodosdetail();
  }, [id]);

  useEffect(() => {
    async function getTodos() {
      setloadingcard(true);
      const { data: todos } = await supabase
        .from("card")
        .select("*")
        .eq("is_active", true);
      if (todos) {
        setTodos(todos);
      }
      setloadingcard(false);
    }
    getTodos();
  }, []);

  useEffect(() => {
    async function getselectedcard() {
      setloadingselectedcard(true);
      const { data: todocard } = await supabase
        .from("card")
        .select("*")
        .eq("name", name);
      if (todocard) {
        setselectedcard(todocard);
      }
      setloadingselectedcard(false);
    }
    getselectedcard();
  }, [name]);

  return (
    <>
      <nav className="grid bg-amber-500 h-20">
        <div className="flex justify-between">
          <div className="flex items-center ml-10 gap-5">
            <Webhook className="w-10 h-10" />
            <span className="hidden md:flex font-semibold text-2xl">
              card-shop
            </span>
          </div>
          <div className="hidden md:flex items-center ml-4 mr-4">
            <a href="#" className="text-lg font-bold">
              Home
            </a>
          </div>
          <div className="flex flex-1 max-w-sm items-center ml-2 mr-10">
            <div className="relative w-full">
              <Search className=" absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-white pl-10 pr-3 py-2 w-full placeholder:text-gray-400 rounded-2xl"
              ></input>
            </div>
          </div>
        </div>
      </nav>
      <div className="grid md:grid-cols-5 items-start bg-indigo-50">
        <div className="grid justify-items-center h-150 md:col-span-2 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent hover:scrollbar-thumb-black transition-[scrollbar-color] duration-300">
          {loadingcard &&
            [1, 2].map((item) => (
              <div
                key={item}
                className=" bg-white w-[90%]  m-2  h-fit text-center border-2  rounded-2xl "
              >
                <CardHeader>
                  <CardTitle className="grid p-4 place-items-center">
                    <Skeleton className="h-5 w-20" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid place-items-center">
                  <Skeleton className="h-5 w-15 m-2" />
                </CardContent>
              </div>
            ))}
          {!loadingcard &&
            todos.map((todo) => (
              <div
                key={todo.id}
                onClick={() => {
                  setname(todo.name);
                  setid(todo.id);
                }}
                className=" bg-white w-[90%] p-3 m-2 transition-colors duration-300 text-center border-2 hover:border-amber-300 rounded-2xl "
              >
                <CardHeader>
                  <CardTitle className="p-4 text-2xl font-serif">
                    {todo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid justify-items-center">
                  <p className=" text-gray-400">{todo.location}</p>
                </CardContent>
              </div>
            ))}
        </div>
        <div className="grid justify-items-center  h-full md:col-span-3 bg-indigo-100">
          {loadingselectedcard &&
            [1].map((item) => (
              <div
                key={item}
                className=" bg-white w-[90%] h-fit p-3 m-2 text-center border-2 hover:border-amber-300 rounded-2xl "
              >
                <CardHeader>
                  <CardTitle className="p-4 text-2xl justify-items-center font-serif">
                    <Skeleton className="m-2 h-5 w-20" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-3 justify-center">
                  <div>
                    <Skeleton className="h-5 w-20 m-2" />
                    <Skeleton className="h-5 w-20 m-2" />
                    <Skeleton className="h-5 w-20 m-2" />
                  </div>
                </CardContent>
              </div>
            ))}
          {!loadingselectedcard &&
            selectedcard.map((todocard) => (
              <div
                key={todocard.id}
                onClick={() => {
                  setid(todocard.id);
                }}
                className="bg-white w-[90%] h-fit p-3 m-2 text-center border-2 hover:border-amber-300 rounded-2xl "
              >
                <CardHeader>
                  <CardTitle className="p-4 text-2xl font-serif">
                    {todocard.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid justify-items-center">
                  <div>
                    <p className="text-lg m-2  text-gray-400">
                      {todocard.location}
                    </p>
                    <p className="break-all m-2">{todocard.email}</p>
                    <p className="break-all m-2">{todocard.phone}</p>
                    <p className="break-all m-2">{todocard.info}</p>
                  </div>
                </CardContent>
              </div>
            ))}
        </div>
      </div>
      <div className="bg-yellow-300 min-w-full  min-h-screen grid md:grid-cols-2  items-start justify-items-center md:place-content-start">
        {loadingproduct &&
          [1, 2].map((item) => (
            <div
              key={item}
              className="bg-white p-3 m-2 w-[90%] h-fit  text-center border-2  rounded-2xl "
            >
              <CardHeader>
                <CardTitle className="p-4 grid place-items-center">
                  <Skeleton className="h-5 w-20" />
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2  place-items-center">
                <div>
                  <Skeleton className="w-40 h-52 object-fill rounded-2xl" />
                </div>
                <div className="">
                  <Skeleton className="h-5 w-20 m-2" />
                  <Skeleton className="h-5 w-20 m-2" />
                </div>
              </CardContent>
            </div>
          ))}
        {!loadingproduct &&
          detail.map((det) => (
            <div
              key={det.id}
              className="bg-white p-3 m-2 w-[90%] text-center border-2 hover:border-amber-300 rounded-2xl transition-colors duration-300"
            >
              <CardHeader>
                <CardTitle className="p-4 text-2xl font-serif ">
                  {det.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2  place-items-center">
                <div>
                  <img
                    src={det.image_url}
                    className="w-52 h-52 object-fill rounded-2xl hover:scale-105 transition duration-300"
                  />
                </div>
                <div>
                  <div className="flex justify-center  m-2">
                    <p className="flex items-end mr-2 ml-2">ل.س.ج</p>
                    <p className="lg:text-6xl text-4xl">{det.price}</p>
                  </div>

                  <p className="text-lg text-gray-400 mr-2 ml-2">
                    {det.description}
                  </p>
                </div>
              </CardContent>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
