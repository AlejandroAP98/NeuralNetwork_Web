/* eslint-disable react/no-unescaped-entities */
import './body.css';

import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

export default function Info() {
  const color = "danger";
  return (
    <div className="grid w-full">
    <Tabs aria-label="Options" color="danger" key={color} className='my-1' variant='light' radius='full'>
      <Tab key="redesneuronales" title="Redes Neuronales">
        <Card>
          <CardBody id="card">
            Las redes neuronales son modelos computacionales inspirados en el funcionamiento del cerebro humano, compuestas por neuronas artificiales interconectadas. Cada neurona procesa información y transmite señales a través de conexiones ponderadas. Estas conexiones, llamadas pesos, se ajustan durante el entrenamiento para que la red pueda aprender patrones y realizar tareas específicas.
          </CardBody>
        </Card>  
      </Tab>
      <Tab key="neurona" title="Neuronas">
        <Card>
          <CardBody id="card">
            Las neuronas son unidades de procesamiento que realizan operaciones matemáticas en las entradas que reciben. Cada conexión de entrada tiene un peso asociado que determina la importancia de esa entrada para la salida de la neurona. La salida de la neurona se calcula aplicando una función de activación a la suma ponderada de las entradas.
          </CardBody>
        </Card>  
      </Tab>
      <Tab key="funcionactivacion" title="Función de activación">
        <Card>
          <CardBody id="card">
            Esta función introduce no linealidades en la red neuronal. Después de que una neurona calcula la suma ponderada de sus entradas, la función de activación decide si y en qué medida la neurona debe "activarse". Comunes funciones de activación incluyen la sigmoide, la tangente hiperbólica (tanh) y la rectificación lineal (ReLU).
          </CardBody>
        </Card>  
      </Tab>
      <Tab key="CapasInOut" title="Capas de entrada y salida">
        <Card>
          <CardBody id="card">
          La capa de entrada recibe los datos brutos y transmite la información a través de las conexiones a las capas ocultas. Estas capas ocultas procesan la información y, finalmente, la capa de salida produce el resultado final de la red. Cada conexión entre neuronas tiene un peso asociado que se ajusta durante el entrenamiento.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="CapasOcultas" title="Capas ocultas">
        <Card>
          <CardBody id="card">
          Son capas intermedias entre la capa de entrada y la capa de salida en una red neuronal. Cada capa oculta contiene un conjunto de neuronas que procesan información de manera no lineal. Estas capas permiten que la red aprenda representaciones más complejas y abstractas de los datos. La profundidad de una red, determinada por el número de capas ocultas, es crucial para su capacidad para aprender patrones sofisticados.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="tasaAprendizaje:" title="Tasa de aprendizaje:">
        <Card>
          <CardBody id="card">
            Este parámetro determina el tamaño de los pasos que la red toma durante el proceso de aprendizaje. Una tasa de aprendizaje más alta puede llevar a convergencia más rápida, pero demasiado alta puede resultar en que la red no alcance una solución óptima.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="umbralError" title="Umbral de error">
        <Card>
          <CardBody id="card">
          Representa el nivel de precisión aceptable durante el entrenamiento. Durante cada época, la red busca minimizar el error, la diferencia entre las predicciones y los valores reales, y detiene el entrenamiento cuando el error alcanza un umbral aceptable.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="epocas" title="Épocas">
        <Card>
          <CardBody id="card">
          Una época es una iteración completa sobre todo el conjunto de datos de entrenamiento. El entrenamiento de la red se detiene después de que se alcanza el número especificado de épocas.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="error" title="Error">
        <Card>
          <CardBody id="card">
          Este término mide la discrepancia entre las predicciones de la red y los valores reales. La red ajusta sus pesos para minimizar este error durante el entrenamiento, lo que mejora su capacidad para realizar predicciones precisas.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="precision" title="Precisión">
        <Card>
          <CardBody id="card">
          La precisión es la proporción de predicciones correctas realizadas por la red. Se calcula dividiendo el número de predicciones correctas por el número total de predicciones.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="cross-val" title="Cross-Validation">
        <Card>
          <CardBody id="card">
            Una técnica que implica dividir los datos en conjuntos de entrenamiento y prueba de manera iterativa. Esto proporciona una evaluación más robusta del rendimiento del modelo al garantizar que el modelo se evalúe en diferentes subconjuntos de datos.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="bias" title="Bias">
        <Card>
          <CardBody id="card">
          Es un término constante añadido a la entrada de una neurona que permite ajustar el punto de activación de la función de activación. Ayuda a la red a aprender patrones más complejos y a adaptarse a variaciones en los datos.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="pesos" title="Pesos">
        <Card>
          <CardBody id="card">
            Son parámetros ajustables que determinan la fuerza y dirección de las conexiones entre las neuronas. Durante el entrenamiento, los pesos se ajustan para minimizar el error y mejorar la capacidad de la red para realizar predicciones precisas y generalizar a nuevos datos.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="overfitting" title="Overfitting">
        <Card>
          <CardBody id="card">
            Un fenómeno en el que un modelo se ajusta demasiado a los datos de entrenamiento y no puede generalizar bien a los datos nuevos. El sobreajuste puede ocurrir cuando el modelo es demasiado complejo o cuando se entrena durante demasiadas épocas.
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  </div>  
);
}

