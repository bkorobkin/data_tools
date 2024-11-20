// Import libraries (make sure you install them via npm)
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import { CodiceFiscale } from "codice-fiscale";

// 1. Barcode Generator
document.getElementById("generateBarcode").addEventListener("click", () => {
  const data = document.getElementById("barcodeInput").value;
  if (!data) {
    alert("Please enter data for the barcode");
    return;
  }
  const barcodeElement = document.getElementById("barcodeOutput");
  JsBarcode(barcodeElement, data, { format: "CODE128" });
});

// 2. QR Code Generator
document.getElementById("generateQR").addEventListener("click", async () => {
  const data = document.getElementById("qrInput").value;
  if (!data) {
    alert("Please enter data for the QR code");
    return;
  }
  const qrCodeElement = document.getElementById("qrOutput");
  const qrCode = await QRCode.toDataURL(data);
  qrCodeElement.innerHTML = `<img src="${qrCode}" alt="QR Code">`;
});

// 3. Image to Base64
document.getElementById("imageUpload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    alert("Please select an image file");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("base64Output").textContent = e.target.result;
  };
  reader.readAsDataURL(file);
});

// 4. Get Current Milliseconds
document.getElementById("getMillis").addEventListener("click", () => {
  const currentMillis = Date.now().toString();
  document.getElementById("millisOutput").textContent = currentMillis;
});

// 5. Generate Codice Fiscale
document.getElementById("generateCF").addEventListener("click", () => {
  const randomCF = CodiceFiscale.generate({
    name: getRandomName(),
    surname: getRandomSurname(),
    gender: Math.random() > 0.5 ? "M" : "F",
    birthDate: new Date(1990 + Math.random() * 30, Math.random() * 12, Math.random() * 28),
    birthplace: "Roma",
  });
  document.getElementById("cfOutput").textContent = randomCF;
});

// Helper functions for random names
function getRandomName() {
  const names = ["Luca", "Marco", "Anna", "Maria"];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomSurname() {
  const surnames = ["Rossi", "Bianchi", "Verdi", "Esposito"];
  return surnames[Math.floor(Math.random() * surnames.length)];
}
