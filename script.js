/**
 * ГЕО-МАРКЕТПЛЕЙС "КАРТА ДЕТСТВА"
 * Контроллер данных и генератор контента
 */

const CONFIG = {
    DEFAULT_CITY: 'nahodka',
    COORDS: {
        nahodka: [42.82, 132.89],
        moscow: [55.75, 37.61]
    },
    AGE_GROUPS: [
        { min: 3, max: 5, label: "3–5 лет" },
        { min: 6, max: 7, label: "6–7 лет" },
        { min: 8, max: 10, label: "8–10 лет" },
        { min: 11, max: 14, label: "11–14 лет" },
        { min: 15, max: 17, label: "15–17 лет" }
    ]
};

// Вспомогательные данные для генерации (п. 3.2, 3.4)
const streets = ["Ленинская", "пр-т Мира", "Пограничная", "Находкинский проспект", "Спортивная", "Пирогова", "Сидоренко"];
const clubNames = {
    robot: ["РобоЛаб", "КиберГен", "ТехноСтарт", "Лига Роботов", "BitBot"],
    sport: ["Спарта", "Олимп", "Тигр", "Секция Самбо", "Арена", "Юный Пловец"],
    art: ["Палитра", "Вдохновение", "Арт-Мир", "Этюд", "Мастерская чудес"]
};

// Основной массив данных
const CLUBS_DATA = [];

// Генерируем 35 карточек для разнообразия (п. 3.2)
for (let i = 1; i <= 35; i++) {
    const types = ["robot", "sport", "art"];
    const type = types[Math.floor(Math.random() * types.length)];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const namePrefix = clubNames[type][Math.floor(Math.random() * clubNames[type].length)];
    
    // Выбираем одну из официальных групп возраста по ТЗ (п. 3.1) [cite: 24]
    const ageGroup = CONFIG.AGE_GROUPS[Math.floor(Math.random() * CONFIG.AGE_GROUPS.length)];

    CLUBS_DATA.push({
        id: i,
        name: `${namePrefix} #${i}`,
        city: i > 30 ? "moscow" : "nahodka", // Большинство в Находке [cite: 14]
        type: type,
        ageRange: [ageGroup.min, ageGroup.max],
        address: `ул. ${street}, д. ${Math.floor(Math.random() * 60) + 1}`,
        price: i % 7 === 0 ? "Бесплатно" : `${1500 + (Math.floor(Math.random() * 30) * 100)}₽/мес`,
        // Генерация координат в радиусе города
        lat: CONFIG.COORDS.nahodka[0] + (Math.random() - 0.5) * 0.05,
        lon: CONFIG.COORDS.nahodka[1] + (Math.random() - 0.5) * 0.05
    });
}

const app = {
    map: null,
    cache: new Map(), // Кэширование (п. 3.5) 

    init() {
        ymaps.ready(() => {
            this.map = new ymaps.Map("map", {
                center: CONFIG.COORDS.nahodka,
                zoom: 13,
                controls: ['zoomControl']
            });
            this.handleFilter(); // Первичный запуск
        });
    },

    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
    },

    handleFilter() {
        const city = document.getElementById('city-select').value;
        const birthDate = document.getElementById('birth-date').value;
        const activity = document.getElementById('activity-type').value;

        const cacheKey = `${city}-${birthDate}-${activity}`;
        if (this.cache.has(cacheKey)) {
            return this.renderClubs(this.cache.get(cacheKey));
        }

        let filtered = CLUBS_DATA.filter(club => club.city === city);

        if (birthDate) {
            const age = this.calculateAge(birthDate);
            // Фильтр: возраст ребенка попадает в диапазон кружка (п. 3.1) [cite: 22, 24]
            filtered = filtered.filter(club => age >= club.ageRange[0] && age <= club.ageRange[1]);
        }

        if (activity !== 'all') {
            filtered = filtered.filter(club => club.type === activity);
        }

        this.cache.set(cacheKey, filtered);
        this.renderClubs(filtered);
    },

    renderClubs(data) {
        const list = document.getElementById('results-list');
        list.innerHTML = '';
        this.map.geoObjects.removeAll();

        // Счётчик результатов
        const countHeader = document.createElement('div');
        countHeader.style.padding = '10px 0';
        countHeader.style.color = '#94a3b8';
        countHeader.innerHTML = `Найдено вариантов: <strong>${data.length}</strong>`;
        list.appendChild(countHeader);

        data.forEach(club => {
            // Карточка организации (п. 3.4) [cite: 33]
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <h3>${club.name}</h3>
                    <span class="badge">${club.ageRange[0]}-${club.ageRange[1]} л.</span>
                </div>
                <p>📍 ${club.address}</p>
                <p style="color: #10b981; font-weight: 600;">💰 ${club.price}</p>
            `;
            
            card.onclick = () => {
                this.map.setCenter([club.lat, club.lon], 16, { duration: 500 });
            };
            
            list.appendChild(card);

            const placemark = new ymaps.Placemark([club.lat, club.lon], {
                balloonContent: `<strong>${club.name}</strong><br>${club.address}<br>Цена: ${club.price}`
            }, {
                preset: club.price === "Бесплатно" ? 'islands#goldEducationIcon' : 'islands#greenEducationIcon'
            });
            this.map.geoObjects.add(placemark);
        });
    }
};

app.init();