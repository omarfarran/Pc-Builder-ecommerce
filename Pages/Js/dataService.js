async function getProducts() {
    try {
        // تأكد من المسار بناءً على مكان ملف الـ JS
        const res = await fetch("../Php/get_products.php");

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const text = await res.text(); // نجلب النص أولاً لفحصه
        try {
            return JSON.parse(text); // نحاول تحويله لـ JSON
        } catch (e) {
            console.error("The server did not return valid JSON:", text);
            return [];
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}