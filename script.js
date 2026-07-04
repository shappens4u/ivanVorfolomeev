/*ГЕО-МАРКЕТПЛЕЙС "КАРТА ДЕТСТВА"*/

const CONFIG = {
    DEFAULT_CITY: 'nahodka',
    COORDS: {
        nahodka: [42.821903, 132.880862],
        moscow: [55.755864, 37.617698]
    },
    AGE_GROUPS: [
        { min: 3, max: 5, label: "3–5 лет" },
        { min: 6, max: 7, label: "6–7 лет" },
        { min: 8, max: 10, label: "8–10 лет" },
        { min: 11, max: 14, label: "11–14 лет" },
        { min: 15, max: 17, label: "15–17 лет" }
    ]
};

// База данных с удобным форматом координат coords: [широта, долгота]
const PREDEFINED_CLUBS = [
    // --- РОБОТОТЕХНИКА И IT (robot) ---
    { id: 1, name: "РобоЛаб #1", type: "robot", address: "ул. Ленинская, д. 12", price: "4000р/мес", ageRange: [6, 10], coords: [42.811195689598655, 132.86720232604634] },
    { id: 2, name: "КиберГен #2", type: "robot", address: "проспект Мира, д. 12", price: "4500р/мес", ageRange: [11, 15], coords: [42.833832123247504, 132.8946369972115] },
    { id: 3, name: "ТехноСтарт #3", type: "robot", address: "ул. Спортивная, д. 45", price: "4100р/мес", ageRange: [8, 14], coords: [42.77105865902942, 132.85447135303014] },
    { id: 4, name: "Лига Роботов #4", type: "robot", address: "ул. Сидоренко, д. 11", price: "3900р/мес", ageRange: [7, 12], coords: [42.85218486889153, 132.89400535303326] },
    { id: 5, name: "BitBot #5", type: "robot", address: "Находкинский проспект, д. 106", price: "4300р/мес", ageRange: [9, 17], coords: [42.783312364713545, 132.8537562395379] },
    { id: 6, name: "РобоЛаб #6", type: "robot", address: "ул. Пограничная, д. 2", price: "4000р/мес", ageRange: [6, 11], coords: [42.821521780542824, 132.88586393953946] },
    { id: 7, name: "КиберГен #7", type: "robot", address: "ул. Пирогова, д. 4", price: "Бесплатно", ageRange: [12, 17], coords: [42.77817221796734, 132.85946741255253] },
    { id: 8, name: "ТехноСтарт #8", type: "robot", address: "ул. Постышева, д. 14", price: "4200р/мес", ageRange: [8, 13], coords: [42.83869681124514, 132.8960907260476] },
    { id: 9, name: "Лига Роботов #9", type: "robot", address: "ул. Школьная, д. 7", price: "4400р/мес", ageRange: [7, 14], coords: [42.825617790462935, 132.891691326047] },
    { id: 10, name: "BitBot #10", type: "robot", address: "ул. Малиновского, д. 15", price: "3500р/мес", ageRange: [10, 16], coords: [42.83799584698748, 132.9021887241968] },

    // --- СПОРТ (sport) ---
    { id: 11, name: "Спарта #1", type: "sport", address: "ул. Пирогова, д. 20", price: "1500р/мес", ageRange: [5, 15], coords: [42.803905088001116, 132.9105843837177] },
    { id: 12, name: "Олимп #2", type: "sport", address: "ул. Пограничная, д. 34", price: "2000р/мес", ageRange: [6, 17], coords: [42.82078175148937, 132.87729001255417] },
    { id: 13, name: "Тигр #3", type: "sport", address: "проспект Мира, д. 15", price: "Бесплатно", ageRange: [8, 16], coords: [42.83350631705039, 132.89391291255467] },
    { id: 14, name: "Секция Самбо #4", type: "sport", address: "ул. Постышева, д. 3", price: "1800р/мес", ageRange: [7, 14], coords: [42.83454159555408, 132.89876383953978] },
    { id: 15, name: "Арена #5", type: "sport", address: "Находкинский проспект, д. 44", price: "2500р/мес", ageRange: [10, 17], coords: [42.8116019831794, 132.8806179107032] },
    { id: 16, name: "Юный Пловец #6", type: "sport", address: "ул. Спортивная, д. 10", price: "2200р/мес", ageRange: [4, 12], coords: [42.77543460170924, 132.8561878953587] },
    { id: 17, name: "Спарта #7", type: "sport", address: "ул. Ленинская, д. 22", price: "Бесплатно", ageRange: [6, 14], coords: [42.81164060647417, 132.86319348371808] },
    { id: 18, name: "Олимп #8", type: "sport", address: "ул. Сидоренко, д. 5", price: "1700р/мес", ageRange: [9, 15], coords: [42.848967127088066, 132.89328295488357] },
    { id: 19, name: "Тигр #9", type: "sport", address: "ул. Павлова, д. 12", price: "1600р/мес", ageRange: [8, 17], coords: [42.81002166234661, 132.86315161440422] },
    { id: 20, name: "Секция Самбо #10", type: "sport", address: "ул. Дзержинского, д. 9", price: "2100р/мес", ageRange: [7, 13], coords: [42.84027237626691, 132.89378106837594] },

    // --- ТВОРЧЕСТВО (art) ---
    { id: 21, name: "Мастерская чудес #1", type: "art", address: "Озерный бульвар, д. 5", price: "3400р/мес", ageRange: [5, 12], coords: [42.836592152130045, 132.8921687107042] },
    { id: 22, name: "Палитра #2", type: "art", address: "ул. Луначарского, д. 8", price: "3000р/мес", ageRange: [6, 14], coords: [42.8096141922151, 132.8688302413896] },
    { id: 23, name: "Вдохновение #3", type: "art", address: "ул. Дзержинского, д. 19", price: "Бесплатно", ageRange: [8, 17], coords: [42.840483408851, 132.8882132548833] },
    { id: 24, name: "Арт-Мир #4", type: "art", address: "ул. Павлова, д. 4", price: "3200р/мес", ageRange: [7, 15], coords: [42.80993945402382, 132.86413242604624] },
    { id: 25, name: "Этюд #5", type: "art", address: "ул. Школьная, д. 3", price: "2800р/мес", ageRange: [4, 10], coords: [42.82762489385001, 132.89201209906187] },
    { id: 26, name: "Мастерская чудес #6", type: "art", address: "ул. Пограничная, д. 12", price: "3500р/мес", ageRange: [5, 11], coords: [42.82242223257177, 132.88294738371837] },
    { id: 27, name: "Палитра #7", type: "art", address: "ул. Ленинская, д. 18", price: "2900р/мес", ageRange: [6, 13], coords: [42.81161148315521, 132.86543226837463] },
    { id: 28, name: "Вдохновение #8", type: "art", address: "ул. Спортивная, д. 21", price: "Бесплатно", ageRange: [9, 16], coords: [42.77683767163208, 132.8521557413882] },
    { id: 29, name: "Арт-Мир #9", type: "art", address: "проспект Мира, д. 30", price: "2700р/мес", ageRange: [8, 14], coords: [42.83635272255582, 132.88627166837568] },
    { id: 30, name: "Этюд #10", type: "art", address: "Находкинский проспект, д. 82", price: "3100р/мес", ageRange: [10, 17], coords: [42.78908832004694, 132.86435082604547] }
];

