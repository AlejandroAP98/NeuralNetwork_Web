import './browser.mjs';
import { resultadosIteraciones } from './browser.mjs';


// Función para mezclar aleatoriamente los datos
const mezclarAleatoriamente = (datos) => {
  return datos.sort(() => Math.random() - 0.5);
};

// Función para calcular la precisión
function getAccuracy(net, testData) {
  let hits = 0;
  testData.forEach((datapoint) => {
    const output = net.run(datapoint.input);
    const outputArray = output.map(Math.round);
    if (outputArray.every((value, index) => value === datapoint.output[index])) {
      hits += 1;
    }
  });
  return hits / testData.length;
}

export default function RedNeuronal(parametrosRedNeuronal, data) {
  const { neuronasEntrada, neuronasSalida, activacion, capasOcultas, tasaAprendizaje, umbralError, epocas } = parametrosRedNeuronal;
  // Crear la red neuronal
  // eslint-disable-next-line no-undef
  const net = new brain.NeuralNetwork({
    inputSize: neuronasEntrada,
    outputSize: neuronasSalida,
    hiddenLayers: capasOcultas,
  });
  // Configuración para el entrenamiento
  const config = {
    hiddenLayers: capasOcultas,
    iterations: epocas,
    log: true,
    logPeriod: 1,
    learningRate: tasaAprendizaje,
    errorThresh: umbralError,
    activation: activacion,
    inputSize: neuronasEntrada,
    outputSize: neuronasSalida,
  };
  // Aleatoriza los datos antes de pasarlos a la red neuronal
  const datosAleatorios = mezclarAleatoriamente(data);
  // Divide los datos en conjuntos de entrenamiento y prueba
  const datosEntrenamientoPorcentaje = 0.8;
  const numDatosEntrenamiento = Math.floor(data.length * datosEntrenamientoPorcentaje);
  const datosEntrenamiento = datosAleatorios.slice(0, numDatosEntrenamiento);
  const datosPrueba = datosAleatorios.slice(numDatosEntrenamiento);
  // Entrena la red neuronal con los datos de entrenamiento
  net.train(datosEntrenamiento, config);
  // Evalúa el rendimiento en los datos de prueba
  const accuracy = getAccuracy(net, datosPrueba);
  // Obtener los pesos finales
  const weights = net.toJSON().layers.map(layer => layer);

  return [resultadosIteraciones, accuracy, weights, net];
}
