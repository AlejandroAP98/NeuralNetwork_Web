import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import './nav.css';
import { useState } from "react";
import RedNeuronal from  "./components/redNeuronal"

export default function Nav() {
    const Ativacion = [
        {label:"ReLU", value: "relu", descriprtion:"función de activación ReLU"},
        {label:"Sigmoid", value: "sigmoid", descriprtion:" función de activación Sigmoid"},
        {label:"Tanh", value: "tanh", descriprtion:" función de activación Tanh"},
        {label:"Softmax", value: "softmax", descriprtion:" función de activación Softmax"},
        {label:"Linear", value: "linear", descriprtion:" función de activación Linear"},
        ];
    
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        };
    
        const handleLoadFile = async () => {
          RedNeuronal();
        }
          
  return (
    <section className="flex justify-between py-5 gap-20">
        <div className="grid grid-flow-col items-center gap-4 w-full h-full justify-end">
            <input
                type="file"
                accept=".csv" // Puedes ajustar la extensión del archivo según tus necesidades
                onChange={handleFileChange}
                />
            <Button color="primary" className="w-12 h-12" variant="flat" size="lg" radius="full" isIconOnly onClick={handleLoadFile}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-upload" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="14" y1="3" x2="14" y2="12" /><path d="M17 6l-3 -3l-3 3" /><line x1="11" y1="21" x2="13" y2="21" /><line x1="12" y1="15" x2="12" y2="21" /></svg>
            </Button>
            <Button color="success" className="w-20 h-20" variant="ghost" size="lg" radius="full" isIconOnly >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-play-filled" width="42" height="42" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" strokeWidth="1" fill="currentColor" /></svg>
            </Button>
            <Button color="primary" className="w-12 h-12" variant="flat" size="lg" radius="full" isIconOnly >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-pause-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" strokeWidth="0" fill="currentColor" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" strokeWidth="0" fill="currentColor" /></svg>
            </Button>
        </div>
        <div className="grid grid-flow-col content-center w-full  justify-start gap-5">
            <Select placeholder="Activation" size="sm" className="w-40" variant="underlined" color="default" aria-label="Selección de la función de activación para la red neuronal">
                <SelectSection label="Ativacion">
                {Ativacion.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                    {item.label}
                    </SelectItem>
                ))}
                </SelectSection>
            </Select>
            <Input
                type="text"
                label="Learn Rate"
                defaultValue="0.1"
                variant="underlined"
                className=" w-24"
                size="sm"
                />
        </div>
    </section>

  );
}

