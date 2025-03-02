const Contacts = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center text-green-800 mb-6">Контакты</h1>
                        {/* Google Map */}
                        <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Наше местоположение на карте</h2>
                <div className="w-full h-96">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.049721965276!2d30.742193876650628!3d46.4873278645953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631a3401c2891%3A0xcc2aea9a3a073518!2z0YPQuy4g0J_RgNC40LzQvtGA0YHQutCw0Y8sIDEyLCDQntC00LXRgdGB0LAsINCe0LTQtdGB0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDY1MDAw!5e0!3m2!1sru!2sua!4v1740879882198!5m2!1sru!2sua"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
            <p className="text-lg text-gray-700 mb-6">
                Благодарим вас за интерес к магазину <span className="font-semibold text-green-600">Nature`s Prophet</span>! Мы всегда готовы ответить на ваши вопросы и помочь вам с любыми проблемами. Если у вас возникли вопросы или вам нужна помощь, не стесняйтесь обращаться к нам.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Наши контактные данные</h2>
            <p className="text-lg text-gray-700 mb-2">
                <strong>Адрес:</strong> Приморська-12, Одеса, Україна
            </p>
            <p className="text-lg text-gray-700 mb-2">
                <strong>Телефон для связи:</strong> +380 (66) 134-80-11
            </p>
            <p className="text-lg text-gray-700 mb-2">
                <strong>Электронная почта:</strong> <a href="mailto:support@naturesprophet.com" className="text-green-600">gamer.woke@gmail.com</a>
            </p>

        </div>
    );
}

export default Contacts;
