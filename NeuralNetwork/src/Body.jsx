import { useState, useEffect } from 'react';
import RedNeuronal from './components/redNeuronal.mjs';
import { Code } from "@nextui-org/react";
import { Button } from '@nextui-org/button';
import Grafica from './components/grafica.mjs';
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {Tooltip} from "@nextui-org/tooltip";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import './body.css';
import Papa from 'papaparse';
import Run from "./components/predecir.js"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react"
import Info from "./Informacion.jsx"

export default function Body() {

  const Ativacion = [
    {label:"ReLU", value: "relu", descriprtion:"función de activación ReLU"},
    {label:"Sigmoid", value: "sigmoid", descriprtion:" función de activación Sigmoid"},
    {label:"Tanh", value: "tanh", descriprtion:" función de activación Tanh"},
    {label:"LeakyReLU", value: "leaky-relu", descriprtion:" función de activación LeakyReLU"},
  ];

  const [neuronasEntrada, setNeuronasEntrada] = useState(4);
  const [neuronasSalida, setNeuronasSalida] = useState(1);
  const [activacion, setActivacion] = useState("");
  const [capasOcultas, setCapasOcultas] = useState("4,4");
  const [tasaAprendizaje, setTasaAprendizaje] = useState(0.1);
  const [umbralError, setUmbralError] = useState(0.01);
  const [epocas, setEpocas] = useState(10);
  const [errores, setErrores] = useState([]);
  const [mostrarErrores, setMostrarErrores] = useState(false);
  const [indiceErrorVisible, setIndiceErrorVisible] = useState(0);
  const [mensajeErrores, setMensajeErrores] = useState('');
  const [pesos, setpesos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [net, setNet] = useState(null);
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState([]);  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [ isPlaying, setIsPlaying] = useState(true);
  const [accuracy, setAccuracy] = useState(0);
  const {isOpen: isOpenInfo, onOpen: onOpenInfo, onOpenChange: onOpenChangeInfo} = useDisclosure();




  const handleInputChangeInputs = (event) => {
      setInput(event.target.value);
  }
  const handleClickPredict = () => {
      setOutput(Run(net,input.split(",").map(value => parseFloat(value))));
      setInput([]);
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleFileUpload = async () => {
    
    if (!selectedFile || !neuronasEntrada || !neuronasSalida || !activacion || !capasOcultas || !tasaAprendizaje || !umbralError || !epocas) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: '¡Error!',
        text: 'Complete todos los campos y/o suba el archivo',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    setPlaying(true);
    // Usa Papa.parse para leer el contenido del archivo CSV
    Papa.parse(selectedFile, {
      complete: (result) => {
        // Procesa los datos según sea necesario
        const data = result.data.map((row) => ({
          input: Object.values(row).slice(0, parseInt(neuronasEntrada)).map(Number),
          output: Object.values(row).slice(parseInt(neuronasEntrada), parseInt(neuronasEntrada) + parseInt(neuronasSalida)).map(Number), 
        }));
        // Entrena la red neuronal con los datos procesados
        const parametrosRedNeuronal = {
          neuronasEntrada: parseInt(neuronasEntrada),
          neuronasSalida: parseInt(neuronasSalida),
          activacion,
          capasOcultas: capasOcultas.split(",").map(value => parseInt(value)),
          tasaAprendizaje: parseFloat(tasaAprendizaje),
          umbralError: parseFloat(umbralError),
          epocas: parseInt(epocas),
        };
        const resultados = RedNeuronal(parametrosRedNeuronal, data);

        setErrores(resultados[0]);
        setMostrarErrores(true);
        setNet(resultados[3]); 
        Grafica(resultados[0]);
        const temporizador = setInterval(() => {
          setIndiceErrorVisible((indice) => {
            if (indice < resultados[0].length - 1) {
              return indice + 1;
            } else {
              const pesosSinPrimerValor = resultados[2].slice(1);
              setpesos(pesosSinPrimerValor);
              setPlaying(false); 
              setPaused(false);
              setIsPlaying(false);
              setAccuracy(resultados[1]);
              clearInterval(temporizador);
              return indice;
            }
          });
        }, 100);
        
      },
      header: true, 
      dynamicTyping: true, 
    });
    
  };
  
  useEffect(() => {
    const nuevoMensajeErrores = errores[indiceErrorVisible]
    setMensajeErrores(nuevoMensajeErrores);    
  }, [indiceErrorVisible, errores]);

  const handlePause = () => {
    //recargar la página
    setPaused(true);
    window.location.reload();
  
  };

  return (
    <section className='grid mx-6 relative'>
       <div className='w-full flex justify-end h-0 my-4'>
       <Button 
          color="danger"
          variant="flat"
          auto
          onClick={onOpenInfo}
          isIconOnly
          className="w-12 h-12"
          aria-label="Información"
          size='lg'

        >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-square-rounded" width="32" height="32" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9h.01" /><path d="M11 12h1v4h1" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
        </Button>
       </div>
      <div className="grid grid-flow-col my-4 justify-center gap-5 items-center ">
        <Button color="success" className="w-12 h-12" variant="ghost" size="lg" radius="full" disabled={paused} onClick={handlePause} isIconOnly >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-reload" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" /><path d="M20 4v5h-5" /></svg>
        </Button>
        <Button color="default" className="w-20 h-20" variant="solid" size="lg" radius="full" disabled={playing} isIconOnly onClick={handleFileUpload} >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-play-filled" width="42" height="42" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" strokeWidth="1" fill="currentColor" /></svg>
        </Button>
        <Button
                color="warning"
                variant="ghost"
                auto
                onClick={onOpen}
                disabled={isPlaying}
            >
                Predecir
        </Button>
        <Modal isOpen={isOpenInfo} onOpenChange={onOpenChangeInfo} isDismissable={true} backdrop='blur' size='5xl'  className=" bg-stone-900">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 w-full  text-white text-2xl font-bold">Información</ModalHeader>
                <ModalBody>
                  <Info/>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <Input
          type="file"
          onChange={handleFileChange}
          size="sm"
          className="w-auto justify-self-center m-2"
          variant="flat"
          accept='.csv'
        />
      <div className='flex justify-center gap-5'>
        <Input
            type="text"
            label="Neuronas de entrada"
            defaultValue="4"
            variant="flat"
            className="w-auto"
            size="sm"
            onChange={(e) => setNeuronasEntrada(e.target.value)}
            value={neuronasEntrada}
          />
          <Input
            type="text"
            label="Neuronas de salida"
            defaultValue="1"
            variant="flat"
            className="w-auto"
            size="sm"
            onChange={(e) => setNeuronasSalida(e.target.value)}
            value={neuronasSalida}
          />
        <Select  value={activacion} onChange={(selected) => setActivacion(selected.target.value) } placeholder="Activation" size="sm" className="w-52" variant="flat"  aria-label="Selección de la función de activación para la red neuronal"  >
          <SelectSection label="Ativacion">
          {Ativacion.map((item) => (
              <SelectItem key={item.value} value={item.value} >
              {item.label}
              </SelectItem>
          ))}
          </SelectSection>
        </Select>
        <Tooltip content="Cada número delimitado por una coma indica la cantidad de neuronas por capa oculta" placement="baseline">
          <Input
              type="text"
              label="Capas ocultas"
              defaultValue="4,4"
              variant="flat"
              className="w-auto"
              size="sm"
              onChange={(e) => setCapasOcultas(e.target.value)}
              value={capasOcultas}
              />
        </Tooltip>
        <Input
            type="text"
            label="Tasa de aprendizaje"
            defaultValue="0.1"
            variant="flat"
            className="w-auto"
            size="sm"
            onChange={(e) => setTasaAprendizaje(e.target.value)}
            value={tasaAprendizaje}
            />
          <Input
          type="text"
          label="Umbral de error"
          defaultValue="0.01"
          variant="flat"
          className="w-auto"
          size="sm"
          onChange={(e) => setUmbralError(e.target.value)}
          value={umbralError}
          />
          <Input
          type="text"
          label="Épocas"
          defaultValue="10"
          variant="flat"
          className="w-auto"
          size="sm"
          onChange={(e) => setEpocas(e.target.value)}
          value={epocas}
          />
      </div>
      {mostrarErrores && (
        <div className='flex justify-between gap-2 m-4'>
          <div>
            <h2>Error</h2>
            <Code color='danger' className='text-white'>
              {mensajeErrores}
            </Code>
          </div>
          <div>
            <h2>Cross-validation</h2>
            <Code color='success' className='text-white'>
              {accuracy}
            </Code>
          </div>
        </div>
      )}
      <div className='w-full flex overflow-auto'>
        <div id="container" className='h-80 my-2 w-full'></div>
      </div>
      <div id="pesos" className='my-4'>
        <div className='flex flex-col items-center w-full h-80 relative overflow-auto mx-4'>  
          <Tabs title="Capas" color="success" radius="full">
            {pesos.map((capa, indiceCapa) => (
            <Tab key={indiceCapa} title={(indiceCapa+1)}>
              <Card>
                <CardBody className=' w-unit-9xl'>
                  <p className='font-bold'>BIASES</p>
                  <p className='text-small mx-4'>{capa.biases.join(",")}</p>
                  <p className='font-bold'>PESOS</p>
                    <ul>
                    {capa.weights.map((peso, indicePeso) => (
                      <div key={indicePeso}>
                        <li className="text-medium font-semibold mx-2">Neurona {indicePeso+1}</li>
                        <li className="text-small mx-4"> {peso.join(",")}</li>
                      </div>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </Tab>
          ))}
          </Tabs>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Realizar predicción</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Valor de los inputs separados por comas"
                  width="100%"
                  value={input}
                  onChange={handleInputChangeInputs}
              />
              </ModalBody>
              <Code label="Predicción" className='text-center'  color="success" width="100%" >
                {output}
              </Code>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="success" onPress={handleClickPredict}>
                  Predecir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}