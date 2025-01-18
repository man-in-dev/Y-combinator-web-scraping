import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { NavLink } from "react-router-dom";
import { Loader2 } from "lucide-react";

const App = () => {
  const [news, setNews] = useState([]);
  const [last5MinNews, setLast5MinNews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("new_news", (newNews) => setNews([...newNews, newNews]));

    socket.on("last_5_min_news", ({ news }) => setLast5MinNews(news));

    getNews();

    return () => {
      socket?.disconnect();
    };
  }, []);

  const getNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/news`);
      setNews(res.data.data);
    } catch (error) {
      console.log(`error`, error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-3/4 mx-auto my-14 flex space-x-8">
      <div>
        <h1 className="text-2xl font-semibold border-b-2 border-black">
          Hacker News
        </h1>
        <div className="space-y-3 mt-3">
          {news?.map((n, i) => {
            return (
              <div key={i}>
                <div className="space-x-3">
                  <span>{i + 1}</span>
                  <NavLink to={`${n.url}`} target="_blank">
                    <span className="hover:text-blue-500">{n.title}</span>
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {!!last5MinNews?.length && (
        <div>
          <h1 className="text-2xl font-semibold border-b-2 border-black">
            Latest News
          </h1>
          <div className="space-y-3 mt-3">
            {last5MinNews?.map((n, i) => {
              return (
                <div key={i}>
                  <div className="space-x-3">
                    <span>{i + 1}</span>
                    <NavLink to={`${n.url}`} target="_blank">
                      <span className="hover:text-blue-500">{n.title}</span>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
