import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { simulateProductionline } from "./productionlineSlice";
import { stopSimulation } from "./productionlineSlice";


const ProductionLine = ({ pl, number }) => {
    const dispatch = useDispatch();
    const [carModel, setCarModel] = useState(pl.carModel.id);
    const [simSpeed, setSimSpeed] = useState(pl.simTime)

    const models = useSelector(state => state.ressources.carModels)
    const thisSim = useSelector(state => state.productionlines.simulatedLines).find(sim => sim.id == pl.id)

    const startSimulation = () => {
        let newMod = models.find(mod => mod.id == carModel)
        let data = { ...pl, carModel: newMod, simSpeed: simSpeed }
        var regexSpeed = /^[0-9]{1,3}$/g;
        if (!isNaN(simSpeed) && simSpeed.match(regexSpeed)) {
            dispatch(simulateProductionline(data));
        } else {
            alert("Bitte eine Ganzahl  zwischen 1-999 eintragen")
        }
    }

    return (
        <tr>
            <th scope="row">{number + 1}</th>
            <td>{pl.name == null ? "Linienname" : pl.name}</td>
            <td>
                <select className="form-select" onChange={e => setCarModel(e.target.value)} disabled={pl.active}>
                    {models.map((mod, i) => <option key={i} value={mod.id} selected={pl.carModel.name == mod.name ? "selected" : ""}>{mod.name}</option>)}
                </select>
            </td>
            <td>{pl.runnable ? "lauffähig" : "unvollständig"}</td>
            <td>{thisSim?.active ? "läuft" : "läuft nicht"} </td>
            <td>{thisSim ? thisSim.finishedParts : pl.finishedParts}</td>
            <td><input className="col-4" placeholder={pl.simSpeed} onChange={(e) => setSimSpeed(e.target.value)} /></td>
            <td> <i className="bi bi-play iconhover" onClick={() => startSimulation()}></i><i className="bi bi-stop iconhover" onClick={() => dispatch(stopSimulation(pl))} ></i></td>
        </tr>
    )
}

export default ProductionLine;