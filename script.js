document.querySelector('.menu-icon').addEventListener('click', function() {
    const menuPanel = document.querySelector('.menu-panel');
    if (menuPanel.style.left === '0px') {
        menuPanel.style.left = '-100%';
    } else {
        menuPanel.style.left = '0px';
    }
});

document.querySelector('.close-menu').addEventListener('click', function() {
    document.querySelector('.menu-panel').style.left = '-100%';
});

document.querySelector('.search-btn').addEventListener('click', function() {
    const searchBox = document.querySelector('.search-box');
    if (searchBox.style.display === 'block') {
        searchBox.style.display = 'none';
    } else {
        searchBox.style.display = 'block';
    }
});

const posts = [
    {
        title: "Nature's Beauty",
        story: "This photo was taken during my journey to the heart of nature...",
        equipment: "Camera: Nikon D850, Lens: Nikkor 24-70mm f/2.8",
        imageUrl: "sources/contents/2021-05-01_nature.webp"
    },
    {
        title: "Mountain Adventure",
        story: "Exploring the mountains is always an exhilarating experience...",
        equipment: "Camera: Canon EOS 5D Mark IV, Lens: Canon EF 24-105mm f/4L",
        imageUrl: "sources/contents/2021-06-15_mountains.webp"
    },
    // Daha fazla gönderi eklenebilir...
];

let currentIndex = 0;

function displayPost(index) {
    const post = posts[index];
    const postContainer = document.querySelector('.post-container');
    postContainer.innerHTML = `
        <img src="${post.imageUrl}" alt="${post.title}" class="post-image">
        <div class="post-content">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-story">${post.story}</p>
            <div class="post-equipment">
                <p>${post.equipment}</p>
            </div>
        </div>
    `;
}

function prevPost() {
    if (currentIndex > 0) {
        currentIndex--;
        displayPost(currentIndex);
    }
}

function nextPost() {
    if (currentIndex < posts.length - 1) {
        currentIndex++;
        displayPost(currentIndex);
    }
}

document.querySelector('.prev-btn').addEventListener('click', prevPost);
document.querySelector('.next-btn').addEventListener('click', nextPost);

// İlk gönderiyi ekranda göster
displayPost(currentIndex);

document.querySelector('.search-box').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPosts = posts.filter(post => {
        return post.title.toLowerCase().includes(searchTerm) ||
               post.story.toLowerCase().includes(searchTerm) ||
               post.equipment.toLowerCase().includes(searchTerm);
    });

    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = ''; // Önceki sonuçları temizliyoruz

    if (filteredPosts.length > 0) {
        searchResults.style.display = 'block'; // Sonuçları göster
        filteredPosts.forEach((post, index) => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.textContent = post.title;
            resultItem.onclick = function() {
                displayPost(index);
                searchResults.style.display = 'none'; // Sonuçları gizle
            };
            searchResults.appendChild(resultItem);
        });
    } else {
        searchResults.style.display = 'none'; // Sonuç yoksa gizle
    }
});



document.querySelector('.search-results').addEventListener('change', function(e) {
    const index = e.target.value;
    if (index >= 0 && index < posts.length) {
        displayPost(index);
    }
});

