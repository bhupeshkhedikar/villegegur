import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

// Array of gradient colors for random assignment
const gradients = [
  "linear-gradient(135deg, #ff9a9e, #fad0c4)",
  "linear-gradient(135deg, #a18cd1, #fbc2eb)",
  "linear-gradient(135deg, #f6d365, #fda085)",
  "linear-gradient(135deg, #84fab0, #8fd3f4)",
  "linear-gradient(135deg, #fccb90, #d57eeb)",
  "linear-gradient(135deg, #ffecd2, #fcb69f)",
];

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({}); // track expanded state per card

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // toggle expanded state for a single card by id
  const toggleExpand = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id], // only toggle this card
    }));
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>योजना</h1>
      </header>

      {/* Blog Grid */}
      <div style={gridContainer}>
        {posts.map((post, index) => {
          const gradientBg = gradients[index % gradients.length];
          const isExpanded = expandedPosts[post.id] || false; // check individual card
          return (
            <div key={post.id} style={{ ...cardStyle, background: gradientBg }}>
              <img src={post.imageURL} alt={post.title} style={imageStyle} />
              <h3 style={titleStyle}>{post.title}</h3>
              <h5 style={subtitleStyle}>{post.subtitle}</h5>
              <div style={contentWrapperStyle}>
                <div
                  style={{
                    ...contentStyle,
                    maxHeight: isExpanded ? "none" : "4.2em",
                    overflow: "hidden",
                  }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                {post.content.length > 150 && (
                  <button
                    onClick={() => toggleExpand(post.id)}
                    style={readMoreBtnStyle}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Page background
const pageStyle = {
  background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
  minHeight: "100vh",
  padding: "0",
};

// Header
const headerStyle = {
  background: "linear-gradient(135deg, #4CAF50, #81C784)",
  padding: "2rem 0",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  marginBottom: "2rem",
};

const headerTitleStyle = {
  color: "#fff",
  fontSize: "2rem",
  fontWeight: "bold",
  margin: 0,
};

// Grid container for cards
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "1.8rem",
  justifyItems: "center",
  padding: "0 2rem 2rem 2rem",
};

// Card style
const cardStyle = {
  width: "250px",
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  padding: "0.8rem",
  overflow: "hidden",
  transition: "transform 0.3s, box-shadow 0.3s",
};

// Image style
const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "0.5rem",
};

// Title
const titleStyle = {
  fontSize: "1rem",
  color: "#222",
  margin: "0.2rem 0",
  lineHeight: "1.2",
};

// Subtitle
const subtitleStyle = {
  fontSize: "0.8rem",
  color: "#555",
  marginBottom: "0.4rem",
};

// Content
const contentWrapperStyle = {
  flex: 1,
  overflow: "hidden",
  position: "relative",
};

const contentStyle = {
  fontSize: "0.75rem",
  color: "#444",
  lineHeight: "1.3",
  transition: "max-height 0.3s ease",
};

// Read More button
const readMoreBtnStyle = {
  marginTop: "0.3rem",
  background: "linear-gradient(90deg, #4CAF50, #81C784)",
  border: "none",
  color: "#fff",
  padding: "0.3rem 0.6rem",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "0.7rem",
};

export default BlogPage;
