import React, { useEffect, useState } from "react";
import search from "../assets/search.svg";
import heart from "../assets/heart.svg";
import next from "../assets/next.svg";
import prev from "../assets/previous.svg";
import activeHeart from "../assets/activeHeart.svg";
import profile from "../assets/profile.svg";

const Challenge2 = () => {
  const [query, setQuery] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState()
  const [users, setUsers] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const handleSearchUser = (e) => {
    e.preventDefault();

    getUsers(query, pageNumber, resultsPerPage)
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

  // useEffect(() => {
  //   const getUsers = async () => {
  //     setIsLoading(true);
  //     const response = await fetch(
  //       `http://localhost:8080/api/github/users/search?q=${searchData.query}&page=${searchData.pageNumber}&per_page=${searchData.resultsPerPage}`
  //     );
  //     const data = await response.json();
  //     setUsers(data.users);
  //     console.log(data.users);
  //     setIsLoading(false);
  //   };

  //   getUsers();
  // }, [searchData]);

  const onNextPageClick = () => {
    setPageNumber(pageNumber + 1);
    getUsers(query, pageNumber + 1, resultsPerPage)
  };

  const onPrevPageClick = () => {
    setPageNumber(pageNumber - 1);
    getUsers(query, pageNumber - 1, resultsPerPage)
  };

  const handleLikedUser = (user) => {
    setSelectedUser(user)
    // setIsLiked(() => users.filter(u => u.id === user.id).length > 0 ? true : false)
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

          <button><img src={profile} alt="" className="w-[40px] h-[40px]" /></button>
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
                          <td className="border-t border-t-black flex justify-center py-2">
                            <button onClick={() => handleLikedUser(user)}>
                              <img
                                src={(selectedUser && selectedUser.id === user.id) ? activeHeart : heart}
                                alt=""
                                className="w-[40px] h-[40px]"
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </table>

              <div className="flex my-8 gap-4 justify-center items-center">
                <button
                  onClick={() => onPrevPageClick()}
                  className={pageNumber <= 1 ? "invisible" : ""}
                >
                  <img src={prev} alt="" className="w-[40px] h-[40px]" />
                </button>
                <button className="w-[40px] h-[40px] border">
                  {pageNumber}
                </button>
                <button
                  onClick={() => onNextPageClick()}
                  className={(users && (users.length > 0 && users.length <= resultsPerPage)) ? "" : "invisible"}
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
