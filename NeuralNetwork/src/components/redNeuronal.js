import'./browser.mjs'

export default function RedNeuronal() {

// provide optional config object (or undefined). Defaults shown.
const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    iterations: 10000,
    log:true,
    logPeriod:1,
    timeout:Infinity // the maximum times to iterate the training data --> number greater than 0
    };
  
  // create a simple feed forward neural network with backpropagation
  const net = new brain.NeuralNetwork(config);
  
  net.train([
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] },
  ]);
  
  const output = net.run([1, 0]); // [0.987]
    console.log(output);
}
//   // parámetros de la red neuronal
//   const inputSize = 2;
//   const hiddenSizes = [2];
//   const outputSize = 2;
//   const learningRate = 0.5;
//   const epochs = 10;

//   // iniciar pesos y sesgos
//   let weights = [];
//   let biases = [];
//   const outputLayerWeights = [];
//   const outputLayerBiases = [];

//   for (let i = 0; i < hiddenSizes.length; i++) {
//     const layerWeights = [];
//     for (let j = 0; j < (i === 0 ? inputSize : hiddenSizes[i - 1]); j++) {
//       const neuronWeights = [];
//       for (let k = 0; k < hiddenSizes[i]; k++) {
//         neuronWeights.push(Math.random());
//       }
//       layerWeights.push(neuronWeights);
//     }
//     weights.push(layerWeights);
//     biases.push(Array(hiddenSizes[i]).fill(Math.random()));
//   }

//   for (let i = 0; i < outputSize; i++) {
//     const neuronWeights = [];
//     for (let j = 0; j < hiddenSizes[hiddenSizes.length - 1]; j++) {
//       neuronWeights.push(Math.random());
//     }
//     outputLayerWeights.push(neuronWeights);
//   }

//   for (let i = 0; i < outputSize; i++) {
//     outputLayerBiases.push(Math.random());
//   }
//  // Propagación hacia adelante
// function forward(input) {
//   // Arreglos para almacenar las salidas de cada capa
//   let entrada_oculta = [];
//   let salida_oculta = [];
//   // Bucle a través de cada capa de la red neuronal
//   for (let i = 0; i < hiddenSizes.length; i++) {
//     // Obtener los pesos y sesgos de la capa actual  
//     const layerWeights = weights[i];
//     const layerBiases = biases[i];
//     // Verificar si la capa actual es la capa de entrada
//     const isInputLayer = i === 0;
//     // Arreglo para almacenar las salidas ponderadas de las neuronas en la capa actual
//     const salida_capa_actual = [];
//     // Bucle a través de cada neurona en la capa actual
//     for (let j = 0; j < layerWeights.length; j++) {
//       // Obtener los pesos de la neurona actual
//       const neuronWeights = layerWeights[j];
//       // Inicializar la salida de la neurona
//       let neuronOutput = 0;
//       // Bucle a través de cada peso de la neurona y calcular la salida ponderada
//       for (let k = 0; k < neuronWeights.length; k++) {
//         if (isInputLayer) {
//           // Si es la capa de entrada, multiplicar por la entrada correspondiente
//           neuronOutput += neuronWeights[k] * input[k];
//         } else {
//           // Si no es la capa de entrada, solo sumar el peso
//           neuronOutput += neuronWeights[k];
//         }
//         salida_capa_actual.push(neuronOutput);
//       }
//       // Sumar el sesgo de la neurona a la salida ponderada
//       neuronOutput += layerBiases[j];
//       // Agregar la salida ponderada de la neurona al arreglo de salidas de la capa
//       entrada_oculta.push(neuronOutput);
//     }
//     // Aplicar la función de activación (tangente hiperbólica) a las salidas de la capa actual
//     entrada_oculta.push(salida_capa_actual);
//     salida_oculta.push(salida_capa_actual.map(x => Math.tanh(x)));
//     // Actualizar la entrada para la siguiente capa

//   }
//   // Devolver las salidas de la capa final (salida_oculta)
//   return salida_oculta;
// }

// function calculateError(output, target) {
//   return target.map((t, i) => t - output[i]);
// }


// function calculateOutputGradient(output) {
//   return output.map((o, i) => o * (1 - Math.tanh(o) ** 2));
// }

// function calculateHiddenError(outputGradient, outputLayerWeights) {
//   const error_hidden = [];
//   for (let j = 0; j < outputLayerWeights[0].length; j++) {
//     let e = 0;
//     for (let i = 0; i < outputLayerWeights.length; i++) {
//       e += outputGradient[i] * outputLayerWeights[i][j];
//     }
//     error_hidden.push(e);
//   }
//   return error_hidden;
// }

// function calculateHiddenGradient(input) {
//   return input.map((x, i) => x * (1 - Math.tanh(x) ** 2));
// }

// function updateWeightsAndBiases(weights, biases, input, outputGradient, hiddenGradient, learningRate) {
//   // Actualizar pesos y sesgos en la capa de salida
//   for (let i = 0; i < weights[weights.length - 1].length; i++) {
//     for (let j = 0; j < weights[weights.length - 1][i].length; j++) {
//       weights[weights.length - 1][i][j] += outputGradient[i] * hiddenGradient[j] * learningRate;
//     }
//     biases[biases.length - 1][i] += outputGradient[i] * learningRate; 
//   }
//   // Actualizar pesos y sesgos en la capa oculta
//   for (let i = weights.length - 2; i >= 0; i--) {
//     for (let j = 0; j < weights[i].length; j++) {
//       for (let k = 0; k < weights[i][j].length; k++) {
//         weights[i][j][k] += input[j] * hiddenGradient[k] * learningRate;
//       }
//       biases[i][j] += hiddenGradient[j] * learningRate;
//     }
//   }
//   return  weights, biases ;
// }

// function calculateMSE(output, targetOutput) {
//   return output.reduce((sum, x, i) => sum + (x - targetOutput[i]) ** 2, 0) / output.length;
// }


// function train(input, targetOutput, learningRate, epochs) {
//   for (let i = 0; i < epochs; i++) {
//     const output = forward(input);
//     const outputGradient = calculateOutputGradient(output);
//     const hiddenError = calculateHiddenError(outputGradient, outputLayerWeights);
//     const hiddenGradient = calculateHiddenGradient(hiddenError);
//     const [newWeights, newBiases] = updateWeightsAndBiases(weights, biases, input, outputGradient, hiddenGradient, learningRate);
//     weights = newWeights;
//     biases = newBiases;
//     const mse = calculateMSE(output, targetOutput);
//     console.log(`Epoch: ${i + 1} - Error: ${mse}`);
//   }
// }

//   const input = [0.05, 0.1];
//   const targetOutput = [0.01, 0.99];
//   train(input, targetOutput, learningRate, epochs);


  
