import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

/* 🔥 ChartJS Register */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [visits, setVisits] = useState(0);
  const [visitGraph, setVisitGraph] = useState([]);

  useEffect(() => {
    load();
    axios.get("http://localhost:5000/api/admin/visits")
      .then(res => setVisits(res.data.visits || 0));

    axios.get("http://localhost:5000/api/admin/visits/graph")
      .then(res => setVisitGraph(res.data));
  }, []);

  function load() {
    axios.get("http://localhost:5000/api/contacts")
      .then(res => setContacts(res.data));
  }

  function updateStatus(id, status) {
    axios.put(
      `http://localhost:5000/api/contacts/${id}/status`,
      { status }
    ).then(load);
  }

  const count = s => contacts.filter(c => c.status === s).length;

  /* 📊 GRAPH DATA */
  const chartData = {
    labels: [
      "Pending",
      "Upcoming",
      "Completed",
      "Total Visits"
    ],
    datasets: [{
      label: "Statistics",
      data: [
        count("pending"),
        count("upcoming"),
        count("completed"),
        visits
      ],
      backgroundColor: [
        "#ffc107",
        "#0d6efd",
        "#198754",
        "#6c757d"
      ]
    }]
  };

  /* 📅 Upcoming */
  const upcoming = contacts
    .filter(c => c.status === "upcoming")
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

  return (
    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-3">Admin Dashboard</h2>

      {/* STATS */}
      <div className="row g-3 mb-4">
        <Stat title="Total Enquiries" value={contacts.length} />
        <Stat title="Pending" value={count("pending")} color="warning" />
        <Stat title="Upcoming" value={count("upcoming")} color="primary" />
        <Stat title="Completed" value={count("completed")} color="success" />
        <Stat title="Website Visits" value={visits} color="secondary" />
      </div>

      {/* GRAPH */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h6 className="fw-bold mb-3">Bookings & Visitors</h6>
          <Bar key={visits} data={chartData} />
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">All Enquiries</h5>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map(c => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.name}</strong>
                      <div className="text-muted small">{c.email}</div>
                    </td>
                    <td>{c.event_type}</td>
                    <td>{c.event_date}</td>
                    <td>{c.location}</td>
                    <td>
                      <select
                        className={`form-select form-select-sm bg-${map[c.status]} text-white`}
                        value={c.status}
                        onChange={e =>
                          updateStatus(c.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* UPCOMING */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Upcoming Events</h5>

          {upcoming.length === 0 ? (
            <p className="text-muted">No upcoming events</p>
          ) : (
            upcoming.map(e => (
              <div key={e.id} className="mb-2">
                <strong>{e.name}</strong> – {e.event_type}
                <div className="text-muted small">
                  📅 {e.event_date} | 📍 {e.location}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

/* HELPERS */

const map = {
  pending: "warning",
  upcoming: "primary",
  completed: "success"
};

function Stat({ title, value, color = "dark" }) {
  return (
    <div className="col-md-3 col-6">
      <div className="card shadow-sm">
        <div className="card-body">
          <h6 className="text-muted">{title}</h6>
          <h3 className={`fw-bold text-${color}`}>{value}</h3>
        </div>
      </div>
    </div>
  );
}
