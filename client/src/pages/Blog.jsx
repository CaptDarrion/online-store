import { useState } from "react";

const Blog = () => {
    const blogs = [
        { 
            id: 1, 
            title: "Как ухаживать за растениями", 
            description: "Подробное руководство по уходу за различными видами растений в домашних условиях.", 
            fullText: "Полный текст статьи о том, как правильно ухаживать за растениями, включая полив, освещение, пересадку и удобрения. Этот материал поможет вам сохранить здоровье ваших растений в любое время года.", 
            date: "2025-03-01", 
            category: "Уход за растениями" 
        },
        { 
            id: 2, 
            title: "5 лучших растений для вашего дома", 
            description: "Какие растения не только украсят ваш интерьер, но и улучшат качество воздуха в доме.", 
            fullText: "Полный текст статьи о пяти самых популярных растениях для дома, которые обладают не только декоративными свойствами, но и очищают воздух, делая его более свежим и чистым.", 
            date: "2025-02-25", 
            category: "Декор" 
        },
        // Добавьте другие блоги по аналогии
    ];

    // Состояние для отслеживания открытых блогов
    const [activeBlogId, setActiveBlogId] = useState(null);

    // Обработчик клика по кнопке "Читать далее"
    const toggleFullText = (id) => {
        setActiveBlogId(activeBlogId === id ? null : id);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Наш блог</h1>

            {/* Фильтр по категориям */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Категории</h2>
                <select className="w-full p-3 border border-gray-300 rounded">
                    <option value="">Все категории</option>
                    <option value="Уход за растениями">Уход за растениями</option>
                    <option value="Декор">Декор</option>
                    {/* Добавьте другие категории */}
                </select>
            </div>

            {/* Список блогов */}
            <div>
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h2>
                        <p className="text-gray-600 mb-2">{blog.description}</p>
                        <p className="text-sm text-gray-500 mb-4">Категория: {blog.category}</p>
                        <p className="text-xs text-gray-400 mb-4">Дата публикации: {blog.date}</p>

                        {/* Показ полного текста блога, если выбран */}
                        {activeBlogId === blog.id && (
                            <p className="text-gray-700 mb-4">{blog.fullText}</p>
                        )}

                        <button
                            onClick={() => toggleFullText(blog.id)}
                            className="text-blue-600 hover:underline"
                        >
                            {activeBlogId === blog.id ? "Скрыть" : "Читать далее"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Кнопка для добавления нового блога */}
            <div className="text-center mt-8">
                <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-800 transition">
                    Написать новый блог
                </button>
            </div>
        </div>
    );
}

export default Blog;
