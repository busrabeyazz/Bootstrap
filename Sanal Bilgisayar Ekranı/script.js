//Güç tuşu ile bilgisayarı açma
document.getElementById('powerButton').addEventListener('click', function() {
    document.getElementById('powerScreen').classList.add('d-none');
    document.getElementById('loginScreen').classList.remove('d-none');
});
//Progress bar 
function showLoadingScreen() {
    var loadingScreen = document.getElementById('loadingScreen');
    var loadingBar = document.getElementById('loadingBar');
    var width = 0;

    loadingScreen.classList.remove('d-none');

    var interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('d-none');
                document.getElementById('desktop').classList.remove('d-none');
            }, 500); 
        } else {
            width += 10;
            loadingBar.style.width = width + '%';
        }
    }, 200);
}
//Kullanıcı bilgileri ile giriş yapma
function checkPassword() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    if (username === 'busra' && password === 'beyaz') {
        document.getElementById('loginScreen').classList.add('d-none');
        showLoadingScreen();
    } else {
        document.getElementById('errorMessage').classList.remove('d-none');
    }
}

//Drop-up menu 
function toggleStartMenu() {
    var startMenu = document.getElementById('startMenu');
    startMenu.classList.toggle('d-none');
}
//Bilgisayarı kapatma tuşu
function shutdown() {
    var shutdownMessage = document.getElementById('shutdownMessage');
    var powerScreen = document.getElementById('powerScreen');
    var desktop = document.getElementById('desktop');

    desktop.classList.add('d-none');
    shutdownMessage.classList.remove('d-none');

    setTimeout(() => {
        shutdownMessage.classList.add('d-none');
        powerScreen.classList.remove('d-none');
    }, 3000); // 3 saniye sonra kapatma mesajını kaldır ve başlangıç ekranına dön
}

// Resimleri büyük modal ile gösterme
document.querySelectorAll('.img-clickable').forEach(img => {
    img.addEventListener('click', function() {
        var imageDetailModal = document.getElementById('imageDetailModal');
        var detailImage = document.getElementById('detailImage');
        detailImage.src = this.src;
        var modal = new bootstrap.Modal(imageDetailModal);
        modal.show();
    });
});
//Saat ve Tarih göstergeleri 
function updateTime() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const dateString = now.toLocaleDateString();

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = dateString;
}

setInterval(updateTime, 1000);
updateTime();

const folders = document.querySelectorAll('.folder');

folders.forEach(folder => {
    folder.addEventListener('click', function() {
        const folderName = this.textContent.trim();
        const folderIcon = this.querySelector('i').className;

        const toolbarButton = document.createElement('button');
        toolbarButton.classList.add('btn', 'toolbar-button');
        toolbarButton.id = folderName.replace(/\s+/g, '-') + '-button';
        toolbarButton.innerHTML = `<i class="${folderIcon}"></i>`;

        // Yeni oluşturulan div'e ekleme klasör ikonlarını ekleme fonksiyonu
        const folderButtonsDiv = document.getElementById('folderButtons');
        folderButtonsDiv.appendChild(toolbarButton);

        const modalId = this.getAttribute('data-bs-target');
        const modal = document.querySelector(modalId);
        modal.addEventListener('hidden.bs.modal', function() {
            toolbarButton.remove();
        }, { once: true });
    });
});

