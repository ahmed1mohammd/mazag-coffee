# موقع بار كوفي - Coffee Shop Website

موقع ويب احترافي لمقهى بار كوفي مصمم باستخدام Tailwind CSS و JavaScript مع دعم كامل للغة العربية.

## المميزات

- **تصميم متجاوب**: يعمل بشكل مثالي على جميع الأجهزة (الهواتف الذكية، الأجهزة اللوحية، أجهزة الكمبيوتر)
- **دعم اللغة العربية**: نص من اليمين إلى اليسار (RTL) مع خط Cairo الجميل
- **تفاعلي**: أزرار تفاعلية مع إشعارات وتأثيرات بصرية
- **تصميم حديث**: ألوان القهوة الدافئة مع تدرجات جميلة
- **أقسام متكاملة**: 
  - قسم البطل (Hero Section)
  - قسم المميزات
  - عرض الشهر مع برنامج المكافآت
  - المنتجات الشائعة
  - مواقع الفروع
  - تذييل شامل

## الملفات

- `index.html` - الملف الرئيسي للموقع
- `script.js` - ملف JavaScript للتفاعلات
- `README.md` - هذا الملف

## كيفية تشغيل الموقع

### الطريقة الأولى: فتح الملف مباشرة
1. انتقل إلى مجلد المشروع
2. اضغط مرتين على ملف `index.html`
3. سيفتح الموقع في المتصفح الافتراضي

### الطريقة الثانية: استخدام خادم محلي
```bash
# إذا كان لديك Python مثبت
cd coffee-shop-website
python -m http.server 8000

# أو إذا كان لديك Node.js مثبت
npx serve .
```

ثم افتح المتصفح وانتقل إلى `http://localhost:8000`

## التقنيات المستخدمة

- **HTML5**: هيكل الموقع
- **Tailwind CSS**: التصميم والتنسيق (عبر CDN)
- **JavaScript**: التفاعلات والحركات
- **Google Fonts**: خط Cairo للنصوص العربية

## المميزات التفاعلية

- **التنقل السلس**: انتقال سلس بين الأقسام عند النقر على روابط التنقل
- **القائمة المتجاوبة**: قائمة تنقل خاصة للهواتف الذكية
- **تأثيرات الحركة**: تأثيرات بصرية عند التمرير والتفاعل
- **الإشعارات**: رسائل تأكيد عند النقر على الأزرار
- **تأثيرات التمرير**: إخفاء وإظهار الرأس عند التمرير

## التخصيص

يمكنك تخصيص الموقع بسهولة من خلال:

1. **الألوان**: تعديل متغيرات الألوان في قسم `tailwind.config`
2. **النصوص**: تغيير المحتوى النصي في ملف HTML
3. **الصور**: استبدال الصور الوهمية بصور حقيقية
4. **التفاعلات**: إضافة المزيد من التفاعلات في ملف JavaScript

## الدعم

الموقع متوافق مع جميع المتصفحات الحديثة:
- Chrome
- Firefox  
- Safari
- Edge

