import { useState, useEffect } from 'react';

const xmlData = `
  <?xml version="1.0" encoding="UTF-8"?>
  <cookbook>
    <dish>
      <type>Суп</type>
      <name>Борщ</name>
      <measure>грам</measure>
      <ingredient>
        <name>Капуста</name>
        <amount>200</amount>
      </ingredient>
      <ingredient>
        <name>Буряк</name>
        <amount>100</amount>
      </ingredient>
      <ingredient>
        <name>М'ясо</name>
        <amount>300</amount>
      </ingredient>
      <ingredient>
        <name>Картопля</name>
        <amount>200</amount>
      </ingredient>
      <recipe>Приготуйте бульйон з м'яса, додайте нарізану капусту, картоплю, буряк і варіть до готовності. Додайте приправи за смаком.</recipe>
      <calories>400</calories>
    </dish>

    <dish>
      <type>Салат</type>
      <name>Олів'є</name>
      <measure>грам</measure>
      <ingredient>
        <name>Картопля</name>
        <amount>300</amount>
      </ingredient>
      <ingredient>
        <name>Морква</name>
        <amount>100</amount>
      </ingredient>
      <ingredient>
        <name>Майонез</name>
        <amount>100</amount>
      </ingredient>
      <ingredient>
        <name>Ковбаса</name>
        <amount>200</amount>
      </ingredient>
      <ingredient>
        <name>Огірок</name>
        <amount>100</amount>
      </ingredient>
      <recipe>Варіть картоплю та моркву, наріжте всі інгредієнти кубиками, змішайте з майонезом.</recipe>
      <calories>500</calories>
    </dish>

    <dish>
      <type>Основна страва</type>
      <name>Котлета по-київськи</name>
      <measure>штука</measure>
      <ingredient>
        <name>Куряче філе</name>
        <amount>1</amount>
      </ingredient>
      <ingredient>
        <name>Вершкове масло</name>
        <amount>50</amount>
      </ingredient>
      <ingredient>
        <name>Панірувальні сухарі</name>
        <amount>100</amount>
      </ingredient>
      <recipe>Куряче філе начиніть маслом, обваляйте в сухарях, обсмажуйте на сковороді до золотистої скоринки.</recipe>
      <calories>700</calories>
    </dish>

    <dish>
      <type>Десерт</type>
      <name>Наполеон</name>
      <measure>грам</measure>
      <ingredient>
        <name>Листкове тісто</name>
        <amount>500</amount>
      </ingredient>
      <ingredient>
        <name>Вершковий крем</name>
        <amount>300</amount>
      </ingredient>
      <ingredient>
        <name>Цукор</name>
        <amount>100</amount>
      </ingredient>
      <recipe>Розкачайте листкове тісто, випікайте шари, змащуйте вершковим кремом та складіть торт.</recipe>
      <calories>900</calories>
    </dish>

    <dish>
      <type>Основна страва</type>
      <name>Плов</name>
      <measure>грам</measure>
      <ingredient>
        <name>Рис</name>
        <amount>300</amount>
      </ingredient>
      <ingredient>
        <name>М'ясо</name>
        <amount>400</amount>
      </ingredient>
      <ingredient>
        <name>Морква</name>
        <amount>100</amount>
      </ingredient>
      <ingredient>
        <name>Цибуля</name>
        <amount>100</amount>
      </ingredient>
      <recipe>Обсмажте м'ясо з цибулею та морквою, додайте рис, залийте водою та тушкуйте до готовності.</recipe>
      <calories>600</calories>
    </dish>

    <dish>
      <type>Суп</type>
      <name>Курячий бульйон</name>
      <measure>літр</measure>
      <ingredient>
        <name>Курка</name>
        <amount>500</amount>
      </ingredient>
      <ingredient>
        <name>Морква</name>
        <amount>100</amount>
      </ingredient>
      <ingredient>
        <name>Цибуля</name>
        <amount>100</amount>
      </ingredient>
      <recipe>Варіть курку з морквою та цибулею на повільному вогні, додайте спеції за смаком.</recipe>
      <calories>350</calories>
    </dish>

    <dish>
      <type>Салат</type>
      <name>Грецький салат</name>
      <measure>грам</measure>
      <ingredient>
        <name>Огірок</name>
        <amount>200</amount>
      </ingredient>
      <ingredient>
        <name>Помідор</name>
        <amount>200</amount>
      </ingredient>
      <ingredient>
        <name>Сир фета</name>
        <amount>150</amount>
      </ingredient>
      <ingredient>
        <name>Оливки</name>
        <amount>50</amount>
      </ingredient>
      <recipe>Наріжте овочі, додайте сир фета та оливки, приправте оливковою олією та орегано.</recipe>
      <calories>300</calories>
    </dish>

    <dish>
      <type>Десерт</type>
      <name>Чізкейк</name>
      <measure>грам</measure>
      <ingredient>
        <name>Печиво</name>
        <amount>200</amount>
      </ingredient>
      <ingredient>
        <name>Сир маскарпоне</name>
        <amount>400</amount>
      </ingredient>
      <ingredient>
        <name>Цукор</name>
        <amount>100</amount>
      </ingredient>
      <recipe>Змішайте подрібнене печиво з маскарпоне та цукром, випікайте в духовці до готовності.</recipe>
      <calories>800</calories>
    </dish>

    <dish>
      <type>Основна страва</type>
      <name>Смажена риба</name>
      <measure>грам</measure>
      <ingredient>
        <name>Риба</name>
        <amount>300</amount>
      </ingredient>
      <ingredient>
        <name>Олія</name>
        <amount>50</amount>
      </ingredient>
      <recipe>Обсмажте рибу на олії до золотистої скоринки, додайте приправи за смаком.</recipe>
      <calories>450</calories>
    </dish>

    <dish>
      <type>Салат</type>
      <name>Цезар</name>
      <measure>грам</measure>
      <ingredient>
        <name>Курка</name>
        <amount>200</amount>
      </ingredient>
      <ingredient>
        <name>Салат айсберг</name>
        <amount>150</amount>
      </ingredient>
      <ingredient>
        <name>Сир пармезан</name>
        <amount>50</amount>
      </ingredient>
      <ingredient>
        <name>Грінки</name>
        <amount>50</amount>
      </ingredient>
      <recipe>Обсмажте курку, наріжте салат, додайте грінки та сир, заправте соусом цезар.</recipe>
      <calories>400</calories>
    </dish>
    
  </cookbook>
`;

