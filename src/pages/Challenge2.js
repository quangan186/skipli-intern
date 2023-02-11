import React, { useEffect, useState } from "react";
import search from "../assets/search.svg";
import heart from "../assets/heart.svg";
import next from "../assets/next.svg";
import prev from "../assets/previous.svg";
import activeHeart from "../assets/activeHeart.svg";
import profile from "../assets/profile.svg";
import { useNavigate } from "react-router-dom";

const Challenge2 = () => {
  const [query, setQuery] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [favoriteUsers, setFavoriteUsers] = useState(() =>
    localStorage.getItem("favoriteUsers")
      ? [...JSON.parse(localStorage.getItem("favoriteUsers"))]
      : []
  );
  const navigate = useNavigate();

  const handleSearchUser = (e) => {
    e.preventDefault();

    getUsers(query, pageNumber, resultsPerPage);
  };

  const getUsers = async (q, page, perPage) => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:8080/api/github/users/search?q=${q}&page=${page}&per_page=${perPage}`
    );
    const data = await response.json();
    setUsers(data.users);
    console.log(data.users);
    setIsLoading(false);
  };

  useEffect(() => {
    const getFavoriteUsers = async () => {
      const response = await fetch(
        `http://localhost:8080/api/github/user?phone_number=${localStorage.getItem(
          "phoneNumber"
        )}`
      );
      const data = await response.json();
      // setFavoriteUsers(data.users);
      setFavoriteUsers([...data.favorite_github_users])
    };

    getFavoriteUsers();
  }, [favoriteUsers]);

  const onNextPageClick = () => {
    setPageNumber(pageNumber + 1);
    getUsers(query, pageNumber + 1, resultsPerPage);
  };

  const onPrevPageClick = () => {
    setPageNumber(pageNumber - 1);
    getUsers(query, pageNumber - 1, resultsPerPage);
  };

  const handleLikedUser = async (user) => {
    await fetch(`http://localhost:8080/api/github/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phone_number: localStorage.getItem("phoneNumber"),
        github_user_id: user.id,
      }),
    })
      .then((response) => response.json())
      .then((res) => console.log(res.msg))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSearchUser} className="py-8 px-12">
        <div className="flex gap-4 ">
          <div className="relative border w-full">
            <input
              className="h-[60px] w-full px-4 pr-20"
              type="text"
              placeholder="Search Github User"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2"
            >
              <img src={search} alt="" className="" />
            </button>
          </div>

          <button onClick={() => navigate("/profile")}>
            <img src={profile} alt="" className="w-[40px] h-[40px]" />
          </button>
        </div>

        <div className="my-8">
          <div className="flex justify-between">
            <h1 className="text-[24px] font-bold">Search results</h1>
            <input
              className="border px-4 py-2 apearance-none"
              min="0"
              type="number"
              placeholder="Results per page"
              onChange={(e) => setResultsPerPage(e.target.value)}
            />
          </div>
          {isLoading ? (
            ""
          ) : (
            <>
              <table className="my-4">
                <tr>
                  <th>Id</th>
                  <th>Login</th>
                  <th>Avatar URL</th>
                  <th>HTML URL</th>
                  <th>Public Repos</th>
                  <th>Followers</th>
                </tr>
                {users && users.length > 0
                  ? users.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.login}</td>
                          <td>{user.avatar_url}</td>
                          <td>{user.html_url}</td>
                          <td>{user.repos_url}</td>
                          <td>{user.followers_url}</td>
                          <td className="border-t border-t-black flex justify-center py-2 px-4">
                            {favoriteUsers &&
                            favoriteUsers.find((id) => id === user.id) ? (
                              <button onClick={() => handleLikedUser(user)}>
                                <img
                                  src={activeHeart}
                                  alt=""
                                  className="w-[40px] h-[40px]"
                                />
                              </button>
                            ) : (
                              <button onClick={() => handleLikedUser(user)}>
                                <img
                                  src={heart}
                                  alt=""
                                  className="w-[40px] h-[40px]"
                                />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : <div className="py-4 font-bold text-[16px] px-2">No result found!</div>}
              </table>

              <div className="flex my-8 gap-4 justify-center items-center">
                <button
                  onClick={() => onPrevPageClick()}
                  className={pageNumber <= 1 ? "invisible" : ""}
                >
                  <img src={prev} alt="" className="w-[40px] h-[40px]" />
                </button>
                <button className={`w-[40px] h-[40px] border ${
                  users && users.length > 0
                  ? ""
                  : "invisible"
                }`}>
                  {pageNumber}
                </button>
                <button
                  onClick={() => onNextPageClick()}
                  className={
                    users && users.length > 0 && users.length <= resultsPerPage
                      ? ""
                      : "invisible"
                  }
                >
                  <img src={next} alt="" className="w-[40px] h-[40px]" />
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Challenge2;
