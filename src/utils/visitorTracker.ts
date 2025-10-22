export const trackVisitor = () => {
  const totalVisits = parseInt(localStorage.getItem("totalVisits") || "0");
  const uniqueVisitors = JSON.parse(localStorage.getItem("uniqueVisitors") || "[]");

  const visitorId = localStorage.getItem("visitorId");

  // Unique visitor tracking
  if (!visitorId) {
    const newId = `VIS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    localStorage.setItem("visitorId", newId);
    uniqueVisitors.push(newId);
    localStorage.setItem("uniqueVisitors", JSON.stringify(uniqueVisitors));
  }

  // Increment total visits
  localStorage.setItem("totalVisits", (totalVisits + 1).toString());

  // Active user tracking (resets when tab closed)
  sessionStorage.setItem("activeVisitor", "true");
};

export const getVisitorStats = () => {
  const totalVisits = parseInt(localStorage.getItem("totalVisits") || "0");
  const uniqueVisitors = JSON.parse(localStorage.getItem("uniqueVisitors") || "[]");
  const activeVisitors = sessionStorage.getItem("activeVisitor") ? 1 : 0;

  return {
    totalVisits,
    uniqueVisitorsCount: uniqueVisitors.length,
    activeVisitors,
  };
};
