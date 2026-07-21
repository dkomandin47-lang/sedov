"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  article: string;
  price: number;
  oldPrice?: number;
  stock: string;
  visual: string;
  badge?: string;
};

const products: Product[] = [
  { id: 1, name: "Тормозные диски передние", brand: "Brembo", category: "Тормоза", article: "09.A200.11", price: 12490, oldPrice: 13990, stock: "В наличии", visual: "disc", badge: "–11%" },
  { id: 2, name: "Масляный фильтр", brand: "MANN-FILTER", category: "Фильтры", article: "W 712/95", price: 1290, stock: "В наличии", visual: "filter", badge: "Хит" },
  { id: 3, name: "Аккумулятор 60 А·ч", brand: "VARTA", category: "Электрика", article: "D24 Blue Dynamic", price: 11990, stock: "Осталось 3 шт.", visual: "battery" },
  { id: 4, name: "Лампа головного света H7", brand: "OSRAM", category: "Электрика", article: "64210NL", price: 2490, oldPrice: 2890, stock: "В наличии", visual: "lamp", badge: "–14%" },
  { id: 5, name: "Масло моторное 5W-30, 4 л", brand: "LIQUI MOLY", category: "Масла", article: "Top Tec 4200", price: 6790, stock: "В наличии", visual: "oil" },
  { id: 6, name: "Амортизатор задний", brand: "KYB", category: "Подвеска", article: "Excel-G 343307", price: 5990, stock: "Под заказ, 2 дня", visual: "shock" },
  { id: 7, name: "Комплект ремня ГРМ", brand: "Gates", category: "Двигатель", article: "K015670XS", price: 8990, stock: "В наличии", visual: "belt" },
  { id: 8, name: "Щётки стеклоочистителя", brand: "Bosch", category: "Кузов", article: "Aerotwin A863S", price: 3290, stock: "В наличии", visual: "wiper" },
];

const categories = [
  { name: "Тормоза", note: "Диски, колодки, суппорты", icon: "◉", tone: "orange" },
  { name: "Двигатель", note: "Ремни, свечи, прокладки", icon: "✦", tone: "steel" },
  { name: "Масла", note: "Моторные и трансмиссионные", icon: "◆", tone: "amber" },
  { name: "Подвеска", note: "Амортизаторы, рычаги", icon: "↕", tone: "dark" },
];

const brands = ["Brembo", "MANN-FILTER", "VARTA", "OSRAM", "LIQUI MOLY", "KYB", "Gates", "Bosch"];

const formatPrice = (value: number) => new Intl.NumberFormat("ru-RU").format(value) + " ₽";

