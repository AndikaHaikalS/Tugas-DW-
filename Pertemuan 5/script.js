class Buku {
    constructor(judul, penulis, tahun) {
        this.judul = judul;
        this.penulis = penulis;
        this.tahun = tahun;
    }

    tampilkanInfo() {
        return `${this.judul} oleh ${this.penulis} (${this.tahun})`;
    }
}


let daftarBuku = [];
let bukuFavorit = [];


const formTambahBuku = document.getElementById('form-tambah-buku');
const divDaftarBuku = document.getElementById('daftar-buku');
const divBukuFavorit = document.getElementById('buku-favorit');
const btnSimpanNama = document.getElementById('btnSimpanNama');
const salamPengguna = document.getElementById('salamPengguna');


formTambahBuku.addEventListener('submit', function (e) {
    e.preventDefault();
    tambahBuku();
});


function tambahBuku() {
    const judul = document.getElementById('judul').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = document.getElementById('tahun').value;

    
    if (judul === '' || penulis === '' || tahun === '') {
        alert('Semua kolom harus diisi!');
        return;
    }

    const bukuBaru = new Buku(judul, penulis, tahun);
    daftarBuku.push(bukuBaru);
    simpanDaftarBuku(); 
    tampilkanDaftarBuku();
    formTambahBuku.reset();
}


function simpanDaftarBuku() {
    localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
}


function tampilkanDaftarBuku() {
    divDaftarBuku.innerHTML = '';

    daftarBuku.forEach((buku, index) => {
        const divBuku = document.createElement('div');
        divBuku.classList.add('buku');
        divBuku.innerHTML = `
            <p>${buku.tampilkanInfo()}</p>
            <button onclick="tambahKeFavorit(${index})">Tambah ke Favorit</button>
        `;
        divDaftarBuku.appendChild(divBuku);
    });
}


function tambahKeFavorit(index) {
    const buku = daftarBuku[index];

    
    const sudahAda = bukuFavorit.some(favBuku => {
        return favBuku.judul === buku.judul &&
               favBuku.penulis === buku.penulis &&
               favBuku.tahun === buku.tahun;
    });

    if (sudahAda) {
        alert('Buku ini sudah ada di daftar favorit!');
        return;
    }

    bukuFavorit.push(buku);
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}


function simpanBukuFavorit() {
    localStorage.setItem('bukuFavorit', JSON.stringify(bukuFavorit));
}


function tampilkanBukuFavorit() {
    divBukuFavorit.innerHTML = '';

    bukuFavorit.forEach((buku, index) => {
        const divBuku = document.createElement('div');
        divBuku.classList.add('buku');
        divBuku.innerHTML = `
            <p>${buku.tampilkanInfo()}</p>
            <button onclick="hapusDariFavorit(${index})">Hapus</button>
        `;
        divBukuFavorit.appendChild(divBuku);
    });
}


function hapusDariFavorit(index) {
    bukuFavorit.splice(index, 1);
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}


btnSimpanNama.addEventListener('click', function () {
    const nama = document.getElementById('namaPengguna').value;
    if (nama === '') {
        alert('Masukkan nama Anda!');
        return;
    }
    sessionStorage.setItem('namaPengguna', nama);
    tampilkanNamaPengguna();
    document.getElementById('namaPengguna').value = '';
});


function tampilkanNamaPengguna() {
    const nama = sessionStorage.getItem('namaPengguna');

    if (nama) {
        salamPengguna.textContent = `Selamat datang, ${nama}!`;
    } else {
        salamPengguna.textContent = '';
    }
}


window.onload = function () {
    
    if (localStorage.getItem('daftarBuku')) {
        const storedBooks = JSON.parse(localStorage.getItem('daftarBuku'));
        
        daftarBuku = storedBooks.map(book => {
            return new Buku(book.judul, book.penulis, book.tahun);
        });
        tampilkanDaftarBuku();
    }

    
    if (localStorage.getItem('bukuFavorit')) {
        const storedFavorites = JSON.parse(localStorage.getItem('bukuFavorit'));
        
        bukuFavorit = storedFavorites.map(book => {
            return new Buku(book.judul, book.penulis, book.tahun);
        });
        tampilkanBukuFavorit();
    }

    
    tampilkanNamaPengguna();
};

