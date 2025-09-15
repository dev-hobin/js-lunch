var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _element, _value, _select, _select2;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class Select {
  constructor({ id, name, options, onChange, className }) {
    __privateAdd(this, _element);
    __privateAdd(this, _value);
    __privateSet(this, _element, document.createElement("select"));
    __privateGet(this, _element).name = name;
    __privateGet(this, _element).id = id;
    __privateGet(this, _element).className = className;
    __privateGet(this, _element).innerHTML = `${options.map((option) => `<option value="${option}">${option}</option>`).join("\n")}`;
    __privateSet(this, _value, options[0]);
    __privateGet(this, _element).addEventListener("change", (event) => {
      __privateSet(this, _value, event.target.value);
      onChange == null ? void 0 : onChange(event.target.value);
    });
  }
  get element() {
    return __privateGet(this, _element);
  }
  get value() {
    return __privateGet(this, _value);
  }
}
_element = new WeakMap();
_value = new WeakMap();
class CategoryFilter {
  constructor({ id, name, options, onChange }) {
    __privateAdd(this, _select);
    __privateSet(this, _select, new Select({
      id,
      name,
      options,
      onChange,
      className: "restaurant-filter"
    }));
  }
  get element() {
    return __privateGet(this, _select).element;
  }
  get category() {
    return __privateGet(this, _select).value;
  }
}
_select = new WeakMap();
const RESTAURANT_CATEGORY_IMAGES = {
  한식: "/assets/category-korean.png",
  중식: "/assets/category-chinese.png",
  일식: "/assets/category-japanese.png",
  양식: "/assets/category-western.png",
  아시안: "/assets/category-asian.png",
  기타: "/assets/category-etc.png"
};
function createRestaurantListItem({
  category,
  name,
  distanceTime,
  description
}) {
  const restaurantListItem = document.createElement("li");
  restaurantListItem.classList.add("restaurant");
  restaurantListItem.innerHTML = `
  <div class="restaurant__category">
    <img
      src="${RESTAURANT_CATEGORY_IMAGES[category] || RESTAURANT_CATEGORY_IMAGES["기타"]}"
      alt="${category}"
      class="category-icon"
    />
  </div>
  <div class="restaurant__info">
    <h3 class="restaurant__name text-subtitle">${name}</h3>
    <span class="restaurant__distance text-body"
      >캠퍼스부터 ${distanceTime}분 내</span
    >
    <p class="restaurant__description text-body">
      ${description}
    </p>
  </div>`;
  return restaurantListItem;
}
const RESTAURANTS = [
  {
    category: "한식",
    name: "피양콩할마니",
    distanceTime: 10,
    description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다."
  },
  {
    category: "중식",
    name: "친친",
    distanceTime: 5,
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다"
  },
  {
    category: "일식",
    name: "잇쇼우",
    distanceTime: 10,
    description: "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다"
  },
  {
    category: "양식",
    name: "이태리키친",
    distanceTime: 20,
    description: "늘 변화를 추구하는 이태리키친입니다."
  },
  {
    category: "아시안",
    name: "호아빈 삼성점",
    distanceTime: 15,
    description: "푸짐한 양에 국물이 일품인 쌀국수"
  },
  {
    category: "기타",
    name: "도스타코스 선릉점",
    distanceTime: 5,
    description: "멕시칸 캐주얼 그릴"
  }
];
const CATEGORIES = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타"
];
class SortingFilter {
  constructor({ id, name, options, onChange }) {
    __privateAdd(this, _select2);
    __privateSet(this, _select2, new Select({
      id,
      name,
      options,
      onChange,
      className: "restaurant-filter"
    }));
  }
  get element() {
    return __privateGet(this, _select2).element;
  }
  get sorting() {
    return __privateGet(this, _select2).value;
  }
}
_select2 = new WeakMap();
console.log("npm run dev 명령어를 통해 점심 뭐 먹지 미션을 시작하세요");
console.log(
  "%c ___       ___  ___  ________   ________  ___  ___     \n|\\  \\     |\\  \\|\\  \\|\\   ___  \\|\\   ____\\|\\  \\|\\  \\    \n\\ \\  \\    \\ \\  \\\\\\  \\ \\  \\\\ \\  \\ \\  \\___|\\ \\  \\\\\\  \\   \n \\ \\  \\    \\ \\  \\\\\\  \\ \\  \\\\ \\  \\ \\  \\    \\ \\   __  \\  \n  \\ \\  \\____\\ \\  \\\\\\  \\ \\  \\\\ \\  \\ \\  \\____\\ \\  \\ \\  \\ \n   \\ \\_______\\ \\_______\\ \\__\\\\ \\__\\ \\_______\\ \\__\\ \\__\\\n    \\|_______|\\|_______|\\|__| \\|__|\\|_______|\\|__|\\|__|",
  "color: #d81b60; font-size: 14px; font-weight: bold;"
);
addEventListener("load", () => {
  const body = document.querySelector("body");
  const filterContainer = body.querySelector(".restaurant-filter-container");
  const categoryFilter = new CategoryFilter({
    id: "category-filter",
    name: "category",
    options: CATEGORIES,
    onChange: (category) => {
      renderRestaurantList({ category, sorting: sortingFilter.sorting });
    }
  });
  const sortingFilter = new SortingFilter({
    id: "sorting-filter",
    name: "sorting",
    options: ["기본순", "이름순", "거리순"],
    onChange: (sorting) => {
      renderRestaurantList({ category: categoryFilter.category, sorting });
    }
  });
  filterContainer.append(categoryFilter.element, sortingFilter.element);
  const restaurantList = body.querySelector(".restaurant-list");
  const restaurantItems = RESTAURANTS.map(
    (restaurant) => createRestaurantListItem(restaurant)
  );
  restaurantList.append(...restaurantItems);
});
function renderRestaurantList({ category, sorting }) {
  const body = document.querySelector("body");
  const restaurantList = body.querySelector(".restaurant-list");
  const restaurantItems = RESTAURANTS.filter(
    (restaurant) => category === "전체" ? true : restaurant.category === category
  ).sort((a, b) => {
    if (sorting === "이름순") {
      return a.name.localeCompare(b.name);
    }
    if (sorting === "거리순") {
      return a.distanceTime - b.distanceTime;
    }
    return 0;
  }).map((restaurant) => createRestaurantListItem(restaurant));
  restaurantList.replaceChildren(...restaurantItems);
}