const parseXML = (xml: Document) => {
  const dishes = Array.from(xml.getElementsByTagName('dish'));

  return dishes.map((dish) => ({
    type: dish.getElementsByTagName('type')[0].textContent,
    name: dish.getElementsByTagName('name')[0].textContent,
    measure: dish.getElementsByTagName('measure')[0].textContent,
    ingredients: Array.from(dish.getElementsByTagName('ingredient')).map((ingredient) => ({
      name: ingredient.getElementsByTagName('name')[0].textContent,
      amount: ingredient.getElementsByTagName('amount')[0].textContent,
    })),
    recipe: dish.getElementsByTagName('recipe')[0].textContent,
    calories: dish.getElementsByTagName('calories')[0].textContent,
  }));
};

const numberToWords = (num: string) => {
  const words: { [key: string]: string } = {
    "0": "нуль", "1": "один", "2": "два", "3": "три",
    "4": "чотири", "5": "п'ять", "6": "шість", "7": "сім",
    "8": "вісім", "9": "дев'ять",
  };

  return num.split('').map(digit => words[digit] || digit).join(' ');
};

const Home = () => {
  const [dishes, setDishes] = useState<any[]>([]);
  const [displayMode, setDisplayMode] = useState<string>('text');

  useEffect(() => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData.trim(), 'application/xml');
    const parsedDishes = parseXML(xmlDoc);
    setDishes(parsedDishes);
  }, []);

  const renderDishes = () => {
    switch (displayMode) {
      case 'text':
        return (
          <div className="space-y-4">
            {dishes.map((dish, index) => (
              <div key={index} className="border-b border-gray-300 pb-4 mb-4">
                <p><strong>Тип:</strong> {dish.type}</p>
                <p><strong>Назва:</strong> {dish.name}</p>
                <p><strong>Одиниці виміру:</strong> {dish.measure}</p>
                <p><strong>Інгредієнти:</strong></p>
                <ul className="ml-4 list-disc">
                  {dish.ingredients.map((ingredient: any, idx: number) => (
                    <li key={idx}>{ingredient.name} - {ingredient.amount}</li>
                  ))}
                </ul>
                <p><strong>Рецепт:</strong> {dish.recipe}</p>
                <p><strong>Калорії:</strong> {dish.calories}</p>
              </div>
            ))}
          </div>
        );

      case 'table':
        return (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Тип</th>
                <th className="border px-4 py-2">Назва</th>
                <th className="border px-4 py-2">Одиниці виміру</th>
                <th className="border px-4 py-2">Інгредієнти</th>
                <th className="border px-4 py-2">Рецепт</th>
                <th className="border px-4 py-2">Калорії</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2 text-center">{dish.type}</td>
                  <td className="border px-4 py-2 text-center">{dish.name}</td>
                  <td className="border px-4 py-2 text-center">{dish.measure}</td>
                  <td className="border px-4 py-2">
                    <ul className="list-disc space-y-1">
                      {dish.ingredients.map((ingredient: any, idx: number) => (
                        <li key={idx} className="flex justify-between gap-5">
                          <span>{ingredient.name}</span>
                          <span className="font-semibold">{ingredient.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2 text-justify">{dish.recipe}</td>
                  <td className="border px-4 py-2 text-center">{dish.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'tableWithWords':
        return (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Тип</th>
                <th className="border px-4 py-2">Назва</th>
                <th className="border px-4 py-2">Одиниці виміру</th>
                <th className="border px-4 py-2">Інгредієнти</th>
                <th className="border px-4 py-2">Рецепт</th>
                <th className="border px-4 py-2">Калорії</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2 text-center">{dish.type}</td>
                  <td className="border px-4 py-2 text-center">{dish.name}</td>
                  <td className="border px-4 py-2 text-center">{dish.measure}</td>
                  <td className="border px-4 py-2">
                    <ul className="list-disc space-y-1">
                      {dish.ingredients.map((ingredient: any, idx: number) => (
                        <li key={idx} className="flex justify-between gap-5">
                          <span>{ingredient.name}</span>
                          <span className="font-semibold">{numberToWords(ingredient.amount)}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2 text-justify">{dish.recipe}</td>
                  <td className="border px-4 py-2 text-center">{numberToWords(dish.calories)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Список страв</h1>
      <div className="mb-4 space-x-4">
        <select
          value={displayMode}
          onChange={(e) => setDisplayMode(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="text">Текстовий формат</option>
          <option value="table">Таблиця</option>
          <option value="tableWithWords">Таблиця з текстовими числами</option>
        </select>
      </div>

      { renderDishes() }
    </div>
  );
};

export default Home;