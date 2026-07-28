/* Dashboard UI — empty states, leads CRM, VSM row actions */
(function (global) {
  const LEADS_KEY = "rg-dashboard-leads";

  function loadLeads() {
    try {
      const raw = localStorage.getItem(LEADS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveLeads(leads) {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderLeadsTable() {
    const tbody = document.getElementById("leads-table-body");
    const stats = {
      prospects: document.getElementById("leads-stat-prospects"),
      interactions: document.getElementById("leads-stat-interactions"),
      opportunities: document.getElementById("leads-stat-opportunities"),
      pending: document.getElementById("leads-stat-pending"),
    };
    if (!tbody) return;

    const leads = loadLeads();
    tbody.innerHTML = "";

    if (!leads.length) {
      tbody.innerHTML =
        '<tr><td colspan="6" class="muted" style="padding:16px;text-align:center;">Sin prospectos registrados. Agrega tu primer contacto abajo.</td></tr>';
    } else {
      leads.forEach((lead, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${escapeHtml(lead.nombre)}</td>
          <td>${escapeHtml(lead.empresa)}</td>
          <td>${escapeHtml(lead.cargo)}</td>
          <td><span class="badge info">${escapeHtml(lead.estado)}</span></td>
          <td>${escapeHtml(lead.ultimaInteraccion)}</td>
          <td><button type="button" class="btn ghost" data-lead-remove="${index}">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
      });
    }

    if (stats.prospects) stats.prospects.textContent = String(leads.length);
    if (stats.interactions) stats.interactions.textContent = leads.length ? String(leads.length * 2) : "0";
    if (stats.opportunities) stats.opportunities.textContent = leads.length ? String(Math.max(1, Math.floor(leads.length / 2))) : "0";
    if (stats.pending) stats.pending.textContent = leads.length ? String(Math.max(0, leads.length - 1)) : "0";
  }

  function initLeadsSection() {
    const form = document.getElementById("leads-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const lead = {
        nombre: document.getElementById("lead-nombre")?.value.trim() || "",
        empresa: document.getElementById("lead-empresa")?.value.trim() || "",
        cargo: document.getElementById("lead-cargo")?.value.trim() || "",
        estado: document.getElementById("lead-estado")?.value.trim() || "Seguimiento",
        ultimaInteraccion: document.getElementById("lead-interaccion")?.value.trim() || "Hoy",
      };
      if (!lead.nombre) return;
      const leads = loadLeads();
      leads.push(lead);
      saveLeads(leads);
      form.reset();
      renderLeadsTable();
    });

    document.getElementById("leads-table-body")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lead-remove]");
      if (!btn) return;
      const index = Number(btn.getAttribute("data-lead-remove"));
      const leads = loadLeads();
      leads.splice(index, 1);
      saveLeads(leads);
      renderLeadsTable();
    });

    renderLeadsTable();
  }

  global.DashboardUI = {
    initLeadsSection,
    renderLeadsTable,
    loadLeads,
  };
})(window);
