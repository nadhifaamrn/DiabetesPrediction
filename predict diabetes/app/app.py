from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import os
import joblib

app = Flask(__name__)
CORS(app)

# Menentukan jalur model yang benar
model = load_model('D:/Semester 3/AI/predict diabetes/model/diabetes_model.h5')
scaler = joblib.load('D:/Semester 3/AI/predict diabetes/model/scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Mendapatkan data dari request POST
        data = request.get_json(force=True)
        
        # Log data yang diterima
        print("Data yang diterima:", data)
        
        # Check if the necessary data is provided
        if not all(k in data for k in ['pregnancies', 'glucose', 'blood_pressure', 'skin_thickness', 'insulin', 'bmi', 'diabetes_pedigree_function', 'age']):
            return jsonify({'error': 'Missing required fields'}), 400

        # Menangani input data
        pregnancies = data['pregnancies']
        glucose = data['glucose']
        blood_pressure = data['blood_pressure']
        skin_thickness = data['skin_thickness']
        insulin = data['insulin']
        bmi = data['bmi']
        diabetes_pedigree_function = data['diabetes_pedigree_function']
        age = data['age']

        # Menyiapkan data input ke dalam bentuk array numpy
        input_data = np.array([[pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age]])

        # Normalisasi input data menggunakan scaler yang telah di-fit
        input_data_scaled = scaler.transform(input_data)  # Lakukan normalisasi

        # Melakukan prediksi dengan model
        prediction = model.predict(input_data_scaled)

        # Mengambil hasil prediksi, jika > 0.5, berarti positif diabetes
        result = 1 if prediction[0][0] > 0.5 else 0

        # Mengembalikan hasil prediksi dalam bentuk JSON
        if result == 1:
            return jsonify({'prediction': 'Diabetes Terdeteksi'})
        else:
            return jsonify({'prediction': 'Tidak Terkena Diabetes'})
    
    except Exception as e:
        # Handle any errors that occur
        print(f"Terjadi error: {str(e)}")  # Menampilkan error yang terjadi
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)