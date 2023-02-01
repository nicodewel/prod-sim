import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { simulateProductionline } from "./productionlineSlice";


const ProductionLine = ({ pl, number }) => {

    const dispatch = useDispatch();
    const [carModel, setCarModel] = useState(pl.carModel.id);
    const [simSpeed, setSimSpeed] = useState(pl.simTime)


    const models = useSelector(state => state.ressources.carModels)
    
    useEffect(() => {
        simSpeed instanceof Number ? console.log("JAAAAA") : console.log("NEEEEE")
    })

    const startSimulation = (speed) => {
        console.log("MODELS. " ,models);
        console.log("MODELS. " ,models);
        let newMod = models.find(mod => mod.id == carModel)
        let modLine = {...pl, carModel: newMod}
        simSpeed.trim() > 0 ? console.log("JAAAAA") : console.log("NEEEEE")

        dispatch(simulateProductionline({simSpeed: simSpeed, modLine}))
    }

    return (
        <tr>
            <th scope="row">{number + 1}</th>
            <td>{pl.name == null ? "Linienname" : pl.name}</td>
            <td>
                <select className="form-select" onChange={e => setCarModel(e.target.value)} disabled={pl.active}>
                    {models.map((mod, i) => <option key={i} value={mod.id} selected={pl.carModel.name == mod.name ? "selected" : ""}>{mod.name}</option>)}    
                </select>
               
                {/* {pl.name == null ? "Fahrzeug" : pl.carModel.name} */}
            </td>
            <td>{pl.runnable ? "lauffähig" : "unvollständig"}</td>
            <td>{pl.active ? "läuft" : "läuft nicht"} </td>
            <td>{pl.finishedParts}</td>
            <td><input className="col-2" placeholder={pl.simTime}  onChange={(e) => setSimSpeed(e.target.value)} /></td>
            <td> <i className="bi bi-play iconhover" onClick={() => startSimulation()}></i><i className="bi bi-stop iconhover"></i><i className="bi bi-info-square iconhover"></i></td>
        </tr>
    )

}

export default ProductionLine