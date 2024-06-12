import React, { useEffect, useState } from "react";
import "./App.css";

const GlossaryBlock = () => {
  const [glossaryData, setGlossaryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLetter, setFilterLetter] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/wp-json/wp/v2/glossary")
      .then((response) => response.json())
      .then((data) => {
        setGlossaryData(data);
      })
      .catch((error) => console.error("Error fetching glossary data:", error));
  }, [glossaryData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterByLetter = (letter) => {
    setFilterLetter(letter);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <h1 className="glossary-heading">Dermatology Glossary of Terms</h1>
          <p>
            A list of the most commonly used key terms and phrases in
            dermatology
          </p>
          <p>Type in a keyword or click on a letter to search</p>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="SearchInput"
          />
        </div>
      </div>
      <section className="glossary">
        <div className="container">
          <div className="filter-print">
            <div className="ButtonContainer">
              {[...Array(26)].map((_, index) => {
                const letter = String.fromCharCode(65 + index); // A-Z
                return (
                  <button
                    key={index}
                    onClick={() => handleFilterByLetter(letter)}
                    className="glossary-btn"
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
            <a href="javascript:void(0)" onClick={handlePrint}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 26 26" version="1.1" className="svg-print-icon">
                <title>print-icon</title>
                <g id="print-icon" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <g id="Group-6" transform="translate(3.000000, 3.000000)" fill="#3B76A0">
                    <path d="M5.48803858,0 L12.3857828,0.00101111372 C12.4801061,0.00101111372 12.572377,0.0393972314 12.6379923,0.104046446 L12.6379923,0.104046446 L15.7607563,3.18393503 C15.8284241,3.251615 15.8653314,3.33949914 15.8653314,3.4324311 L15.8653314,3.4324311 L15.8653314,7.21751332 L17.8945584,7.21754176 C19.6056746,7.21754176 20.9969266,8.59133757 21,10.2772598 L21,10.2772598 L20.9979502,17.3392814 C20.9979502,17.5332342 20.8380063,17.690818 20.6411603,17.690818 L20.6411603,17.690818 L17.1840207,17.690818 L17.7356093,19.5525085 C17.7673907,19.658572 17.7438112,19.7727192 17.6781959,19.8606008 C17.609515,19.9484823 17.5049426,20 17.3921656,20 L17.3921656,20 L3.60271377,20 C3.49302072,20 3.38844566,19.9484823 3.3197543,19.8606008 C3.25208916,19.7727192 3.23055946,19.6585746 3.2623409,19.5525085 L3.2623409,19.5525085 L3.81392947,17.690818 L0.356789829,17.690818 C0.159938639,17.690818 0,17.533229 0,17.3392814 L0,17.3392814 L0,10.2772598 C0,8.59133757 1.39117588,7.21754176 3.10229202,7.21754176 L3.10229202,7.21754176 L5.13124875,7.21754176 L5.13124875,0.35153657 C5.13124875,0.157583754 5.29119264,0 5.48803858,0 L5.48803858,0 Z M15.2428783,13.6309223 L5.75542885,13.6309223 L4.07814396,19.2967795 L16.9201632,19.2967795 L15.2428783,13.6309223 Z M14.8185572,17.662499 C15.0154057,17.662499 15.1753417,17.820088 15.1773942,18.0140356 C15.1773942,18.2079884 15.0174503,18.3655722 14.8206044,18.3655722 L14.8206044,18.3655722 L6.17775526,18.3655722 C5.98090144,18.3655722 5.82096543,18.2079884 5.82096543,18.0140356 C5.82096543,17.8200828 5.98090932,17.662499 6.17775526,17.662499 L6.17775526,17.662499 Z M17.8923459,7.92159498 L3.1021293,7.92159498 C1.78467879,7.92159498 0.71126475,8.97620469 0.71126475,10.2772572 L0.71126475,10.2772572 L0.71126475,16.9875871 L4.0206387,16.9875871 L5.0130572,13.6309999 L3.60335156,13.6309999 C3.40650037,13.6309999 3.24656173,13.4734161 3.24656173,13.2794633 C3.24656173,13.0855105 3.40650561,12.9279267 3.60335156,12.9279267 L3.60335156,12.9279267 L17.3928034,12.9279267 C17.5896546,12.9279267 17.7495932,13.0855079 17.7495932,13.2794633 C17.7495932,13.4734187 17.5896493,13.6309999 17.3928034,13.6309999 L17.3928034,13.6309999 L15.9830977,13.6309999 L16.9775897,16.9875871 L20.2832104,16.9875871 L20.2832104,10.2772572 C20.2832104,8.97920442 19.2097702,7.92159498 17.8923459,7.92159498 L17.8923459,7.92159498 Z M14.5035512,16.0261498 C14.7004024,16.0261498 14.860341,16.1837336 14.860341,16.3776864 C14.860341,16.5716392 14.7003971,16.729223 14.5035512,16.729223 L14.5035512,16.729223 L6.49034661,16.729223 C6.29349542,16.729223 6.13355678,16.5716392 6.13355678,16.3776864 C6.13355678,16.1837336 6.29350067,16.0261498 6.49034661,16.0261498 L6.49034661,16.0261498 Z M6.92314522,14.3936511 L14.0720649,14.3946623 C14.2689187,14.3946623 14.4288547,14.552246 14.4288547,14.7461988 C14.4288547,14.9401516 14.2689108,15.0977354 14.0720649,15.0977354 L14.0720649,15.0977354 L6.92314522,15.0977354 C6.72629403,15.0977354 6.56635539,14.9401465 6.56635539,14.7451877 C6.56635539,14.5512349 6.72629928,14.3936511 6.92314522,14.3936511 L6.92314522,14.3936511 Z M18.0407415,9.97415583 C18.0407415,10.8257153 16.744839,10.8257153 16.744839,9.97415583 C16.744839,9.12259637 18.0407415,9.12259637 18.0407415,9.97415583 Z M12.028804,0.70418252 L5.84259224,0.70418252 L5.84245838,7.21758831 L15.1537963,7.21859942 L15.1537963,3.78417454 L12.3845676,3.78417454 C12.1877164,3.78417454 12.0277778,3.62658562 12.0277778,3.43263798 L12.0277778,3.43263798 L12.028804,0.70418252 Z M12.7392866,1.19815424 L12.7392866,3.08104969 L14.6503195,3.08104969 L12.7392866,1.19815424 Z" id="Combined-Shape" />
                </g>
                </g>
            </svg>
            </a>
          </div>
          <ul className="GlossaryList">
            {glossaryData
              .filter((item) =>
                filterLetter
                  ? item.title.rendered.startsWith(filterLetter)
                  : true
              )
              .filter((item) =>
                item.title.rendered
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ).sort((a, b) => a.title.rendered.localeCompare(b.title.rendered))
              .map((item) => (
                <li key={item.id} className="GlossaryItem">
                  <h3>{item.title.rendered}</h3>
                  <div className="GlossaryItem-para">
                  <p dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}></p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default GlossaryBlock;
