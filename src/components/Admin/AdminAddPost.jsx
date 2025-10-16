import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

const AdminAddPost = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const q = collection(db, "posts");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setContent("");
    setImage(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || (!image && !editingId)) return alert("All fields required!");
    setLoading(true);

    let imageURL = null;

    // Upload image if a new file is selected
    if (image) {
      const imageRef = ref(storage, `posts/${image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, image);
      imageURL = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (err) => reject(err),
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });
    }

    try {
      if (editingId) {
        // Update existing post
        const postRef = doc(db, "posts", editingId);
        const updateData = { title, subtitle, content };
        if (imageURL) updateData.imageURL = imageURL;
        await updateDoc(postRef, updateData);
        alert("Post updated successfully!");
      } else {
        // Add new post
        await addDoc(collection(db, "posts"), {
          title,
          subtitle,
          content,
          imageURL,
          createdAt: serverTimestamp(),
        });
        alert("Post added successfully!");
      }
      resetForm();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setSubtitle(post.subtitle);
    setContent(post.content);
    setEditingId(post.id);
    setImage(null); // optional: user can choose new image
  };

  const handleDelete = async (post) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      // Delete Firestore document
      await deleteDoc(doc(db, "posts", post.id));

      // Delete image from storage
      if (post.imageURL) {
        const imageRef = ref(storage, post.imageURL);
        deleteObject(imageRef).catch(() => {}); // ignore if image not found
      }

      alert("Post deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "1rem" }}>
      {/* Form */}
      <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "1rem", marginBottom: "2rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          {editingId ? "Edit Post" : "Add New Post"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            style={inputStyle}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginBottom: "1rem" }}
          />
          <textarea
            placeholder="Content (HTML allowed)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            style={{ ...inputStyle, resize: "vertical" }}
          />
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update Post" : "Add Post"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ ...buttonStyle, marginTop: "0.5rem", background: "#f44336" }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Post List */}
      <div>
        {posts.map((post) => (
          <div key={post.id} style={postItemStyle}>
            <img src={post.imageURL} alt={post.title} style={postImageStyle} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0,color:'black' }}>{post.title}</h3>
              <h5 style={{ margin: "0.2rem 0 0.5rem 0", color: "#555" }}>{post.subtitle}</h5>
              <div dangerouslySetInnerHTML={{ __html: post.content }} style={{ fontSize: "0.85rem", color: "#333", maxHeight: "4.5em", overflow: "hidden" }} />
            </div>
            <div style={{ marginLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button onClick={() => handleEdit(post)} style={editBtnStyle}>Edit</button>
              <button onClick={() => handleDelete(post)} style={deleteBtnStyle}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "0.8rem",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
};

const postItemStyle = {
  display: "flex",
  alignItems: "flex-start",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  padding: "1rem",
  marginBottom: "1rem",
};

const postImageStyle = {
  width: "120px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
  marginRight: "1rem",
};

const editBtnStyle = {
  padding: "0.4rem 0.8rem",
  background: "#2196F3",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.75rem",
};

const deleteBtnStyle = {
  padding: "0.4rem 0.8rem",
  background: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.75rem",
};

export default AdminAddPost;
