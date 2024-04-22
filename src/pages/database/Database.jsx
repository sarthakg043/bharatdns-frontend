import React, { useState, useEffect } from 'react';
import { GiNetworkBars } from "react-icons/gi";
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/firebase-config';
import { useAuth } from '../../contexts/authContext';

function Database() {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recordsLen, setRecordsLen] = useState(0);
  const {userLoggedIn} = useAuth();

  if(!userLoggedIn){
    alert("Please sign in")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, 'bharatdns/requests');
        onValue(dbRef, (snapshot) => {
          let records = [];
          snapshot.forEach((childSnapshot) => {
            let keyName = childSnapshot.key;
            let data = childSnapshot.val();
            records.push({ "key": keyName, "data": data });
          });
          records.reverse();
          setRecordsLen(records.length);
          setTotalPages(Math.ceil(records.length / 100));
          setTableData(records);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    return () => {
      const dbRef = ref(db, 'bharatdns/requests');
      onValue(dbRef, null);
    };
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * 100;
  const endIndex = startIndex + 100;
  const displayedData = tableData.slice(startIndex, endIndex);

  const renderPageNumbers = () => {
    const pages = [];
    const numPageButtonsToShow = 5;
    const maxPageButtons = 6;

    let startPage;
    let endPage;

    if (totalPages <= maxPageButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= numPageButtonsToShow - Math.floor(numPageButtonsToShow / 2)) {
        startPage = 1;
        endPage = numPageButtonsToShow;
      } else if (currentPage + Math.floor(numPageButtonsToShow / 2) >= totalPages) {
        startPage = totalPages - numPageButtonsToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(numPageButtonsToShow / 2);
        endPage = currentPage + Math.floor(numPageButtonsToShow / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 flex items-center rounded-md border md:text-xs border-gray-600 px-3 py-1 text-gray-100 hover:scale-105 ${currentPage === i ? 'bg-gray-800' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (totalPages > maxPageButtons) {
      if (currentPage > Math.floor(numPageButtonsToShow / 2) + 1) {
        pages.unshift(
          <button
            key="prevEllipsis"
            className="mx-1 flex items-center rounded-md border border-gray-600 px-3 py-1 text-gray-100 hover:scale-105"
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - Math.floor(numPageButtonsToShow / 2))}
          >
            ...
          </button>
        );
      }

      if (currentPage < totalPages - Math.floor(numPageButtonsToShow / 2)) {
        pages.push(
          <button
            key="nextEllipsis"
            className="mx-1 flex items-center rounded-md border border-gray-600 px-3 py-1 text-gray-100 hover:scale-105"
            disabled={currentPage === totalPages}
            onClick={() => handlePageClick(currentPage + Math.floor(numPageButtonsToShow / 2))}
          >
            ...
          </button>
        );
      }

      if (endPage < totalPages) {
        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
            className={`mx-1 flex items-center rounded-md border border-gray-600 px-3 py-1 text-gray-100 hover:scale-105 ${currentPage === totalPages ? 'bg-gray-800' : ''}`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">
              <span className='flex justify-start align-middle md:text-xl lg:text-4xl text-blue-500 shadow-lg'>
                <GiNetworkBars />  <p className='ml-2 md:ml-4'>Live Network Queries</p>
              </span>
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              This is a live updating list of all network queries received on the server. You can inspect them!
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-800 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-800">
                  {/* Table headers */}
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
                    {/* Table rows */}
                    {displayedData.map((person, index) => (
                      <tr key={index}>
                        {/* Id */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className={`text-sm text-gray-100 bg-inherit px-2 rounded-full ${(person.data.resolved_ip === '0.0.0.0') ? " bg-red-300 text-red-900" : ""}`}>
                            {(recordsLen - ((currentPage - 1) * 100) - index)}
                          </div>
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
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${(person.data.whitelist) ? "bg-green-300 text-green-900" : "bg-red-300 text-red-900"}`}>
                            {`${(person.data.whitelist) ? "Yes" : "No"}`}
                          </span>
                        </td>
                        {/* Blacklist */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${(person.data.blacklist) ? "bg-red-300 text-red-900" : "bg-green-300 text-green-900"}`}>
                            {`${(person.data.blacklist) ? "Yes" : "No"}`}
                          </span>
                        </td>
                        {/* Malicious */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${(person.data.malicious) ? "bg-red-300 text-red-900" : "bg-green-300 text-green-900"}`}>
                            {`${(person.data.malicious !== 0) ? person.data.malicious.toFixed(2).toString() + "%" : "No"}`}
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
          {/* Previous page button */}
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="mx-1 cursor-pointer text-sm md:text-xs font-semibold text-gray-100">
            <span className="hidden lg:block">&larr; Previous</span>
            <span className="block lg:hidden">&larr;</span>
          </button>
          {/* Page numbers */}
          {renderPageNumbers()}
          {/* Next page button */}
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="mx-2 text-sm font-semibold text-gray-100">
            <span className="hidden lg:block">Next &rarr;</span>
            <span className="block lg:hidden">&rarr;</span>
          </button>
        </div>
      </section>
    </>
  );
}

export default Database;
