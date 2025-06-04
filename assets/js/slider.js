const items = document.querySelectorAll('.gallery-item');
        let current = 0;

        function showItem(index) {
          items.forEach((img, i) => {
            img.classList.toggle('active', i === index);
            img.style.display = i === index ? 'block' : 'none';
          });
        }

        document.querySelector('.gallery-prev').onclick = () => {
          current = (current - 1 + items.length) % items.length;
          showItem(current);
        };
        document.querySelector('.gallery-next').onclick = () => {
          current = (current + 1) % items.length;
          showItem(current);
        };

        showItem(current);