const mobileList = document.getElementById('mobile-list');
const modal = document.getElementById('mobileModal');
const form = document.getElementById('mobileForm');

async function loadMobiles() {
    const res = await fetch('/api/mobiles');
    const data = await res.json();
    mobileList.innerHTML = data.map((m, index) => `
        <tr class="${index % 2 !== 0 ? 'bg-gray' : ''}">
            <td>${m.name}</td>
            <td>${m.price}</td>
            <td>${m.ram}</td>
            <td>${m.storage}</td>
            <td><button class="btn-edit" onclick='openEditModal(${JSON.stringify(m)})'>Edit</button></td>
            <td><button class="btn-delete" onclick="deleteMobile(${m.id})">Delete</button></td>
        </tr>
    `).join('');
}

function openModal() {
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = "Add New Mobile";
    form.reset();
    document.getElementById('mobileId').value = "";
}

function closeModal() { modal.style.display = 'none'; }

function openEditModal(m) {
    openModal();
    document.getElementById('modalTitle').innerText = "Edit Mobile";
    document.getElementById('mobileId').value = m.id;
    document.getElementById('name').value = m.name;
    document.getElementById('price').value = m.price;
    document.getElementById('ram').value = m.ram;
    document.getElementById('storage').value = m.storage;
}

form.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('mobileId').value;
    const data = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        ram: document.getElementById('ram').value,
        storage: document.getElementById('storage').value
    };
    await fetch(id ? `/api/mobiles/${id}` : '/api/mobiles', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    closeModal();
    loadMobiles();
};

async function deleteMobile(id) {
    if(confirm('Delete this?')) {
        await fetch(`/api/mobiles/${id}`, { method: 'DELETE' });
        loadMobiles();
    }
}

loadMobiles();