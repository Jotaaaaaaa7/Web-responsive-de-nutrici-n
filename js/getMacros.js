
// ? Función para obtener los macronutrientes recomendados según los datos introducidos en el formulario

const getMacros = () => {

  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita que se envíe el formulario

      const sexo = document.getElementById('sexo').value;
      const edad = document.getElementById('edad').value;
      const peso = document.getElementById('peso').value;
      const altura = document.getElementById('altura').value;
      const nivelActividad = document.getElementById('nivel-actividad').value;
      const objetivo = document.getElementById('objetivo').value;

      const resultsDiv = document.getElementById('results');

      // que al clickar 1 vez en el boton de aceptar, la alerta desaparezca
      if (sexo === '' || edad === '' || peso === '' || altura === '' || nivelActividad === '' || objetivo === '') {
          resultsDiv.style.display = 'block';
          return resultsDiv.innerHTML = `<p style='color: red'>Por favor, rellena todos los campos</p>`;
      }


      // Fórmula de Harris-Benedict
      let tmb;
      if (sexo === 'masculino') {
          tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
      } else {
          tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
      }

      // TO-DO Fórmula de Katch-McArdle ---> Añadir input para % de grasa corporal (Opcional para deportistas)

      // Consumo calórico según objetivo
      let kcalTot;
      if (nivelActividad === 'sedentario') {
          kcalTot = tmb * 1.2;
      } else if (nivelActividad === 'ligero') {
          kcalTot = tmb * 1.375;
      } else if (nivelActividad === 'moderado') {
          kcalTot = tmb * 1.55;
      } else if (nivelActividad === 'activo') {
          kcalTot = tmb * 1.725;
      } else if (nivelActividad === 'muy-activo') {
          kcalTot = tmb * 1.9;
      } else {
          kcalTot = tmb * 2.2;
      }



      // Consideraciones: 1 gr de proteína ---> 4 kcal, 1 gr de carbohidratos ---> 4 kcal, 1 gr de grasa ---> 9 kcal


      // proteínas: 30% & carbohidratos: 45% & grasas: 25%
      if (objetivo === 'perder-peso') {
          kcalTot -= 400;
          prot = Math.round(kcalTot * 0.3 / 4);
          carb = Math.round(kcalTot * 0.45 / 4);
          fat = Math.round(kcalTot * 0.25 / 9);
      }

      // proteínas: 35% & carbohidratos: 35% & grasas: 30%
      else if (objetivo === 'perder-peso-rapido') {
          kcalTot -= 800;
          prot = Math.round(kcalTot * 0.35 / 4);
          carb = Math.round(kcalTot * 0.35 / 4);
          fat = Math.round(kcalTot * 0.3 / 9);
      }

      // proteínas: 25% & carbohidratos: 55% & grasas: 20%
      else if (objetivo === 'ganar-peso') {
          kcalTot += 800;
          prot = Math.round(kcalTot * 0.25 / 4);
          carb = Math.round(kcalTot * 0.55 / 4);
          fat = Math.round(kcalTot * 0.2 / 9);
      }

      // proteínas: 20% & carbohidratos: 60% & grasas: 20%
      else if (objetivo === 'ganar-peso-rapido') {
          kcalTot += 800;
          prot = Math.round(kcalTot * 0.2 / 4);
          carb = Math.round(kcalTot * 0.6 / 4);
          fat = Math.round(kcalTot * 0.2 / 9);
      }

      // proteínas: 35% & carbohidratos: 45% & grasas: 25%
      else {
          kcalTot = kcalTot;
          prot = Math.round(kcalTot * 0.35 / 4);
          carb = Math.round(kcalTot * 0.45 / 4);
          fat = Math.round(kcalTot * 0.25 / 9);
      }

      kcalTot = Math.round(kcalTot);

      console.log(`Proteinas: ${prot} gr | Carbohidratos: ${carb} gr | Grasas: ${fat} gr | Consumo Recomendado: ${kcalTot} kcal`);
      console.log(`sexo: ${sexo} | edad: ${edad} | peso: ${peso} | altura: ${altura} | nivelActividad: ${nivelActividad} | objetivo: ${objetivo}`);

      // Ejemplo de cómo mostrar los resultados en un elemento <div>


      // Añadir la TMB en los resultados y decir si se está o no en riesgo

      let IMC = peso / ((altura / 100) ** 2)

      let IMC_Message = ''

      if (IMC < 18.5) {
          IMC_Message = `<div class="alert alert-info" role="alert">
          IMC = ${IMC.toFixed(0)} ---->  Infrapeso
      </div>`
      }

      else if (IMC >= 18.5 && IMC < 24.9) {
          IMC_Message = `<div class="alert alert-success" role="alert">
          IMC = ${IMC.toFixed(1)} ---->  Peso Normal
      </div>`
      }

      else if (IMC >= 25 && IMC < 29.9) {
          IMC_Message = `<div class="alert alert-warning" role="alert">
          IMC = ${IMC.toFixed(0)} ---->  Sobrepeso
      </div>`
      }

      else {
          IMC_Message = `<div class="alert alert-danger" role="alert">
          IMC = ${IMC.toFixed(0)} ---->  Obesidad
      </div>`
      }






      resultsDiv.style.display = 'block';

      return resultsDiv.innerHTML = `
      <p>Proteinas: ${prot} gr</p>
      <p>Carbohidratos: ${carb} gr</p>
      <p>Grasas: ${fat} gr</p>
      <p>Consumo Recomendado: ${kcalTot} kcal</p>
      ${IMC_Message}
      `;









  });
}