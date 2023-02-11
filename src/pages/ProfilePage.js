import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getFavoriteUsers = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/github/user?phone_number=${localStorage.getItem(
          "phoneNumber"
        )}`
      );
      const data = await response.json();
      // setFavoriteUsers(data.users);
      console.log(data.favorite_github_users);
      const list = [...data.favorite_github_users];
      console.log(list);
      for (let userId of list) {
        const response = await fetch(
          `http://localhost:8080/api/github/userProfile/search?github_user_id=${userId}`
        );
        const data = await response.json();
        setUsers((prev) => [...prev, data]);
      }
      setIsLoading(false);
    };

    getFavoriteUsers();
  }, []);
  return (
    <div className="px-8 py-4">
      <h1 className="font-bold text-[20px]">
        User:{" "}
        <span className="font-normal text-[16px]">
          {localStorage.getItem("phoneNumber")}
        </span>
      </h1>
      <div className="py-4">
        <h2 className="font-bold text-[20px]">Favorite Users: </h2>
        {isLoading ? (
          <h1 className="font-bold text-[16px] my-4">Waiting...</h1>
        ) : (
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
                      <td>{user.public_repos}</td>
                      <td>{user.followers}</td>
                    </tr>
                  );
                })
              : ""}
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
