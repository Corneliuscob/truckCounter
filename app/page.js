"use client"; // This is a client component 
import { useEffect, useState } from 'react';

export default function Home() {
  const [startDate, setStartDate] = useState(null);
  const [daysSince, setDaysSince] = useState(0);
  const [trucks,setTrucks] = useState([]);
  const [link, setLink] = useState('');
  const [datelink, setDatelink] = useState('')
  const [links, setLinks] = useState([]);
  const [error,setError] = useState(null);


//this code calcultes the days since hte last truck hit the overass and uses he seState of teh fetch database call 
  useEffect(() => {
    if (startDate) {
      const now = new Date();
      const diffTime = Math.floor((now - new Date(startDate)) / (1000 * 60 * 60 * 24));
      setDaysSince(diffTime);
    }
  }, [startDate]);

  //calls the database api takes the dates  and linksto the articles and maps to arrays each.
  useEffect(() => {
    

    fetchData();
  },[] );


  const fetchData = async () => {
    const res = await fetch('/api/trucks');
    const data = await res.json();
    var datesArr = [];
    var linksArr = [];

    datesArr   = data.trucks.map(info => info.date);
    linksArr  = data.trucks.map(info => info.linkto);
    // console.log(`this is 1 ${data.users[0]}`);

    //creates an object; temp  that maps dates and links to
    setStartDate(  new Date( data.trucks[0].date))
    var temp  = datesArr.map((date,index)=>({
      datestr: formatDateTo(date),
      linkto : linksArr[index]
    }));
    
    setTrucks(temp);
    // console.log(temp);
    
  };
  function formatDateTo(dateString) {
    var date = new Date(dateString);
    // console.log();  // "Friday, March 21, 2025"
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'America/Los_Angeles'

      });
  } 

 
  const handleReset = async (e) => {
    e.preventDefault();


    if (!datelink) {
      setError('Please enter a date first!');
      return
    }    else{
      setError(null);
    }
    if (!link) {
      setError('Please enter a link first!');
      return
    }    else{
      setError(null);
    }



    const newData = { datelink, link };
    try {
      const response = await fetch("/api/trucks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if ( response.ok) {
         await fetchData();  // 🔥 Re-fetch data immediately after adding new entry
         setLink('');
         setDatelink('')
      } else {
        console.error("Failed to add data:",response);
      }
    }catch (error) {
      console.error("Error submitting data:", error);
    }

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
          <input
            type="date"
            placeholder="Enter the Date of the incident"
            value={datelink}
            onChange={(e) => setDatelink(e.target.value)}
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

          {error && (
            <p className="text-red-500 mt-2">{error}</p>
          )}
        </div>

        
    <div>
        <table>
          <tbody>
              {trucks.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2">{item.datestr}</td>
                  <td className="p-2"  style= {{color: "blue", fontSize: "16px"}} ><a target="_blank" href= {item.linkto}>link</a></td>
                </tr>
              ))}
          </tbody>
        </table>
            </div>
      </div>
    </div>
  );
}


