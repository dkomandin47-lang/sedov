"use client";

import { FormEvent, useState } from "react";

const services = [
  { title: "Детали двигателя", text: "Ремни, свечи, фильтры, прокладки и комплектующие для ремонта." },
  { title: "Тормозная система", text: "Колодки, диски, суппорты и тормозная жидкость под ваш автомобиль." },
  { title: "Подвеска и рулевое", text: "Амортизаторы, рычаги, ступицы, опоры и рулевые наконечники." },
  { title: "Масла и жидкости", text: "Моторные и трансмиссионные масла с учётом допусков производителя." },
  { title: "Автоэлектрика", text: "Аккумуляторы, лампы, датчики, стартеры и генераторы." },
  { title: "Кузов и расходники", text: "Щётки, крепёж, элементы кузова и всё необходимое для обслуживания." },
];

const benefits = [
  { value: "15 мин", label: "среднее время подбора" },
  { value: "48+", label: "проверенных брендов" },
  { value: "2–3", label: "варианта на выбор" },
  { value: "100%", label: "проверка совместимости" },
];

function PhoneIcon() {
  return (
    <span className="phone-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z" />
      </svg>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setRequestSent(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top">
      <div className="topline">
        <div className="container topline-inner">
          <span>Пн–Сб: 09:00–20:00 · Вс: 10:00–18:00</span>
          <span>Балашов · Саратовское ш., 14</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#top" aria-label="SEDOV — на главную">
            <span className="logo-mark">S</span>
            <span className="logo-copy"><strong>SEDOV</strong><small>автозапчасти</small></span>
          </a>

          <nav id="main-navigation" className={menuOpen ? "header-nav open" : "header-nav"} aria-label="Основная навигация" onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeMenu();
              document.getElementById("menu-toggle")?.focus();
            }
          }}>
            <a href="#services" onClick={closeMenu}>Что подбираем</a>
            <a href="#how" onClick={closeMenu}>Как работаем</a>
            <a href="#about" onClick={closeMenu}>О нас</a>
            <a href="#contacts" onClick={closeMenu}>Контакты</a>
            <a className="mobile-phone" href="tel:+79610532770">+7 (961) 053-27-70</a>
          </nav>

          <div className="header-contact">
            <span>Пн–Сб, 09:00–20:00</span>
            <a href="tel:+79610532770">+7 (961) 053-27-70</a>
          </div>

          <button id="menu-toggle" className={menuOpen ? "menu-button active" : "menu-button"} onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} aria-controls="main-navigation">
            <span /><span /><span />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-content">
            <span className="eyebrow">Точный подбор по VIN</span>
            <h1><span>Большой каталог</span><em>автозапчастей</em></h1>
            <p className="hero-lead">Подберём оригинал или проверенный аналог для вашего автомобиля. Сверим по VIN, уточним цену и срок — вам останется выбрать и забрать деталь в Балашове.</p>
            <div className="hero-actions">
              <a className="button button-primary arrow-down-button" href="#request">Подобрать запчасти <span>↓</span></a>
              <a className="button button-ghost call-button" href="tel:+79610532770">
                Позвонить сейчас
                <PhoneIcon />
              </a>
            </div>
            <div className="hero-points">
              <span><b>✓</b> Проверка по VIN</span>
              <span><b>✓</b> Оригиналы и аналоги</span>
              <span><b>✓</b> Проверенные бренды</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Преимущества">
        <div className="container trust-grid">
          <div><p><strong>Проверка совместимости</strong><small>Сверяем VIN и каталожные номера деталей</small></p></div>
          <div><p><strong>Понятный выбор</strong><small>Объясняем разницу между оригиналом и аналогами</small></p></div>
          <div><p><strong>Магазин в Балашове</strong><small>Заказ можно забрать на Саратовском шоссе, 14</small></p></div>
        </div>
      </section>

      <section className="services-section section" id="services">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow dark">Основные направления</span>
              <h2>Подберём всё, что нужно автомобилю</h2>
            </div>
            <p>Запчасти для отечественных и зарубежных легковых автомобилей. Если детали нет в наличии, уточним возможность заказа у поставщиков.</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#request" aria-label={`Запросить подбор: ${service.title}`}>Запросить подбор <b aria-hidden="true">↗</b></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section section" id="how">
        <div className="container how-layout">
          <div className="how-intro">
            <span className="eyebrow">Простой процесс</span>
            <h2>От запроса до нужной детали</h2>
            <p>Не знаете артикул? Назовите автомобиль и нужную деталь или укажите VIN — поможем с подбором.</p>
            <a className="button button-primary arrow-down-button" href="#request">Оставить заявку <span>↓</span></a>
          </div>
          <ol className="steps-list">
            <li><div><h3>Принимаем запрос</h3><p>Уточняем марку, модель, VIN и какую запчасть вы ищете.</p></div></li>
            <li><div><h3>Проверяем совместимость</h3><p>Сверяем каталожные номера и исключаем неподходящие варианты.</p></div></li>
            <li><div><h3>Предлагаем выбор</h3><p>Объясняем разницу между вариантами, согласовываем цену и срок.</p></div></li>
            <li><div><h3>Выдаём заказ</h3><p>Сообщаем о готовности и выдаём заказ в магазине в Балашове.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="about-section section" id="about">
        <div className="container about-layout">
          <div className="about-card">
            <span className="eyebrow dark">Почему SEDOV</span>
            <h2>Помогаем выбрать подходящую деталь</h2>
            <p>Объясним, чем отличаются оригинал и аналоги, что подходит вашему автомобилю и какие варианты есть в вашем бюджете.</p>
            <blockquote>Важно, чтобы деталь подошла, а вы понимали, за что платите.</blockquote>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit) => (
              <div key={benefit.value}><strong>{benefit.value}</strong><span>{benefit.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="request-section section" id="request">
        <div className="container request-layout">
          <div className="request-copy">
            <span className="eyebrow">Бесплатная консультация</span>
            <h2>Какая деталь вам нужна?</h2>
            <p>Укажите автомобиль и опишите, что ищете. Если не знаете точное название детали, расскажите о проблеме.</p>
            <a className="request-phone" href="tel:+79610532770"><small>Можно сразу позвонить</small><strong>+7 (961) 053-27-70</strong></a>
          </div>

          <div className="request-form-wrap">
            {requestSent ? (
              <div className="success-card" role="status" aria-live="polite">
                <span aria-hidden="true">✓</span>
                <h3>Форма заполнена</h3>
                <p>В демоверсии заявка не отправляется. Для подбора запчастей позвоните в магазин.</p>
                <a className="button button-primary call-button" href="tel:+79610532770">Позвонить <PhoneIcon /></a>
                <button className="text-button" onClick={() => setRequestSent(false)}>Вернуться к форме</button>
              </div>
            ) : (
              <form onSubmit={submitRequest} aria-describedby="request-note">
                <div className="form-title"><h3>Запросить подбор</h3><span>По VIN или модели</span></div>
                <div className="form-row">
                  <label>Ваше имя<input name="name" autoComplete="given-name" required placeholder="Как вас зовут" /></label>
                  <label>Телефон<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required placeholder="+7 (___) ___-__-__" /></label>
                </div>
                <label>Автомобиль или VIN<input name="car" placeholder="Например, Kia Rio 2020 или VIN" /></label>
                <label>Какая деталь нужна<textarea name="part" required rows={3} placeholder="Опишите деталь или проблему" /></label>
                <button className="button button-primary button-wide" type="submit">Отправить заявку <span>→</span></button>
                <small id="request-note" className="privacy-note">Демоверсия: форма пока не отправляет заявки. Для заказа позвоните нам.</small>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="contacts-section section" id="contacts">
        <div className="container contacts-layout">
          <div className="contacts-copy">
            <span className="eyebrow dark">Ждём вас</span>
            <h2>Магазин в Балашове</h2>
            <div className="contact-items">
              <div><p><small>Адрес</small><strong>Саратовское ш., 14, Балашов</strong></p></div>
              <div><p><small>Режим работы</small><strong>Пн–Сб: 09:00–20:00</strong><em>Вс: 10:00–18:00</em></p></div>
              <div><p><small>Телефон</small><a href="tel:+79610532770">+7 (961) 053-27-70</a></p></div>
            </div>
            <div className="contact-actions">
              <a className="button button-primary call-button" href="tel:+79610532770">Позвонить <PhoneIcon /></a>
              <a className="button button-outline route-button" href="https://yandex.ru/maps/?text=Саратовское%20шоссе%2C%2014%2C%20Балашов" target="_blank" rel="noreferrer">Маршрут <span>↗</span></a>
            </div>
          </div>

          <a className="map-card" href="https://yandex.ru/maps/?text=Саратовское%20шоссе%2C%2014%2C%20Балашов" target="_blank" rel="noreferrer" aria-label="Открыть карту проезда к магазину SEDOV в Балашове">
            <img src="/balashov-map.png" alt="Карта проезда: Саратовское шоссе, 14, Балашов" loading="lazy" width={1302} height={1044} />
            <span>Открыть в Яндекс Картах ↗</span>
          </a>
        </div>
      </section>

      <footer>
        <div className="container footer-main">
          <a className="logo footer-logo" href="#top">
            <span className="logo-mark">S</span>
            <span className="logo-copy"><strong>SEDOV</strong><small>автозапчасти</small></span>
          </a>
          <p>Подбор автозапчастей с проверкой совместимости в Балашове.</p>
          <nav aria-label="Навигация в подвале"><a href="#services">Что подбираем</a><a href="#how">Как работаем</a><a href="#request">Оставить заявку</a><a href="#contacts">Контакты</a></nav>
          <div className="footer-phone"><a href="tel:+79610532770">+7 (961) 053-27-70</a><span>Саратовское ш., 14</span></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 SEDOV</span><span>Информация на сайте не является публичной офертой</span></div>
      </footer>
    </main>
  );
}
