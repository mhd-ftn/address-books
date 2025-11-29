let contacts = [
];

const table = document.querySelector("table");
const searchInput = document.querySelector("input[type='text']");
const addButton = document.querySelector("button");

function showContacts(list = contacts) {
  const oldTbody = document.querySelector("tbody");
  if (oldTbody) oldTbody.remove();

  const tbody = document.createElement("tbody");
  tbody.classList.add("bg-white", "text-black");

  list.forEach(contact => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="py-3 px-4 border text-center">${contact.nama}</td>
      <td class="py-3 px-4 border text-center">${contact.telp}</td>
      <td class="py-3 px-4 border text-center">
          <button class="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
                  onclick="editContact(${contact.id})">Edit</button>
          <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  onclick="deleteContact(${contact.id})">Hapus</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
}

addButton.addEventListener("click", () => {
  const nama = prompt("Masukkan nama kontak:");
  const telp = prompt("Masukkan nomor telepon:");

  if (nama && telp) {
    const newContact = {
      id: Date.now(),
      nama,
      telp
    };

    contacts.push(newContact);
    showContacts();
  }
});

function editContact(id) {
  const contact = contacts.find(c => c.id === id);

  if (!contact) return;

  const newNama = prompt("Edit nama:", contact.nama);
  const newTelp = prompt("Edit nomor telepon:", contact.telp);

  if (newNama && newTelp) {
    contact.nama = newNama;
    contact.telp = newTelp;
    showContacts();
  }
}

function deleteContact(id) {
  const confirmDelete = confirm("Yakin ingin menghapus kontak ini?");
  if (confirmDelete) {
    contacts = contacts.filter(c => c.id !== id);
    showContacts();
  }
}

searchInput.addEventListener("keyup", (e) => {
  const keyword = e.target.value.toLowerCase();

  const filtered = contacts.filter(c =>
    c.nama.toLowerCase().includes(keyword) ||
    c.telp.toLowerCase().includes(keyword)
  );

  showContacts(filtered);
});

showContacts();
