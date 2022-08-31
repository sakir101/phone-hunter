const phnLoad = async (search,y=0) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
        const data = await res.json();
        if (data.data.length === 0) {
            phnItem(0);
        }
        else {
            phnItem(1);
            displayPhn(data.data, y);
        }
        
    } catch (err) {
        console.log("Error Found");
    }


}

const displayPhn = (items, y) => {
    const phnContainer = document.getElementById('phn-container');
    phnContainer.innerHTML = ``;
    if(items.length>10 && y==0){
        items = items.slice(0,10);
        loadMore(1);
    }
    else{
        loadMore(0);
    }
    items.forEach(element => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
        <div class="col">
        <div class="card p-3">
          <img src="${element.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${element.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
          <button  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "detailInfo('${element.slug}')">
        Show Detail
      </button>
        </div>
        
      </div>
        `;
        phnContainer.appendChild(itemDiv);

        // console.log(element);
    });
    loadSpinner(0);

}
phnLoad();

const phnSearch = (y=0) => {
    const phnSearchInput = document.getElementById('phn-search-input');
    const phnSearchInput2 = phnSearchInput.value;
    loadSpinner(1);
    phnLoad(phnSearchInput2,y);
}
const x = document.getElementById('phn-search-input').addEventListener('keypress', function (ev) {
    if (ev.key === 'Enter') {
        const phnSearchInput = document.getElementById('phn-search-input');
        const phnSearchInput2 = phnSearchInput.value;
        loadSpinner(1);
        phnLoad(phnSearchInput2);
    }
})

const phnItem = (x) => {
    const phnFound = document.getElementById('phn-found');
    const phnSearchInput = document.getElementById('phn-search-input');
    const phnSearchInput2 = phnSearchInput.value;
    if (x == 0) {
        if (phnSearchInput2 == '') {
            phnFound.classList.add('d-none');
        }
        else {
            phnFound.classList.remove('d-none');
            loadSpinner(0);
        }

    }

    else {
        phnFound.classList.add('d-none')
    }
}
const moreDataApi = ()=>{
    loadSpinner(1);
    phnSearch(1);
}

const loadSpinner = (x) => {
    const load = document.getElementById('load-spinner');
    const phnSearchInput = document.getElementById('phn-search-input');
    const phnSearchInput2 = phnSearchInput.value;
    if (x == 1) {
        
        if (phnSearchInput2 == '') {
            phnFound.classList.add('d-none');
        }
        else {
            
            load.classList.remove('d-none')
        }

    }
    else {
        load.classList.add('d-none');
    }
}

const loadMore = (x)=>{
    const morePhn = document.getElementById('load-more');
    const phnSearchInput = document.getElementById('phn-search-input');
    const phnSearchInput2 = phnSearchInput.value;
    if(x==1){
        if (phnSearchInput2 == '') {
            phnFound.classList.add('d-none');
        }
        else {
            morePhn.classList.remove('d-none')
        }
    }
    else{
        morePhn.classList.add('d-none');
    }

}



const detailInfo =async(id) =>{
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        const data = await res.json();
        displayInfo(data.data);
        
    } catch (err) {
        console.log("Error Found");
    }
}

const displayInfo =(info) =>{
    console.log(info);
    const modalDeatil = document.getElementById('modal-detail');
    const phnName = document.getElementById('phn-name');
    phnName.innerHTML = `
    <h2>${info.name}</h2>
    `
    modalDeatil.innerHTML =`
    <h3 class="my-5">${info.brand}</h3>
    <img src = "${info.image}" class="card-img-top" alt="...">
    <p class="my-5 lead">${info.releaseDate}</p>
    `
}
