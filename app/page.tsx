"use client";

import { FormEvent, useState } from "react";

const services = [
  { number: "01", title: "Детали двигателя", text: "Ремни, свечи, фильтры, прокладки и комплектующие для ремонта." },
  { number: "02", title: "Тормозная система", text: "Колодки, диски, суппорты и тормозная жидкость под ваш автомобиль." },
  { number: "03", title: "Подвеска и рулевое", text: "Амортизаторы, рычаги, ступицы, опоры и рулевые наконечники." },
  { number: "04", title: "Масла и жидкости", text: "Моторные и трансмиссионные масла с учётом допусков производителя." },
  { number: "05", title: "Автоэлектрика", text: "Аккумуляторы, лампы, датчики, стартеры и генераторы." },
  { number: "06", title: "Кузов и расходники", text: "Щётки, крепёж, элементы кузова и всё необходимое для обслуживания." },
];

const benefits = [
  { value: "15 мин", label: "среднее время подбора" },
  { value: "48+", label: "проверенных брендов" },
  { value: "2–3", label: "варианта на выбор" },
  { value: "100%", label: "проверка совместимости" },
];

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
          <span><i /> Работаем сегодня до 20:00</span>
          <span>Балашов · Саратовское ш., 14</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#top" aria-label="SEDOV — на главную">
            <span className="logo-mark">S</span>
            <span className="logo-copy"><strong>SEDOV</strong><small>автозапчасти</small></span>
          </a>

          <nav className={menuOpen ? "header-nav open" : "header-nav"} aria-label="Основная навигация">
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

          <button className={menuOpen ? "menu-button active" : "menu-button"} onClick={() => setMenuOpen((value) => !value)} aria-label="Открыть меню" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-content">
            <span className="eyebrow">Точный подбор по VIN</span>
            <h1><span>Большой каталог</span><em>автозапчастей</em></h1>
            <p className="hero-lead">Подберём оригинальные запчасти и проверенные аналоги именно для вашего автомобиля. Сверим по VIN, проверим совместимость и предложим понятный выбор по цене и сроку.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#request">Подобрать запчасти <span>→</span></a>
              <a className="button button-ghost" href="tel:+79610532770">Позвонить сейчас</a>
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
          <div><p><strong>Подбор без ошибок</strong><small>Проверяем деталь по VIN и каталожным номерам</small></p></div>
          <div><p><strong>Понятный выбор</strong><small>Объясняем разницу между оригиналом и аналогами</small></p></div>
          <div><p><strong>Магазин в Балашове</strong><small>Заказ можно забрать на Саратовском шоссе, 14</small></p></div>
        </div>
      </section>

      <section className="services-section section" id="services">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow dark">Основные направления</span>
              <h2>Подберём всё, что<br />нужно автомобилю</h2>
            </div>
            <p>Работаем с легковыми автомобилями отечественных и зарубежных марок. Если позиции нет в наличии — найдём у поставщиков и привезём под заказ.</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#request" aria-label={`Запросить подбор: ${service.title}`}>Запросить подбор <b>↗</b></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section section" id="how">
        <div className="container how-layout">
          <div className="how-intro">
            <span className="eyebrow">Простой процесс</span>
            <h2>От запроса<br />до нужной детали</h2>
            <p>Не нужно разбираться в артикулах и каталогах. Расскажите, что случилось, или отправьте VIN — остальное сделаем мы.</p>
            <a className="button button-primary" href="#request">Оставить заявку <span>→</span></a>
          </div>
          <ol className="steps-list">
            <li><span>01</span><div><h3>Принимаем запрос</h3><p>По телефону или через форму: VIN, марка, модель и нужная запчасть.</p></div></li>
            <li><span>02</span><div><h3>Проверяем совместимость</h3><p>Сверяем каталожные номера и исключаем неподходящие варианты.</p></div></li>
            <li><span>03</span><div><h3>Предлагаем выбор</h3><p>Оригинал и проверенные аналоги в разном бюджете — решение остаётся за вами.</p></div></li>
            <li><span>04</span><div><h3>Выдаём или привозим</h3><p>Сообщаем о готовности и согласовываем удобный способ получения.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="about-section section" id="about">
        <div className="container about-layout">
          <div className="about-card">
            <span className="eyebrow dark">Почему SEDOV</span>
            <h2>Не просто продаём —<br />помогаем разобраться</h2>
            <p>Мы за понятный сервис без сложных терминов и случайных покупок. Важно, чтобы деталь действительно подошла, а вы понимали, за что платите.</p>
            <blockquote>«Лучший заказ — тот, с которым клиент возвращается не из-за ошибки, а за следующей деталью.»</blockquote>
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
            <h2>Расскажите, какая<br />деталь нужна</h2>
            <p>Ответим, уточним параметры автомобиля и предложим подходящие варианты.</p>
            <a className="request-phone" href="tel:+79610532770"><small>Можно сразу позвонить</small><strong>+7 (961) 053-27-70</strong></a>
          </div>

          <div className="request-form-wrap">
            {requestSent ? (
              <div className="success-card">
                <span>✓</span>
                <h3>Спасибо за заявку</h3>
                <p>Это демонстрационная версия лендинга, поэтому данные никуда не отправлены. После подключения сервера заявка будет приходить менеджеру.</p>
                <button className="button button-outline" onClick={() => setRequestSent(false)}>Отправить ещё одну</button>
              </div>
            ) : (
              <form onSubmit={submitRequest}>
                <div className="form-title"><h3>Запросить подбор</h3><span>Ответим за 15 минут</span></div>
                <div className="form-row">
                  <label>Ваше имя<input name="name" required placeholder="Как к вам обращаться" /></label>
                  <label>Телефон<input name="phone" type="tel" required placeholder="+7 (___) ___-__-__" /></label>
                </div>
                <label>Автомобиль или VIN<input name="car" placeholder="Например, Kia Rio 2020 или VIN" /></label>
                <label>Какая деталь нужна<textarea name="part" required rows={3} placeholder="Опишите деталь или проблему" /></label>
                <button className="button button-primary button-wide" type="submit">Отправить заявку <span>→</span></button>
                <small className="privacy-note">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</small>
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
              <div><span>01</span><p><small>Адрес</small><strong>Саратовское ш., 14, Балашов</strong></p></div>
              <div><span>02</span><p><small>Режим работы</small><strong>Пн–Сб: 09:00–20:00</strong><em>Вс: 10:00–18:00</em></p></div>
              <div><span>03</span><p><small>Телефон</small><a href="tel:+79610532770">+7 (961) 053-27-70</a></p></div>
            </div>
            <div className="contact-actions">
              <a className="button button-dark" href="tel:+79610532770">Позвонить</a>
              <a className="button button-outline" href="https://yandex.ru/maps/?text=Саратовское%20шоссе%2C%2014%2C%20Балашов" target="_blank" rel="noreferrer">Маршрут ↗</a>
            </div>
          </div>

          <a className="map-card" href="https://yandex.ru/maps/?text=Саратовское%20шоссе%2C%2014%2C%20Балашов" target="_blank" rel="noreferrer" aria-label="Открыть карту проезда к магазину SEDOV в Балашове">
            <img src="/balashov-map.png" alt="Карта проезда: Саратовское шоссе, 14, Балашов" />
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
