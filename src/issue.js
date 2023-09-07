import React, { useState, useEffect } from "react";

function GithubIssues() {
  const [pageNumber, setPageNumber] = useState(1);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch(
          `https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`
        );
        if (response.ok) {
          const data = await response.json();
          setIssues(data);
        } else {
          console.error("Failed to fetch issues.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchIssues();
  }, [pageNumber]);

  const loadNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const loadPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <h1>Page number {pageNumber}</h1>
      <button id="load_prev" onClick={loadPrevPage} disabled={pageNumber === 1}>
        Load Previous
      </button>
      <button id="load_next" onClick={loadNextPage}>
        Load Next
      </button>
      <ol>
        {issues.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default GithubIssues;
