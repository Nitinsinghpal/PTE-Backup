import axios from "axios";
import { useEffect, useState } from "react";
function QueData() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    GetData();
  }, []);
  function GetData(params) {
    debugger;
    const data = axios
      .get("http://localhost:5001/api/user/getAllUsers")
      .then((d) => {
        debugger;
        setAllData(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function renderData() {
    let data = [];
    allData.map((d) => {
      data.push(
        <div>
          <p>{d.name}</p>
          <p>{d.email}</p>
          <p>{d.address}</p>
          <br />
        </div>
      );
    });
    return data;
  }
  return <div className="App">{renderData()}</div>;
}

export default QueData;
