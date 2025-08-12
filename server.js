const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Statik HTML, CSS, JS dosyalarını /public klasöründen sun
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


// API endpoint – /api/bes
app.get('/api/bes', (req, res) => {
  const dataPath = path.join(__dirname, 'bes.json');

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error("JSON okunamadı:", err);
      res.status(500).send("Veri okunurken hata oluştu.");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/api/ai', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send("Prompt eksik");
  }

  // Burada AI cevabını döndürürsün (şimdilik sabit simülasyon)
  const cevap = `İşlem yaptığınız konu: "${prompt}" için aşağıdaki öneriler sunulabilir:
- Devlet katkısı koşulları kontrol edilmeli.
- Hakediş süresi ve şartları gözden geçirilmeli.
- Gerekirse müşteri temsilcisine yönlendirme yapılmalı.`;

  res.send(cevap);
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`✅ Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

