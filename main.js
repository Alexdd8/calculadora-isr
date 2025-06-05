function calcularISR() {
  const ingreso = parseFloat(document.getElementById("ingreso").value);
  const deducciones = parseFloat(document.getElementById("deducciones").value) || 0;
  const resultado = document.getElementById("resultado");

  if (isNaN(ingreso) || ingreso <= 0) {
    resultado.innerHTML = "<p>Por favor ingresa un ingreso válido.</p>";
    return;
  }

  const ingresoGravable = ingreso - deducciones;

  if (ingresoGravable <= 0) {
    resultado.innerHTML = "<p>Con las deducciones ingresadas, no hay ingreso gravable.</p>";
    return;
  }

  const tablaISR = [
    { limInf: 0.01, limSup: 746.04, cuotaFija: 0.00, porcentaje: 1.92 },
    { limInf: 746.05, limSup: 6332.05, cuotaFija: 14.32, porcentaje: 6.40 },
    { limInf: 6332.06, limSup: 11128.01, cuotaFija: 371.83, porcentaje: 10.88 },
    { limInf: 11128.02, limSup: 12935.81, cuotaFija: 893.63, porcentaje: 16.00 },
    { limInf: 12935.82, limSup: 15487.71, cuotaFija: 1182.88, porcentaje: 17.92 },
    { limInf: 15487.72, limSup: 31236.49, cuotaFija: 1640.18, porcentaje: 21.36 },
    { limInf: 31236.50, limSup: 49233.00, cuotaFija: 5004.12, porcentaje: 23.52 },
    { limInf: 49233.01, limSup: 93993.90, cuotaFija: 9236.89, porcentaje: 30.00 },
    { limInf: 93993.91, limSup: 125325.20, cuotaFija: 22665.17, porcentaje: 32.00 },
    { limInf: 125325.21, limSup: 375975.61, cuotaFija: 32691.18, porcentaje: 34.00 },
    { limInf: 375975.62, limSup: Infinity, cuotaFija: 117912.32, porcentaje: 35.00 }
  ];

  const rango = tablaISR.find(r => ingresoGravable >= r.limInf && ingresoGravable <= r.limSup);
  const excedente = ingresoGravable - rango.limInf;
  const impuesto = rango.cuotaFija + (excedente * (rango.porcentaje / 100));

  resultado.innerHTML = `
    <p><strong>Ingreso mensual:</strong> $${ingreso.toFixed(2)}</p>
    <p><strong>Deducciones:</strong> $${deducciones.toFixed(2)}</p>
    <p><strong>Ingreso gravable:</strong> $${ingresoGravable.toFixed(2)}</p>
    <p><strong>ISR estimado:</strong> $${impuesto.toFixed(2)}</p>
    <p><em>Calculado según tarifas vigentes del SAT 2024</em></p>
  `;
}
function descargarPDF() {
  const elemento = document.getElementById("resultado");

  if (!elemento.innerText.trim()) {
    alert("Primero calcula el ISR antes de descargar el PDF.");
    return;
  }

  const opciones = {
    margin:       0.5,
    filename:     'resultado_ISR_2024.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opciones).from(elemento).save();
}
