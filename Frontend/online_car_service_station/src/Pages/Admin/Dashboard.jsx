import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { toast } from 'react-toastify';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

function Dashboard() {
  const [bookingData, setBookingData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  // const [animate, setAnimate] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/booking',{headers: {'Authorization' : localStorage.getItem('token')}})
      .then(response => {
        const bookings = response.data;
        setBookingData(bookings);
        generatePieData(bookings);
        generateBarData(bookings);
      })
      .catch(error => {
        toast.error('Error while fetching bookings');
      });

    // return () => clearTimeout(timer);
  }, []);

  const generatePieData = (bookings) => {
    const statusCount = {};
    bookings.forEach(booking => {
      const status = booking.bookingStatus || 'Unknown';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    const data = Object.entries(statusCount).map(([name, value]) => ({ name, value }));
    setPieData(data);
  };

  // Bar chart using bookingDate
  const generateBarData = (bookings) => {
    const dateMap = {};
    bookings.forEach(booking => {
      if (booking.serviceDate) {
        const date = new Date(booking.serviceDate).toLocaleDateString();
        dateMap[date] = (dateMap[date] || 0) + 1;
      }
    });

    const data = Object.entries(dateMap).map(([date, count]) => ({ date, count }));
    setBarData(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  const totalBookings = bookingData.length;
  const topStatus = pieData.reduce((prev, current) => (prev.value > current.value ? prev : current), { name: '', value: 0 });

  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '30px',
          // transform: animate ? 'translateY(0)' : 'translateY(-20px)',
          // opacity: animate ? 1 : 0,
          transition: 'all 1s ease-in-out',
          textAlign: 'center',
        }}
      >
         Welcome to Online Car Service Station
      </h1>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '30px',
          width: '90%',
          maxWidth: '1100px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          marginBottom: '40px'
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#343a40', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
          Booking Status Overview
        </h2>

        {pieData.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No booking data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}

        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            textAlign: 'center',
            gap: '20px',
          }}
        >
          <div style={infoCardStyle}>
            <h3>Total Bookings</h3>
            <p style={infoTextStyle}>{totalBookings}</p>
          </div>
          <div style={infoCardStyle}>
            <h3>Top Status</h3>
            <p style={infoTextStyle}>{topStatus.name || 'N/A'}</p>
          </div>
          <div style={infoCardStyle}>
            <h3>Last Updated</h3>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {new Date().toLocaleDateString()} <br />
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '30px',
          width: '90%',
          maxWidth: '1100px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#343a40', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
          Booking Trends Over Time
        </h2>

        {barData.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No trend data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

const infoCardStyle = {
  background: '#f1f3f5',
  padding: '20px',
  borderRadius: '10px',
  width: '200px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const infoTextStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
};

export default Dashboard;