function ProductVisual({ kind, name }: { kind: string; name: string }) {
  return (
    <div className={`product-visual visual-${kind}`} role="img" aria-label={`Изображение товара: ${name}`}>
      <span className="visual-object" />
      <span className="visual-shadow" />
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("popular");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [toast, setToast] = useState("");

  const catalogCategories = ["Все", ...Array.from(new Set(products.map((product) => product.category)))];

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesQuery = !normalizedQuery || [product.name, product.brand, product.article, product.category].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesCategory = category === "Все" || product.category === category;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesStock = !inStockOnly || !product.stock.startsWith("Под заказ");
      const matchesFavorites = !favoritesOnly || favorites.includes(product.id);
      return matchesQuery && matchesCategory && matchesBrand && matchesStock && matchesFavorites;
    });

    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "discount") return Number(Boolean(b.oldPrice)) - Number(Boolean(a.oldPrice));
      return a.id - b.id;
    });
  }, [query, category, selectedBrands, inStockOnly, favoritesOnly, favorites, sort]);

  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  useEffect(() => {
    document.body.style.overflow = cartOpen || filtersOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, filtersOpen]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const addToCart = (id: number) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    notify("Товар добавлен в корзину");
  };

  const changeQuantity = (id: number, delta: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + delta);
      const updated = { ...current };
      if (next === 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((current) => current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand]);
  };

  const selectCategory = (name: string) => {
    setCategory(name);
    setFavoritesOnly(false);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setRequestSent(true);
  };

  const FilterPanel = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`filter-panel ${mobile ? "filter-panel-mobile" : ""}`}>
      <div className="filter-heading">
        <h3>Фильтры</h3>
        {(selectedBrands.length > 0 || inStockOnly || category !== "Все") && (
          <button className="text-button" onClick={() => { setSelectedBrands([]); setInStockOnly(false); setCategory("Все"); }}>Сбросить</button>
        )}
      </div>
      <div className="filter-group">
        <span className="filter-label">Категория</span>
        <div className="category-filter-list">
          {catalogCategories.map((item) => (
            <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
              <span>{item}</span><small>{item === "Все" ? products.length : products.filter((product) => product.category === item).length}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <span className="filter-label">Производитель</span>
        <div className="brand-list">
          {brands.map((brand) => (
            <label key={brand}>
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
              <span className="checkmark">✓</span>
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>
      <label className="stock-switch">
        <span><strong>Только в наличии</strong><small>Можно забрать сегодня</small></span>
        <input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} />
        <span className="switch" />
      </label>
      {mobile && <button className="primary-button full-button" onClick={() => setFiltersOpen(false)}>Показать {filteredProducts.length} товаров</button>}
    </div>
  );

  return (
    <main>
      <div className="topbar">
        <div className="container topbar-inner">
          <span><i className="status-dot" /> Пункт выдачи открыт до 20:00</span>
          <span>Бесплатный подбор по VIN</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-main">
          <a className="logo" href="#top" aria-label="Sedov — на главную">
            <span className="logo-mark">S</span>
            <span className="logo-type"><strong>SEDOV</strong><small>автозапчасти</small></span>
          </a>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" })} placeholder="Название, артикул или бренд" aria-label="Поиск по каталогу" />
            {query && <button onClick={() => setQuery("")} aria-label="Очистить поиск">×</button>}
          </label>
          <div className="header-actions">
            <button className={`icon-action ${favoritesOnly ? "active" : ""}`} onClick={() => { setFavoritesOnly((value) => !value); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }} aria-label="Показать избранные товары">
              <span>♡</span><small>Избранное</small>{favorites.length > 0 && <b>{favorites.length}</b>}
            </button>
            <button className="icon-action" onClick={() => setCartOpen(true)} aria-label="Открыть корзину">
              <span>▱</span><small>Корзина</small>{cartCount > 0 && <b>{cartCount}</b>}
            </button>
          </div>
        </div>
        <nav className="main-nav" aria-label="Основная навигация">
          <div className="container nav-inner">
            <a className="catalog-link" href="#catalog"><span>☰</span> Каталог</a>
            <a href="#categories">Категории</a>
            <a href="#catalog">Бренды</a>
            <a href="#request">Запросить деталь</a>
            <a href="#contacts">Контакты</a>
            <div className="nav-contact"><span>Пн–Сб, 09:00–20:00</span><a href="tel:+74951240888">+7 (495) 124-08-88</a></div>
          </div>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Точный подбор · честная цена</span>
            <h1>Детали, которые<br /><em>едут дальше.</em></h1>
            <p>Подберём запчасти под ваш автомобиль, проверим совместимость и доставим от 2 часов.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#catalog">Перейти в каталог <span>→</span></a>
              <a className="secondary-button" href="#request">Подбор по VIN</a>
            </div>
            <div className="hero-stats">
              <span><strong>12 000+</strong><small>товаров в наличии</small></span>
              <span><strong>48 брендов</strong><small>с гарантией</small></span>
              <span><strong>15 минут</strong><small>на подбор</small></span>
            </div>
          </div>
          <div className="selector-card">
            <div className="selector-top">
              <span className="selector-icon">⌁</span>
              <div><strong>Найдите детали для авто</strong><small>Покажем только совместимые товары</small></div>
            </div>
            <label><span>Марка</span><select defaultValue=""><option value="" disabled>Выберите марку</option><option>Volkswagen</option><option>Toyota</option><option>Kia</option><option>LADA</option><option>BMW</option></select></label>
            <div className="selector-row">
              <label><span>Модель</span><select defaultValue=""><option value="" disabled>Модель</option><option>Polo</option><option>Camry</option><option>Rio</option></select></label>
              <label><span>Год</span><select defaultValue=""><option value="" disabled>Год</option><option>2024</option><option>2023</option><option>2022</option><option>2021</option></select></label>
            </div>
            <button className="primary-button full-button" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>Найти запчасти <span>→</span></button>
            <p className="vin-hint"><span>VIN</span> Не знаете параметры? <a href="#request">Подберём по VIN-коду</a></p>
          </div>
        </div>
      </section>

      <section className="category-section" id="categories">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow dark">Быстрый доступ</span><h2>Популярные категории</h2></div>
            <a href="#catalog">Смотреть весь каталог <span>→</span></a>
          </div>
          <div className="category-grid">
            {categories.map((item) => (
              <button className={`category-card tone-${item.tone}`} key={item.name} onClick={() => selectCategory(item.name)}>
                <span className="category-icon">{item.icon}</span>
                <span className="category-text"><strong>{item.name}</strong><small>{item.note}</small></span>
                <span className="round-arrow">↗</span>
              </button>
            ))}
          </div>
          <div className="benefit-row">
            <div><span>✓</span><p><strong>Гарантия совместимости</strong><small>Проверяем каждую деталь по VIN</small></p></div>
            <div><span>↯</span><p><strong>Доставка от 2 часов</strong><small>По Москве и области</small></p></div>
            <div><span>₽</span><p><strong>Удобная оплата</strong><small>Картой, наличными или по счёту</small></p></div>
          </div>
        </div>
      </section>

      <section className="catalog-section" id="catalog">
        <div className="container">
          <div className="catalog-title-row">
            <div><span className="eyebrow dark">Каталог</span><h2>{favoritesOnly ? "Избранные товары" : query ? `Поиск: «${query}»` : "Запчасти в наличии"}</h2></div>
            <div className="catalog-controls">
              <button className="filter-trigger" onClick={() => setFiltersOpen(true)}>☷ Фильтры {selectedBrands.length > 0 && <b>{selectedBrands.length}</b>}</button>
              <label className="sort-select">Сортировка:<select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Сортировка товаров"><option value="popular">По популярности</option><option value="price-low">Сначала дешевле</option><option value="price-high">Сначала дороже</option><option value="discount">По скидке</option></select></label>
            </div>
          </div>
          <div className="catalog-layout">
            <aside className="filters"><FilterPanel /></aside>
            <div className="product-area">
              <div className="results-line"><span>Найдено: <strong>{filteredProducts.length}</strong></span>{favoritesOnly && <button className="text-button" onClick={() => setFavoritesOnly(false)}>Показать все товары</button>}</div>
              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map((product) => {
                    const isFavorite = favorites.includes(product.id);
                    return (
                      <article className="product-card" key={product.id}>
                        <div className="product-image-wrap">
                          {product.badge && <span className={`product-badge ${product.badge.startsWith("–") ? "sale" : ""}`}>{product.badge}</span>}
                          <button className={`favorite-button ${isFavorite ? "active" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label={isFavorite ? `Удалить ${product.name} из избранного` : `Добавить ${product.name} в избранное`}>{isFavorite ? "♥" : "♡"}</button>
                          <ProductVisual kind={product.visual} name={product.name} />
                        </div>
                        <div className="product-body">
                          <div className="brand-line"><span>{product.brand}</span><small>{product.article}</small></div>
                          <h3>{product.name}</h3>
                          <span className={`stock ${product.stock.startsWith("Под заказ") ? "order" : ""}`}><i />{product.stock}</span>
                          <div className="price-row"><p><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</p><button onClick={() => addToCart(product.id)} aria-label={`Добавить ${product.name} в корзину`}>В корзину <span>+</span></button></div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state"><span>⌕</span><h3>Ничего не нашли</h3><p>Попробуйте изменить запрос или сбросить фильтры.</p><button className="secondary-button" onClick={() => { setQuery(""); setCategory("Все"); setSelectedBrands([]); setInStockOnly(false); setFavoritesOnly(false); }}>Сбросить фильтры</button></div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="request-section" id="request">
        <div className="container request-grid">
          <div className="request-copy">
            <span className="eyebrow">Нет детали в каталоге?</span>
            <h2>Найдём любую запчасть<br /><em>по VIN-коду</em></h2>
            <p>Опишите, что вам нужно. Менеджер проверит поставщиков, предложит оригинал и подходящие аналоги.</p>
            <ul><li><span>01</span> Ответим за 15 минут</li><li><span>02</span> Проверим совместимость</li><li><span>03</span> Дадим 2–3 варианта</li></ul>
          </div>
          <div className="request-form-card">
            {requestSent ? (
              <div className="success-message"><span>✓</span><h3>Заявка принята</h3><p>Это демо фронтенда: данные никуда не отправлены. В рабочей версии менеджер свяжется с вами.</p><button className="secondary-button" onClick={() => setRequestSent(false)}>Отправить ещё одну</button></div>
            ) : (
              <form onSubmit={submitRequest}>
                <div className="form-heading"><h3>Запросить деталь</h3><span>Бесплатно</span></div>
                <label>Имя<input required name="name" placeholder="Как к вам обращаться" /></label>
                <div className="form-row"><label>Телефон<input required name="phone" type="tel" placeholder="+7 (___) ___-__-__" /></label><label>VIN-код<input name="vin" placeholder="17 символов" maxLength={17} /></label></div>
                <label>Какая деталь нужна<textarea required name="part" placeholder="Например: передние тормозные колодки на Kia Rio 2020" rows={3} /></label>
                <button className="primary-button full-button" type="submit">Отправить заявку <span>→</span></button>
                <small className="form-note">Нажимая кнопку, вы соглашаетесь на обработку данных</small>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="contacts-section" id="contacts">
        <div className="container contacts-grid">
          <div>
            <span className="eyebrow dark">Мы рядом</span>
            <h2>Контакты и пункт выдачи</h2>
            <div className="contact-list">
              <div><span>⌖</span><p><small>Адрес</small><strong>Москва, ул. Автозаводская, 23А</strong><em>5 минут от метро «Автозаводская»</em></p></div>
              <div><span>◷</span><p><small>Режим работы</small><strong>Пн–Сб: 09:00–20:00</strong><em>Воскресенье: 10:00–18:00</em></p></div>
              <div><span>☎</span><p><small>Телефон</small><a href="tel:+74951240888">+7 (495) 124-08-88</a><em>Звонок по России бесплатный</em></p></div>
            </div>
            <div className="contact-buttons"><a className="primary-button" href="tel:+74951240888">Позвонить</a><a className="secondary-button" href="https://yandex.ru/maps/?text=Москва%20Автозаводская%2023А" target="_blank" rel="noreferrer">Построить маршрут ↗</a></div>
          </div>
          <div className="map-card" aria-label="Схема расположения пункта выдачи">
            <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
            <span className="map-label label-one">Автозаводская ул.</span><span className="map-label label-two">3-й Автозаводский пр.</span>
            <span className="metro-mark">M</span><span className="metro-label">Автозаводская</span>
            <span className="map-pin"><b>S</b><i /></span>
            <div className="map-popup"><strong>SEDOV</strong><small>Пункт выдачи · Открыто</small></div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-main">
          <a className="logo light" href="#top"><span className="logo-mark">S</span><span className="logo-type"><strong>SEDOV</strong><small>автозапчасти</small></span></a>
          <p>Запчасти с точным подбором<br />и гарантией совместимости.</p>
          <div className="footer-links"><a href="#catalog">Каталог</a><a href="#categories">Категории</a><a href="#request">Подбор по VIN</a><a href="#contacts">Контакты</a></div>
          <div className="footer-contact"><a href="tel:+74951240888">+7 (495) 124-08-88</a><span>Пн–Сб, 09:00–20:00</span></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 SEDOV. Демо-концепт магазина автозапчастей.</span><span>Цены на сайте не являются публичной офертой</span></div>
      </footer>

      {cartOpen && (
        <div className="drawer-overlay" role="presentation" onMouseDown={() => setCartOpen(false)}>
          <aside className="drawer cart-drawer" role="dialog" aria-modal="true" aria-label="Корзина" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-header"><div><span className="eyebrow dark">Ваш заказ</span><h2>Корзина <small>{cartCount}</small></h2></div><button onClick={() => setCartOpen(false)} aria-label="Закрыть корзину">×</button></div>
            {cartItems.length > 0 ? <>
              <div className="cart-list">{cartItems.map((product) => <div className="cart-item" key={product.id}><ProductVisual kind={product.visual} name={product.name} /><div className="cart-info"><small>{product.brand}</small><strong>{product.name}</strong><span>{formatPrice(product.price)}</span><div className="quantity"><button onClick={() => changeQuantity(product.id, -1)}>−</button><b>{cart[product.id]}</b><button onClick={() => changeQuantity(product.id, 1)}>+</button></div></div><button className="remove-item" onClick={() => changeQuantity(product.id, -cart[product.id])} aria-label={`Удалить ${product.name}`}>×</button></div>)}</div>
              <div className="cart-footer"><div><span>Итого</span><strong>{formatPrice(cartTotal)}</strong></div><button className="primary-button full-button" onClick={() => notify("Оформление будет доступно после подключения бэкенда")}>Перейти к оформлению <span>→</span></button><small>Доставка и срок будут рассчитаны при оформлении</small></div>
            </> : <div className="empty-cart"><span>▱</span><h3>Корзина пока пуста</h3><p>Добавьте нужные детали из каталога.</p><button className="primary-button" onClick={() => { setCartOpen(false); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}>В каталог</button></div>}
          </aside>
        </div>
      )}

      {filtersOpen && (
        <div className="drawer-overlay" role="presentation" onMouseDown={() => setFiltersOpen(false)}>
          <aside className="drawer filter-drawer" role="dialog" aria-modal="true" aria-label="Фильтры каталога" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-header"><h2>Фильтры</h2><button onClick={() => setFiltersOpen(false)} aria-label="Закрыть фильтры">×</button></div>
            <FilterPanel mobile />
          </aside>
        </div>
      )}

      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
    </main>
  );
}
