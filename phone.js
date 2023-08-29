const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';

    const showAllContainer = document.getElementById('show-all-container');

    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    } else {
      showAllContainer.classList.add('hidden');
    }

    if(!isShowAll){
      phones = phones.slice(0, 12);
    }
    
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
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleSpinner(false);
}

const showDetails = async(id) => {
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   const phone = data.data;
   showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{

  const showDetailContainer = document.getElementById('show-details-container');

  showDetailContainer.innerHTML = `
      <img src="${phone.image}" >
      <h3 class="font-bold text-3xl">${phone.name}</h3>
      <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
      <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
      <p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
      <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
      <p><span class="font-bold">Slug: </span>${phone?.slug}</p>
      <p><span class="font-bold">Released Date: </span>${phone?.releaseDate}</p>
      <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
      <p><span class="font-bold">GPS: </span>${phone?.others?.GPS || 'No GPS available'}</p>
  `

  show_details_modal.showModal();
}



const handleSearch = (isShowAll) =>{
  toggleSpinner(true);
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   loadPhone(searchText, isShowAll);
}

const toggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
}

const showAllBtn = () =>{
    handleSearch(true);
}