import React, { useState } from "react";
import search from "../assets/search.svg";
import heart from "../assets/heart.svg";
import activeHeart from "../assets/activeHeart.svg";

const Challenge2 = () => {
  const [query, setQuery] = useState();
  const [pageNumber, setPageNumber] = useState(1)
    const [resultsPerPage, setResultsPerPage] = useState(100)
    const [isLiked, setIsLiked] = useState(false);

    const handleSearchUser = () => {

    }
    
    const handleLikedUser = () =>{
        setIsLiked(state => !state)
    }
  return (
    <div>
      <div className="py-8 px-12">
        <div className="relative border">
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
            <img
                src={search}
                alt=""
                className=""
            />
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
              onChange={e => setResultsPerPage(e.target.value)}
            />
          </div>

          <table className="my-4">
            <tr>
              <th>Id</th>
              <th>Login</th>
              <th>Avatar URL</th>
              <th>HTML URL</th>
              <th>Public Repos</th>
              <th>Followers</th>
            </tr>

            <tr>
              <td>aaa</td>
              <td>aaa</td>
              <td>aaa</td>
              <td>aaa</td>
              <td>aaa</td>
              <td>aaa</td>
              <td className="border-t border-t-black flex justify-center py-2">
                <button onClick={handleLikedUser}>
                    <img src={isLiked ? activeHeart : heart} alt="" className="w-[40px] h-[40px]" />
                </button>
              </td>
            </tr>
          </table>
        </div>

        <div className="flex my-8">
          <button className="w-[40px] h-[40px] border">1</button>
        </div>
      </div>
    </div>
  );
};

export default Challenge2;
