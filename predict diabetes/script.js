document.getElementById('diabetes-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        pregnancies: parseFloat(formData.get('pregnancies')),
        glucose: parseFloat(formData.get('glucose')),
        blood_pressure: parseFloat(formData.get('blood_pressure')),
        skin_thickness: parseFloat(formData.get('skin_thickness')),
        insulin: parseFloat(formData.get('insulin')),
        bmi: parseFloat(formData.get('bmi')),
        diabetes_pedigree_function: parseFloat(formData.get('diabetes_pedigree_function')),
        age: parseInt(formData.get('age'))
    };

    console.log(data);  // Tambahkan ini untuk memeriksa data yang akan dikirim ke server

    try {
        const queryString = new URLSearchParams(data).toString();
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        

        const result = await response.json();
        console.log(result);

        if (result.prediction === "Diabetes Terdeteksi") {
            localStorage.setItem("diabetesPrediction", "1");
            window.location.href = `/positiveresult.html?${queryString}`;
          } else {
            localStorage.setItem("diabetesPrediction", "0");
            window.location.href = `/negativeresult.html?${queryString}`;
          }
        document.getElementById('result').innerText = result.prediction || result.error;
    } catch (error) {
        document.getElementById('result').innerText = 'Terjadi kesalahan: ' + error.message;
    }
});

