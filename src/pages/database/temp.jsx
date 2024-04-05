import React, { useState, useEffect } from 'react'
import { GiNetworkBars } from "react-icons/gi";
import {ref , onValue } from 'firebase/database' ;
import { db} from '../../firebase/firebase-config';

function Database() {
  const [tableData, setTableData] = useState([]);
  const [recordsLen, setRecordsLen] = useState(0);

  // const [user, setUser] = useState(null);
  useEffect(() => {
    // const userCredential = ;
    const fetchData = async () => {
      try {
        // // Sign in with Firebase Authentication (replace with your preferred method)
        // const currentUser = (await userCredential).user;
        // setUser(currentUser);

        // Fetch data from Firebase Realtime Database
        const dbRef = ref(db, 'bharatdns/requests');
        onValue(dbRef, (snapshot) => {
          let records = [];
          snapshot.forEach((childSnapshot) => {
            let keyName = childSnapshot.key;
            let data = childSnapshot.val();
            records.push({ "key": keyName, "data": data });
          });
          records.reverse();
          setRecordsLen(records.length)
          setTableData(records);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };
  fetchData();

    // Cleanup function to unsubscribe from real-time updates
    return () => {
      // Detach the listener when the component unmounts
      // This will prevent memory leaks and unnecessary updates
      // if the component is unmounted before the data fetch completes
      const dbRef = ref(db, 'bharatdns/requests');
      onValue(dbRef, null);
    };
  }, []);
  return (
    <>
    {/* {!userLoggedIn && (<Navigate to={'/bharatdns-frontend/signin'} replace={true} />)} */}
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold"> 
              <span className='flex justify-start align-middle md:text-xl lg:text-4xl text-blue-500 shadow-lg'>
                <GiNetworkBars />  <p className='ml-2 md:ml-4'>Live Network Queries</p>
              </span>
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              This is a live updating list of all network queries recieved on server. You can inspect them!
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-800 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-950">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                      >
                        Id
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                      >
                        <span>Query Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-300"
                      >
                        Resolved IP
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                      >
                        Client Address
                      </th>
                      
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                      >
                        Time
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                      >
                        Whitelist
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                      >
                        Blacklist
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                      >
                        Malicious
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                      >
                        Time Elapsed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 bg-gray-700">
                    {tableData.map((person, index) => (
                      <tr key={index}>
                        {/* Id */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className={`text-sm text-gray-100 bg-inherit px-2 rounded-full ${(person.data.resolved_ip == '0.0.0.0') ? " bg-red-300 text-red-900": ""}`}>{recordsLen - index}</div>
                        </td>
                        {/* Query Name */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <textarea className="text-sm px-2 py-2 text-gray-100 bg-inherit rounded-lg " value={person.data.query_name} readOnly></textarea>
                        </td>
                        {/* Resolved IP */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <textarea className={`text-sm px-2 py-2 text-gray-100 bg-inherit rounded-lg `} value={person.data.resolved_ip} readOnly></textarea>
                        </td>
                        {/* Client Address */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-100 bg-inherit ">{person.data.client_address[0]}, {person.data.client_address[1]}</div>
                        </td>
                        {/* Time */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-100 bg-inherit ">{person.data.time} ms</div>
                        </td>
                        {/* Whitelist */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${(person.data.whitelist)? "bg-green-300 text-green-900":"bg-red-300 text-red-900"}`}>
                            {`${(person.data.whitelist) ? "Yes": "No"}`}
                          </span>
                        </td>
                        {/* Blacklist */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${(person.data.blacklist)? "bg-red-300 text-red-900":"bg-green-300 text-green-900"}`}>
                          {`${(person.data.blacklist) ? "Yes": "No"}`}
                          </span>
                        </td>
                        {/* Malicious */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${(person.data.malicious)? "bg-red-300 text-red-900": "bg-green-300 text-green-900"}`}>
                          {`${(person.data.malicious != 0) ? person.data.malicious.toFixed(2).toString()+ "%": "No"}`}
                          </span>
                        </td>
                        {/* TimeElapsed */}
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {person.data.time_elapsed}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center pt-6">
          <a href="#" className="mx-1 cursor-not-allowed text-sm font-semibold text-gray-100">
            <span className="hidden lg:block">&larr; Previous</span>
            <span className="block lg:hidden">&larr;</span>
          </a>
          <a
            href="#"
            className="mx-1 flex items-center rounded-md border border-gray-600 px-3 py-1 text-gray-100 hover:scale-105"
          >
            1
          </a>
          <a
            href="#"
            className="mx-1 flex items-center rounded-md border border-gray-600 px-3 py-1 text-gray-100 hover:scale-105"
          >
            2
          </a>
          <a
            href="#"
            className="mx-1 flex items-center rounded-md border border-gray-600 px-3 py-1 text-gray-100 hover:scale-105"
          >
            3
          </a>
          <a
            href="#"
            className="mx-1 flex items-center rounded-md border border-gray-600 px-3 py-1 text-gray-100 hover:scale-105"
          >
            4
          </a>
          <a href="#" className="mx-2 text-sm font-semibold text-gray-100">
            <span className="hidden lg:block">Next &rarr;</span>
            <span className="block lg:hidden">&rarr;</span>
          </a>
        </div>
      </section>
    </>
  )
}

export default Database;