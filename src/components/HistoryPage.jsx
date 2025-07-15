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
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "30px"}}>
        <h2 className="his-title">History</h2>
        <nav>
            <button onClick={() =>{navigate('/')}}>Home</button>
            <button style = {{marginLeft: '10px'}}onClick={async() =>{logout()}}>Logout</button>
        </nav>
        <h2>Past Routes</h2>
        {history.length === 0 ? (
        <p>No history yet.</p>
        ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((item) => (
            <li
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <strong>{item.start} → {item.optimisedWaypoints?.join(" → ")} → {item.end}</strong>
              <br />
              Distance: {item.distance} | Duration: {item.duration}
              <br />
              <small>
                {item.createdAt?.toDate?.().toLocaleString() || "No timestamp"}
              </small>
              <button style = {{margin: '10px 0 0 10px', height: '30px', alignText: 'center', padding:'0 10px' }}onClick={()=>{opentoMaps(item)}}>Navigate</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

