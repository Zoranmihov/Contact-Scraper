import { React, useState, useEffect } from "react";
import { setGlobalState } from "../state/state";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ScrapedData() {
  const [searchResultsList, setSearchResultsList] = useState([]);
  let navigate = useNavigate();

  // Functions
  const viewResults = async (result, index) => {
    if (result.scraped === "Failed") {
      alert("Scraping attempt failed no information has been gathered");
      return;
    }
    setGlobalState("companyData", result);
    navigate(`/${index}`);
  };

  const fetchSearchResults = () => {
    axios
      .get("http://127.0.0.1:4000/api/last-searchresults")
      .then(async (res) => {
        let data = Object.values(res.data);
        setSearchResultsList([...data]);
      })
      .catch((err) => {
        console.log(err);
        alert("Error!");
      });
  };

  useEffect(() => {
    fetchSearchResults();
  }, []);

  return (
    <section>
    <nav>
    <button onClick={() => navigate('/')}>Domains list</button>
        <button onClick={() => navigate('/data')}>Scraping results</button>
      </nav>
      <>
        <h2>Last scraped domains</h2>
        <div id="searched-domains-list">
          {searchResultsList.length
            ? searchResultsList.map((result, index) => {
                return (
                  <div
                    onClick={() => {
                      viewResults(result, index);
                    }}
                    className="search-results-card"
                    key={index}
                  >
                    <p>{result.domain}</p>
                    <p>{result.scraped}</p>
                  </div>
                );
              })
            : null}
        </div>
      </>
    </section>
  );
}

export default ScrapedData;
