const principalBody = document.getElementById('principal-container');
const loading = document.getElementById('loader');
const title = document.getElementById('title');
const closeBtn = document.getElementById('closeBtn');
const mealDiv = document.getElementById('meal-div');
const containerMeals = document.getElementById('container-meals-data');

closeBtn.addEventListener('click', () => {
  mealDiv.style.height = '1%';
  containerMeals.classList.replace('fadeIn', 'fadeOut');

  setTimeout(() => {
    containerMeals.classList.add('hidden');
  }, 700);
});

const clearDivs = () => {
  principalBody.innerHTML = '';
};

const showLoader = () => {
  loading.classList.add('show');
  principalBody.classList.add('hidden');
};

const hiddenLoader = () => {
  loading.classList.remove('show');
  principalBody.classList.add('houdini');
  principalBody.classList.remove('hidden');
};

async function getMealSelected(id) {
  const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const urlfinal = url + id;
  try {
    showLoader();
    const res = await fetch(urlfinal);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getCategorySelected(category) {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const urlfinal = url + category;
  title.innerText = category;
  try {
    showLoader();
    const res = await fetch(urlfinal);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getCategory() {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  try {
    showLoader();
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderMealsCategory(category) {
  const res = await getCategorySelected(category);
  clearDivs();
  title.innerText = category;
  res.meals.forEach((meal) => {
    const cardHtml = `
          <div class="principal__card-item shadow">
              <img src="${meal.strMealThumb}" alt="" class="principal__card-img-meals">
          <div class="principal__card-item-back">
            <p class="principal__card-item-p">${meal.strMeal}</p>
          </div>
          </div>

        `;

    principalBody.insertAdjacentHTML('beforeend', cardHtml);
  });

  const cards = document.querySelectorAll('.principal__card-item');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      mealDiv.style.height = '100%';
      containerMeals.classList.replace('fadeOut', 'fadeIn');
      containerMeals.classList.remove('hidden');
    });
  });
  hiddenLoader();
}

async function renderCategories() {
  const res = await getCategory();
  res.categories.forEach((category) => {
    const cardHtml = `
          <div class="principal__card-item shadow" id="${category.strCategory}">
              <img src="${category.strCategoryThumb}" alt="" class="principal__card-img">
          <div class="principal__card-item-back">
            <p class="principal__card-item-p">${category.strCategory}</p>
          </div>
          </div>

        `;

    principalBody.insertAdjacentHTML('beforeend', cardHtml);
  });

  const cards = document.querySelectorAll('.principal__card-item');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      renderMealsCategory(card.id);
    });
  });

  hiddenLoader();
}
renderCategories();
