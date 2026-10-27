// --- DOM ELEMENTS ---
const postBtn = document.getElementById('add-post-btn');
const postText = document.getElementById('post-text');
const mediaInput = document.getElementById('media-input');
const feedContainer = document.getElementById('feed-container');
const imagePreview = document.getElementById('image-preview');
const previewImg = document.getElementById('preview-img');
const removeImgBtn = document.getElementById('remove-img-btn');

let selectedImageSrc = null;

// Image Input Preview Event
mediaInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    selectedImageSrc = URL.createObjectURL(file);
    previewImg.src = selectedImageSrc;
    imagePreview.style.display = 'block';
  }
});

removeImgBtn.addEventListener('click', function() {
  selectedImageSrc = null;
  mediaInput.value = '';
  imagePreview.style.display = 'none';
});

// Add New Post Function
postBtn.addEventListener('click', function() {
  const text = postText.value.trim();

  if (!text && !selectedImageSrc) {
    alert("Please write something or attach an image.");
    return;
  }

  // Create Post Card HTML
  const article = document.createElement('article');
  article.className = 'card post-card';

  const imageMarkup = selectedImageSrc 
    ? `<img src="${selectedImageSrc}" class="post-media">` 
    : '';

  article.innerHTML = `
    <header class="post-header">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Wasif" class="avatar-sm">
      <div class="post-meta">
        <h4 class="author-name">Wasif</h4>
        <span class="post-time">Just now</span>
      </div>
    </header>

    <div class="post-body">
      <p>${text}</p>
      ${imageMarkup}
    </div>

    <footer class="post-footer">
      <div class="post-stats-bar">
        <span class="likes-count"><i class="fa-solid fa-heart text-red"></i> <span class="likes-num">0</span> Likes</span>
      </div>
      <div class="post-action-buttons">
        <button class="action-btn" onclick="toggleLike(this)">
          <i class="fa-regular fa-heart"></i> Like
        </button>
        <button class="action-btn"><i class="fa-regular fa-comment"></i> Comment</button>
      </div>
      <div class="comments-section">
        <div class="comment-field">
          <input type="text" placeholder="Write a comment..." onkeydown="addComment(event, this)">
        </div>
        <ul class="comments-list"></ul>
      </div>
    </footer>
  `;

  feedContainer.prepend(article);

  // Reset form
  postText.value = '';
  mediaInput.value = '';
  selectedImageSrc = null;
  imagePreview.style.display = 'none';
});

// Like Button Toggle
function toggleLike(btn) {
  const postCard = btn.closest('.post-card');
  const likesNumEl = postCard.querySelector('.likes-num');
  let currentLikes = parseInt(likesNumEl.innerText);

  if (btn.classList.contains('liked')) {
    btn.classList.remove('liked');
    btn.innerHTML = '<i class="fa-regular fa-heart"></i> Like';
    likesNumEl.innerText = currentLikes - 1;
  } else {
    btn.classList.add('liked');
    btn.innerHTML = '<i class="fa-solid fa-heart text-red"></i> Liked';
    likesNumEl.innerText = currentLikes + 1;
  }
}

// Comment Add Handler
function addComment(event, input) {
  if (event.key === 'Enter' && input.value.trim() !== '') {
    const commentsList = input.closest('.comments-section').querySelector('.comments-list');
    const li = document.createElement('li');
    li.className = 'comment-item';
    li.innerHTML = `<strong>Wasif:</strong> ${input.value.trim()}`;
    commentsList.appendChild(li);
    input.value = '';
  }
}

// Friend Request Actions
function acceptReq(btn) {
  const reqItem = btn.closest('.req-item');
  reqItem.innerHTML = `<span style="font-size:12px; color:var(--text-muted);">Request accepted!</span>`;
}

function removeReq(btn) {
  const reqItem = btn.closest('.req-item');
  reqItem.remove();
}

// WebSocket Simulation (Notification update)
setInterval(function() {
  const notifBadge = document.getElementById('notif-count');
  let count = parseInt(notifBadge.innerText);
  notifBadge.innerText = count + 1;
}, 15000);

// Privacy Modal Controls
const modal = document.getElementById('privacy-modal');
document.getElementById('privacy-btn').onclick = () => modal.style.display = 'flex';
document.getElementById('close-modal').onclick = () => modal.style.display = 'none';
document.getElementById('save-privacy-btn').onclick = () => modal.style.display = 'none';