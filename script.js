document.getElementById('error-message').style.display = 'none';
document.getElementById('loader-display').style.display = 'none';

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        displayError();
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals));
    }
};

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
};

const displayLoader = loader => {
    document.getElementById('loader').style.display = 'flex';
};

const displaySearchResult = meals => {
    
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (meals == null || meals.length == 0) {
        alert('No result found!');
        return;
    }

    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="Meal">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 205)}</p>
                </div>
            </div>
            `;
        searchResult.appendChild(div);
    });

};

const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
};

document.getElementById('meal-details').style.display = 'none';
const displayMealDetail = meal => {
    document.getElementById('meal-details').style.display = 'block';
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="Meal">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 800)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Watch the video</a>
            </div>
        </div>
    </div>
    `;
    mealDetails.appendChild(div);
};