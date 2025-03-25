"use client"; // This is a client component 
import { useEffect, useState } from 'react';

export default function Home() {
  const [startDate, setStartDate] = useState(null);
  const [daysSince, setDaysSince] = useState(0);
  const [trucks,setTrucks] = useState([]);
  const [link, setLink] = useState('');
  const [links, setLinks] = useState([]);

  // useEffect(() => {
  //   const savedDate = localStorage.getItem('startDate');
  //   const savedLinks = JSON.parse(localStorage.getItem('links')) || [];

  //   if (savedDate) {
  //     setStartDate(new Date(savedDate));
  //   }
  //   setLinks(savedLinks);
  // }, []);

  useEffect(() => {
    if (startDate) {
      const now = new Date();
      const diffTime = Math.floor((now - new Date(startDate)) / (1000 * 60 * 60 * 24));
      setDaysSince(diffTime);
    }
  }, [startDate]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      var datesArr = [];
      var linksArr = [];

      datesArr   = data.users.map(user => user.date);
      linksArr  = data.users.map(user => user.linkto);
      // console.log(`this is 1 ${data.users[0]}`);
      setStartDate(  new Date( data.users[0].date))
      var temp  = datesArr.map((date,index)=>({
        datestr: formatDateTo(date),
        linkto : linksArr[index]
      }));
      
      setTrucks(temp);
      // console.log(temp);
      
    };

    fetchData();
  },[] );

  function formatDateTo(dateString) {
    var date = new Date(dateString);
    // console.log();  // "Friday, March 21, 2025"
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
  } 

  // Long format
  
  

  const handleReset = () => {
    if (!link) return;
    const now = new Date();
    setStartDate(now);
    setDaysSince(0);
    const newLinks = [link, ...links];
    setLinks(newLinks);
    localStorage.setItem('startDate', now.toISOString());
    localStorage.setItem('links', JSON.stringify(newLinks));
    setLink('');
  };

  const incrementDays = () => {
    setDaysSince(daysSince + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold">{daysSince} Days Since</h1>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter a link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
          <button
            onClick={handleReset}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Reset to Zero
          </button>
          <button
            onClick={incrementDays}
            className="mt-4 ml-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Increment Days
          </button>
        </div>

        {/* {trucks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Recent Links:</h2>
            <ul className="mt-4 space-y-2">
              {trucks.map((l, index) => (
                <li key={index} className="text-blue-500 underline">
                  <a href={l} target="_blank" rel="noopener noreferrer">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        )} */}
            <div>
     
              {trucks.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2">{item.datestr}</td>
                  <td className="p-2" style= {{color: "blue", fontSize: "16px"}} ><a href= {item.linkto}>link</a></td>
                </tr>
              ))}
            </div>
      </div>
    </div>
  );
}
