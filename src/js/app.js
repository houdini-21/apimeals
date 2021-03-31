const principalBody = document.getElementById('principal-container');
const loading = document.getElementById('loader');
const title = document.getElementById('title');
const mealDiv = document.getElementById('meal-div');
const containerMeals = document.getElementById('container-meals-data');
const btnBack = document.getElementById('btnBack');
const btnBackingredients = document.getElementById('btnBackingredients');

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
  console.log(urlfinal);
  try {
    const res = await fetch(urlfinal);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

const renderMeasureAndIngredients = (ingredients, measure) => {
  let temp = '';
  ingredients.forEach((ingredient, indexArray) => {
    temp += `<li>${measure[indexArray] ? measure[indexArray] : ''}  ${
      ingredient ? ingredient : ''
    }</li>`;
  });
  return temp;
};

async function getCategorySelected(category, type) {
  const url =
    'https://www.themealdb.com/api/json/v1/1/filter.php?' + type + '=';
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

async function getCategory(type) {
  const url =
    'https://www.themealdb.com/api/json/v1/1/list.php?' + type + '=list';
  console.log(url);
  try {
    showLoader();
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderMealModal(id) {
  const res = await getMealSelected(id);
  const ingredients = [];
  const quantity = [];
  res.meals.forEach((meal) => {
    for (let item in meal) {
      if (item.includes('Ingredient')) ingredients.push(meal[item]);
      if (item.includes('Measure')) quantity.push(meal[item]);
    }
    const modalTemplate = `
          <span class="principal__meal-close" id="closeBtn">&times;</span>
          <div class="principal__meal-detail">
            <img class="principal__meal-detail-img" src="${
              meal.strMealThumb
            }" alt="" />
            <div class="principal__meal-detail-box">
              <h4 class="principal__meal-detail-title">
                Category:
                <span class="principal__meal-detail-title-light"
                  >${meal.strCategory}</span
                >
              </h4>
              <h4 class="principal__meal-detail-title">
                Area:
                <span class="principal__meal-detail-title-light">${
                  meal.strArea !== null ? meal.strArea : ''
                }</span>
              </h4>
              <h4 class="principal__meal-detail-title">
                Tags: <span class="principal__meal-detail-title-light">${
                  meal.strTags !== null ? meal.strTags : ''
                }</span>
              </h4>
            </div>
          </div>
          <div class="principal__meal-instructions scroll">
            <h2 class="principal__meal-instructions-title">
            ${meal.strMeal}
            </h2>
            <div class="principal__meal-instructions-box">
              <div class="principal__meal-instructions-ingredients">
                <h3 class="principal__meal-instructions-meal-title">
                  Ingredients
                </h3>
                <div class="principal__meal-instructions-list" id="listIngredients">
                ${renderMeasureAndIngredients(ingredients, quantity)}
                </div>
              </div>
            </div>
            <div class="principal__meal-instructions-description">
              <h3
                class="principal__meal-instructions-meal-title u-margin-bottom-small"
              >
                How to cook?
              </h3>
              <p class="principal__meal-instructions-p">
              ${meal.strInstructions}
              </p>
            </div>
          </div>
`;

    containerMeals.insertAdjacentHTML('beforeend', modalTemplate);
  });

  const closeBtn = document.getElementById('closeBtn');
  closeBtn.addEventListener('click', () => {
    mealDiv.style.height = '1%';
    containerMeals.classList.replace('fadeIn', 'fadeOut');
    setTimeout(() => {
      containerMeals.classList.add('hidden');
    }, 700);
  });
}

async function renderMealsCategory(category, type) {
  const res = await getCategorySelected(category, type);
  clearDivs();
  title.innerText = category;
  if (type === 'c') {
    btnBack.classList.remove('hidden');
  } else {
    btnBackingredients.classList.remove('hidden');
  }
  res.meals.forEach((meal) => {
    const cardHtml = `
          <div class="principal__card-item shadow" id="${meal.idMeal}">
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
      containerMeals.innerHTML = '';
      renderMealModal(card.id);
      containerMeals.classList.replace('fadeOut', 'fadeIn');
      containerMeals.classList.remove('hidden');
    });
  });
  hiddenLoader();
}

async function renderCategories() {
  clearDivs();
  title.innerText = 'Categories';
  const res = await getCategory('c');
  res.meals.forEach((category) => {
    const cardHtml = `
          <div class="principal__card-item shadow" id="${category.strCategory}">
              <img src="https://www.themealdb.com/images/category/${category.strCategory}.png" alt="" class="principal__card-img">
          <div class="principal__card-item-back">
            <p class="principal__card-item-p">${category.strCategory}</p>
          </div>
          </div>

        `;

    btnBack.classList.add('hidden');
    principalBody.insertAdjacentHTML('beforeend', cardHtml);
  });

  const cards = document.querySelectorAll('.principal__card-item');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      renderMealsCategory(card.id, 'c');
    });
  });

  hiddenLoader();
}

async function renderIngredients() {
  clearDivs();
  title.innerText = 'Ingredients';
  const res = await getCategory('i');
  res.meals.forEach((category) => {
    const cardHtml = `
          <div class="principal__card-item shadow" id="${category.strIngredient}">
              <img src="https://www.themealdb.com/images/ingredients/${category.strIngredient}.png" alt="" class="principal__card-img">
          <div class="principal__card-item-back">
            <p class="principal__card-item-p">${category.strIngredient}</p>
          </div>
          </div>

        `;

    btnBack.classList.add('hidden');
    btnBackingredients.classList.add('hidden');
    principalBody.insertAdjacentHTML('beforeend', cardHtml);
  });

  const cards = document.querySelectorAll('.principal__card-item');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      renderMealsCategory(card.id, 'i');
    });
  });

  hiddenLoader();
}

renderCategories();

btnBack.addEventListener('click', () => {
  renderCategories();
});

btnBackingredients.addEventListener('click', () => {
  renderIngredients();
});

document
  .getElementById('categorys')
  .addEventListener('click', renderCategories);

document
  .getElementById('ingredients')
  .addEventListener('click', renderIngredients);
