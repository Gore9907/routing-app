import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const { user, logout } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.isAnonymous) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const ref = collection(db, "users", user.uid, "history");
        const q = query(ref, orderBy("createdAt", "desc"), limit(10));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setHistory(data);
      } catch (err) {
        console.error("Error fetching history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const opentoMaps = (item) => {
    const base = "https://www.google.com/maps/dir/?api=1";
    const origin = `&origin=${encodeURIComponent(item.start)}`;
    const destination = `&destination=${encodeURIComponent(item.end)}`;
    const wp = item.optimisedWaypoints.length
      ? `&waypoints=${item.optimisedWaypoints.map(encodeURIComponent).join('|')}`
      : "";

    const link = `${base}${origin}${destination}${wp}`;
    window.open(link, '_blank');
  }

  return (
    <div className="history-page">
      <header className="page-header">
        <div>
          <h2 className="page-title">Route History</h2>
        </div>
        <nav className="nav-bar">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>Home</button>
          <button className="btn btn-ghost" onClick={async () => { logout() }}>Logout</button>
        </nav>
      </header>

      {history.length === 0 ? (
        <p className="history-empty">No routes saved yet.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-card">
              <div className="history-card-header">
                {item.start} → {item.optimisedWaypoints?.join(" → ")} → {item.end}
              </div>
              <div className="history-card-meta">
                <span className="history-badge">{item.distance}</span>
                <span className="history-badge">{item.duration}</span>
              </div>
              <div className="history-card-footer">
                <span className="history-timestamp">
                  {item.createdAt?.toDate?.().toLocaleString() || "No timestamp"}
                </span>
                <button className="btn btn-success btn-sm" onClick={() => opentoMaps(item)}>Navigate</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
