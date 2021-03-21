async function getCategorySelected(category) {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const urlfinal = url + category;
  try {
    const res = await fetch(urlfinal);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getCategory() {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderMealsCategory(category) {
  const res = await getCategorySelected(category);
  res.meals.forEach((meal) => {
    const cardHtml = `
          <div class="principal__card-item shadow">
              <img src="${meal.strMealThumb}" alt="" class="principal__card-img-meals">
          <div class="principal__card-item-back">
            <p class="principal__card-item-p">${meal.strMeal}</p>
          </div>
          </div>

        `;

    document
      .getElementById('principal-container')
      .insertAdjacentHTML('beforeend', cardHtml);
  });
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

    document
      .getElementById('principal-container')
      .insertAdjacentHTML('beforeend', cardHtml);
  });

  const cards = document.querySelectorAll('.principal__card-item');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      renderMealsCategory(card.id);
    });
  });
}
renderCategories();