class MarketplaceApp {
    constructor() {
        this.map = null;
        this.currentCity = CONFIG.DEFAULT_CITY;
        this.clubs = PREDEFINED_CLUBS;

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(() => this.initMap());
        }

        const citySelect = document.getElementById('city-select');
        if (citySelect) {
            citySelect.value = this.currentCity;
            citySelect.addEventListener('change', (e) => this.handleCityChange(e.target.value));
        }

        this.renderClubsList(this.clubs);
    }

    initMap() {
        const center = CONFIG.COORDS[this.currentCity];
        this.map = new ymaps.Map('map', {
            center: center,
            zoom: this.currentCity === 'nahodka' ? 12 : 10,
            controls: ['zoomControl']
        });

        this.updateMapPlacemarks(this.clubs);
    }

    handleCityChange(newCity) {
        this.currentCity = newCity;
        if (this.map) {
            this.map.setCenter(CONFIG.COORDS[newCity], newCity === 'nahodka' ? 12 : 10);
        }
        this.handleFilter();
    }

    handleFilter() {
        const activityType = document.getElementById('activity-type').value;
        const birthDateVal = document.getElementById('birth-date').value;

        let targetAge = null;
        if (birthDateVal) {
            const birthDate = new Date(birthDateVal);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            targetAge = age;
        }

        const filtered = this.clubs.filter(club => {
            const typeMatch = (activityType === 'all' || club.type === activityType);
            
            let ageMatch = true;
            if (targetAge !== null) {
                ageMatch = (targetAge >= club.ageRange[0] && targetAge <= club.ageRange[1]);
            }

            return typeMatch && ageMatch;
        });

        this.renderClubsList(filtered);
        this.updateMapPlacemarks(filtered);
    }

    renderClubsList(data) {
        const list = document.getElementById('results-list');
        if (!list) return;

        list.innerHTML = '';

        const countHeader = document.createElement('div');
        countHeader.style.padding = '10px 0';
        countHeader.style.color = '#94a3b8';
        countHeader.innerHTML = `Найдено вариантов: <strong>${data.length}</strong>`;
        list.appendChild(countHeader);

        data.forEach(club => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <h3>${club.name}</h3>
                    <span class="badge" style="background:#10b981; color:white; padding:2px 6px; border-radius:4px; font-size:12px;">${club.ageRange[0]}-${club.ageRange[1]} л.</span>
                </div>
                <p>📍 ${club.address}</p>
                <p style="color: #10b981; font-weight: 600;">💰 ${club.price}</p>
            `;
            
            // Здесь теперь плавно центрируем карту, передавая готовый массив club.coords
            card.onclick = () => {
                if (this.map && club.coords) {
                    this.map.setCenter(club.coords, 15, { duration: 500 });
                }
            };
            
            list.appendChild(card);
        });
    }

    updateMapPlacemarks(data) {
        if (!this.map) return;
        this.map.geoObjects.removeAll();

        data.forEach(club => {
            if (!club.coords) return;

            // Передаем массив координат напрямую в конструктор Placemark
            const placemark = new ymaps.Placemark(club.coords, {
                balloonContent: `<strong>${club.name}</strong><br>${club.address}<br>Цена: ${club.price}`
            }, {
                preset: club.type === 'robot' ? 'islands#blueEducationIcon' : 
                        club.type === 'sport' ? 'islands#redSportIcon' : 'islands#yellowArtIcon'
            });

            this.map.geoObjects.add(placemark);
        });
    }
}

// Инициализируем приложение
const app = new MarketplaceApp();
