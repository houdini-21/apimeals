const principalBody = document.getElementById('principal-container');
const loading = document.getElementById('loader');
const title = document.getElementById('title');
const mealDiv = document.getElementById('meal-div');
const containerMeals = document.getElementById('container-meals-data');
const btnBack = document.getElementById('btnBack');

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

async function renderMealModal(id) {
  const res = await getMealSelected(id);
  res.meals.forEach((meal) => {
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
                <div class="principal__meal-instructions-list">
                <li>${meal.strMeasure1}  ${
      meal.strIngredient1 != null ? meal.strIngredient1 : ''
    }</li>
                <li>${meal.strMeasure2}  ${
      meal.strIngredient2 != null ? meal.strIngredient2 : ''
    }</li>
                <li>${meal.strMeasure3}  ${
      meal.strIngredient3 != null ? meal.strIngredient3 : ''
    }</li>
                <li>${meal.strMeasure4}  ${
      meal.strIngredient4 != null ? meal.strIngredient4 : ''
    }</li>
                <li>${meal.strMeasure5}  ${
      meal.strIngredient5 != null ? meal.strIngredient5 : ''
    }</li>
                <li>${meal.strMeasure6}  ${
      meal.strIngredient6 != null ? meal.strIngredient6 : ''
    }</li>
                <li>${meal.strMeasure7}  ${
      meal.strIngredient7 != null ? meal.strIngredient7 : ''
    }</li>
                <li>${meal.strMeasure8}  ${
      meal.strIngredient8 != null ? meal.strIngredient8 : ''
    }</li>
                <li>${meal.strMeasure9}  ${
      meal.strIngredient9 != null ? meal.strIngredient9 : ''
    }</li>
                <li>${meal.strMeasure10}  ${
      meal.strIngredient10 != null ? meal.strIngredient10 : ''
    }</li>
                <li>${meal.strMeasure11}  ${
      meal.strIngredient11 != null ? meal.strIngredient11 : ''
    }</li>
                <li>${meal.strMeasure12}  ${
      meal.strIngredient12 != null ? meal.strIngredient12 : ''
    }</li>
                <li>${meal.strMeasure13}  ${
      meal.strIngredient13 != null ? meal.strIngredient13 : ''
    }</li>
                <li>${meal.strMeasure14}  ${
      meal.strIngredient14 != null ? meal.strIngredient14 : ''
    }</li>
                <li>${meal.strMeasure15}  ${
      meal.strIngredient15 != null ? meal.strIngredient15 : ''
    }</li>
                <li>${meal.strMeasure16}  ${
      meal.strIngredient16 != null ? meal.strIngredient16 : ''
    }</li>
                <li>${meal.strMeasure17}  ${
      meal.strIngredient17 != null ? meal.strIngredient17 : ''
    }</li>
                <li>${meal.strMeasure18}  ${
      meal.strIngredient18 != null ? meal.strIngredient18 : ''
    }</li>
                <li>${meal.strMeasure19}  ${
      meal.strIngredient19 != null ? meal.strIngredient19 : ''
    }</li>
                <li>${meal.strMeasure20}  ${
      meal.strIngredient20 != null ? meal.strIngredient20 : ''
    }</li>
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

async function renderMealsCategory(category) {
  const res = await getCategorySelected(category);
  clearDivs();
  title.innerText = category;
  btnBack.classList.remove('hidden');
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

    btnBack.classList.add('hidden');
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

btnBack.addEventListener('click', () => {
  renderCategories();
});
