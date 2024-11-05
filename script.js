document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const namaPenggunaInput = document.getElementById('namaPengguna');
    const btnSimpanNama = document.getElementById('btnSimpanNama');
    const salamPengguna = document.getElementById('salamPengguna');
    const formTambahBuku = document.getElementById('form-tambah-buku');
    const daftarBukuContainer = document.getElementById('daftar-buku');
    const bukuFavoritContainer = document.getElementById('buku-favorit');

    // Load saved name from localStorage
    const savedName = localStorage.getItem('namaPengguna');
    if (savedName) {
        tampilkanSalam(savedName);
    }

    // Event listener for saving name
    btnSimpanNama.addEventListener('click', function() {
        const namaPengguna = namaPenggunaInput.value.trim();
        if (namaPengguna) {
            localStorage.setItem('namaPengguna', namaPengguna);
            tampilkanSalam(namaPengguna);
            namaPenggunaInput.value = '';
        } else {
            alert("Silakan masukkan nama Anda.");
        }
    });

    // Function to display the greeting
    function tampilkanSalam(nama) {
        salamPengguna.textContent = `Selamat datang, ${nama}!`;
    }

    // Event listener for adding a book
    formTambahBuku.addEventListener('submit', function(event) {
        event.preventDefault();

        const judul = document.getElementById('judul').value.trim();
        const penulis = document.getElementById('penulis').value.trim();
        const tahun = document.getElementById('tahun').value.trim();

        if (judul && penulis && tahun) {
            tambahBuku(judul, penulis, tahun);
            formTambahBuku.reset();
        } else {
            alert("Silakan lengkapi semua kolom.");
        }
    });

    // Function to add a book to the list
    function tambahBuku(judul, penulis, tahun) {
        const bukuDiv = document.createElement('div');
        bukuDiv.classList.add('mb-4', 'p-4', 'bg-purple-600', 'rounded-md', 'shadow-lg', 'text-white');

        bukuDiv.innerHTML = `
            <p><strong>Judul:</strong> ${judul}</p>
            <p><strong>Penulis:</strong> ${penulis}</p>
            <p><strong>Tahun:</strong> ${tahun}</p>
            <button class="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition duration-300">
                Tambah ke Favorit
            </button>
        `;

        // Button to add book to favorites
        const favoriteButton = bukuDiv.querySelector('button');
        favoriteButton.addEventListener('click', function() {
            tambahKeFavorit(judul, penulis, tahun);
            bukuDiv.remove();  // Remove from daftar buku after adding to favorites
        });

        daftarBukuContainer.appendChild(bukuDiv);
    }

    // Function to add a book to favorites
    function tambahKeFavorit(judul, penulis, tahun) {
        const favoritDiv = document.createElement('div');
        favoritDiv.classList.add('mb-4', 'p-4', 'bg-yellow-500', 'text-black', 'rounded-md', 'shadow-lg');

        favoritDiv.innerHTML = `
            <p><strong>Judul:</strong> ${judul}</p>
            <p><strong>Penulis:</strong> ${penulis}</p>
            <p><strong>Tahun:</strong> ${tahun}</p>
        `;

        bukuFavoritContainer.appendChild(favoritDiv);
    }
});
