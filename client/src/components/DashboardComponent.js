/* eslint-disable react-hooks/rules-of-hooks */

import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashboardComponent() {
  let navigate = useNavigate();

  // Domain states
  const [domain, setDomain] = useState();
  const [domainsList, setDomainsList] = useState([]);


  //Domain functions
  const fetchDomains = () => {
    axios
      .get("http://127.0.0.1:4000/api/domainlist")
      .then(async (res) => {
        let data = Object.values(res.data);
        setDomainsList([...data]);
      })
      .catch((err) => {
        console.log(err);
        alert("Error!");
      });
  };

  const removeLink = (name) => {
    let data = domainsList;
    data.splice(domainsList.indexOf(name), 1);
    setDomainsList([...data]);
  };
  const addLink = () => {
    let data = domainsList;
    if (data.includes(domain)) {
      alert("Link is already in the list");
      return;
    }
    data.unshift(domain);
    setDomainsList([...data]);
  };

  const saveList = () => {
    const proceed = window.confirm(
      "Old list will be overwritten. Do you wish to proceed"
    );
    if (proceed) {
      axios
        .post("http://127.0.0.1:4000/api/domainlist", { domainsList })
        .then((res) => {
          alert("List was saved");
        })
        .catch((err) => {
          alert("Someting went wrong fix it!");
        });
    }

    return;
  };

  const scrapeList = () => {
    const proceed = window.confirm(
      "Old scraping results will be overwritten. Do you wish to proceed"
    );
    if (proceed) {
      axios
        .post("http://127.0.0.1:4000/api/scrapedomainlist", { domainsList })
        .then((res) => {
          alert('Scraping started')
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return;
  };

  const clearList = () => {
    const proceed = window.confirm("Delete all the links in the list?");
    if (proceed) {
      setDomainsList([]);
    }
    return;
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  return (
    <>
      <nav>
        <button onClick={() => navigate('/')}>Domains list</button>
        <button onClick={() => navigate('/data')}>Scraping results</button>
      </nav>
      <section id="list-view">
        <h2>Domains list to scrape</h2>
        <div id="input-field">
          <input
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Domain link"
          />
          <button onClick={() => addLink()}>Add</button>
          <button onClick={() => saveList()}>Save</button>
          <button onClick={() => clearList()}>Clear</button>
          <button onClick={() => scrapeList()} id="scrape">
            Scrape
          </button>
        </div>
        <div id="domain-list-view">
          {domainsList.length
            ? domainsList.map((domain) => {
                return (
                  <div key={domain} className="domainLink-card">
                    <p>{domain}</p>
                    <button onClick={() => removeLink(domain)}>Remove</button>
                  </div>
                );
              })
            : null}
        </div>
      </section>
    </>
  );
}

export default DashboardComponent;
