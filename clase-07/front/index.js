async function fetchData(url, elementId, label) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error en ${url}: ${res.status}`);
    const data = await res.json();

    // Si existe data.result usamos eso, si no, data directo
    const items = Array.isArray(data.result) ? data.result : data;

    const list = document.getElementById(elementId);
    list.innerHTML = "";

    items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="emoji">${label(item).emoji}</span> ${label(item).text}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    document.getElementById(elementId).innerHTML =
      `<li style="color:red;">❌ Error cargando datos</li>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData("http://localhost:8080/api/users/", "users-list", (u) => ({
    emoji: "👤",
    text: `${u.name} (${u.email}) - rol: ${u.role}`
  }));

  fetchData("http://localhost:8080/api/business", "business-list", (b) => ({
    emoji: "🏢",
    text: `${b.name || "Sin nombre"}`
  }));

  fetchData("http://localhost:8080/api/orders", "orders-list", (o) => ({
    emoji: "📦",
    text: `Orden #${o.number} - ${o.business.name} - ${o.user.email}`
  }));
});
