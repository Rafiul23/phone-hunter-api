const loadPhone = async (searchText) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = (phones) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';

    const showAllContainer = document.getElementById('show-all-container');

    if(phones.length > 12){
      showAllContainer.classList.remove('hidden');
    } else {
      showAllContainer.classList.add('hidden');
    }

    phones = phones.slice(0, 12);
    
    phones.forEach(phone => {
        console.log(phone)

        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card p-4 bg-gray-100';
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
}

const handleSearch = () =>{
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   loadPhone(searchText);
}
