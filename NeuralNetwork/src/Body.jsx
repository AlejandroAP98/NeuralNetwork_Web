import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Divider } from "@nextui-org/divider";


export default function Body() {
    const [numNeuronasEntrada, setNumNeuronas] = useState(2);
    const [numNeuronasSalida, setNumNeuronasSalida] = useState(1);
    const [capasOcultas, setCapasOcultas] = useState(0);
    const [neuronasPorCapa, setNeuronasPorCapa] = useState([1]);

    const handleAddNeurona = () => {
        setNumNeuronas(numNeuronasEntrada + 1);
    };

    const handleRemoveNeurona = () => {
        setNumNeuronas(numNeuronasEntrada - 1);
    };

    const handleAddNeuronaSalida = () => {
        setNumNeuronasSalida(numNeuronasSalida + 1);
    };

    const handleRemoveNeuronaSalida = () => {
        setNumNeuronasSalida(numNeuronasSalida - 1);
    };

    const handleAddCapaOculta = () => {
        setCapasOcultas(capasOcultas + 1);
        setNeuronasPorCapa([...neuronasPorCapa, 1]);
    };

    const handleRemoveCapaOculta = () => {
        setCapasOcultas(capasOcultas - 1);
        const newNeuronasPorCapa = [...neuronasPorCapa];
        newNeuronasPorCapa.pop();
        setNeuronasPorCapa(newNeuronasPorCapa);
    };

    const handleAddNeuronaOculta = (index) => {
        const newNeuronasPorCapa = [...neuronasPorCapa];
        newNeuronasPorCapa[index] += 1;
        setNeuronasPorCapa(newNeuronasPorCapa);
    };

    const handleRemoveNeuronaOculta = (index) => {
        const newNeuronasPorCapa = [...neuronasPorCapa];
        if (newNeuronasPorCapa[index] > 1) {
            newNeuronasPorCapa[index] -= 1;
            setNeuronasPorCapa(newNeuronasPorCapa);
        }
    };

    const renderNeuronas = () => {
        const neuronas = [];
        for (let i = 0; i < numNeuronasEntrada; i++) {
            neuronas.push(
                <Button color="primary" className="w-14 h-14" variant="bordered" size="lg" radius="full" isIconOnly>
                </Button>
            );
        }
        return neuronas;
    };

    const renderNeuronasSalida = () => {
        const neuronas = [];
        for (let i = 0; i < numNeuronasSalida; i++) {
            neuronas.push(
                <Button color="danger" className="w-14 h-14" variant="bordered" size="lg" radius="full" isIconOnly>
                </Button>
            );
        }
        return neuronas;
    };

    const renderNeuronasOcultas = (index) => {
        const neuronas = [];
        for (let i = 0; i < neuronasPorCapa[index]; i++) {
            neuronas.push(
                <Button color="warning" className="w-14 h-14" variant="bordered" size="lg" radius="full" isIconOnly>
                </Button>
            );
        }
        return neuronas;
    };

    const renderCapasOcultas = () => {
        const capas = [];
        for (let i = 0; i < capasOcultas; i++) {
            capas.push(
                <div key={i} className="flex flex-col">
                    <h1 className="text-sm text-center whitespace-nowrap text-black">{neuronasPorCapa[i]} neuronas</h1>
                    <div className="flex gap-1">
                        <Button variant="flat" size="sm" radius="full" isIconOnly onClick={() => handleAddNeuronaOculta(i)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        </Button>
                        <Button variant="solid" size="sm" radius="full" isIconOnly onClick={() => handleRemoveNeuronaOculta(i)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </Button>
                    </div>
                    <div className="grid justify-center items-center h-full my-4 gap-2">
                        {renderNeuronasOcultas(i)}
                    </div>
                </div>
            );
        }
        return capas;
    };
    

    return(
        <section className=" flex max-h-unit-8x w-full">
            <div className="grid grid-flow-col w-full justify-center mx-4 overflow-auto max-w-7xl">
                <div className="flex flex-col my-12 w-32">
                    <h1 className="text-sm text-center text-black">{numNeuronasEntrada} Neuronas en capa de entrada </h1>
                    <div className="flex justify-center gap-4">
                        <Button variant="flat" size="sm" radius="full" isIconOnly onClick={handleAddNeurona}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </Button>
                        <Button variant="solid" size="sm" radius="full" isIconOnly onClick={handleRemoveNeurona} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </Button>
                    </div>
                    <div className="grid justify-center items-center h-full my-4 gap-2">
                        {renderNeuronas()}
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm text-center text-black">{capasOcultas} Capas ocultas</h1>
                    <div className="flex justify-center gap-4">
                        <Button variant="flat" size="sm" radius="full" isIconOnly onClick={handleAddCapaOculta} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </Button>
                        <Button variant="solid" size="sm" radius="full" isIconOnly onClick={handleRemoveCapaOculta} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </Button>
                    </div>
                    <Divider style={{width: "100%"}}/>
                    <div className="flex gap-2">
                        {renderCapasOcultas()}
                    </div>
                </div>
                <div className="flex flex-col my-12 w-32">
                    <h1 className="text-sm text-center text-black">{numNeuronasSalida} Neuronas en capa de salida</h1>
                    <div className="flex justify-center gap-4">
                        <Button variant="flat" size="sm" radius="full" isIconOnly onClick={handleAddNeuronaSalida}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </Button>
                        <Button variant="solid" size="sm" radius="full" isIconOnly onClick={handleRemoveNeuronaSalida}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </Button>
                    </div>
                    <div className="grid justify-center items-center h-full my-4 gap-2">
                        {renderNeuronasSalida()}
                    </div>
                </div>
            </div>
            <div className="grafica w-96">
                <h1 className="text-lg text-center text-black">Gráfica</h1>
                
            </div>

        </section>
    );
}