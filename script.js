let contacts = JSON.parse(localStorage.getItem("contacts")) || [];


const table = document.querySelector("table");
const form = document.getElementById("contactForm");
const searchInput = document.getElementById("search");
const contactList = document.getElementById("contactList");


function saveData() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}


function showContacts(list = contacts) {

  contactList.innerHTML = "";

  if (list.length === 0) {
    contactList.innerHTML = `
      <tr class="hover:bg-slate-700/50 transition-colors">
        <td class="py-3 px-4 text-slate-300 italic text-center" colspan="4">Belum ada data...</td>
      </tr>
    `;
    return;
  }

  list.forEach(contact => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-700/50 transition-colors border-b border-slate-700";

    tr.innerHTML = `
      <td class="py-3 px-4 text-slate-300">${contact.nama}</td>
      <td class="py-3 px-4 text-slate-300">${contact.telp}</td>
      <td class="py-3 px-4 text-slate-300">${contact.email}</td>
      <td class="py-3 px-4 text-center">
        <button onclick="editContact(${contact.id})"
          class="bg-green-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-500 transition-colors text-sm">
          Edit
        </button>
        <button onclick="deleteContact(${contact.id})"
          class="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 transition-colors text-sm">
          Hapus
        </button>
      </td>
    `;

    contactList.appendChild(tr);
  });
}


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const namaInput = document.getElementById("nama");
  const telpInput = document.getElementById("telp");
  const emailInput = document.getElementById("email");

  const nama = namaInput.value.trim();
  const telp = telpInput.value.trim();
  const email = emailInput.value.trim();


  if (!nama || !telp || !email) {
    alert("Semua field wajib diisi!");
    return;
  }

  contacts.push({
    id: Date.now(),
    nama,
    telp,
    email
  });

  saveData();
  showContacts();
  form.reset();
});


function editContact(id) {
  const c = contacts.find(c => c.id === id);
  if (!c) return;

  const newNama = prompt("Edit Nama:", c.nama);
  const newTelp = prompt("Edit Telp:", c.telp);
  const newEmail = prompt("Edit Email:", c.email);


  if (newNama !== null) c.nama = newNama;
  if (newTelp !== null) c.telp = newTelp;
  if (newEmail !== null) c.email = newEmail;

  saveData();
  showContacts();
}


function deleteContact(id) {
  if (!confirm("Yakin hapus kontak?")) return;

  contacts = contacts.filter(c => c.id !== id);
  saveData();
  showContacts();
}


searchInput.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();
  const filtered = contacts.filter(c =>
    c.nama.toLowerCase().includes(keyword) ||
    c.telp.toLowerCase().includes(keyword) ||
    c.email.toLowerCase().includes(keyword)
  );
  showContacts(filtered);
});


showContacts();
