// функция для отправки запроса (асинх)
const postData = async (url, data) => {
    let result = await fetch(url, {
        method: 'POST',
        body: data
    });
    return await result.text();
};

const getResurce = async (url) => {
    let result = await fetch(url);
    if(!result.ok) {
        throw new Error(`Нет возможности получить запрос по адресу ${url},
                         статус запроса: ${result.status}`);
    }
    return await result.json();
};

export {postData, getResurce};