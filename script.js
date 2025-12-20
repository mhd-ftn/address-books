// =====================
// LOCAL STORAGE
// =====================
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Elemen DOM
const table = document.querySelector("table");
const form = document.getElementById("contactForm");
const searchInput = document.getElementById("search");

// Simpan ke LocalStorage
function saveData() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// =====================
// READ (TAMPILKAN DATA)
// =====================
function showContacts(list = contacts) {
  const oldTbody = table.querySelector("tbody");
  if (oldTbody) oldTbody.remove();

  const tbody = document.createElement("tbody");
  tbody.className = "bg-white text-black";

  list.forEach(contact => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="py-2 px-3 border text-center">${contact.nama}</td>
      <td class="py-2 px-3 border text-center">${contact.telp}</td>
      <td class="py-2 px-3 border text-center">${contact.email}</td>
      <td class="py-2 px-3 border text-center">${contact.lokasi}</td>
      <td class="py-2 px-3 border text-center">
        <button onclick="editContact(${contact.id})"
          class="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600">
          Edit
        </button>
        <button onclick="deleteContact(${contact.id})"
          class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
          Hapus
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
}

// =====================
// CREATE + VALIDATION (FIX)
// =====================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const namaInput = document.getElementById("nama");
  const telpInput = document.getElementById("telp");
  const emailInput = document.getElementById("email");
  const lokasiInput = document.getElementById("lokasi");

  const nama = namaInput.value.trim();
  const telp = telpInput.value.trim();
  const email = emailInput.value.trim();
  const lokasi = lokasiInput.value.trim();

  if (!nama || !telp || !email || !lokasi) {
    alert("Semua field wajib diisi!");
    return;
  }

  contacts.push({
    id: Date.now(),
    nama,
    telp,
    email,
    lokasi
  });

  saveData();
  showContacts();
  form.reset();
});


// =====================
// EDIT
// =====================
function editContact(id) {
  const c = contacts.find(c => c.id === id);
  if (!c) return;

  c.nama = prompt("Edit Nama:", c.nama);
  c.telp = prompt("Edit Telp:", c.telp);
  c.email = prompt("Edit Email:", c.email);
  c.lokasi = prompt("Edit Lokasi:", c.lokasi);

  saveData();
  showContacts();
}

// =====================
// DELETE
// =====================
function deleteContact(id) {
  if (!confirm("Yakin hapus kontak?")) return;

  contacts = contacts.filter(c => c.id !== id);
  saveData();
  showContacts();
}

// =====================
// SEARCH
// =====================
searchInput.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();
  const filtered = contacts.filter(c =>
    c.nama.toLowerCase().includes(keyword) ||
    c.telp.toLowerCase().includes(keyword)
  );
  showContacts(filtered);
});

// Tampilkan saat load
showContacts();
