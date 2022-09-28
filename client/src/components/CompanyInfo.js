import { React } from "react";
import { useGlobalState } from "../state/state";
import "./CompanyInfo.css";
function CompanyInfo() {
  let info = useGlobalState("companyData")[0];
  return (
    <>
      {info ? (
        <div id="modal">
          <h2>{info.companyName}</h2>
          <h3>Click to copy info to clipboard</h3>
          <div id="card-container">
            <div className="card">
              <h2>Found numbers</h2>
              {info.phoneNumbers.map((number) => {
                return (
                  <p onClick={(e) => navigator.clipboard.writeText(e.target.innerText)} className="info" key={number}>
                    {number}
                  </p>
                );
              })}
            </div>
            <div className="card">
              <h2>Found Emails</h2>
              {info.emails.map((email) => {
                return (
                  <p onClick={(e) => navigator.clipboard.writeText(e.target.innerText)} className="info" key={email}>
                    {email}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p>Site loaded before fetching info?</p>
      )}
    </>
  );
}

export default CompanyInfo;
