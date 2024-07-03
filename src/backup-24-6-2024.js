import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css";
import { ClipLoader } from "react-spinners";

const GlossaryBlock = () => {
  const [glossaryData, setGlossaryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLetter, setFilterLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeLetter, setActiveLetter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_API_GCS_SHEET_URL);
        const data = await response.json();
        const formattedData = data.values.map((item, index) => ({
          id: index,
          title: { rendered: item[0] },
          excerpt: { rendered: item[1] },
        }));
        setGlossaryData(formattedData);
      } catch (error) {
        console.error("Error fetching glossary data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setActiveLetter(""); // Clear the active letter filter when typing in the search box
  }, []);

  const handleFilterByLetter = useCallback((letter) => {
    setFilterLetter(letter);
    setActiveLetter(letter);
    setSearchTerm(""); // Clear the search term when a letter filter is selected
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // const filteredData = useMemo(() => {
  //   return glossaryData
  //     .filter((item) =>
  //       filterLetter ? item.title.rendered.startsWith(filterLetter) : true
  //     )
  //     .filter((item) =>
  //       item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //     .sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));
  // }, [glossaryData, searchTerm, filterLetter]);

  const filteredData = useMemo(() => {
    return glossaryData
      .filter((item) =>
        searchTerm
          ? item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .filter((item) =>
        filterLetter && !searchTerm
          ? item.title.rendered.startsWith(filterLetter)
          : true
      )
      .sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));
  }, [glossaryData, searchTerm, filterLetter]);

  return (
    <>
      <div className="header">
        <div className="glossary-container">
          <h1 className="glossary-heading">Dermatology Glossary of Terms</h1>
          <p className="glossary-p">
            Essential Dermatology Glossary
            <br />
            Search by keyword or click a letter to explore key dermatology terms.
          </p>
          <div className="SearchContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={15}
              width={15}
              viewBox="0 0 512 512"
              className="search-icon"
            >
              <path
                fill="#5462a3"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="SearchInput"
            />
          </div>
        </div>
      </div>
      <section className="glossary">
        <div className="glossary-container">
          <div className="filter-print">
            <div className="ButtonContainer">
              {[...Array(26)].map((_, index) => {
                const letter = String.fromCharCode(65 + index); // A-Z
                return (
                  <button
                    key={index}
                    onClick={() => handleFilterByLetter(letter)}
                    className={`glossary-btn ${
                      activeLetter === letter ? "active" : ""
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
            <a href="javascript:void(0)" onClick={handlePrint} className="print-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={21}
                width={21}
                viewBox="0 0 512 512"
                className="svg-print-icon"
              >
                <path
                  fill="#5462a3"
                  d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
                />
              </svg>
            </a>
          </div>
          {loading ? (
            <div className="loading">
              <ClipLoader size={60} color={"#5462a3"} loading={loading} />
            </div>
          ) : (
            <ul className="GlossaryList">
              {filteredData.map((item) => (
                <li key={item.id} className="GlossaryItem">
                  <h3>{item.title.rendered}</h3>
                  <div className="GlossaryItem-para">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.excerpt.rendered,
                      }}
                    ></p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default GlossaryBlock;
