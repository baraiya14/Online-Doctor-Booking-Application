import { useState, useEffect } from "react";

const Reports = () => {
  const [reportData, setReportData] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalDepartments: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setReportData({
        totalPatients: 250,
        totalDoctors: 50,
        totalAppointments: 100,
        totalDepartments: 10,
        totalTransactions: 500,
      });
    }, 1000); // Simulating network delay
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ceycare Hospital Management System Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold">{reportData.totalPatients}</h3>
          <p>Total Patients</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold">{reportData.totalDoctors}</h3>
          <p>Total Doctors</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold">{reportData.totalAppointments}</h3>
          <p>Total Appointments</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold">{reportData.totalDepartments}</h3>
          <p>Total Departments</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold">{reportData.totalTransactions}</h3>
          <p>Total Transactions</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
