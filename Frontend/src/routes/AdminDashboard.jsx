import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode"; // Import from the 'qrcode' package

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [voterStats, setVoterStats] = useState({ totalVoters: 0, totalVotesCast: 0, remainingVoters: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidatesData();
    fetchVoterStats();
  }, []);

  const fetchCandidatesData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/results/result");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVoterStats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/voterStats/stats");
      setVoterStats(response.data);
    } catch (error) {
      console.error("Error fetching voter stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const downloadPDF = () => {
    const input = document.getElementById("results-table");
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 10;
  
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("Voting Results", pdf.internal.pageSize.getWidth() / 2, margin + 10, { align: "center" });
  
    // Adjust the position of the content immediately after the heading
    const contentTop = margin + 30; // Reduced space after heading
    
    // Convert table data to a string (or JSON) and generate a QR code for the entire table
    const tableData = JSON.stringify(candidates);
    const qrCodeCanvas = document.createElement("canvas");
  
    QRCode.toCanvas(qrCodeCanvas, tableData, function (error) {
      if (error) {
        console.error(error);
      } else {
        const imgData = qrCodeCanvas.toDataURL("image/png");
  
        // Add QR Code to the PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const qrCodeSize = 50; // Set size of the QR code
  
        // Positioning QR code at the bottom of the page
        const positionY = pdfHeight - qrCodeSize - margin;
        pdf.addImage(imgData, "PNG", margin, positionY, qrCodeSize, qrCodeSize); // Add QR code to PDF
      }
    });
  
    // Capture the results table and add it to the PDF
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      // Add the table image right after the heading, with less space
      pdf.addImage(imgData, "PNG", margin, contentTop, pdfWidth, pdfHeight);
      pdf.save("Voting_Results.pdf");
    });
  };
  

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="w-[80%] mt-[100px]">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4 text-[18px]"
            >
              Logout
            </button>
            <button
              onClick={downloadPDF}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded text-[18px]"
            >
              Download Results as PDF
            </button>
          </div>
        </div>

        {/* NEW STATS CARD */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Eligible Voters</h2>
            <p className="text-3xl font-bold mt-2">{voterStats.totalVoters}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Votes Casted</h2>
            <p className="text-3xl font-bold mt-2">{voterStats.totalVotesCast}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Wasted Cast</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Votes not Casted</h2>
            <p className="text-3xl font-bold mt-2">{voterStats.remainingVoters}</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Results Table</h2>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-lg font-semibold">Loading results...</div>
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-xl font-semibold text-gray-600">
                No votes have been cast yet.
              </div>
              <div className="mt-4 text-gray-500">
                Encourage users to participate in the election to see results here.
              </div>
            </div>
          ) : (
            <div id="results-table">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left text-[26px]">Candidate Name</th>
                    <th className="px-4 py-2 border-b text-left text-[26px]">Symbol</th>
                    <th className="px-4 py-2 border-b text-left text-[26px]">Total Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b text-[22px]">{candidate.name}</td>
                      <td className="px-4 py-2 border-b mt-5 h-[20px] w-[80px]">
                        <img src={candidate.symbol} alt="" />
                      </td>
                      <td className="px-4 py-2 border-b text-[22px]">{candidate.totalVotes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
