        document.addEventListener('DOMContentLoaded', function() {
            // Установка даты по умолчанию на сегодня
            const today = new Date();
            const todayFormatted = today.toISOString().split('T')[0];
            document.getElementById('date').value = todayFormatted;
            
            // Обработка нажатия кнопки поиска
            document.getElementById('search-btn').addEventListener('click', function() {
                const from = document.getElementById('from').value;
                const to = document.getElementById('to').value;
                const date = document.getElementById('date').value;
                const passengers = document.getElementById('passengers').value;
                
                // Проверка заполнения полей
                if (!from || !to || !date) {
                    alert('Пожалуйста, заполните все поля формы!');
                    return;
                }
                
                // Форматирование даты в формат DD.MM.YYYY
                const dateObj = new Date(date);
                const formattedDate = dateObj.toLocaleDateString('ru-RU');
                
                // Создание сообщения
                const message = `Автобус "${from}" отправляется в "${to}" ${formattedDate}. Количество пассажиров: ${passengers}.`;
                
                // Отображение сообщения
                const resultElement = document.getElementById('result-message');
                resultElement.textContent = message;
                resultElement.classList.add('show');
            });
            
            // Обработка кнопки "Показать еще"
            const showMoreBtn = document.getElementById('show-more-btn');
            const hiddenRoutes = document.querySelectorAll('.hidden-route');
            let hiddenVisible = false;
            
            showMoreBtn.addEventListener('click', function() {
                if (!hiddenVisible) {
                    // Показываем скрытые маршруты
                    hiddenRoutes.forEach(route => {
                        route.classList.remove('hidden-route');
                    });
                    showMoreBtn.textContent = 'Скрыть 5 маршрутов';
                    hiddenVisible = true;
                } else {
                    // Скрываем маршруты
                    hiddenRoutes.forEach(route => {
                        route.classList.add('hidden-route');
                    });
                    showMoreBtn.textContent = 'Показать еще 5 маршрутов';
                    hiddenVisible = false;
                }
            });
            
            // Обработка кнопок "Забронировать"
            const bookButtons = document.querySelectorAll('.book-button');
            bookButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const routeCard = this.closest('.route-card');
                    const fromCity = routeCard.querySelector('.route-cities .city:nth-child(1)').textContent;
                    const toCity = routeCard.querySelector('.route-cities .city:nth-child(3)').textContent;
                    const price = routeCard.querySelector('.route-price').textContent;
                    
                    alert(`Вы забронировали билет на маршрут ${fromCity} → ${toCity}\nСтоимость: ${price}`);
                });
            });
        });
                // Общие данные для всех форм (города)
        const cityList = [
            "Вологда", "Череповец", "Вытегра", "Великий Устюг", "Кириллов",
            "Белозерск", "Харовск", "Устюжна", "Бабаево", "Грязовец",
            "Кадников", "Красавино", "Никольск", "Сокол", "Тотьма"
        ];
        
        // Функция для форматирования даты
        function formatDateForDisplay(dateString) {
            const dateObj = new Date(dateString);
            return dateObj.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
        
        // Функция для обработки отправки формы
        function processFormSubmission(departureId, destinationId, dateId, passengersId, resultId) {
            const departureCity = document.getElementById(departureId).value;
            const destinationCity = document.getElementById(destinationId).value;
            const travelDate = document.getElementById(dateId).value;
            const passengerCount = document.getElementById(passengersId).value;
            
            // Проверка заполнения обязательных полей
            if (!departureCity || !destinationCity || !travelDate) {
                alert('Пожалуйста, заполните все поля формы!');
                return false;
            }
            
            // Проверка, что города разные
            if (departureCity === destinationCity) {
                alert('Город отправления и назначения должны быть разными!');
                return false;
            }
            
            // Форматирование даты
            const formattedDate = formatDateForDisplay(travelDate);
            
            // Создание сообщения о результате
            const message = `Автобус "${departureCity}" отправляется в "${destinationCity}" ${formattedDate}. Количество пассажиров: ${passengerCount}.`;
            
            // Отображение сообщения
            const resultElement = document.getElementById(resultId);
            resultElement.textContent = message;
            resultElement.classList.add('show');
            
            // Прокрутка к результату
            resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            return true;
        }
        
        // Инициализация при загрузке страницы
        document.addEventListener('DOMContentLoaded', function() {
            // Установка даты по умолчанию на сегодня
            const currentDate = new Date();
            const todayFormatted = currentDate.toISOString().split('T')[0];
            document.getElementById('travelDate').value = todayFormatted;
            
            // Установка минимальной даты (сегодня)
            document.getElementById('travelDate').min = todayFormatted;
            
            // Обработка отправки формы
            const searchForm = document.getElementById('homeSearchForm');
            searchForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Предотвращаем стандартную отправку формы
                
                processFormSubmission(
                    'departureCity', 
                    'destinationCity', 
                    'travelDate', 
                    'passengerCount', 
                    'searchResult'
                );
            });
            
            // Добавляем поддержку нажатия Enter в полях формы
            const formInputs = document.querySelectorAll('.dropdown-select, .date-picker');
            formInputs.forEach(input => {
                input.addEventListener('keypress', function(event) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        searchForm.dispatchEvent(new Event('submit'));
                    }
                });
            });
            
            // Улучшаем UX для полей ввода
            const formFields = document.querySelectorAll('.dropdown-select, .date-picker');
            formFields.forEach(field => {
                field.addEventListener('focus', function() {
                    this.style.borderColor = '#0066B0';
                    this.style.boxShadow = '0 0 0 3px rgba(0, 102, 176, 0.1)';
                });
                
                field.addEventListener('blur', function() {
                    this.style.borderColor = '#e0e0e0';
                    this.style.boxShadow = 'none';
                });
            });
            
            // Автоматическое переключение фокуса между полями
            const departureSelect = document.getElementById('departureCity');
            const destinationSelect = document.getElementById('destinationCity');
            const dateInput = document.getElementById('travelDate');
            const passengersSelect = document.getElementById('passengerCount');
            
            departureSelect.addEventListener('change', function() {
                if (this.value) destinationSelect.focus();
            });
            
            destinationSelect.addEventListener('change', function() {
                if (this.value) dateInput.focus();
            });
            
            dateInput.addEventListener('change', function() {
                if (this.value) passengersSelect.focus();
            });
        });
                // Простая анимация для счетчиков статистики
        document.addEventListener('DOMContentLoaded', function() {
            // Анимация для элементов при прокрутке
            const observerOptions = {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        
                        // Анимация счетчиков статистики
                        if (entry.target.classList.contains('stat-number')) {
                            animateCounter(entry.target);
                        }
                    }
                });
            }, observerOptions);
            
            // Наблюдаем за элементами статистики
            document.querySelectorAll('.stat-number').forEach(stat => {
                observer.observe(stat);
            });
            
            // Наблюдаем за карточками преимуществ
            document.querySelectorAll('.feature-card').forEach(card => {
                observer.observe(card);
            });
            
            // Наблюдаем за карточками команды
            document.querySelectorAll('.team-member').forEach(member => {
                observer.observe(member);
            });
            
            // Функция анимации счетчика
            function animateCounter(element) {
                const target = parseInt(element.textContent.replace('+', ''));
                const duration = 1500;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    // Проверяем, есть ли знак "+" в исходном тексте
                    const originalText = element.textContent;
                    const hasPlus = originalText.includes('+');
                    
                    element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                }, 16);
            }
            
            // Плавная прокрутка для якорных ссылок
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Эффект при наведении на кнопки
            const buttons = document.querySelectorAll('.accent-button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        });
        