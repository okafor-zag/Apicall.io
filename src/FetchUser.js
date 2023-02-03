import React, { useState, useEffect } from "react";
// import useFetch from "react-hook-usefetch";
import "./fetchUser.css"

const FetchUser = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchUserData = async () => {
    const resp = await fetch(
      `https://randomuser.me/api/?page=${pageNumber}&results=1000&seed=abc`
    );
  
    const users = await resp.json();
    setUsers(users.results);

  };
  useEffect(() => {
    fetchUserData();
  }, []);



  const usersPerPage = 2;
  const numberOfUsers = 20;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage);

  return (
    <div>
      <h1>FetchUser</h1>
      <section className="user">
        {displayUsers.map((user) => {
          const {
            gender,
            name: { title, first, last },
            location: {
              street: { number, name },
              city,
              state,
              country,
              postcode,
            },
            dob: { date, age },
            email,
            picture: { large },
          } = user;

          return (
            <div className="container" key={name.toLowerCase().replaceAll(" ", "")}>
              <img className="tiny-img" src={large} alt={first} />
              <h2>
                {title} {first} {last}
              </h2>
              <p>
                <span>Gender: </span> {gender}
              </p>
              <p>
                <span>Date of birth: </span>
                {date}
              </p>
              <p>
                <span>Age:</span> {age}
              </p>
              <p>
                <span>Email Address: </span>
                {email}
              </p>
              <p>
                <span>home address: </span>
                {number} {name},{city}, {state}, {country}
              </p>
              <p>
                <span>postal code: </span>
                {postcode}
              </p>
            </div>
          );
        })}


      </section>
      <>
      <p className="pagination">
          Pages: {pageNumber} of {numberOfUsers}
        </p>

        {
          <button
          className="btn"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            prev
          </button>
        }

        {Array.from({ length: numberOfUsers }, (value, index) => index + 1).map(
          (each) => (
            <button onClick={() => setPageNumber(each)}>{each}</button>
          )
        )}
        {
          <button
          className
            disabled={pageNumber >= numberOfUsers}
            // aria-disabled={page >= pages}
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            next
          </button>
        }
      </>
    </div>
  );
};

export default FetchUser;
