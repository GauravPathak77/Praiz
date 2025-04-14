// Sign Up Form
document.addEventListener('DOMContentLoaded', () => {
  const emailForm = document.getElementById('emailForm');
  if (emailForm) {
      emailForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          const email = document.getElementById('emailInput').value;

          try {
              const response = await fetch('/user/emails', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 'email': email }),
              });

              const data = await response.json();
              console.log(data.message);
          } catch (error) {
              console.error('Error:', error);
          }
      });
  }

  const askDoubtButton = document.getElementById('ask-doubt');
  const submitReviewButton = document.getElementById('submit-review');
  const doubtSection = document.getElementById('doubt-section');
  const reviewSection = document.getElementById('review-section');
  const submitDoubtButton = document.getElementById('submit-doubt');
  const submitReviewBtn = document.getElementById('submit-review-btn');
  const ratingStars = document.querySelectorAll('#rating span');
  const modal = document.getElementById('custom-alert');
  const modalMessage = document.getElementById('modal-message');
  const modalClose = document.getElementById('modal-close');

  if (submitDoubtButton) {
      submitDoubtButton.addEventListener('click', async () => {
          const doubtText = document.getElementById('doubt-text').value;
          if (doubtText === "") {
              showModal("Invalid Doubt");
          } else {
              const response = await fetch('/ask-doubt', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 'doubt': doubtText })
              });
              const result = await response.json();
              console.log("Result: ", result);
              showModal(result.message);
              document.getElementById('doubt-text').value = '';
              doubtSection.classList.add('hidden');
          }
      });
  }

  let selectedRating = 0;

  ratingStars.forEach(star => {
      star.addEventListener('click', () => {
          selectedRating = star.getAttribute('data-star');
          ratingStars.forEach((s, index) => {
              if (index < selectedRating) {
                  s.querySelector('i').classList.remove('fa-regular');
                  s.querySelector('i').classList.add('fa-solid');
              } else {
                  s.querySelector('i').classList.remove('fa-solid');
                  s.querySelector('i').classList.add('fa-regular');
              }
          });
      });
  });

  if (submitReviewBtn) {
      submitReviewBtn.addEventListener('click', async () => {
          const reviewText = document.getElementById('review-text').value;
          if (reviewText === "") {
              showModal("Invalid Review");
          } else {
              const response = await fetch('/submit-review', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: `rating=${selectedRating}&review=${encodeURIComponent(reviewText)}`
              });
              const result = await response.json();
              showModal(result.message);
              document.getElementById('review-text').value = '';
              
              // Reset the stars
              selectedRating = 0;
              ratingStars.forEach(star => {
                  star.querySelector('i').classList.remove('fa-solid');
                  star.querySelector('i').classList.add('fa-regular');
              });

              reviewSection.classList.add('hidden');
          }
      });
  }

  function showModal(message) {
      modalMessage.textContent = message;
      modal.classList.remove('hidden');
  }

  modalClose.addEventListener('click', hideModal);

  function hideModal() {
      modal.classList.add('hidden');
  }

  askDoubtButton?.addEventListener('click', () => {
      doubtSection?.classList?.toggle('hidden');
  });

  submitReviewButton?.addEventListener('click', () => {
      reviewSection?.classList?.toggle('hidden');
  });
});
