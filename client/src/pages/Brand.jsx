import { useEffect, useState } from 'react';
import BrandService from '../services/BrandService';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await BrandService.fetchBrands();
        setBrands(response.data);
        setLoading(false);
      } catch (e) {
        setError('Не удалось загрузить бренды', e);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-6">Все Бренды</h1>

      <p className="text-lg text-gray-700 mb-6">
        Добро пожаловать на страницу брендов магазина <span className="font-semibold text-green-600">Nature`s Prophet</span>! Мы собрали для вас лучшие бренды, предлагающие товары для дома и сада.  
        У нас вы найдете широкий выбор продукции от надежных производителей, которые заботятся о качестве, долговечности и экологичности своих товаров.
      </p>

      <p className="text-lg text-gray-700 mb-6">
        В <span className="font-semibold text-green-600">Nature`s Prophet</span> мы верим, что каждый дом заслуживает уюта, а сад — процветания. Наши бренды помогают воплотить эти идеи в жизнь, предлагая продукцию от проверенных поставщиков.  
        Вы можете выбрать товары известных производителей или открыть для себя новые, перспективные бренды.  
        Все представленные бренды тщательно отобраны и соответствуют высоким стандартам качества.
      </p>

      {loading && <p className="text-center text-gray-500">Загрузка...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.length > 0 ? (
          brands.sort((a, b) => a.name.localeCompare(b.name)).map((brand) => (
            <div key={brand.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800">{brand.name}</h2>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Нет брендов для отображения.</p>
        )}
      </div>

      <p className="text-lg text-gray-700 mt-8">
        Следите за обновлениями, так как мы постоянно расширяем ассортимент!  
    
      </p>
      <p className="text-lg text-gray-700 mt-8">
      Если у вас есть вопросы по брендам или вы хотите предложить сотрудничество, свяжитесь с нами по электронной почте:<a href="mailto:support@naturesprophet.com" className="text-green-600"> gamer.woke@gmail.com</a>.
      </p>
    </div>
  );
};

export default BrandsPage;
