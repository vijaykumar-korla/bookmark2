const isProduction = import.meta.env.PROD;
export const BACKEND_URL = isProduction 
  ? "https://bookmark3-1gnr.onrender.com"
  : "http://127.0.0.1:5000";
const API_BASE = `${BACKEND_URL}/api`;

let isBackendOffline = false;

// Quick health check to see if backend is running
export const checkBackendStatus = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const res = await fetch(`${BACKEND_URL}/`, { 
      method: "GET",
      signal: controller.signal 
    });
    clearTimeout(timeoutId);
    console.log("Backend ping succeeded. Status:", res.status);
    isBackendOffline = false;
    return true;
  } catch (err) {
    console.error("Backend ping failed. Error:", err);
    isBackendOffline = true;
    return false;
  }
};

export const getBackendOfflineStatus = () => isBackendOffline;

// Helper to get request headers with User ID
const getHeaders = (userId) => {
  const headers = {
    "Content-Type": "application/json"
  };
  if (userId) {
    headers["X-User-Id"] = userId;
  }
  return headers;
};

// ----------------------------------------------------
// AUTHENTICATION APIs
// ----------------------------------------------------

export const register = async (name, email, password) => {
  const isOnline = await checkBackendStatus();
  if (!isOnline) {
    // Offline local storage fallback
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(u => u.name.toLowerCase() === name.toLowerCase())) {
      throw new Error("Username is already taken locally.");
    }
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Email already registered locally.");
    }
    const newUser = { id: `local_${Date.now()}`, name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return { user: newUser, offline: true };
  }

  // Online backend request
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");

  // Sync to local users cache for offline fallback compatibility
  const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const userObj = { id: data.user.id || data.user._id, name: data.user.name, email: data.user.email, password, avatar: data.user.avatar };
  localUsers.push(userObj);
  localStorage.setItem("users", JSON.stringify(localUsers));

  return { user: data.user, offline: false };
};

export const login = async (identifier, password) => {
  const isOnline = await checkBackendStatus();
  if (!isOnline) {
    // Offline local storage fallback supporting username or email check
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => 
      (u.email.toLowerCase() === identifier.toLowerCase() || u.name.toLowerCase() === identifier.toLowerCase()) && 
      u.password === password
    );
    if (!found) throw new Error("Invalid local credentials.");
    return { user: found, offline: true };
  }

  // Online backend request
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ identifier, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");

  // Sync/Update local users cache for offline fallback compatibility
  const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const idx = localUsers.findIndex(u => u.email.toLowerCase() === data.user.email.toLowerCase());
  const userObj = { id: data.user.id || data.user._id, name: data.user.name, email: data.user.email, password, avatar: data.user.avatar };
  if (idx > -1) {
    localUsers[idx] = userObj;
  } else {
    localUsers.push(userObj);
  }
  localStorage.setItem("users", JSON.stringify(localUsers));

  return { user: data.user, offline: false };
};

export const updateProfile = async (userId, payload) => {
  const isOnline = await checkBackendStatus();
  if (!isOnline) {
    // Offline local storage fallback
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error("User not found locally.");
    
    if (payload.name && users.some((u, idx) => idx !== index && u.name.toLowerCase() === payload.name.toLowerCase())) {
      throw new Error("Username is already taken locally.");
    }
    if (payload.email && users.some((u, idx) => idx !== index && u.email.toLowerCase() === payload.email.toLowerCase())) {
      throw new Error("Email is already registered locally.");
    }
    
    users[index] = { ...users[index], ...payload };
    localStorage.setItem("users", JSON.stringify(users));
    return { user: users[index], offline: true };
  }

  // Online backend request
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PUT",
    headers: getHeaders(userId),
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Profile update failed");

  // Sync/Update local users cache for offline fallback compatibility
  const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const idx = localUsers.findIndex(u => u.id === userId);
  if (idx > -1) {
    localUsers[idx] = { ...localUsers[idx], name: data.name, email: data.email, avatar: data.avatar };
    if (payload.password) {
      localUsers[idx].password = payload.password;
    }
    localStorage.setItem("users", JSON.stringify(localUsers));
  }

  return { user: { id: data._id, name: data.name, email: data.email, avatar: data.avatar }, offline: false };
};

// ----------------------------------------------------
// BOOKMARKS APIs
// ----------------------------------------------------

export const getBookmarks = async (userId) => {
  const isOnline = await checkBackendStatus();
  if (!isOnline) {
    // Read from localStorage
    const key = `bookmarks_${userId || "guest"}`;
    const stored = localStorage.getItem(key) || "[]";
    return JSON.parse(stored);
  }

  // Fetch from Express Server
  const res = await fetch(`${API_BASE}/bookmarks`, {
    method: "GET",
    headers: getHeaders(userId)
  });
  if (!res.ok) {
    throw new Error("Failed to fetch bookmarks from server");
  }
  return await res.json();
};

export const addBookmark = async (bookmark, userId) => {
  const isOnline = await checkBackendStatus();
  if (!isOnline) {
    // Add to localStorage
    const key = `bookmarks_${userId || "guest"}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const newB = { id: Date.now(), ...bookmark, favorite: false };
    const updated = [newB, ...stored];
    localStorage.setItem(key, JSON.stringify(updated));
    return newB;
  }

  // Save to Express Server
  const res = await fetch(`${API_BASE}/bookmarks`, {
    method: "POST",
    headers: getHeaders(userId),
    body: JSON.stringify(bookmark)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add bookmark");
  return data;
};

export const deleteBookmark = async (id, userId) => {
  const isOnline = await checkBackendStatus();
  if (!isOnline) {
    // Delete from localStorage
    const key = `bookmarks_${userId || "guest"}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = stored.filter(b => b.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    return;
  }

  // Delete from Express Server
  // Note: Local storage IDs are numeric timestamps, database IDs are MongoDB ObjectIds.
  // We try fetching or handle error gracefully.
  const res = await fetch(`${API_BASE}/bookmarks/${id}`, {
    method: "DELETE",
    headers: getHeaders(userId)
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to delete bookmark");
  }
};

export const toggleFavorite = async (id, currentFavoriteState, userId) => {
  const isOnline = await checkBackendStatus();
  if (!isOnline) {
    // Toggle in localStorage
    const key = `bookmarks_${userId || "guest"}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = stored.map(b => b.id === id ? { ...b, favorite: !b.favorite } : b);
    localStorage.setItem(key, JSON.stringify(updated));
    return;
  }

  // Update on Express Server
  const res = await fetch(`${API_BASE}/bookmarks/${id}`, {
    method: "PUT",
    headers: getHeaders(userId),
    body: JSON.stringify({ favorite: !currentFavoriteState })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update favorite status");
  return data;
};
